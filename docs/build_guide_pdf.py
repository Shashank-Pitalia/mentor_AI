from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import re
import textwrap

BASE_DIR = Path(__file__).resolve().parent
SOURCE = BASE_DIR / "Mentor_AI_Full_Project_Guide.md"
OUTPUT = BASE_DIR / "Mentor_AI_Full_Project_Guide.pdf"

PAGE_WIDTH = 595.2756  # A4
PAGE_HEIGHT = 841.8898
LEFT_MARGIN = 48
RIGHT_MARGIN = 48
TOP_MARGIN = 54
BOTTOM_MARGIN = 48
AVAILABLE_WIDTH = PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN

FONT_HELVETICA = "Helvetica"
FONT_HELVETICA_BOLD = "Helvetica-Bold"
FONT_COURIER = "Courier"


@dataclass
class RenderLine:
    text: str
    font: str
    size: int
    indent: int = 0
    extra_before: int = 0
    extra_after: int = 0


_ESCAPE_MAP = str.maketrans({"\\": r"\\", "(": r"\(", ")": r"\)"})


def escape_pdf_text(text: str) -> str:
    return text.translate(_ESCAPE_MAP)


def wrap_text(text: str, font_size: int, indent: int, font_name: str) -> list[str]:
    usable_width = max(1, AVAILABLE_WIDTH - indent)
    if font_name == FONT_COURIER:
        approx_char_width = font_size * 0.6
    else:
        approx_char_width = font_size * 0.53
    max_chars = max(20, int(usable_width / approx_char_width))
    return textwrap.wrap(
        text,
        width=max_chars,
        break_long_words=False,
        break_on_hyphens=False,
    ) or [""]


def parse_markdown(markdown_text: str) -> list[RenderLine]:
    lines: list[RenderLine] = []
    in_code = False
    paragraph_buffer: list[str] = []

    def flush_paragraph() -> None:
        nonlocal paragraph_buffer
        if not paragraph_buffer:
            return
        paragraph = " ".join(part.strip()
                             for part in paragraph_buffer if part.strip())
        paragraph_buffer = []
        if not paragraph:
            return
        for wrapped in wrap_text(paragraph, 11, 0, FONT_HELVETICA):
            lines.append(RenderLine(wrapped, FONT_HELVETICA, 11))

    for raw_line in markdown_text.splitlines():
        line = raw_line.rstrip()
        stripped = line.strip()

        if stripped.startswith("```"):
            flush_paragraph()
            in_code = not in_code
            continue

        if in_code:
            if not stripped:
                lines.append(RenderLine("", FONT_COURIER, 9, indent=18))
                continue
            wrapped_code = wrap_text(line, 9, 18, FONT_COURIER)
            for code_line in wrapped_code:
                lines.append(RenderLine(code_line, FONT_COURIER, 9, indent=18))
            continue

        if not stripped:
            flush_paragraph()
            lines.append(RenderLine("", FONT_HELVETICA, 11, extra_after=4))
            continue

        if stripped.startswith("# "):
            flush_paragraph()
            lines.append(RenderLine(stripped[2:].strip(
            ), FONT_HELVETICA_BOLD, 22, extra_before=8, extra_after=5))
            continue

        if stripped.startswith("## "):
            flush_paragraph()
            lines.append(RenderLine(stripped[3:].strip(
            ), FONT_HELVETICA_BOLD, 16, extra_before=7, extra_after=4))
            continue

        if stripped.startswith("### "):
            flush_paragraph()
            lines.append(RenderLine(stripped[4:].strip(
            ), FONT_HELVETICA_BOLD, 13, extra_before=6, extra_after=2))
            continue

        list_match = re.match(r"^(?:[-*]|\d+[.)])\s+(.*)$", stripped)
        if list_match:
            flush_paragraph()
            bullet_text = "• " + list_match.group(1).strip()
            for wrapped in wrap_text(bullet_text, 11, 18, FONT_HELVETICA):
                lines.append(RenderLine(
                    wrapped, FONT_HELVETICA, 11, indent=18))
            continue

        if line.startswith("    "):
            flush_paragraph()
            for wrapped in wrap_text(line.strip(), 9, 18, FONT_COURIER):
                lines.append(RenderLine(wrapped, FONT_COURIER, 9, indent=18))
            continue

        paragraph_buffer.append(stripped)

    flush_paragraph()
    return lines


def paginate(lines: list[RenderLine]) -> list[list[RenderLine]]:
    pages: list[list[RenderLine]] = []
    current_page: list[RenderLine] = []
    y = PAGE_HEIGHT - TOP_MARGIN

    def add_page() -> None:
        nonlocal current_page, y
        pages.append(current_page)
        current_page = []
        y = PAGE_HEIGHT - TOP_MARGIN

    for item in lines:
        leading = max(12, int(item.size * 1.45))
        needed = item.extra_before + leading + item.extra_after
        if y - needed < BOTTOM_MARGIN:
            add_page()
        if item.extra_before:
            spacer = RenderLine("", FONT_HELVETICA, 11)
            spacer.extra_after = item.extra_before
            current_page.append(spacer)
            y -= item.extra_before
        current_page.append(item)
        y -= leading
        if item.extra_after:
            y -= item.extra_after

    if current_page or not pages:
        pages.append(current_page)

    return pages


def build_stream(page_lines: list[RenderLine]) -> bytes:
    y = PAGE_HEIGHT - TOP_MARGIN
    parts: list[str] = []
    for item in page_lines:
        leading = max(12, int(item.size * 1.45))
        y -= item.extra_before
        if item.text:
            x = LEFT_MARGIN + item.indent
            parts.append(
                "BT "
                f"/{'F3' if item.font == FONT_COURIER else ('F2' if item.font == FONT_HELVETICA_BOLD else 'F1')} {item.size} Tf "
                f"1 0 0 1 {x:.2f} {y:.2f} Tm "
                f"({escape_pdf_text(item.text)}) Tj ET"
            )
        y -= leading
        y -= item.extra_after
    return "\n".join(parts).encode("utf-8")


def make_pdf(markdown_text: str) -> bytes:
    lines = parse_markdown(markdown_text)
    pages = paginate(lines)

    objects: list[bytes] = []

    def add_object(content: bytes | str) -> int:
        if isinstance(content, str):
            content = content.encode("utf-8")
        objects.append(content)
        return len(objects)

    font1 = add_object(
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    font2 = add_object(
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
    font3 = add_object(b"<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>")

    content_refs: list[int] = []
    page_refs: list[int] = []

    for page_lines in pages:
        stream = build_stream(page_lines)
        content_obj = (
            f"<< /Length {len(stream)} >>\nstream\n".encode("utf-8")
            + stream
            + b"\nendstream"
        )
        content_refs.append(add_object(content_obj))

    pages_placeholder = len(objects) + 1
    for index, _page_lines in enumerate(pages):
        page_obj = (
            f"<< /Type /Page /Parent {pages_placeholder} 0 R /MediaBox [0 0 {PAGE_WIDTH:.4f} {PAGE_HEIGHT:.4f}] "
            f"/Resources << /Font << /F1 {font1} 0 R /F2 {font2} 0 R /F3 {font3} 0 R >> >> "
            f"/Contents {content_refs[index]} 0 R >>"
        )
        page_refs.append(add_object(page_obj))

    kids = "[ " + " ".join(f"{ref} 0 R" for ref in page_refs) + " ]"
    pages_obj = f"<< /Type /Pages /Kids {kids} /Count {len(page_refs)} >>"
    pages_ref = add_object(pages_obj)

    catalog_ref = add_object(f"<< /Type /Catalog /Pages {pages_ref} 0 R >>")

    pdf = bytearray()
    pdf.extend(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")

    offsets = [0]
    for obj_num, obj in enumerate(objects, start=1):
        offsets.append(len(pdf))
        pdf.extend(f"{obj_num} 0 obj\n".encode("utf-8"))
        pdf.extend(obj)
        pdf.extend(b"\nendobj\n")

    xref_offset = len(pdf)
    pdf.extend(f"xref\n0 {len(objects) + 1}\n".encode("utf-8"))
    pdf.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        pdf.extend(f"{offset:010d} 00000 n \n".encode("utf-8"))

    pdf.extend(
        (
            "trailer\n"
            f"<< /Size {len(objects) + 1} /Root {catalog_ref} 0 R >>\n"
            f"startxref\n{xref_offset}\n%%EOF\n"
        ).encode("utf-8")
    )

    return bytes(pdf)


def main() -> None:
    markdown_text = SOURCE.read_text(encoding="utf-8")
    pdf_bytes = make_pdf(markdown_text)
    OUTPUT.write_bytes(pdf_bytes)
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    main()

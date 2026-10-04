export default function SectionPlaceholder({ title, description, items = [] }) {
    return (
        <section className="page-card">
            <div className="page-card__header">
                <span className="eyebrow">Mentor AI</span>
                <h2>{title}</h2>
                {description ? <p>{description}</p> : null}
            </div>
            {items.length ? (
                <ul className="page-card__list">
                    {items.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            ) : null}
        </section>
    )
}

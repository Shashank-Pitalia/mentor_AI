import prisma from "../config/db.js";

export const generateUniqueUsername = async (name) => {
    const baseUsername = name
        .toLowerCase()
        .replace(/\s+/g, "");

    let username = baseUsername;

    let count = 0;

    while (true) {
        const existing = await prisma.user.findUnique({
            where: {
                userName: username,
            },
        });

        if (!existing) {
            return username;
        }

        count++;
        username = `${baseUsername}${count}`;
    }
};
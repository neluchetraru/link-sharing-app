'use server'

import { db } from "@/db";


export const saveLinks = async (userId: string, links: { platform: string, profile: string }[]) => {
    await db.link.deleteMany({
        where: {
            userId
        }
    });

    await db.link.createMany({
        data: links.map(link => ({
            userId,
            link: link.platform,
            profile: link.profile,
        }))
    });
}

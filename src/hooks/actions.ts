'use server'

import { db } from "@/db";

export const getLinks = async (userId: string) => {
    const links = await db.link.findMany({
        where: {
            userId
        }
    });





    return links.map(link => ({
        platform: link.link,
        url: link.url,
    }));
}
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
        profile: link.profile,
    }));
}



export const getAccount = async (userId: string) => {
    const user = await db.user.findFirst({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    return {
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1],
        email: user.email,
        avatar: user.picture,
        shareId: user.shareId
    }
}

export const getAccountIdByShareId = async (shareId: string) => {
    const user = await db.user.findFirst({
        where: {
            shareId
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user.id;
}
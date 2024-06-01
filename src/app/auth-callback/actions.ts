'use server'

import { db } from "@/db";
import { PreviewType } from "@/hooks/usePreview";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { nanoid } from 'nanoid'

export const getAuthStatus = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();


    if (!user?.id || !user.email) {
        throw new Error("Invalid user data")
    }

    const existingUser = await db.user.findFirst({
        where: {
            id: user.id
        },
    });

    if (!existingUser) {
        await db.user.create({
            data: {
                id: user.id,
                email: user.email,
                name: user.given_name + " " + user.family_name,
                picture: user.picture,
                shareId: nanoid(10)
            },
        });
    }


    return { success: true, user };
}

export const getUserData = async (user: KindeUser | undefined) => {

    if (!user?.id || !user.email) {
        throw new Error("Invalid user data")
    }

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id
        },
    });

    if (!dbUser) {
        throw new Error("User not found")
    }

    const userLinks = await db.link.findMany({
        where: {
            userId: user.id
        }
    });

    return {
        account: {
            id: dbUser.id,
            email: dbUser.email,
            name: dbUser.name,
            picture: dbUser.picture,
            shareId: dbUser.shareId
        },
        links: userLinks.map(link => ({
            platform: link.link,
            profile: link.profile
        }))
    } as PreviewType;
}
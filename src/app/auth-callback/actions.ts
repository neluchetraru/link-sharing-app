'use server'

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
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


    return { success: true };
}
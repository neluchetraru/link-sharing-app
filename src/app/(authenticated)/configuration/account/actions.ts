
'use server'
import { AccountFormValues } from "@/app/(authenticated)/configuration/account/page";
import { db } from "@/db";

export const saveAccount = async (userId: string, account: AccountFormValues) => {
    await db.user.update({
        where: {
            id: userId
        },
        data: {
            name: account.name,
            email: account.email,
            picture: account.avatar,
        }
    });
}
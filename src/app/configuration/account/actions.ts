
'use server'
import { db } from "@/db";
import { AccountFormValues } from "@/hooks/useAccountConfiguration";

export const saveAccount = async (userId: string, account: AccountFormValues) => {
    await db.user.update({
        where: {
            id: userId
        },
        data: {
            name: account.firstName + " " + account.lastName,
            email: account.email,
            picture: account.avatar,
        }
    });
}
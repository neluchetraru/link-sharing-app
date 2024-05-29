import { getAccount } from "@/hooks/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod'


const accountFormSchema = z.object({
    avatar: z.string().optional(),
    firstName: z.string({ message: "Please enter your first name." }).min(2, {
        message: "First name must be at least 2 characters long.",
    }),
    lastName: z.string({ message: "Please enter your first name." }).min(2, {
        message: "Last name must be at least 2 characters long.",
    }),
    email: z.string({ message: "Please enter your email." }).email({
        message: "Please enter a valid email address.",
    }),
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;


export function useAccountConfiguration() {
    const { user } = useKindeBrowserClient();


    const { data, refetch } = useQuery({
        queryKey: ['user-account'],
        queryFn: async () => getAccount(user?.id ?? ""),
    })

    useEffect(() => {
        if (user) {
            refetch()
        }
    }, [user]);


    const accountForm = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        mode: "onBlur",

    });

    useEffect(() => {
        if (data) {
            accountForm.setValue("firstName", data?.firstName ?? "");
            accountForm.setValue("lastName", data?.lastName ?? "");
            accountForm.setValue("email", data?.email ?? "");
            accountForm.setValue("avatar", data?.avatar ?? "");
        }
    }, [data]);

    return { form: accountForm, shareId: data?.shareId };
}
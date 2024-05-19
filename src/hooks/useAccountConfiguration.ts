import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from 'zod'

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/svg"
];


const accountFormSchema = z.object({
    avatar: z
        .any()
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            "Only .jpg, .jpeg, .png, .svg and .webp formats are supported."
        ),
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
    const accountForm = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        mode: "onBlur",
    });

    return { form: accountForm };
}
import { Icons } from "@/components/Icons";
import { getLinks } from "@/hooks/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

// bg-red-500 bg-blue-600 bg-teal-400 bg-gray-800 bg-blue-700 bg-red-600
// text-red-500 text-blue-600 text-teal-400 text-gray-800 text-blue-700 text-red-600

const linksFormSchema = z.object({
    links: z.array(
        z.object({
            platform: z.string().min(2, {
                message: "Please select a valid platform.",
            }),
            url: z.string().url({
                message: "Please enter a valid URL.",
            }),
        })
    ),
});

export const PLATFORMS = [
    {
        label: "Instagram",
        value: "instagram",
        tw: "red-500",
        icon: Icons.instagram
    },
    {
        label: "Facebook",
        value: "facebook",
        icon: Icons.facebook,
        tw: "blue-600",

    },
    {
        label: "TikTok",
        value: "tiktok",
        icon: Icons.tiktok,
        tw: "teal-400",
    },
    {
        label: "GitHub",
        value: "github",
        icon: Icons.github,
        tw: "gray-800",
    },
    {
        label: "LinkedIn",
        value: "linkedin",
        icon: Icons.linkedin,
        tw: "blue-700",
    },
    {
        label: "YouTube",
        value: "youtube",
        icon: Icons.youtube,
        tw: "red-600",
    }
] as const;

export type LinksFormValues = z.infer<typeof linksFormSchema>;

export function useLinksConfiguration() {
    const { user } = useKindeBrowserClient();

    const { data, refetch } = useQuery({
        queryKey: ['user-links'],
        queryFn: async () => getLinks(user?.id ?? ""),
    })

    useEffect(() => {
        if (user) {
            refetch()
        }
    }, [user]);

    const form = useForm<LinksFormValues>({
        resolver: zodResolver(linksFormSchema),
        defaultValues: {
            links: [
                {
                    platform: "",
                    url: "",
                },
            ],
        },
        mode: "onBlur",
    });
    const fieldArray = useFieldArray({
        name: "links",
        control: form.control,
    });

    useEffect(() => {
        if (data) {
            form.setValue("links", data);
        }
    }, [data]);



    return {
        form,
        fieldArray,
        PLATFORMS,
    };
}
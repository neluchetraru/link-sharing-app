import { Icons } from "@/components/Icons";

export type Account = {
    id: string,
    email: string,
    name: string,
    picture: string,
    shareId: string,
}

export type Link = {
    platform: string,
    profile: string,
}



export const PLATFORMS = [
    {
        label: "Instagram",
        value: "instagram",
        start: "https://instagram.com/",
        tw: "red-500",
        icon: Icons.instagram,
    },
    {
        label: "Facebook",
        value: "facebook",
        start: "https://facebook.com/",
        icon: Icons.facebook,
        tw: "blue-600",
    },
    {
        label: "TikTok",
        value: "tiktok",
        start: "https://tiktok.com/@",
        icon: Icons.tiktok,
        tw: "teal-400",
    },
    {
        label: "GitHub",
        value: "github",
        start: "https://github.copm/",
        icon: Icons.github,
        tw: "gray-800",
    },
    {
        label: "LinkedIn",
        value: "linkedin",
        start: "https://linkedin.com/in/",
        icon: Icons.linkedin,
        tw: "blue-700",
    },
    {
        label: "YouTube",
        start: "https://youtube.com/channel/",
        value: "youtube",
        icon: Icons.youtube,
        tw: "red-600",
    },
] as const;
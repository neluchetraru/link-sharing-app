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
        icon: Icons.instagram,
    },
    {
        label: "Facebook",
        value: "facebook",
        start: "https://facebook.com/",
        icon: Icons.facebook,
    },
    {
        label: "TikTok",
        value: "tiktok",
        start: "https://tiktok.com/@",
        icon: Icons.tiktok,
    },
    {
        label: "GitHub",
        value: "github",
        start: "https://github.com/",
        icon: Icons.github,
    },
    {
        label: "LinkedIn",
        value: "linkedin",
        start: "https://linkedin.com/in/",
        icon: Icons.linkedin,
    },
    {
        label: "YouTube",
        start: "https://youtube.com/channel/",
        value: "youtube",
        icon: Icons.youtube,
    },
] as const;
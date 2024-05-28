import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "@/db";
const f = createUploadthing();


export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .middleware(async ({ input }) => {
            const session = getKindeServerSession();
            const user = await session.getUser();
            if (!user) {
                throw new UploadThingError("You must be logged in to upload images.");
            }
            return { user };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            await db.user.update({
                where: {
                    id: metadata.user.id
                },
                data: {
                    picture: file.url
                }
            });
            return { imageUrl: file.url };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
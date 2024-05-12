
import { auth } from "@clerk/nextjs/server";

import { createUploadthing, type FileRouter } from "uploadthing/next";

import { isTeacher } from "@/helpers/isAdmin";



const f = createUploadthing();

const handleAuth = async () => {

    const { userId } = auth();
    const isAuthorized = await isTeacher(userId!);

    if (!userId || !isAuthorized) {
        throw new Error("Unauthorized")
    }

    return { userId }
}

export const ourFileRouter = {

    profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),


    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),

    courseAttachment: f(['image', 'video', 'text', 'audio', 'pdf'])
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),

    chapterVideo: f({ video: { maxFileSize: "1GB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
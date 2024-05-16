
import { NextResponse } from "next/server"
import Mux from "@mux/mux-node"

import { auth } from "@clerk/nextjs/server";

import prismadb from '@/lib/prismadb'

const { video } = new Mux({
    tokenId: process.env['MUX_TOKEN_ID'],
    tokenSecret: process.env['MUX_TOKEN_SECRET']
})

export const PATCH = async (request: Request, { params }: { params: { courseId: string, chapterId: string } }) => {

    const body = await request.json();

    try {

        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const course = await prismadb.course.findUnique({
            where: {
                id: params.courseId,
                teacherId: userId
            }
        })

        if (!course) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const updatedChapter = await prismadb.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            },
            data: {
                ...body
            }
        });

        if (body.videoUrl) {
            const existingMuxData = await prismadb.muxData.findFirst({
                where: {
                    chapterId: params.chapterId,
                }
            })

            if (existingMuxData) {
                await video.assets.delete(existingMuxData.assetId);
                await prismadb.muxData.delete({
                    where: {
                        id: existingMuxData.id
                    }
                });
            };

            const asset = await video.assets.create({
                input: body.videoUrl,
                playback_policy: ['public'],
                test: false
            })

            await prismadb.muxData.create({
                data: {
                    chapterId: params.chapterId,
                    assetId: asset.id,
                    playbackId: asset.playback_ids?.[0]?.id
                }
            })
        };



        return NextResponse.json(updatedChapter)


    } catch (error) {
        console.log('[CHAPTER_EDIT_API]', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }

}
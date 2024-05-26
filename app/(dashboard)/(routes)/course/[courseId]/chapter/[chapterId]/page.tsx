import { getChapter } from '@/actions/getChapter'
import { Banner } from '@/components/banner'
import { isAdmin, isTeacher } from '@/helpers/userCheck'
import { cn } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import VideoPlayer from './_components/video-player'

type Props = {
    params:{
        courseId: string;
        chapterId: string;
    }
}

const ChapterPage = async({params}: Props) => {

    const {userId} = auth();
    const teacher = await isTeacher(userId as string);
    const admin = await isAdmin(userId as string);

    if(!userId || admin ||teacher){
        redirect('/')
    }
    
    const {
        chapter,
        course,
        muxData, 
        attachments, 
        nextChapter, 
        userProgress
    } = await getChapter({userId, chapterId: params.chapterId, courseId: params.courseId})


    if(!chapter ||!course){
        redirect('/')
    }

    const isLocked = !chapter.isFree;

    const completeOnEnd = !userProgress?.isCompleted

    return (
        <div className='p-4 flex flex-col items-start gap-y-5'>
            {
                userProgress?.isCompleted && (
                <Banner
                variant='success'
                label='You have already completed this chapter'
                />
            )
            }
            <Link
                href='/student/dashboard'
            >
                <button
                    type="button"
                    aria-label="Back button"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
            </Link>

            <div className='p-4 w-full'>
                <VideoPlayer
                    chapterId={params.chapterId}
                    courseId={params.courseId}
                    title={chapter.title}
                    nextChapterId={nextChapter?.id as string}
                    isLocked={isLocked}
                    completeOnEnd={completeOnEnd}
                    playbackId={muxData?.playbackId as string}
                />
            </div>



        </div>
    )
}

export default ChapterPage
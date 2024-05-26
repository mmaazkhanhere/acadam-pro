"use client"

import MuxPlayer from '@mux/mux-player-react';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    playbackId ?: string;
    title: string;
    chapterId: string;
    courseId: string;
    isLocked ?: boolean;
    completeOnEnd ?: boolean;
    nextChapterId ?: string
}

const VideoPlayer = ({title, playbackId, chapterId, courseId, isLocked, completeOnEnd, nextChapterId}: Props) => {
    
    const [isReady, setIsReady] = useState<boolean>(false)

    console.log(isReady)
    
    return (
        <div className='relative aspect-video'>
            {
                !isReady  &&  <div
                className='absolute inset-0 flex items-center justify-center bg-slate-800'>
                    <Loader2
                        className='w-8 h-8 animate-spin text-secondary'
                    />
                </div>
            }
            <MuxPlayer
                title={title}
                playbackId={playbackId}
                className={`${!isReady && 'hidden'}`}
                autoPlay
                onCanPlay={()=>setIsReady(true)}
            />
        </div>
    )
}

export default VideoPlayer
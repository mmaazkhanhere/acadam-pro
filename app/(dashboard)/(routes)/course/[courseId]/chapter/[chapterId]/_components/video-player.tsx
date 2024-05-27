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
    
    return (
        <div className='relative aspect-video'>

            <MuxPlayer
                title={title}
                playbackId={playbackId}
                autoPlay
            />
        </div>
    )
}

export default VideoPlayer
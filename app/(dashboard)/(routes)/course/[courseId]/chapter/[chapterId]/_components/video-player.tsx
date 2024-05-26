"use client"

import { useToast } from '@/components/ui/use-toast';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import MuxPlayer from '@mux/mux-player-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type Props = {
    chapterId: string;
    courseId:string;
    playbackId: string;
    nextChapterId: string;
    isLocked: boolean;
    completeOnEnd: boolean;
    title: string
}

const VideoPlayer = ({chapterId, courseId, playbackId, nextChapterId, isLocked, completeOnEnd, title}: Props) => {

    const [isReady, setIsReady] = useState<boolean>(false);

    const confetti = useConfettiStore();
    const {toast} = useToast();
    const router = useRouter();

    const onEnd = async()=>{
        try {
            if(completeOnEnd){
                await axios.post(`/api/course/${courseId}/chapters/${chapterId}/progress`,{
                    isCompleted: true,
                });
            };

            if(!nextChapterId){
                confetti.onOpen();
            };
            toast({
                title:'Progress updated'
            });
            router.refresh();
        } catch (error) {
            router.push(`/course/${courseId}/chapters/${nextChapterId}`);
        }
    }

    return (
        <div
        className='relative aspect-video w-full'
        >
            {
                !isLocked && (
                    <MuxPlayer
                        title={title}
                        className=''
                        onEnded={onEnd}
                        autoPlay
                        playbackId={playbackId}
                    />
                )
            }
        </div>
    )
    }

export default VideoPlayer
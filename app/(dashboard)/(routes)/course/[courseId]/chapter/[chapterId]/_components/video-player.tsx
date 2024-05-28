"use client";

import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

type Props = {
  playbackId?: string;
  title: string;
  chapterId: string;
  courseId: string;
  isLocked?: boolean;
  completeOnEnd?: boolean;
  nextChapterId?: string;
};

const VideoPlayer = ({
  title,
  playbackId,
  chapterId,
  courseId,
  isLocked,
  completeOnEnd,
  nextChapterId,
}: Props) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div
          className="absolute inset-0 flex items-center justify-center
                    bg-slate-800"
        >
          <Loader2 className="w-8 h-8 animate-spin text-secondary" />
        </div>
      )}

      {!isLocked && (
        <MuxPlayer
          title={title}
          playbackId={playbackId}
          autoPlay
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={() => console.log("ended")}
        />
      )}
    </div>
  );
};

export default VideoPlayer;

"use client";

import { Lock, Video } from "lucide-react";

const getYouTubeVideoId = (url?: string | null) => {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }

    if (parsedUrl.hostname.endsWith("youtube.com")) {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v");
      }

      const pathParts = parsedUrl.pathname.split("/");
      if (["embed", "shorts"].includes(pathParts[1])) {
        return pathParts[2] || null;
      }
    }
  } catch {
    return null;
  }

  return null;
};

interface VideoPlayerProps {
  videoUrl?: string | null;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
};

export const VideoPlayer = ({
  videoUrl,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const videoId = getYouTubeVideoId(videoUrl);

  return (
    <div className="relative aspect-video">
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-codeup-ink flex-col gap-y-2 text-white">
          <Lock className="h-8 w-8" />
          <p className="text-sm">
            This chapter is locked
          </p>
        </div>
      )}
      {!isLocked && videoId && (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      {!isLocked && !videoId && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-3 rounded-2xl bg-codeup-soft text-center text-codeup-strong">
          <Video className="h-10 w-10" aria-hidden="true" />
          <p className="text-sm">لا يوجد فيديو لهذا الفصل بعد.</p>
        </div>
      )}
    </div>
  )
}
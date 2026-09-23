"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChapterVideoFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  videoUrl: z.string().url().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(initialData.videoUrl || "");

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("تم تحديث الفصل");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("حدث خطأ ما");
    }
  }

  return (
    <div className="mt-6 border bg-white rounded-2xl p-5 shadow-sm">
      <div className="font-medium flex items-center justify-between">
        فيديو الفصل
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>إلغاء</>
          )}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 ml-2" />
              إضافة فيديو
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 ml-2" />
              تعديل الفيديو
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <iframe
              src={initialData.videoUrl}
              title={initialData.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )
      )}
      {isEditing && (
        <form onSubmit={(event) => {
          event.preventDefault();
          onSubmit({ videoUrl });
        }}>
          <Input
            value={videoUrl}
            onChange={(event) => setVideoUrl(event.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
          />
          <Button type="submit" className="mt-4">
            حفظ الفيديو
          </Button>
          <div className="text-xs text-muted-foreground mt-4">
           الصق رابط YouTube لفيديو هذا الفصل
          </div>
        </form>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          الصق رابط YouTube آخر عبر اختيار تعديل الفيديو.
        </div>
      )}
    </div>
  )
}
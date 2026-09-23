import Image from "next/image";
import Link from "next/link";
import { BookOpen, ImageOff } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";

interface CourseCardProps {
  id: string;
  title?: string | null;
  imageUrl?: string | null;
  chaptersLength?: number | null;
  price?: number | null;
  progress?: number | null;
  category?: string | null;
};

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category
}: CourseCardProps) => {
  const safeTitle = title || "دورة بدون عنوان";
  const safeChaptersLength = chaptersLength ?? 0;

  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-codeup transition overflow-hidden border border-codeup-canvas/60 rounded-2xl p-3 h-full bg-codeup-surface shadow-codeup-sm">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
          {imageUrl ? (
            <Image
              fill
              className="object-cover"
              alt={safeTitle}
              src={imageUrl}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-codeup-soft text-codeup-brand">
              <ImageOff className="h-10 w-10" aria-hidden="true" />
              <span className="sr-only">لا توجد صورة للدورة</span>
            </div>
          )}
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-codeup-brand transition line-clamp-2">
            {safeTitle}
          </div>
          <p className="text-xs text-muted-foreground">
            {category || "تصنيف عام"}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-codeup-muted">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {safeChaptersLength} {safeChaptersLength === 1 ? "فصل" : "فصول"}
              </span>
            </div>
          </div>
          {progress != null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-codeup-ink">
              {price == null ? "مجانًا" : formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
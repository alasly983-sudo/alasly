import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";

const ChapterIdPage = async ({
  params
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const { userId } = auth();
  
  if (!userId) {
    return redirect("/");
  } 

  const {
    chapter,
    course,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/")
  }

  const isFreeCourse = course.price == null || course.price <= 0;
  const hasAccess = !!purchase || isFreeCourse;
  const isLocked = !chapter.isFree && !hasAccess;
  const completeOnEnd = hasAccess && !userProgress?.isCompleted;
  const chapterTitle = chapter.title || "فصل بدون عنوان";

  return ( 
    <div>
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="لقد أكملت هذا الفصل بالفعل."
        />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="يجب شراء هذه الدورة لمشاهدة هذا الفصل."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapterTitle}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            videoUrl={chapter.videoUrl}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">
              {chapterTitle}
            </h2>
            {hasAccess ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price}
                isFree={isFreeCourse}
              />
            )}
          </div>
          <Separator />
          <div>
            {chapter.description ? (
              <Preview value={chapter.description} />
            ) : (
              <p className="p-4 text-sm text-codeup-muted">
                لا يوجد وصف لهذا الفصل بعد.
              </p>
            )}
          </div>
          {!!attachments?.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments?.map((attachment) => (
                  <a 
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-codeup-soft border-codeup-brand/20 border text-codeup-strong rounded-xl hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">
                      {attachment.name}
                    </p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
   );
}
 
export default ChapterIdPage;
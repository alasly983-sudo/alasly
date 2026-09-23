import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { BookOpen } from "lucide-react";

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string; }
}) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  });

  if (!course) {
    return redirect("/");
  }

  const firstChapterId = course.chapters?.[0]?.id;

  if (!firstChapterId) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-6">
        <div className="flex max-w-md flex-col items-center rounded-2xl border bg-codeup-surface p-10 text-center shadow-codeup-sm">
          <div className="mb-4 rounded-full bg-codeup-soft p-4 text-codeup-brand">
            <BookOpen className="h-8 w-8" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-semibold text-codeup-ink">
            لا يوجد محتوى في هذه الدورة بعد
          </h1>
          <p className="mt-2 text-sm text-codeup-muted">
            سيظهر محتوى الدورة هنا عند إضافة الفصول.
          </p>
        </div>
      </div>
    );
  }

  return redirect(`/courses/${course.id}/chapters/${firstChapterId}`);
}
 
export default CourseIdPage;
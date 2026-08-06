import { createFileRoute, notFound } from "@tanstack/react-router";
import { CourseDetail } from "@/components/site/CourseDetail";
import { COURSES } from "@/lib/site-data";

export const Route = createFileRoute("/_site/$courseSlug")({
  beforeLoad: ({ params }) => {
    if (!COURSES.some((c) => c.slug === params.courseSlug)) {
      throw notFound();
    }
  },
  component: CoursePage,
});

function CoursePage() {
  const { courseSlug } = Route.useParams();
  return <CourseDetail slug={courseSlug} />;
}

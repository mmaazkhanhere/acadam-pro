import { UserButton } from "@clerk/nextjs";

import { ThemeButton } from "@/components/ui/theme-button";
import CourseMobileSidebar from "./course-mobile-sidebar";

import { Chapter, Course, UserProgress } from "@prisma/client";

type Props = {
	course: Course & {
		chapters: (Chapter & {
			userProgress: UserProgress[] | null;
		})[];
	};
	enrollmentStatus: boolean;
};

const CourseNavbar = ({ course, enrollmentStatus }: Props) => {
	return (
		<div className="p-4 h-full flex items-center justify-between shadow-sm bg-white dark:bg-black dark:border-b-2">
			<div className="flex items-center gap-x-4">
				<div className="md:hidden">
					<CourseMobileSidebar
						enrollmentStatus={enrollmentStatus}
						course={course}
					/>
				</div>
			</div>

			<div className="flex items-center gap-x-4">
				<ThemeButton />
				<UserButton />
			</div>
		</div>
	);
};

export default CourseNavbar;

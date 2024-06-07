import { Category, Course, Review, Subscription, User } from "@prisma/client";
import CourseCard from "./course-card";

type CourseWithProgressWithCategory = Course & {
	category: Category | null;
	chapters: { id: string }[];
	reviews: Review[] | null;
	teacher: User;
	progress: number | null;
	studentEnrolled: User[];
};

type Props = {
	courses: CourseWithProgressWithCategory[];
	subscription: Subscription;
};

const CourseList = ({ courses, subscription }: Props) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{courses.map((course) => (
				<CourseCard
					key={course.id}
					course={course}
					subscription={subscription}
				/>
			))}
		</div>
	);
};

export default CourseList;

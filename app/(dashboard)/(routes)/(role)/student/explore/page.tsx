import { redirect } from "next/navigation";
import CategoryList from "./_components/category-list";
import SearchInput from "./_components/search-input";
import CourseList from "./_components/course-list";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { getAllCourses } from "@/actions/getAllCourses";
import { isAdmin, isTeacher } from "@/helpers/userCheck";

type Props = {
	searchParams: {
		title: string;
		categoryLabel: string;
	};
};

const Explore = async ({ searchParams }: Props) => {
	const { userId } = auth();

	const teacher = await isTeacher(userId as string);
	const admin = await isAdmin(userId as string);

	if (!userId || teacher || admin) {
		redirect("/");
	}

	const categories = await prismadb.category.findMany({
		orderBy: {
			name: "asc",
		},
	});

	const subscription = await prismadb.subscription.findUnique({
		where: {
			userId,
		},
	});

	const courses = await getAllCourses({ userId, ...searchParams });

	return (
		<div className="p-4">
			<SearchInput />

			<div className="space-y-5">
				<CategoryList categories={categories} />

				<CourseList courses={courses} subscription={subscription!} />
			</div>
		</div>
	);
};

export default Explore;

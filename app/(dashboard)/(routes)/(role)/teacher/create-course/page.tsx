import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import CourseCreationForm from "./_component/course-creation-form";

import { isAdmin, isTeacher } from "@/helpers/userCheck";

import prismadb from "@/lib/prismadb";

type Props = {};

const CourseCreation = async (props: Props) => {
	const { userId } = auth();

	const teacher = await isTeacher(userId!);
	const admin = await isAdmin(userId!);

	const categories = await prismadb.category.findMany({
		orderBy: {
			name: "asc",
		},
	});

	if (!userId || (!admin && !teacher)) {
		redirect("/");
	}

	return (
		<section className="flex flex-col items-start p-4">
			<h1 className="text-2xl font-bold">Create your course</h1>
			<p className="text-gray-500 dark:text-muted-foreground italic text-sm">
				Please fill the following fields to create a course. The values
				can be changed later on
			</p>

			<CourseCreationForm categories={categories} admin={admin} />
		</section>
	);
};

export default CourseCreation;

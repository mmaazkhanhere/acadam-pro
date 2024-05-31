import React from "react";
import { DataTable } from "./data-table";
import { getEnrolledCourses } from "@/actions/getEnrolledCourses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { columns } from "./columns";

type Props = {};

const EnrolledCourseTable = async (props: Props) => {
	const { userId } = auth();

	if (!userId) {
		redirect("/");
	}

	const courses = await getEnrolledCourses({ userId });

	return (
		<div className="flex flex-col items-start gap-y-5 mt-20">
			<h1 className="text-2xl md:text-3xl font-bold">My Courses</h1>
			<div className="mt-2 w-full">
				<DataTable columns={columns} data={courses} />
			</div>
		</div>
	);
};

export default EnrolledCourseTable;

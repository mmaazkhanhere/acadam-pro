import { getAnalytics } from "@/actions/getAnalytics";
import { isAdmin, isTeacher } from "@/helpers/userCheck";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Chart from "./_components/chart";

type Props = {};

const AnalyticsPage = async (props: Props) => {
	const { userId } = auth();
	const teacher = await isTeacher(userId as string);
	const admin = await isAdmin(userId as string);

	if (!userId || (!admin && !teacher)) {
		redirect("/");
	}

	const { data } = await getAnalytics(userId as string);

	return (
		<div className="p-4">
			<Chart data={data} />
		</div>
	);
};

export default AnalyticsPage;

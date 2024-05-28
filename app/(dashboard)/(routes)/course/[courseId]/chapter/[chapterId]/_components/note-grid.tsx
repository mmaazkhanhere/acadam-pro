import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

type Props = {
	chapterId: string;
};

const NoteGrid = async ({ chapterId }: Props) => {
	const { userId } = auth();

	if (!userId) {
		redirect("/");
	}

	const notes = await prismadb.notes.findMany({
		where: {
			authorId: userId,
			chapterId,
		},
	});

	if (notes.length === 0) {
		return <div className="text-gray-500 text-sm">No notes created</div>;
	}

	return <div>Hello</div>;
};

export default NoteGrid;

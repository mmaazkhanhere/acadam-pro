"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import CourseProgress from "@/components/course-progress";

import { Course, Review, User } from "@prisma/client";

import { ArrowRight, ArrowUpDown } from "lucide-react";

type CourseWithProgress = Course & {
	chapters: { id: string }[];
	reviews: Review[] | null;
	teacher: User;
	progress: number | null;
};

export const columns: ColumnDef<CourseWithProgress>[] = [
	{
		accessorKey: "title",
		header: ({ column }) => (
			<Button
				aria-label="Title column button"
				variant="ghost"
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}
			>
				Title
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
	},

	{
		accessorKey: "categoryLabel",
		header: ({ column }) => (
			<Button
				aria-label="Category column button"
				variant="ghost"
				className="hidden lg:block"
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}
			>
				Category
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			const categoryLabel = row.getValue<string>("categoryLabel");
			return (
				<p
					className="px-4 py-1.5 rounded-2xl bg-purple-200 hover:bg-purple-300 text-center
                dark:bg-purple-500 hidden lg:block"
				>
					{categoryLabel}
				</p>
			);
		},
	},

	{
		accessorKey: "teacher",
		header: ({ column }) => (
			<Button
				aria-label="Creator column button"
				variant="ghost"
				className="hidden md:block"
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}
			>
				Creator
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			const creator = row.getValue<User>("teacher");
			return <p className="hidden md:block">{creator.name}</p>;
		},
	},

	{
		accessorKey: "progress",
		header: ({ column }) => (
			<Button
				aria-label="course progress column button"
				variant="ghost"
				className="hidden lg:block"
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}
			>
				Completed
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			const progress = row.getValue<number>("progress");
			return (
				<div className="hidden lg:block">
					<CourseProgress value={progress} size="sm" />
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const { id } = row.original;
			return (
				<Link href={`/course/${id}`}>
					<Button
						aria-label="Course link button"
						variant="ghost"
						className="dark:bg-muted"
						size="sm"
					>
						Course
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</Link>
			);
		},
	},
];

"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import CourseProgress from "@/components/course-progress";

import { Course, Review, User } from "@prisma/client"

import { ArrowRight, ArrowUpDown, } from "lucide-react"



type CourseWithProgress = Course & {
    chapters: { id: string }[];
    reviews: Review[];
    teacher: User;
    progress: number;
}


export const columns: ColumnDef<CourseWithProgress>[] = [

    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },

    {
        accessorKey: 'categoryLabel',
        header: ({ column }) => {

            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const categoryLabel = row.getValue('categoryLabel');

            return <p className="px-4 py-1.5 rounded-2xl bg-purple-200 hover:bg-purple-300 text-center">
                {categoryLabel as string}
            </p>
        }
    },

    {
        accessorKey: 'teacher',
        header: ({ column }) => {

            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Creator
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const creator = row.getValue('teacher') as User;

            return <p>
                {creator.name}
            </p>
        }
    },

    {
        accessorKey: "progress",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Completed
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {

            const progress = parseFloat(row.getValue("progress") || "0");

            return (
                <div>
                    <CourseProgress
                        value={progress}
                        size="sm"
                    />
                </div>
            )
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {

            const { id } = row.original;

            return (
                <Link
                    href={`/course/${id}`}
                >
                    <Button
                        variant='ghost'
                    >
                        Course
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>

            )
        }
    }
]
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
                    href={`/teacher/courses/${id}`}
                >
                    <Button
                        variant='ghost'
                    >
                        Edit
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>

            )
        }
    }
]
"use client"

import Link from "next/link"
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import RatingOverview from "./rating-overview"

import { cn } from "@/lib/utils"

import { Course, Review } from "@prisma/client"

import { ArrowRight, ArrowUpDown, } from "lucide-react"



export const columns: ColumnDef<Course & { reviews: Review[] }>[] = [
    {
        accessorKey: 'isPublished',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const isPublished = row.getValue('isPublished') || false;

            return (
                <div
                    className={cn(
                        'text-red-500 p-1 border border-red-500 rounded-xl text-xs flex items-center justify-center',
                        isPublished && 'text-green-500 p-1 border border-green-500'
                    )}>
                    {
                        isPublished ? 'Published' : 'Unpublished'
                    }
                </div>
            )
        }
    },

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
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price") || "0");
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price);

            return (
                <div>
                    {formatted}
                </div>
            )
        }
    },
    {
        accessorKey: 'reviews',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Ratings
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const reviews = row.getValue<Review[]>('reviews');

            const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = reviews.length > 0 ? totalRatings / reviews.length : 0;

            return (
                <div>
                    <RatingOverview
                        totalRatings={totalRatings}
                        averageRatings={averageRating}
                    />
                </div>
            );
        }
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => {

            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Date Created
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const timeCalculated = format(row.getValue('createdAt'), 'MM/dd/yyyy');

            return <p>{timeCalculated}</p>
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
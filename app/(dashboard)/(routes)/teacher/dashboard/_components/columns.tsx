"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowRight, ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Course, Review } from "@prisma/client"
import { Button } from "@/components/ui/button"
import RatingOverview from "./rating-overview"
import Link from "next/link"

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
                <Badge
                    className={cn(
                        'text-red-500 p-1 border border-red-500',
                        isPublished && 'text-green-500 p-1 border border-green-500'
                    )}>
                    {
                        isPublished ? 'Published' : 'Unpublished'
                    }
                </Badge>
            )
        }
    },
    {
        accessorKey: 'title',
        header: ({ column }) => {
            <Button
                variant='ghost'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Title
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        }
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
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {

            const { id } = row.original;

            return (
                <Link
                    href={`/teacher/course/${id}`}
                >
                    <Button
                        variant='ghost'
                    >
                        Link
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>

            )
        }
    }
]
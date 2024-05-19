"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Course, Review } from "@prisma/client"
import { Button } from "@/components/ui/button"

export const columns: ColumnDef<Course & Review>[] = [
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
        accessorKey: 'rating',
        header: ({ column }) => {
            <Button
                variant='ghost'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        }
    },
]
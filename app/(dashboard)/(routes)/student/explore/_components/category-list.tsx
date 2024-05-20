import React from 'react'

import prismadb from '@/lib/prismadb'

import { Category } from '@prisma/client';
import { Briefcase, HandHeart, HardHat, HeartPulse, Languages, LucideIcon, Monitor, Palette } from 'lucide-react';
import CategoryItem from './category-item';

type Props = {}

const CategoryList = async (props: Props) => {

    const categories = await prismadb.category.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    const iconMap: Record<Category['name'], LucideIcon> = {
        "Arts": Palette,
        "Business": Briefcase,
        "Computer Science": Monitor,
        "Engineering": HardHat,
        "Health and Science": HeartPulse,
        "Language Learning": Languages,
        "Social Science": HandHeart,
    }

    return (
        <div className='flex items-center gap-4 flex-wrap pb-2'>
            {
                categories.map((category) => (
                    <CategoryItem
                        key={category.id}
                        label={category.name}
                        icon={iconMap[category.name]}
                        value={category.name}
                    />
                ))
            }
        </div>
    )
}

export default CategoryList
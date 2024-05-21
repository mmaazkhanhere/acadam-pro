"use client"

import CategoryItem from './category-item';

import { Category } from '@prisma/client';


import {
    Briefcase,
    HandHeart,
    HardHat,
    HeartPulse,
    Languages,
    LucideIcon,
    Monitor,
    Palette
} from 'lucide-react';


type Props = {
    categories: Category[],
}

const CategoryList = ({ categories }: Props) => {



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
        <div className='flex items-center gap-2 flex-wrap pb-2 mt-5'>
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
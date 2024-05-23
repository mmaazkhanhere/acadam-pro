
import React from 'react';

import { cn } from '@/lib/utils';

type CircularProgressProps = {
    totalCourses: number;
    coursesCompleted: number;
};

const CircularProgress: React.FC<CircularProgressProps> = ({ totalCourses, coursesCompleted }) => {

    const percentage = totalCourses > 0 ? (coursesCompleted / totalCourses) * 100 : 0;

    return (
        <div className="relative flex items-center justify-center">
            <svg className="w-24 h-24">
                <circle
                    className="text-gray-200"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50%"
                    cy="50%"
                />
                <circle
                    className={cn(
                        "text-purple-500",
                        Math.round(percentage) === 100 && 'text-green-500'
                    )}
                    strokeWidth="4"
                    strokeDasharray="251.2"
                    strokeDashoffset={`${251.2 - (251.2 * percentage) / 100}`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50%"
                    cy="50%"
                />
            </svg>
            <span
                className={cn(
                    "absolute text-lg md:text-xl font-semibold text-gray-700",
                    Math.round(percentage) === 100 && 'text-green-500'
                )}
            >
                {`${Math.round(percentage)}%`}
            </span>
        </div>
    );
};

export default CircularProgress;

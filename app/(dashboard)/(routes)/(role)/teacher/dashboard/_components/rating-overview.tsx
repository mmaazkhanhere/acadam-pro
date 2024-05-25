import { Star } from 'lucide-react';

type Props = {
    totalRatings: number;
    averageRatings: number;
};

const RatingOverview = ({ totalRatings, averageRatings }: Props) => {

    const getStarFill = (starIndex: number) => {
        if (averageRatings >= starIndex + 1) {
            return '100%';
        } else if (averageRatings > starIndex) {
            return `${(averageRatings % 1) * 100}%`;
        } else {
            return '0%';
        }
    };

    if (totalRatings === 0) {
        return <span className="text-gray-400 text-sm">No ratings</span>;
    }

    return (
        <div className="flex items-center">
            {
                [0, 1, 2, 3, 4].map((starIndex) => (
                    <div key={starIndex} className="relative">
                        <Star className="text-gray-400 fill-gray-300 w-4 h-4 outline-none" />
                        <div
                            className="absolute top-0 left-0 overflow-hidden"
                            style={{ width: getStarFill(starIndex) }}
                        >
                            <Star className="text-yellow-500 fill-yellow-400 w-4 h-4" />
                        </div>
                    </div>
                ))}
            <span className="ml-2 text-sm font-semibold">
                {averageRatings.toFixed(1)}
            </span>
        </div>
    );
};

export default RatingOverview;

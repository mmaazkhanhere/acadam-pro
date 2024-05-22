"use client"

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from "query-string"

import { Input } from '@/components/ui/input';

import { useDebounce } from '@/hooks/use-debounce';

import { Search } from 'lucide-react';



type Props = {}

const SearchInput = (props: Props) => {

    const [inputValue, setInputValue] = useState<string>('');

    const debouncedValue = useDebounce(inputValue)

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const currentCategoryLabel = searchParams.get('categoryLabel');

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryLabel: currentCategoryLabel,
                title: debouncedValue,
            }
        }, {
            skipEmptyString: true,
            skipNull: true
        })

        router.push(url);
    }, [currentCategoryLabel, debouncedValue, pathname, router])

    return (
        <div
            className='relative'
        >
            <Search
                className='h-4 w-4 absolute top-3 left-3 text-slate-600'
            />
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className='w-full md:w-[300px] pl-9 rounded-full bg-slate-100 
                focus-visible:ring-slate-200'
                placeholder='Search for a course'
            />
        </div>
    )
}

export default SearchInput
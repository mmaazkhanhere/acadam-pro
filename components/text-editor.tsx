"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"

import 'react-quill/dist/quill.snow.css'

type Props = {
    value: string;
    onChange: (value: string) => void;
}

const TextEditor = ({ value, onChange }: Props) => {

    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), [])

    return (
        <div className="w-full">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
            />
        </div>

    )
}

export default TextEditor
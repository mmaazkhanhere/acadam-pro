"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css";

type Props = {
	value: string;
	onChange: (value: string) => void;
	className?: string;
};

const TextEditor = ({ value, onChange, className }: Props) => {
	const ReactQuill = useMemo(
		() => dynamic(() => import("react-quill"), { ssr: false }),
		[]
	);

	return (
		<div
			className={`max-w-[350px] md:max-w-[450px] w-full ${className} dark:text-white`}
		>
			<ReactQuill
				className="dark:text-white"
				theme="snow"
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default TextEditor;

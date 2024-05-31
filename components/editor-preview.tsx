"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css";

type Props = {
	value: string;
};

const EditorPreview = ({ value }: Props) => {
	const ReactQuill = useMemo(
		() => dynamic(() => import("react-quill"), { ssr: false }),
		[]
	);

	return (
		<div>
			<ReactQuill
				theme="bubble"
				value={value}
				readOnly
				className="dark:text-black"
			/>
		</div>
	);
};

export default EditorPreview;

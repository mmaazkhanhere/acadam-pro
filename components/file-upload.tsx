"use client"

import { UploadDropzone } from "@/lib/uploadthing"
import { OurFileRouter, ourFileRouter } from "@/app/api/uploadthing/core"
import { useToast } from "./ui/use-toast";

type Props = {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter
}

const FileUpload = ({ onChange, endpoint }: Props) => {

    const { toast } = useToast();

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)
            }}
            onUploadError={(error: Error) => {
                toast({
                    title: `${error?.message}`,
                    variant: 'destructive'
                })
            }}
        />
    )
}

export default FileUpload

import { IconType } from "react-icons"
import { Button } from "./ui/button";

type Props = {
    icon: IconType;
    onClick: () => void;
    label: string
}

const AuthSocialButton = ({ icon: Icon, onClick, label }: Props) => {
    return (
        <Button
            type="button"
            onClick={onClick}
            className="flex justify-center gap-x-2 border-black text-xs"
            variant='outline'
        >
            <Icon className="w-4 h-4" />
            {label}
        </Button>
    )
}

export default AuthSocialButton

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

type Props = {
    label?: string
}

const SignOutButton = ({ label }: Props) => {

    const onClick = async () => {

        await signOut();
    }

    return (
        <button
            onClick={onClick}
            className='space-x-2 flex gap-x-4 text-sm items-center'
        >
            <LogOut className='w-5 lg:w-6 h-5 lg:h-6' />
            {label}
        </button>
    )
}

export default SignOutButton
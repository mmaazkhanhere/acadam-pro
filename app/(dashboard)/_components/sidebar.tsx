import Logo from "@/components/logo"

type Props = {}

const Sidebar = (props: Props) => {
    return (
        <div className="flex flex-col items-center p-4">
            <Logo />
        </div>
    )
}

export default Sidebar
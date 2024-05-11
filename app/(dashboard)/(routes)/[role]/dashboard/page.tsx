import { isAdmin } from "@/helpers/isAdmin";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";


type Props = {}

const Dashboard = (props: Props) => {

    const { userId } = auth();

    const admin = isAdmin(userId!);

    if (!admin) {
        redirect('/user')
    }

    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard
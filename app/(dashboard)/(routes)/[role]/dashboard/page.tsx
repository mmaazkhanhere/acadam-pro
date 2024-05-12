import { isTeacher } from "@/helpers/isAdmin";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";


type Props = {}

const Dashboard = async (props: Props) => {

    const { userId } = auth();

    const teacher = await isTeacher(userId!);

    if (!teacher) {
        redirect('/user')
    }

    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard
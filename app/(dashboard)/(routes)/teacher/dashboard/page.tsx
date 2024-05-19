
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server"

import WelcomeBanner from "./_components/welcome-banner";

import { isTeacher } from "@/helpers/isAdmin";
import prismadb from '@/lib/prismadb'
import Metrics from "./_components/metrics";


type Props = {}

const Dashboard = async (props: Props) => {

    const { userId } = auth();

    const teacher = await isTeacher(userId);

    const user = await prismadb.user.findUnique({
        where: {
            id: userId
        },
        include: {
            coursesTeaching: {
                include: {
                    studentsEnrolled: true
                }
            },
            purchases: true,
            subscriptions: true
        }
    })


    if (!teacher && user?.userType === 'Student') {
        redirect('/')
    }

    return (
        <div>
            <WelcomeBanner
                name={user?.name}
            />

            <Metrics
                user={user}
            />
        </div>
    )
}

export default Dashboard
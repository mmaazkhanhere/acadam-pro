

type Props = {
    label: string;
    id: string;
    isCompleted: boolean;
    courseId: string;
    isLocked: boolean
}

const CourseSidebarItem = ({ label, id, isCompleted, courseId, isLocked }: Props) => {
    return (
        <div>
            {label}
        </div>
    )
}

export default CourseSidebarItem
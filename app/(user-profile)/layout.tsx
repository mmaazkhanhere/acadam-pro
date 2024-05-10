import React from "react"
import Navbar from "./_component/navbar"


type Props = {
    children: React.ReactNode
}

const UserLayout = ({ children }: Props) => {
    return (
        <main className="max-w-[1400px] mx-auto">
            <Navbar />
            {children}
        </main>
    )
}

export default UserLayout
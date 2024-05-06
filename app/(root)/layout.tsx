import Footer from "./_components/footer"
import Navbar from "./_components/navbar"

type Props = {
    children: React.ReactNode
}

const RootLayout = ({ children }: Props) => {
    return (
        <main className="max-w-[1400px] mx-auto p-4" >
            <Navbar />
            {children}
            <Footer />
        </main>
    )
}

export default RootLayout
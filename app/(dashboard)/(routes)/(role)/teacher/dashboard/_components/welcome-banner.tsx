
type Props = {
    name: string
}

const WelcomeBanner = ({ name }: Props) => {
    return (
        <section
            style={{
                backgroundImage: 'url("/welcome-banner.jpg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}
            className="p-4 w-full h-[70px] md:h-[80px] flex flex-col items-start justify-center
            rounded-xl"
        >
            <p className="text-lg md:text-xl text-white font-bold">
                Welcome Back, {name}
            </p>

            <p className="text-xs text-gray-300">
                See what happened with your courses and students
            </p>
        </section>
    )
}

export default WelcomeBanner
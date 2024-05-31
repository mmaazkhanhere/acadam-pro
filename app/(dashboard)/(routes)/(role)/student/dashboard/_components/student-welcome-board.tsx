type Props = {
	name: string;
};

const StudentWelcomeBoard = ({ name }: Props) => {
	return (
		<section
			style={{
				backgroundImage: 'url("/student-welcome-banner.jpg")',
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
			}}
			className="p-4 w-full h-[80px] md:h-[80px] flex flex-col items-start justify-center
            rounded-xl"
		>
			<p className="text-lg md:text-xl text-white font-bold">
				Welcome Back, {name}
			</p>

			<p className="text-xs text-gray-300">
				Let&apos;s get back to help you grow
			</p>
		</section>
	);
};

export default StudentWelcomeBoard;

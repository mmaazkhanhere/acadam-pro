import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
    return (
        <SignUp
            forceRedirectUrl={'/user'}
        />
    )
}

export default SignUpPage
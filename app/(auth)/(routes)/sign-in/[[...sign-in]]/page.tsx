import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
    return (
        <SignIn
            forceRedirectUrl={'/dashboard'}
            signUpForceRedirectUrl={'/user'}
        />
    )
}

export default SignInPage
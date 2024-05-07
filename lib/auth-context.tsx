/*The AuthContext component you've defined acts as a wrapper for the 
SessionProvider from next-auth/react. This setup is essential to use NextAuth
for authentication and session management*/

"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const AuthContext = ({ children }: Props) => {
    return <SessionProvider>
        {children}
    </SessionProvider>
}

export default AuthContext
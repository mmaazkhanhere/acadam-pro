
import type { NextAuthConfig } from "next-auth"

import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";

import prismadb from './lib/prismadb'
import bcrypt from "bcryptjs";

export default {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing credentials');
                }

                const user = await prismadb.user.findUnique({
                    where: {
                        emailAddress: credentials.email as string
                    }
                })

                if (!user || !user?.hashedPassword) {
                    throw new Error("User doesn't exists");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password as string,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error('Invalid credentials');
                }

                return {
                    ...user,
                    email: user.emailAddress

                }
            }
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            // Ensure the session.user object exists
            session.user = session.user || {};

            // Now that you've ensured session.user exists, you can safely assign email to it
            if (user?.email) {
                session.user.email = user.email;
            }
            return session;
        }
    },
} satisfies NextAuthConfig
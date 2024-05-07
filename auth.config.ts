
import type { NextAuthConfig } from "next-auth"

import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from './lib/prismadb'
import bcrypt from "bcryptjs";

export default {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        emailAddress: credentials.email
                    }
                })

                if (!user || !user?.hashedPassword) {
                    throw new Error("User doesn't exists");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials")
                }

                return user;
            }


        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            session.user = session.user || {};

            if (user?.email) {
                session.user.email = user.email;
            }
            return session;
        }
    }
} satisfies NextAuthConfig
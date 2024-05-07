import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import bcrypt from 'bcryptjs'
import prisma from '@/lib/prismadb'

export const authOptions: AuthOptions = {

    adapter: PrismaAdapter(prisma),
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

                const user = await prisma.user.findUnique({
                    where: {
                        emailAddress: credentials.email
                    }
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error("User doesn't exists");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
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

    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
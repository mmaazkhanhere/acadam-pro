import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prismadb from './lib/prismadb'

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prismadb),
    session: { strategy: 'jwt' },
    ...authConfig,
})
/*This code snippet sets up a global prisma client instance to facilitate database
access throughout your application */

import { PrismaClient } from '@prisma/client'

declare global {
    var prisma: PrismaClient | undefined;
} /*This syntax allows you to extend the global scope in typescript. This declares
a global variable named prisma of type Prisma client or undefined. It is used to
store the Prisma client instance */

export const db = globalThis.prisma || new PrismaClient(); /*initializes
the prisma client. It checks if globalThis.prisma exits. If it does, it uses the
existing client instance. Otherwise it creates a new instance of Prisma client */

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
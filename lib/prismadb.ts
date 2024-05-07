/*The below code is for integrating Prisma ORM for database operations. It 
ensures that the Prisma client is instantiated once and reused across your 
application, particularly important in a serverless environment  */

import { PrismaClient } from "@prisma/client"

declare global {
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client
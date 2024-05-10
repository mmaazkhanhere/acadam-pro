export const isAdmin = (userId: string) => {
    return userId === process.env.NEXT_PUBLIC_ADMIN_ID
}

import React from 'react'

import { auth } from '@clerk/nextjs/server'

import { Button } from '@/components/ui/button'
import { UserAvatar } from '@/components/user-avatar'

import UserNameForm from './user-name-form'

import { isAdmin } from '@/helpers/isAdmin'



type Props = {
    user: {
        name: string,
        userType: string,
        biography: string,
    }
}

const UserDetail = ({ user }: Props) => {

    const { userId } = auth();

    const admin = isAdmin(userId!);

    return (
        <section className='max-w-[1400px] mx-auto flex justify-between items-center mt-32'>

            <div className='flex items-start justify-center gap-x-5'>
                <UserAvatar
                    userPage
                />

                <UserNameForm
                    name={user.name}
                />
            </div>


            {
                admin && <Button variant='outline' className='text-black'>
                    Create Courses
                </Button>
            }

        </section>
    )
}

export default UserDetail
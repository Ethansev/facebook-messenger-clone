'use client';

import useOtherUser from '@/app/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import Link from 'next/link';
import { useMemo } from 'react';
import { HiChevronLeft } from 'react-icons/hi2';

interface HeaderProps {
    conversation: Conversation & {
        users: User[];
    }
}

export default function Header(props: HeaderProps) {
    const { conversation } = props;
    const otherUser = useOtherUser(conversation);

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`;
        }

        return 'Active'; // currently hard-coded but will be dynamic
    }, [conversation]);

    return (
        <div className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'>
            <div className='flex gap-3 items-center'>
                <Link href='/conversations' className='Lg-hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'>
                    <HiChevronLeft size={32}/>
                </Link>
            </div>
        </div>
    )
}
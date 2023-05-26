'use client'

import Image from 'next/image';

import { User } from "@prisma/client";

interface AvatarProps {
    user?: User;
}

export default function Avatar(props: AvatarProps) {
    const { user } = props;

    return (
        <div className='relative'>
            <div className='relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11'>
                <Image alt='Avatar' src={user?.image || '/images/placeholder.png'} fill/>
            </div>
            {/* span is currently hard coded to always be active */}
            <span className='absolute block rounded-full bg-green-500 ring-2 ring-white bottom-0 right-0 h-2 w-2 md:h-3 md:w-3' />
        </div>
    )
}
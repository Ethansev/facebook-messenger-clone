import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

interface IParams { 
    conversationId?: string;
}

export async function POST(request: Request, { params }: {params: IParams}) {
    const { conversationId } = params;
    
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser?.id || !currentUser?.email) return new NextResponse('Unauthorized', { status: 401 })

        // find existing conversation
        if(conversationId == null) return new NextResponse('Invalid Conversation ID' , { status: 400 })
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: +conversationId
            },
            include: {
                messages: {
                    include: {
                        seen: true
                    }
                },
                users: true
            }
        });

        if(!conversation) return new NextResponse('Invalid ID', { status: 400 } );

        const lastMessage = conversation.messages[conversation.messages.length - 1]
        if(!lastMessage) return NextResponse.json(conversation);

        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seen: true
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        })

        return NextResponse.json(updatedMessage);

    } catch (error: any) {
        console.log(error, 'ERROR_MESSAGES_SEEN');
        return new NextResponse('Internal Error', { status: 500 });
    }
}
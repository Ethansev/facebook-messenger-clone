import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from 'next/server';
import prisma from "@/app/libs/prismadb";
import { Conversation } from "@prisma/client";

export async function POST(request: Request) {
    try{
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { userId, isGroup, members, name } = body;

        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if(isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid Data', { status: 400 })
        }

        if(isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value:string }) => {
                                id: member.value
                            }), 
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include: {
                    users: true // populates the users when we fetch the conversation
                }
            });

            return NextResponse.json(newConversation);
        }

        // would've been simpler if I did a raw sql query using ANY() but I wanted to try out prisma :^)
        const existingConversation = await prisma.conversation.findFirst({
            where: {
                OR: [
                    {
                        users: {
                            every: {
                                id: {
                                    in: [currentUser.id, userId] // check if the conversation exists between the two users
                                }
                            }
                        }
                    }
                ]
            }
        });

        const singleConversation = existingConversation;
        if(singleConversation) {
            return NextResponse.json(singleConversation);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true // populates the users when we fetch the conversation from the frontend
            }
        })

        return NextResponse.json(newConversation);
    } catch(error: any) {
        return new NextResponse('Internal Error', { status: 500 })
    }
}
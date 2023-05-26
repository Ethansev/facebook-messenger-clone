import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getConversationById (conversationId: number) {
    console.log("printing the conversation id!!");
    console.log({ conversationId })
    try{
        const currentUser = await getCurrentUser();
        if(!currentUser) return null;

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            }, 
            include: {
                users: true
            }
        });

        return conversation;
        
    } catch(error: any) {
        return null;
    }
}
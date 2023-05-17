import { useParams } from 'next/navigation'; // used to obtain current rout parameters
import { useMemo } from 'react';

export default function useConversation() {
    // basically we are using the current route to obtain the conversationId
    const params = useParams();
    const conversationId = useMemo(() => {
        if(!params?.conversationId) {
            return '';
        }

        return params.conversationId as string;
    }, [params?.conversationId]);

    const isOpen = useMemo(() => !!conversationId, [conversationId]); // the !! is to convert the value to boolean

    return useMemo(() => ({
        isOpen,
        conversationId
    }), [isOpen, conversationId]);
}
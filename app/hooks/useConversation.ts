import { useParams } from 'next/navigation'; // used to obtain current route parameters
import { useMemo } from 'react';

export default function useConversation() {
    // retrieving the conversationId from the current route
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
import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";

interface IParams {
    conversationId: number;
}


export default async function ConversationIdPage(props: IParams) {
    const { conversationId } = props;
    const conversation = await getConversationById(conversationId);
    const messages = await getMessages(conversationId);
    console.log("printing conversation variable" + {conversation});

    // if(!conversation) {
    //     return (
    //         <div className='lg:pl-80 h-full'>
    //             <div className='h-full flex flex-col'>
    //                 <EmptyState />
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div className='lg:pl-80 h-full'>
            <div className='h-full flex flex-col'>
                <Header conversation={conversation} />
            </div>
        </div>
    )
}
import Topbar from '@/components/Topbar';
import { useChatStore } from '@/stores/useChatStore';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import UsersList from './components/UsersList';
import ChatHeader from './components/ChatHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import MessageInput from './components/MessageInput';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

// for the real time of message
const formatTime = (date : string ) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const ChatPage = () => {
  const { user } = useUser();
  const { messages, selectedUser, fetchUsers, fetchMessages, deleteMessage} = useChatStore();

  useEffect( () => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  useEffect(() => {
    if(selectedUser) fetchMessages(selectedUser.clerkId); 
  },[ selectedUser, fetchMessages]);

  return (
    <main className='h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden'>
      {/* Topbar */}
      <Topbar />

      {/* chat main section */}
      <div className='grid grid-cols-[80px_1fr] lg:grid-cols-[280px_1fr] h-[calc(100vh-180px)]'>
        {/* user name list */}
        <UsersList />

        {/* Chat message */}
        <div className='flex flex-col h-full'>
          {selectedUser ? (
            <>
              {/* chat header component */}
              <ChatHeader />

              {/* messages */}
              <ScrollArea className="h-[calc(100vh-340px)]">
                <div className='p-4 space-y-4'>
                  {messages.map((message) => (
                    <div key={message._id}
                      className={`flex items-start gap-3 group ${message.senderId === user?.id ? "flex-row-reverse" : ""} `}
                    >
                      <Avatar className='size-7'>
                        <AvatarImage 
                          src={
                            message.senderId === user?.id
                            ? user.imageUrl
                            : selectedUser.imageUrl  //if i messaged then my profile image appears and vice versa
                          }
                        />
                      </Avatar>
                      {/* If i messaged then green otherwise zinc  */}
                      <div className={`rounded-lg p-3 max-w-[70%]
                        ${message.senderId === (user?.id) ? "bg-green-500" : "bg-zinc-500"}   
                      `}>
                          <p className='text-sm'>{message.content}</p>
                          {/* time stamp and delete icon */}
                          <div className='flex items-center gap-2'>
                            <span className='text-xs text-zinc-300 mt-1 block'>{formatTime(message.createdAt)}</span>

                            {/* message deletetion */}
                            {message.senderId === user?.id && (
                              <button
                                onClick={() => deleteMessage(message._id, selectedUser.clerkId, user?.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-200 hover:text-red-400"
                                title='Delete message'
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                          
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* message input section */}
              <MessageInput />
            </>
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </main>
  )
}

export default ChatPage;

const NoConversationPlaceholder = () => (
	<div className='flex flex-col items-center justify-center h-full space-y-6'>
		<img src='/waveform.png' alt='Waveform' className='size-16 animate-bounce' />
		<div className='text-center'>
			<h3 className='text-zinc-300 text-lg font-medium mb-1'>No conversation selected</h3>
			<p className='text-zinc-500 text-sm'>Choose a friend to start chatting</p>
		</div>
	</div>
);
"use client";

import { useState, useEffect, useRef } from "react";
import { useSocket } from "../hooks/useSocket";
import { SideBar } from "./SideBar";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";

export function ChatRoomClient({
    messages,
    id
}: {
    messages: {message: string}[];
    id: string
}) {
    
    const [chats, setChats] = useState(messages);
    let userCount = useRef<number>(0);

    const { socket, loading } = useSocket();

    useEffect(() => {
        if(socket && !loading) {
            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id
            }))

            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                if(parsedData.type === 'chat') {
                    setChats((c: {message: string}[]) => [...c, {message: parsedData.message}])
                }
            }
        }
    }, [socket, loading, id])

    return(
       <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="flex h-screen w-screen">
                {/* navigation */}
                <SideBar />
                <div className="flex-1">
                    <div className="h-screen flex flex-col">
                         {/* Header */}
                        <ChatHeader />
                        {/* Messages */}
                        <div className="flex flex-1 overflow-hidden">
                            <div className="flex-1 flex flex-col">
                                {/* Incoming messages */}
                                <MessageList chats={messages}/>
                                {/* Message Input box and send button */}
                                {socket && <MessageInput id={id} setChats={setChats} socket={socket}/>}
                            </div>
                        </div>
                      
                    </div>
                </div>
            </div>
       </div>
    )
}


/**
 *   <div className="w-screen h-screen bg-black text-white flex justify-center items-center flex-col">
            <div>
                <div className="space-x-2 max-w-md border p-4">
                    {chats.map((chat, index) => (<div key={index}>{chat.message}</div>))}

                    <input 
                        type="text"
                        placeholder="Enter message"
                        className="p-1 border w-full m-2"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                    />
                    <div className="text-center">
                        <button
                            className="p-2 bg-black text-white cursor-pointer border text-center"
                            onClick={() => {
                                socket?.send(JSON.stringify({
                                    type: "chat",
                                    roomId: id,
                                    message: currentMessage
                                }))

                                setCurrentMessage("");
                            }}
                        >
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
 * 
 */
"use client";

import { useState, useEffect, useRef } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
    messages,
    id
}: {
    messages: {message: string}[];
    id: string
}) {
    const [chats, setChats] = useState(messages);
    const [currentMessage, setCurrentMessage] = useState("");
    const { socket, loading } = useSocket();
    let userCount = useRef<number>(0);

    useEffect(() => {
        if(socket && !loading) {
            userCount.current++;
            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id
            }))

            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                if(parsedData.type === 'chat') {
                    setChats(c => [...c, {message: parsedData.message}])
                }
            }
        }
    }, [socket, loading, id])

    return(
       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="flex h-screen w-screen">
                {/* navigation */}
                <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen">
                    {/* Logo and leave room button */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lucide lucide-message-circle w-8 h-8 text-blue-600 size-6 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                                </svg>
                                <h1 className="text-xl font-bold text-gray-900">ChatFlow</h1>
                            </div>
                           <button 
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-all"
                                title="Leave all rooms"
                           >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                </svg>
                           </button>
                        </div>
                        {/* User name */}
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>roochas</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h2
                                    className="text-sm font-semibold text-gray-700 uppercase tracking-wide"
                                >
                                    Rooms(1)
                                </h2>
                                <button 
                                    className="p-1.5 text-sm cursor-pointer text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                                    title="Join new room"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lucid lucid-plus w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-1">
                                <button className="w-full text-left p-3 rounded-lg cursor-pointer transition-all bg-blue-100 border-l-4 border-blue-600">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lucid lucid-hash w-4 h-4 text-gray-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
                                            </svg>
                                            <span className="font-medium text-blue-900">VVFU2K</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lucid lucid-users w-3 h-3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                                </svg>
                                                <span>{userCount.current}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs truncate text-blue-700">roochas: hi</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 m-4 border-t border-gray-200">
                        <button className="w-full flex justify-center items-center cursor-pointer rounded-lg space-x-2 py-2.5 px-4 text-white bg-blue-600 hover:bg-blue-700 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lucid lucid-plus w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14 M12 5v14" />
                            </svg>
                            <span>Join New Room</span>      
                        </button>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="h-screen flex flex-col">
                         {/* Header */}
                        <header className="bg-white border-b border-gray-200 px-4 py-3">
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    {/* Room name */}
                                    <div className="flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lucid lucid-hash w-5 h-5 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
                                        </svg>
                                        <span className="text-lg font-semibold text-gray-900">VVFU2K</span>
                                        <button 
                                            className="p-1 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                                            title="Copy room name"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lucid lucid-copy w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
                                            </svg>
                                        </button>
                                    </div>
                                    {/* No. of people joined */}
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center space-x-1 cursor-pointer px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lucid lucid-users w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                            </svg>
                                            <span>{userCount.current}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        {/* Messages */}
                        <div className="flex flex-1 overflow-hidden">
                            <div className="flex-1 flex flex-col">
                                {/* Incoming messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {chats.map((chat, index) => (
                                        <div key={index} className="flex justify-end">
                                            <div className="flex flex-row-reverse items-end space-x-2 max-w-xs sm:max-w-md">
                                                <div className="flex justify-center items-center text-white text-sm font-medium bg-teal-500 w-8 h-8 rounded-full ml-2">
                                                    R
                                                </div>
                                                <div>
                                                    <div className="bg-blue-600 rounded-2xl text-white px-4 py-2 rounded-br-md">
                                                        <p className="break-words">{chat.message}</p>
                                                    </div>
                                                    <p className="text-xs text-gray-400 mt-1 text-right mr-1">
                                                        Aug 29, 21:57 PM
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Message Input box and send button */}
                                <div className="m-4 border-t border-gray-200 p-4">
                                    <form className="flex space-x-2">
                                        <input 
                                            type="text"
                                            placeholder="Type a message..."
                                            className="flex-1 bg-white rounded-full w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            maxLength={500}
                                            value={currentMessage}
                                            onChange={(e) => setCurrentMessage(e.target.value)}
                                        />
                                        <button 
                                            disabled={!currentMessage}
                                            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                                            onClick={() => {
                                                socket?.send(JSON.stringify({
                                                    type: "chat",
                                                    roomId: id,
                                                    message: currentMessage

                                                }))
                                                setCurrentMessage("");
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lucid lucid-send w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m22 2-7 20-4-9-9-4Z M22 2 11 13" />
                                            </svg>
                                        </button>
                                    </form>
                                </div>
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
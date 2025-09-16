import { useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function MessageInput({ id, setChats, socket }: { id: string, setChats: React.Dispatch<React.SetStateAction<{message: string}[]>>, socket: WebSocket }) {
    const [currentMessage, setCurrentMessage] = useState("");
  
    return(
        <div className="mb-2 border-t border-gray-200 p-4">
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
    )
}
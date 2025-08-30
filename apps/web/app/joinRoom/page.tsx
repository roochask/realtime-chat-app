"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function joinRoom() {
    const [roomId, setRoomId] = useState("");
    const router = useRouter();

    return(
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white max-w-md max-h-lvh p-8 space-y-4 rounded-lg">
            {/* Logo and Heading */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lucide lucide-message-circle w-8 h-8 text-blue-600 size-6 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Chat flow
              </h1>
              <p className="text-gray-400">Join a room and start chating instantly</p>
            </div>
            {/* Form part */}
            <div className="space-y-6">
              <label
                htmlFor="roomId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Room Name
              </label>
              <input 
                id="roomId"
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter room name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                disabled={!roomId}
                className="w-full bg-blue-600 cursor-pointer text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-4
                focus:ring-blue-200 transition-all disabled:opacity-50 disable:cursor-not-allowed flex items-center justify-center"
                onClick={() => router.push(`/room/${roomId}`)}
              >
                Join Room
              </button>
            </div>
          </div>
        </div>
      </div>
   
    )
}


export function MessageList({ chats }: { chats: {message: string}[] })
{

    return(
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chats.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-lg mb-2">👋</div>
                    <p className="text-gray-500">No messages yet. Start the conversation!</p>
                </div>
            )}
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
    )
}
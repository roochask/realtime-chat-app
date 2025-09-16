

export function SideBar() {

    return(
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen">
        {/* Logo and leave room button */}
        <div className="p-4  border-b border-gray-200">
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

        <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-center justify-between">
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
                                <span>{1}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs truncate text-blue-700">roochas: hi</p>
                </button>
            </div>
        </div>
        <div className="p-4 mb-3 border-t border-gray-200">
            <button className="w-full flex justify-center items-center cursor-pointer rounded-lg space-x-2 py-2.5 px-4 text-white bg-blue-600 hover:bg-blue-700 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lucid lucid-plus w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14 M12 5v14" />
                </svg>
                <span>Join New Room</span>      
            </button>
        </div>
    </div>

    )
}
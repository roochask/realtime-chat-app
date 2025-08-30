import WebSocket, { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/env";
import { client } from "@repo/db/client";

interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}

const wss = new WebSocketServer({ port: 8080 });
const users: User[] = [];

function checkUser(token: string): string | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(typeof decoded == "string" ) {
            return null
        }
    
        if(!decoded || !decoded.userId) {
            return null
        }

        return (decoded as JwtPayload).userId
    } catch(e) {
        console.log(e);
    }
    return null;
}

wss.on("connection", (ws: WebSocket, request: Request) => {
    const url = request.url;
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token");

    const userId = checkUser(token as string); // checking is user authenticated

    if(!userId) {
        ws.close()
        return;
    }

    users.push({
        ws,
        rooms: [],
        userId: userId
    })

    ws.on("message", async (data) => {
        const parsedData = JSON.parse(data as unknown as string); // { type: "join_room", roomId: 1 }

        if(parsedData.type === "join_room") {
            const user = users.find(x => x.ws === ws)
            user?.rooms.push(parsedData.roomId);
        }

        if(parsedData.type === "leave_room") {
            const user = users.find(x => x.ws === ws);
            if(!user) {
                return;
            }

            user.rooms = user?.rooms.filter(x => x === parsedData.roomId);
        }

        if(parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message

            try {
                const response = await client.chat.create({
                    data: {
                        roomId,
                        userId, 
                        message
                    }
                })
            } catch(e) {
                console.log(e);
            }

            users.forEach((user) => {
                if(user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId
                    }))
                }
            })
        }
    })
})
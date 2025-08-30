import express from "express";
import cors from "cors";
import { createRoomSchema, signinSchema, signupSchema } from "@repo/validations/zodSchemas";
import { client } from "@repo/db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/env";
import { authMiddleware } from "./authMiddleware.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup",async (req, res) => {
    const parsedData = signupSchema.safeParse(req.body);

    if(!parsedData.success) {
        res.json({
            message: "Incorrect format",
            error: parsedData.error
        })
        return;
    }

    const { email, password, name, photo } = req.body;
    const hashedPassword = await bcrypt.hash(password, 5);

    try{
        await client.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                photo
            }
        })

        res.json({
            message: "You have successfully signed up"
        })
    }catch(e) {
        console.log(e);
        res.json({
            message: "Error while inserting into db"
        })
    }
})

app.post("/signin", async (req, res) => {
    const parsedData = signinSchema.safeParse(req.body); 

    if(!parsedData.success) {
        res.json({
            message: "Incorrect format",
            error: parsedData.error
        })
        return;
    }

    const { email, password } = parsedData.data;

    try {
        const foundUser = await client.user.findUnique({
            where: {
                email
            }
        })

        if(!foundUser) {
            res.json({
                message: "User does not exists"
            })
            return;
        }

        const matchedPassword = await bcrypt.compare(password, foundUser.password);

        if(matchedPassword) {
            const token = jwt.sign({
                userId: foundUser.id
            },  JWT_SECRET)

            res.json({
                message: "You have successfully signed in",
                token
            })
        }else {
            res.json({
                message: "Incorrect password"
            })
        }
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.post("/room", authMiddleware, async (req, res) => {
    const parsedData = createRoomSchema.safeParse(req.body);
    const userId = req.userId;

    if(!parsedData.success) {
        res.json({
            message: "Incorrect format",
            error: parsedData.error
        })
        return;
    }

    const { slug } = parsedData.data;

    try {
        const room = await client.room.create({
            data: {
                slug, 
                adminId: userId
            }
        })

        res.json({
            message: "Room created successfully",
            room
        })
    } catch(e) {
        console.log(e);
        res.json({
            message: "Error while inserting into db"
        })
    }
})

app.get("/chats/:roomId", async (req, res) => {
    const roomId = Number(req.params.roomId);

    try {
        const messages = await client.chat.findMany({
            where: {
                roomId: roomId
            },
            include: {
                user: true
            },
            orderBy: {
                id: 'asc'
            },
            take: 50
        })
    
        res.json({
            messages
        })
    } catch(e) {
        console.log(e);
        res.json({
            message: "Internal server error"
        })
    }
})

app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;

    try {
        const room = await client.room.findUnique({
            where: {
                slug
            }
        })
    
        res.json({
            room
        })
    } catch(e) {
        console.log(e);
        res.json({
            message: "Room does not exists"
        })
    }
})

app.listen(3002);
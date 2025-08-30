import { password } from "bun";
import z from "zod";

export const signupSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
    name: z.string()
})

export const signinSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
})

export const createRoomSchema = z.object({
    slug: z.string().min(6)
})
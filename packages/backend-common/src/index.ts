import dotenv from "dotenv";
import path from "path";

// Load root .env just once
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

if (!process.env.JWT_SECRET) {
    throw new Error("❌ Missing JWT_SECRET in .env file");
}

export const JWT_SECRET = process.env.JWT_SECRET as string;
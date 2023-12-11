import dotenv from "dotenv";
dotenv.config();

export const MONGO_URL = process.env.MONGO_URL || "";

export const SECRET_KEY = process.env.SECRET_KEY || "";

export const PORT = process.env.PORT || 3000;

export const ADMIN_NAME = process.env.ADMIN_NAME || "Admin";

export const CLIENT_ID = process.env.CLIENT_ID || "";

export const CLIENT_SECRET = process.env.CLIENT_SECRET || "";

export const REDIRECT_URI = process.env.REDIRECT_URI || "";

export const REFRESH_TOKEN = process.env.REFRESH_TOKEN || "";

export const PUBLIC_USER = process.env.PUBLIC_USER || "";

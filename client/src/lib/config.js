/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();

export const apiKey = process.env.FIREBASE_API_KEY;
export const authDomain = process.env.FIREBASE_DOMAIN;
export const projectId = process.env.FIREBASE_PROJECT_ID;
export const storageBucket = process.env.STORAGE_BUCKET;
export const messagingSenderId = process.env.MESSAGE_SENDER_ID;
export const appId = process.env.APP_ID;



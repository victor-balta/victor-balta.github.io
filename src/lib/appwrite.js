import { Client, Databases, Storage, Query } from 'appwrite';

export const client = new Client();

// 1. Paste your Project ID here
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;

client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

export const databases = new Databases(client);
export const storage = new Storage(client);

// 2. Paste your IDs here - No need for .env file for these
export const APPWRITE_CONFIG = {
    DATABASE_ID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    EXPERIENCE_COLLECTION_ID: import.meta.env.VITE_APPWRITE_EXPERIENCE_COLLECTION_ID,
    PROJECTS_COLLECTION_ID: import.meta.env.VITE_APPWRITE_PROJECTS_COLLECTION_ID,
    BUCKET_ID: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};

// Helper to get image URL
export const getImageUrl = (bucketId, fileId) => {
    if (!fileId) return null;
    return storage.getFilePreview(bucketId, fileId);
}

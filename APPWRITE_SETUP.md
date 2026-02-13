# Appwrite Connection Setup Guide

This guide explains how to connect your portfolio project to your Appwrite backend.

## Why do we need so many IDs?
Appwrite uses a hierarchy to organize your data securely:
1.  **Project**: The main container for your entire application.
2.  **Database**: Holds your collections (tables).
3.  **Collections**: Specific groups of data (e.g., "Experience", "Projects"). In SQL terms, these are your "Tables".
4.  **Bucket**: A separate storage area for files and images.

To fetch data, the code needs the specific address (ID) for each of these components.

## Step 1: Gather Your IDs
Log in to your [Appwrite Console](https://cloud.appwrite.io/) and find the following IDs:

### 1. Project ID
*   Go to your project's **Overview** or **Settings**.
*   Copy the **Project ID**.

### 2. Database ID
*   Go to the **Databases** tab.
*   Click on your database.
*   Copy the **Database ID** (usually at the top or in Settings).

### 3. Collection IDs (Tables)
You need the ID for each "Table" you created:
*   **Experience Collection ID**:
    *   Click on your **Experience** table/collection.
    *   Copy the **Collection ID** from the top or Settings.
*   **Projects Collection ID**:
    *   Click on your **Projects** table/collection.
    *   Copy the **Collection ID**.

### 4. Bucket ID (Storage)
*   Go to the **Storage** tab.
*   Click on your bucket (e.g., "Images").
*   Copy the **Bucket ID**.

## Step 2: Update Configuration
1.  Open the `.env` file in the root of your project.
2.  Paste your IDs into the corresponding fields:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=paste_your_project_id_here
VITE_APPWRITE_DATABASE_ID=paste_your_database_id_here
VITE_APPWRITE_EXPERIENCE_COLLECTION_ID=paste_your_experience_collection_id_here
VITE_APPWRITE_PROJECTS_COLLECTION_ID=paste_your_projects_collection_id_here
VITE_APPWRITE_BUCKET_ID=paste_your_bucket_id_here
```

## Step 3: Restart & Verify
1.  Stop your running terminal command (Ctrl+C).
2.  Run `npm run dev` to restart the server and load the new environment variables.
3.  Check your browser console if data isn't loading; it will often say "Collection not found" if an ID is incorrect.

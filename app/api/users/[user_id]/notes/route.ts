export const dynamic = 'force-dynamic'
export const revalidate = 60

import { NextRequest, NextResponse } from "next/server";
import { initClient, teardownClient, getClient } from "@/persistence/postgres";

// Fetch notes for a specific user
export async function GET(request: NextRequest) {
    try {
        // Initialize the database client
        await initClient();
        const client = getClient();

        // Extract user_id from the URL path
        const url = new URL(request.url);
        const user_id = url.pathname.split("/")[3]; // Adjust the index based on path structure

        const { rows } = await client.query("SELECT * FROM notes WHERE user_id = $1", [user_id]);
        return NextResponse.json(rows);
    } catch (err) {
        console.error("Error fetching notes:", err);
        return NextResponse.json({ error: "Error in fetching notes" }, { status: 500 });
    } finally {
        await teardownClient();
    }
}

// Add a note for a specific user
export async function POST(request: NextRequest) {
    try {
        // Initialize the database client
        await initClient();
        const client = getClient();

        // Extract user_id from the URL path
        const url = new URL(request.url);
        const user_id = url.pathname.split("/")[3]; // Adjust the index based on path structure

        // Parse request body
        const { content } = await request.json();

        await client.query(
            "INSERT INTO notes (content, user_id) VALUES ($1, $2)",
            [content, user_id]
        );
        return NextResponse.json({ message: "Note added successfully" }, { status: 201 });
    } catch (err) {
        console.error("Error adding note:", err);
        return NextResponse.json({ error: "Error in adding note" }, { status: 500 });
    } finally {
        await teardownClient();
    }
}

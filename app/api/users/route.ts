export const dynamic = 'force-dynamic'
export const revalidate = 60

import { NextRequest, NextResponse } from "next/server";
import { initClient, teardownClient, getClient } from "@/persistence/postgres";

export async function GET() {
    try {
        await initClient();
        const client = getClient();

        const { rows } = await client.query("SELECT * FROM users");
        return NextResponse.json(rows);
    } catch (err) {
        console.error("Error fetching users:", err);
        return NextResponse.json({ error: "Error in fetching users" }, { status: 500 });
    } finally {
        await teardownClient();
    }
}

export async function POST(request: NextRequest) {
    try {
        await initClient();
        const client = getClient();
        const { name, username, email, password, role } = await request.json();

        await client.query(
            "INSERT INTO users (name, username, email, password, role) VALUES ($1, $2, $3, $4, $5)",
            [name, username, email, password, role]
        );

        return NextResponse.json({ message: "User added successfully" }, { status: 201 });
    } catch (err) {
        console.error("Error adding user:", err);
        return NextResponse.json({ error: "Error in adding user" }, { status: 500 });
    } finally {
        await teardownClient();
    }
}

import { NextRequest, NextResponse } from "next/server";
import { initClient, teardownClient, getClient } from "@/persistence/postgres";

// GET users
export async function GET() {
    try {
        await initClient();
        const client = getClient();

        const { rows } = await client.query("SELECT * FROM users");
        return NextResponse.json(rows);
    } catch (err) {
        console.error("Error fetching users:", err);
        return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    } finally {
        await teardownClient();
    }
}

// POST a new user
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
        return NextResponse.json({ error: "Error adding user" }, { status: 500 });
    } finally {
        await teardownClient();
    }
}

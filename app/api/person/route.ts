import Person from "@/models/Person";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const people = await Person.find();
        return NextResponse.json(people);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch people" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const newPerson = await Person.create(body);
        return NextResponse.json(newPerson, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create person" },
            { status: 500 }
        );
    }
}

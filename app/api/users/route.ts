import {currentUser} from "@clerk/nextjs/server";
import {NextRequest} from "next/server";
import {db} from "@/db";
import {eq} from "drizzle-orm";
import {NextResponse} from "next/server";
import {users} from "@/db/schema";

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser();  // ← moved inside try

        if (!user) {  // ← added null check
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userResult = await db.select().from(users).where(
            eq(users.email, user?.primaryEmailAddress?.emailAddress ?? '')
        );

        if (userResult.length === 0) {
            const newUser = await db.insert(users).values({
                email: user?.primaryEmailAddress?.emailAddress ?? '',
                name: user?.fullName ?? 'New user'
            }).returning();
            return NextResponse.json({ user: newUser[0] });
        } else {
            return NextResponse.json({ user: userResult[0] });
        }

    } catch(e) {
        console.error("Error creating User:", e);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('github_token')?.value;  // ✅ fixed name
    return NextResponse.json({ token });
}
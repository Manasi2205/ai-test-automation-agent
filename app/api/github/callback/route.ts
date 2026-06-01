import { NextRequest, NextResponse } from 'next/server';
export async function GET(req:NextRequest){
    const code=req.nextUrl.searchParams.get('code');

    if(!code){
        return NextResponse.redirect(new URL('/workspace?error=Code not found',req.url))
    }

    const res=await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        //hi
    
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: code
        })
    })
    const data=await res.json();
    const access_token=data.access_token;

    if(!access_token){
        return NextResponse.redirect(new URL('/workspace?error=Access token not found',req.url))
    }

    const response=NextResponse.redirect(new URL('/workspace?success=Github connected successfully',req.url))

    response.cookies.set('github_token',access_token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        maxAge:60*60*24*30, // 30 days)
        path:'/',
        sameSite:'lax'
    });
    return response;
}
    
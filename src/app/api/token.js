
// TODO: THIS IS USELESS --> DELETE LATER // 

// import { NextResponse } from 'next/server';
// let client_id = 'd281a48fc615470bae01e8658c953561'
// let client_secret = 'f885485f72094ea9a79b6c223d1cfb70'
// let redirect_uri = 'http://localhost:3000/callback'

// export async function POST(req) {
//     const { code, redirect_uri } = await req.json();

//     const tokenUrl = 'https://accounts.spotify.com/api/token';

//     const headers = new Headers({
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
//     });

//     const body = new URLSearchParams({
//         grant_type: 'authorization_code',
//         code: code,
//         redirect_uri: redirect_uri,
//     });

//     try {
//         const response = await fetch(tokenUrl, {
//             method: 'POST',
//             headers: headers,
//             body: body,
//         });

//         if (!response.ok) {
//             throw new Error(`Error: ${response.status} - ${response.statusText}`);
//         }

//         const tokenInfo = await response.json();
//         return NextResponse.json(tokenInfo);
//     } catch (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

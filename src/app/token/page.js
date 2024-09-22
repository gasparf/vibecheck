import { redirect, } from "next/navigation";
import React from 'react';

let client_id = process.env.SPOTIFY_CLIENT_ID;
let client_secret = process.env.SPOTIFY_CLIENT_SECRET;
let redirect_uri = 'http://localhost:3000/token';

export default async function Token({searchParams}) {
    const code = searchParams?.code;
    const url = 'https://accounts.spotify.com/api/token';
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri,
    });
    
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
    };
  
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching access token:', errorData);
      return <div>Error fetching data</div>;
    }
  
    const tokenData = await response.json();
    const token = tokenData.access_token;
    console.log(token)

    redirect('/loggedin?vibecheck_token='+token)
}






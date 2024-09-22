import { useSearchParams } from "next/navigation";
import React from 'react';

let client_id = process.env.SPOTIFY_CLIENT_ID;
let client_secret = process.env.SPOTIFY_CLIENT_SECRET;
let redirect_uri = 'http://localhost:3000/token';

async function getToken() {
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

    localStorage.setItem('tokenData', response.json().access_token)

    console.log(tokenData)
    // return response.json();
}

// export default async function generateRecSong({ tokenData }) {
//     const tokenData = await response.json();
//     const auth_header = {
//         Authorization: 'Bearer ' + tokenData.access_token,
//     };

//     // Fetch top artists
//     const artistsResponse = await fetch("https://api.spotify.com/v1/me/top/artists?limit=4", {
//         headers: auth_header,
//     });

//     if (!artistsResponse.ok) {
//         const errorData = await artistsResponse.json();
//         console.error('Error fetching top artists:', errorData);
//         return <div>Error fetching data</div>;
//     }

//     const artists = await artistsResponse.json();

//     // Fetch top songs
//     const topSongsResponse = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=4", {
//         headers: auth_header,
//     });

//     if (!topSongsResponse.ok) {
//         const errorData = await topSongsResponse.json();
//         console.error('Error fetching top songs:', errorData);
//         return <div>Error fetching data</div>;
//     }

//     const topSongs = await topSongsResponse.json();
//     const songIds = topSongs.items.map(song => song.id);

//     // Fetch recommended songs based on top 5 songs
//     const recommendedSongResponse = await fetch(
//     `https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=${songIds.join()}`,
//     {
//         headers: auth_header,
//     }
//     );
//     const recommendedSongs = await recommendedSongResponse.json();
//     // return recommendedSongs;
// }

// export default function getRandomSong({ recommendedSongs }) {
//     const getRandomSong = () => {
//         return recommendedSongs.tracks[Math.floor(Math.random() * recommendedSongs.tracks.length)];
//     }
//     // return getRandomSong();
// }

// export default async function getUserName({ tokenData }) {
//     const auth_header = {
//         Authorization: 'Bearer ' + tokenData.access_token,
//     };
//     const userResponse = await fetch("https://api.spotify.com/v1/me", {
//         headers: auth_header,
//     });
//     if (!userResponse.ok) {
//         const errorData = await userResponse.json();
//         console.error('Error fetching user data:', errorData);
//         return <div>Error fetching data</div>;
//     }
//     const user = await userResponse.json();
//     // return user.display_name;
// }





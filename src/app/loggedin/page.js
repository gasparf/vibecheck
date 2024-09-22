'use client';
import { useSearchParams } from "next/navigation";
import getToken from "../token/token";
import generateRecSong from "../api/token"

import React from 'react';




let client_id = process.env.SPOTIFY_CLIENT_ID;
let client_secret = process.env.SPOTIFY_CLIENT_SECRET;
let redirect_uri = 'http://localhost:3000/api';

export default async function Home({ params, searchParams }) {
//   const [recommendedSong, setRecommendedSong] = React.useState({});
//   const code = searchParams?.code;

//   const url = 'https://accounts.spotify.com/api/token';
//   const body = new URLSearchParams({
//     grant_type: 'authorization_code',
//     code: code,
//     redirect_uri: redirect_uri,
//   });
  
//   const headers = {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
//   };

//   const response = await fetch(url, {
//     method: 'POST',
//     headers: headers,
//     body: body,
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     console.error('Error fetching access token:', errorData);
//     return <div>Error fetching data</div>;
//   }

//   const tokenData = await response.json();
//   const auth_header = {
//     Authorization: 'Bearer ' + tokenData.access_token,
//   };

//   // Fetch top artists
//   const artistsResponse = await fetch("https://api.spotify.com/v1/me/top/artists?limit=4", {
//     headers: auth_header,
//   });

//   if (!artistsResponse.ok) {
//     const errorData = await artistsResponse.json();
//     console.error('Error fetching top artists:', errorData);
//     return <div>Error fetching data</div>;
//   }

//   const artists = await artistsResponse.json();

//   // Fetch top songs
//   const topSongsResponse = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=4", {
//     headers: auth_header,
//   });

//   if (!topSongsResponse.ok) {
//     const errorData = await topSongsResponse.json();
//     console.error('Error fetching top songs:', errorData);
//     return <div>Error fetching data</div>;
//   }

//   const topSongs = await topSongsResponse.json();
//   const songIds = topSongs.items.map(song => song.id);

//   // Fetch recommended songs based on top 5 songs
// const recommendedSongResponse = await fetch(
//   `https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=${songIds.join()}`,
//   {
//     headers: auth_header,
//   }
// );
// const recommendedSongs = await recommendedSongResponse.json();



// // Function to obtain a random song from recommended songs
// const getRandomSong = () => {
//   const randomIndex = Math.floor(Math.random() * recommendedSongs.tracks.length);
//   return recommendedSongs.tracks[randomIndex];
// }
// const recomSong = getRandomSong();
// setRecommendedSong(recomSong);
// console.log("This is a new thing", recomSong);
// console.log("This is a new thing", recomSong.name);
// console.log("This is should match above", recommendedSong.name);

// // Method to obtain user's display name
// const userResponse = await fetch("https://api.spotify.com/v1/me", {
//   headers: auth_header,
// });
// const user_data = await userResponse.json();

console.log(getToken());


return (
  <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white">
    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70" />

    <h1 className="text-center absolute top-[10%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] text-4xl font-extrabold z-10 shadow-lg">
      {user_data.display_name}
    </h1>

    {/* Top Artists Header */}
    <h2 className="text-center absolute top-[23%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] text-2xl font-semibold z-10">
      Your Top Artists
    </h2>

    <div className="text-center absolute top-[35%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] grid grid-cols-2 gap-4 max-w-lg z-10">
      {artists.items.map((artist) => (
        <a
          key={artist.id}
          href={`https://open.spotify.com/artist/${artist.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-3 rounded-lg bg-gray-800 shadow-lg transition-transform transform hover:scale-105 duration-300"
        >
          <img src={artist.images[0]?.url} alt={artist.name} className="w-12 h-12 rounded-full mr-3 border-2 border-white" />
          <span className="font-semibold text-lg">{artist.name}</span>
        </a>
      ))}
    </div>

    {/* Top Songs Header */}
    <h2 className="text-center absolute top-[56%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] text-2xl font-semibold z-10">
      Your Top Songs
    </h2>

    <div className="text-center absolute top-[70%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] grid grid-cols-2 gap-4 max-w-lg z-10">
      {topSongs.items.map((song) => (
        <div key={song.id} className="flex items-center p-3 rounded-lg bg-gray-800 shadow-lg transition-transform transform hover:scale-105 duration-300">
          <img src={song.album.images[0]?.url} alt={song.name} className="w-12 h-12 rounded-full mr-3 border-2 border-white" />
          <span className="font-semibold text-lg">{song.name}</span>
        </div>
      ))}
    </div>

    <div className="absolute bottom-[10%] left-[50%] transform translate-x-[-50%] z-10">
      {recommendedSongs.tracks && recommendedSongs.tracks.length > 0 && (
        <a
          href={`https://open.spotify.com/track/${recommendedSongs.tracks[0].id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-bold bg-gray-700 p-3 rounded-lg shadow-lg"
        >
          {`Recommended Song: ${recommendedSong.name}`}
        </a>
      )}
    </div>
  </div>
);
}


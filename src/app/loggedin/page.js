
'use client';
import { useSearchParams } from "next/navigation";

import React from 'react';
import { useState } from "react";

let client_id = process.env.SPOTIFY_CLIENT_ID;
let client_secret = process.env.SPOTIFY_CLIENT_SECRET;
let redirect_uri = 'http://localhost:3000/loggedin';
let otherUserSongs = ["47N81NMkB488fuOwOC3Oip","3Vr3zh0r7ALn8VLqCiRR10","4pkb8SbRGeHAvdb87v9rpf","4YLKHaxYieIw6iMVfIvKm7"]


export default function Home({ params, searchParams }) {
  const access_token =searchParams?.vibecheck_token;
  const [loadingUser, setLoadinguser] = useState(0)
  const [user_data, setUserData] = useState(0)
  const [loadingArtists,setLoadingArtists] = useState(0);
  const [artists, setArtists] = useState(0);
  const [loadingTopSongs, setLoadingTopSongs] = useState(0);
  const [topSongs, setTopSongsResponse] = useState(0);
  const [recommendedSongs, setReccomendedSongs] = useState(0)
  const [otherUser,setOtherUser] = useState(0)
  const [loadingOtherUser, setLoadingOtherUser] = useState(0)

  const auth_header = {
    Authorization: 'Bearer ' + access_token,
  };
  const fetchArtists = () => {
    if (!loadingArtists) {
        setLoadingArtists(true)
        fetch("https://api.spotify.com/v1/me/top/artists?limit=4", {
            headers: auth_header,
          }).then((artistsResponse) => {
            artistsResponse.json().then((artjson) => {
                setArtists(artjson)
            })
          })
    }

  }
  fetchArtists()
  const fetchTopSongs  = () => {
    if (!loadingTopSongs) {
        setLoadingTopSongs(true)
        fetch("https://api.spotify.com/v1/me/top/tracks?limit=4", {
            headers: auth_header,
          }).then((artistsResponse) => {
            artistsResponse.json().then((artjson) => {
                setTopSongsResponse(artjson)
            })
          })
    }

  }
  fetchTopSongs()
  const fetchUserData = () => {
    if (!loadingUser) {
        setLoadinguser(true);
        fetch("https://api.spotify.com/v1/me", {
            headers: auth_header,
        }).then((userResponse) => {
            userResponse.json().then((userJson) => {
                setUserData(userJson)
            })
        })
    }
  }
  fetchUserData()

  const getReccomendedSongs = () => {
    const songIds = topSongs.items.map(song => song.id).slice(1).concat(otherUserSongs).slice(2);
    fetch("https://api.spotify.com/v1/recommendations?limit=10&seed_tracks="+songIds.join(), {
        headers: auth_header,
      }).then((artistsResponse) => {
        artistsResponse.json().then((artjson) => {
            setReccomendedSongs(artjson)
        })
      })}
  
  // Fetch recommended songs based on top 5 songs
// const recommendedSongResponse = await fetch(
//   `https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=${songIds.join()}`,
//   {
//     headers: auth_header,
//   }
// );
// const recommendedSongs = await recommendedSongResponse.json();



if (!user_data || !topSongs || !artists) {
    return(<div><h1>Loading...</h1></div>)
}
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
          {`Recommended Song: ${recommendedSongs.tracks[0].name}`}
        </a>
      )}
      <button onClick={getReccomendedSongs} className="text-xl font-bold bg-gray-700 p-3 rounded-lg shadow-lg mt-3">
          Get New Recommended Song
        </button>
    </div>
  </div>
);
}   

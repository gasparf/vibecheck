'use client';
import axios from 'axios'

let client_id = process.env.SPOTIFY_CLIENT_ID
let client_secret = process.env.SPOTIFY_CLIENT_SECRET
let redirect_uri = 'http://localhost:3000/loggedin'

export default async function Home({params,searchParams}) {
  // retrieves auth code from page.js
  const code = searchParams?.code


  // we have to query string the data to send the request
  var querystring = require('querystring');

  // url to send the request to  
  const url = 'https://accounts.spotify.com/api/token';

  // body of the request
  const body = {
    code: code,
    redirect_uri: redirect_uri,
    grant_type: 'authorization_code',

  }
  // headers of the request for authorization
  const headers = {
    'content-yype': 'application/x-www-form-urlencoded', 
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  }

  // request function
  let response;
  try {
    response = await axios.post(url, querystring.stringify(body), { headers: headers }, { json: true });
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error('Error - ', error.response.data);
      return (
        <div>
          <p>{error.response.data.error_description}</p>
        </div>
      );
    } else {
      console.error('An unexpected error occurred: ', error);
      return (
        <div>
          <h1>An unexpected error occurred</h1>
          <p>{error.message}</p>
        </div>
      );
    }
  }
  const auth_header = {
      Authorization: 'Bearer ' + response.data.access_token
  }
    
  const artists  = await axios.get("https://api.spotify.com/v1/me/top/artists?limit=5", {headers: auth_header});
    // console.log(artists.data)
    // in the form of
    // external_urls: [Object],
    // followers: [Object],
    // genres: [Array],
    // href: 'https://api.spotify.com/v1/artists/6C7WNJfd5uZclcS3WeEjx',
    // id: '6CY7WNJfd5uZclcS3WeEjx',
    // images: [Array],
    // name: 'Yu-Peng Chen',
    // popularity: 64,
    // type: 'artist',
    // uri: 'spotify:artist:6CY7WNJfd5uZclcS3WeEjx'
  const displaySongs = (artists) => { }

    // line below contains sample of displaying artist name
    // <h1 className="text-lg text-red-500"> {songs.data.items[0].name} </h1>


    // obtain top 5 songs to generate recommended song
  const topSongs = await axios.get("https://api.spotify.com/v1/me/top/tracks?limit=5", {headers: auth_header});
    // console.log(topSongs.data)
    
    // put songs ids into an array 
  const songIds = []
  for (let i = 0; i < topSongs.data.items.length; i++) {
    songIds.push(topSongs.data.items[i].id)
  }
    // console.log(songIds)
    // generate recommended song based on top 5 songs
  const recommendedSong = await axios.get("https://api.spotify.com/v1/recommendations?limit=1&seed_tracks=" + songIds.join(), {headers: auth_header});
  console.log(recommendedSong.data)

    // method to obtain users display name
  const user_data = await axios.get("https://api.spotify.com/v1/me", {headers: auth_header});

  return (
    <div>
    <div className="flex flex-col items-center justify-center text-center text-blue">
      <div className="grid relative">
        <img src="/images/juice.png" alt="juicebox" className="w-full h-auto" />
        
        {/* User Heading */}
        <h1 className="text-black text-[2.5vw] absolute inset-x-0 top-[18.5%] flex justify-center">
          {user_data.data.display_name}
        </h1>
        {/* Top artists section */}
        <div className="text-white absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[0%] grid grid-cols-2 gap-3 max-w-s">
          <p className="p-3 rounded text-[2.5vw] text-sm"> {artists.data.items[0].name} </p>
          <p className="p-3 rounded text-sm text-[2.5vw]">Artist 2</p>
          <p className="p-3 rounded text-sm text-[2.5vw]">Artist 3</p>
          <p className="p-3 rounded text-sm text-[2.5vw]">Artist 4</p>
          <p className="p-3 rounded text-sm text-[2.5vw]">Artist 5</p>
          <p className="p-3 rounded text-sm text-[2.5vw]">Artist 6</p>
          <p className="p-3 rounded text-sm text-[2.5vw]">Artist 7</p>
          <p className="p-3 rounded text-sm text-[2.5vw]">Artist 8</p>
          <p className="p-3 rounded text-sm text-[2.5vw]">Artist 9</p>
          <p className="p-3 rounded text-sm text-[2.5vw]">Artist 10</p>
        </div>
        <div className="absolute bottom-[16%] left-[50%] transform translate-x-[-50%]">
          <p> {recommendedSong.data.tracks[0].name} - {recommendedSong.data.tracks[0].artists[0].name} </p>
        </div>

      </div>
    </div>
  </div>
  )
}


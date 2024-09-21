'use client';
import { useSearchParams } from "next/navigation"
import React, { useState, useEffect } from 'react';

import axios from 'axios'

<<<<<<< HEAD
=======

>>>>>>> bbddbcd (hid api keys)
let client_id = process.env.SPOTIFY_CLIENT_ID
let client_secret = process.env.SPOTIFY_CLIENT_SECRET
let redirect_uri = 'http://localhost:3000/loggedin'


export default async function Home() {
  // retrieves auth code from page.js
  const searchParams = useSearchParams();
  const code = searchParams.get('code')
  const [topSongs, setTopSongs] = useState('');


  // we have to query string the data to send the request
  var querystring = require('querystring');

  // url to send the request to  
  const url = 'https://accounts.spotify.com/api/token';

  // body of the request
  const body = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirect_uri,

  }

  // headers of the request for authorization
  const headers = {
    'content-type': 'application/x-www-form-urlencoded', 
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
}

  // request function
  axios
  .post(
    "https://accounts.spotify.com/api/token",
    querystring.stringify(body),
    {headers: headers}
  )
  .then((response) => {

    const auth_header = {
        Authorization: 'Bearer ' + response.data.access_token
    }
    axios.get("https://api.spotify.com/v1/me/top/artists?limit=5", {headers: auth_header}).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
    })
  })
  .catch((error) => {
    console.log(error);
  });


  export default async function Home() {
  // retrieves auth code from page.js
  const searchParams = useSearchParams();
  const code = searchParams.get('code')
  const [topSongs, setTopSongs] = useState('');


  // we have to query string the data to send the request
  var querystring = require('querystring');

  // url to send the request to  
  const url = 'https://accounts.spotify.com/api/token';

  // body of the request
  const body = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirect_uri,

  }

  // headers of the request for authorization
  const headers = {
    'content-type': 'application/x-www-form-urlencoded', 
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
}

  // request function
  axios
  .post(
    "https://accounts.spotify.com/api/token",
    querystring.stringify(body),
    {headers: headers}
  )
  .then((response) => {

    const auth_header = {
        Authorization: 'Bearer ' + response.data.access_token
    }
    axios.get("https://api.spotify.com/v1/me/top/artists?limit=5", {headers: auth_header}).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
    })
  })
  .catch((error) => {
    console.log(error);
  });
  
  return (
    <div>
    <div className="flex flex-col items-center justify-center text-center text-blue">
      <div className="grid relative">
        <img src="/images/juice.png" alt="juicebox" className="w-full h-auto" />
        
        {/* User Heading */}
        <h1 className="text-black text-[2.5vw] absolute inset-x-0 top-[18.5%] flex justify-center">
          User
        </h1>
        {/* Top artists section */}
        <div className="text-white absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[0%] grid grid-cols-2 gap-3 max-w-s">
          <p className="p-3 rounded text-[2.5vw] text-sm">afsdfsuch as</p>
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
          <p>Recommended Song</p>
        </div>

      </div>
    </div>
  </div>
  )
}

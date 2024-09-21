'use client';
import { useSearchParams } from "next/navigation"
import React, { useState, useEffect } from 'react';

import axios from 'axios'

let client_id = process.env.SPOTIFY_CLIENT_ID
let client_secret = process.env.SPOTIFY_CLIENT_SECRET
let redirect_uri = 'http://localhost:3000/loggedin'



export default function Home() {
  // retrieves auth code from page.js
  const searchParams = useSearchParams();
  const code = searchParams.get('code')

  // we have to query string the data to send the request
  var querystring = require('querystring');

  // url to send the request to  
  const url = 'https://accounts.spotify.com/api/token';

  // body of the request
  const body = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirect_uri,
    client_id: client_id,
    client_secret: client_secret,
  }

  // headers of the request for authorization
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Authorization' : 'Basic ' + (new Buffer.from(`${client_id}:${client_secret}`).toString('base64'))
  }

  fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error
  ))

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
      <h1>{code}</h1>
=      <h1 className="text-lg text-red-500"> test </h1>
    </div>
  )
}

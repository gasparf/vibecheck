// components/LoginButton.js
import React from 'react';
import Link from 'next/link';
var querystring = require('querystring');

let client_id = process.env.SPOTIFY_CLIENT_ID;
let redirect_uri = 'http://localhost:3000/loggedin';

export default function LoginButton() {
  const generateLink = () => {
    var scopes = 'user-top-read user-read-recently-played';
    return (
      <Link
        href={
          'https://accounts.spotify.com/authorize?' +
          querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scopes,
            redirect_uri: redirect_uri,
          })
        }
      >
        <button className="p-3 text-2xl rounded-md border-black border shadow-lg">Log In</button>
      </Link>
    );
  };

  return generateLink();
}

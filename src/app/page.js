import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

let client_id = process.env.SPOTIFY_CLIENT_ID
let redirect_uri = 'http://localhost:3000/token'
var querystring = require('querystring')


export default function Home() {
  const generateLink = () => {

      var scopes = 'user-top-read user-read-recently-played user-read-private user-read-email';

      return (
        <Link href = {'https://accounts.spotify.com/authorize?' + querystring.stringify( {
          response_type: 'code',
          client_id: client_id,
          scope: scopes,
          redirect_uri: redirect_uri
        })}>
            <button className="p-4 px-8 text-xl bg-green-500 hover:bg-green-400 text-white font-bold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"> Log In </button>

        </Link>
      )
  }

  return (
    <div 
      className="relative flex flex-col items-center justify-center min-h-screen text-white" 
      style={{ backgroundColor: '#1DB954', backgroundImage: 'linear-gradient(to bottom, black, #1DB954)' }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 opacity-70" />

      {/* Text Section */}
      <div className="text-center mb-10 z-10">
        <h1 className="text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          Vibecheck
        </h1>
        <p className="mt-5 text-xl max-w-xl leading-relaxed text-gray-300">
          Explore your personalized Spotify music world!
        </p>
      </div>

      {/* Button Section */}
      <div className="z-10">
        {generateLink()}
      </div>
    </div>
  );
}


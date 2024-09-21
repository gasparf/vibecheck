import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
let client_id = process.env.SPOTIFY_CLIENT_ID
let redirect_uri = 'http://localhost:3000/loggedin'
var querystring = require('querystring')





export default function Home() {
  const generateLink = () => {

      var scopes = 'user-top-read user-read-recently-played';

      return (
        <Link href = {'https://accounts.spotify.com/authorize?' + querystring.stringify( {
          response_type: 'code',
          client_id: client_id,
          scope: scopes,
          redirect_uri: redirect_uri
        })}>
            <button className="p-3 text-2xl rounded-md border-black border shadow-lg "> Log In </button>
        </Link>
      )
  }

  return (
    <div className="flex-row m-2">
      <div className="fixed z-10 ml-3"> 
        {generateLink()}
      </div>
      <div className="relative justify-center mt-5 text-center">
        <Image src="/images/juice.png" alt="placeHolder" width={2000} height={2000} className="shadow-2xl" />
        <h1 className="text-6xl absolute top-1/2 left-1/2 -translate-y-3/5 -translate-x-2/4 text-white"> Vibecheck </h1>
        <p className="text-6xl absolute top-2/3 left-1/2 -translate-y-2/3 -translate-x-2/4 text-white" > Click "Log In" to start! </p>
      </div>

    </div>
  )
}

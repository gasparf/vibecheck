import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
let client_id = 'd281a48fc615470bae01e8658c953561'
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
            <button className="p-1 rounded-md text-orange-500 bg-white"> Log in </button>
        </Link>
      )
  }

  return (
    <div className="flex-row">
      <div > 
        {generateLink()}
      </div>
      <div> 
        <h1> test </h1>
      </div>
    </div>
  )
}

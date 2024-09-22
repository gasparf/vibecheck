import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
let client_id = 'd281a48fc615470bae01e8658c953561'
let redirect_uri = 'http://localhost:3000/loggedin'
var querystring = require('querystring')



export default function Home() {
  const generateLink = () => {

      var scopes = 'user-top-read ';

      return (
        <Link href = {'https://accounts.spotify.com/authorize?' + querystring.stringify( {
          response_type: 'code',
          client_id: client_id,
          scope: scopes,
          redirect_uri: redirect_uri
        })}>
          <button>Log in</button>
        </Link>
      )
  }
  return (
    <div>
      <h1>Welcome to My Page</h1>
      {generateLink()}
    </div>
  )
}

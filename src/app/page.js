import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
let client_id = '665666f3816445e0b7dfcbdec816e62d'
let redirect_uri = 'http://localhost:3000/loggedin'
var querystring = require('querystring')



export default function Home() {
  const generateLink = () => {
      return (
        <Link href = {'https://accounts.spotify.com/authorize?' + querystring.stringify( {
          response_type: 'code',
          client_id: client_id,
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

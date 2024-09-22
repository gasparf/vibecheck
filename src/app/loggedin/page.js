import axios from 'axios'

let client_id = 'd281a48fc615470bae01e8658c953561'
let client_secret = 'f885485f72094ea9a79b6c223d1cfb70'
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
  const response = await axios.post("https://accounts.spotify.com/api/token",
    querystring.stringify(body),
    {headers: headers})

    const auth_header = {
        Authorization: 'Bearer ' + response.data.access_token
    }
    const songs  = await axios.get("https://api.spotify.com/v1/me/top/artists?limit=5", {headers: auth_header});
    console.log(songs.data)
    // in the form of
    // external_urls: [Object],
    // followers: [Object],
    // genres: [Array],
    // href: 'https://api.spotify.com/v1/artists/6CY7WNJfd5uZclcS3WeEjx',
    // id: '6CY7WNJfd5uZclcS3WeEjx',
    // images: [Array],
    // name: 'Yu-Peng Chen',
    // popularity: 64,
    // type: 'artist',
    // uri: 'spotify:artist:6CY7WNJfd5uZclcS3WeEjx'
    const displaySongs = (songs) => {

    }
  return (
    <div>
      <h1>{code}</h1>
      <h1 className="text-lg text-red-500"> {songs.data.items[0].name} </h1>
    </div>
  )
}

import React from 'react'

import { Container } from 'react-bootstrap'

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=7fd6f703c91745c3a4a4f1750864ee13&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

// make a button that will authorize the use of the spotify api
export default function Login() {
    return(
        <Container className='d-flex align-items-center justify-content-center' style={ {minHeight: '100vh'}} >
            <a className='btn btn-success btn-lg' href={AUTH_URL}>Login With Spotify</a>
        </Container>
    )
}
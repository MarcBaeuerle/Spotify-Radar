import React from 'react';

const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=9bc2ed28c5124518a2b45d4d3d514721&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-private%20user-top-read%20user-read-recently-played"

export default function Login() {
    return (
        <div>
            <a href={AUTH_URL}>
                Login with Spotify
            </a>
        </div>
    )
}

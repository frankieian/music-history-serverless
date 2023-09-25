


export const spotifySettings = {
    grant_type: {
        refresh_token: 'refresh_token'
    },
    clientId: process.env.SPOTIFY_CLIENT_ID ?? '',
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? '',
    authUrl: process.env.SPOTIFY_AUTH_URL ?? '',
    baseApiUrl: process.env.SPOTIFY_API_URL ?? '',
    api: {
        recentlyPlayed: '/me/player/recently-played'
    }
}

export const recentlyPlayedLimit = 50

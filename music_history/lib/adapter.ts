import { createAuthorization, refreshAuthToken } from "./spotify/auth"
import { getRecentlyPlayedTracks } from "./spotify/history"



export const musicRunner = async (body: any) => {
    console.log('Running music runner!')
    const refreshTok = process.env.SPOTIFY_TEST_REFRESH ?? ""
    let refresh_token = await refreshAuthToken(refreshTok)

    if(!refresh_token.success) {
        console.log("FAILED REFRESH")
        return
    }
    const authToken = createAuthorization(refresh_token.data)

    const recentlyPlayed = await getRecentlyPlayedTracks(authToken)


    console.log(recentlyPlayed)
}
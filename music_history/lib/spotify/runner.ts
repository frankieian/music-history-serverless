import { Connection } from "mysql2/promise"
import { createAuthorization, refreshAuthToken } from "./auth"
import { getRecentlyPlayedTracks } from "./history"
import { translateSpotifyHistory } from "./translate"


export const spotifyHistoryRunner = async (refresh_token: string, sqlConnection: Connection) => {
    console.log('Running spotifyHistoryRunner')
    //Get auth token using refresh token
    let authResponse = await refreshAuthToken(refresh_token)

    if(!authResponse.success) {
        console.log("FAILED REFRESH")
        throw new Error("Could not provide refresh token")
    }
    //Create bearer token
    const authToken = createAuthorization(authResponse.data)
    console.log('Retrieved token', authToken)

    //Retrieve latest played token
    const recentlyPlayed = await getRecentlyPlayedTracks(authToken)
    console.log('Retrieved recentlyPlayed', recentlyPlayed)

    if(!recentlyPlayed.success) {
        throw new Error("Could not obtain recently played")
    }
    //Translate data
    const translatedRecentlyPlayed = translateSpotifyHistory(recentlyPlayed.data)


    //return data
    return translatedRecentlyPlayed 

}
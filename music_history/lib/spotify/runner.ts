import { createAuthorization, refreshAuthToken } from "./auth"
import { getRecentlyPlayedTracks } from "./history"


export const spotifyHistoryRunner = async (refresh_token: string) => {
    //Get auth token using refresh token
    let authResponse = await refreshAuthToken(refresh_token)

    if(!authResponse.success) {
        console.log("FAILED REFRESH")
        return
    }
    //Create bearer token
    const authToken = createAuthorization(authResponse.data)

    //Retrieve latest played token
    const recentlyPlayed = await getRecentlyPlayedTracks(authToken)

    //Translate data


    //return data


}
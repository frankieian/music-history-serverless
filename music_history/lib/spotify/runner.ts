import { Connection } from "mysql2/promise"
import { createAuthorization, refreshAuthToken } from "./auth"
import { getRecentlyPlayedTracks } from "./history"
import { translateSpotifyHistory } from "./translate"
import { recentlyPlayedRequest } from "../../types/spotify"
import { integration } from "../../types/db"
import { recentlyPlayedLimit } from "../../const/spotify"
import * as _ from "lodash"
import { musicMessageBody } from "../../types/generic"

export const spotifyHistoryRunner = async (body: musicMessageBody, refresh_token: string, sqlConnection: Connection, integration: integration) => {
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
    //If last_used is in db, then used that as after time.
    let options:recentlyPlayedRequest = {}
    //If body.after has number, use that
    if(body.after) options.after = body.after
    //Otherwise use integration.last_used
    else if(integration.last_used) options.after = integration.last_used.valueOf()

    const recentlyPlayed = await getRecentlyPlayedTracks(authToken, options)
    console.log('Retrieved recentlyPlayed', recentlyPlayed)

    if(!recentlyPlayed.success) {
        throw new Error("Could not obtain recently played")
    }

    let message: musicMessageBody = {
        provider: integration.provider,
        user_id: integration.user_id
    }
    let hasMessage = false

    //Check if required to run previous recently played
    if(recentlyPlayed.data.items.length === recentlyPlayedLimit) {
        //Check if after valid number
        let after = _.toInteger(recentlyPlayed.data.cursors?.after)
        if(after > 0) {
            hasMessage = true
            message = {
                provider: integration.provider,
                user_id: integration.user_id,
                after: after
            }
        }
    }

    //Translate data
    const translatedRecentlyPlayed = translateSpotifyHistory(recentlyPlayed.data)

    //return data
    return {
        translatedData: translatedRecentlyPlayed,
        ...(hasMessage ? {message: message} : {})
    } 

}
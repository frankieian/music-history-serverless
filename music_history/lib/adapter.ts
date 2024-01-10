import { createDbConnection } from "../config/db"
import { musicMessageBody, translateData } from "../types/generic"
import { addMusicHistory } from "./db/add"
import { obtainIntegration } from "./db/get"
import { updateLastUsed } from "./db/update"
import { createAuthorization, refreshAuthToken } from "./spotify/auth"
import { getRecentlyPlayedTracks } from "./spotify/history"
import { spotifyHistoryRunner } from "./spotify/runner"



export const musicRunner = async (body: musicMessageBody) => {
    const sqlConnection = await createDbConnection()
    const integration = await obtainIntegration(sqlConnection, body.provider, body.user_id)

    if(!integration.data) {
        throw new Error(`Integration not found or data couldnt be obtained`)
    }

    let translatedData: translateData[]
    switch (body.provider) {
        case "spotify":
            translatedData = await spotifyHistoryRunner(integration.data?.refresh_token, sqlConnection, integration.data)
            break;
        default:
            throw new Error(`Invalid provider, ${body.provider} is not valid and compatible`)
    }
    
    console.log('Using translated data', translatedData)

    let lastPlayed = await addMusicHistory(sqlConnection, translatedData, body.user_id)

    console.log('The last played time was', lastPlayed)
    //Update last played
    await updateLastUsed(sqlConnection, integration.data, lastPlayed)


}
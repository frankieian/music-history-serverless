import axios, { AxiosResponse } from "axios"
import { recentlyPlayedLimit, spotifySettings } from "../../const/spotify"
import { recentlyPlayedRequest, recentlyPlayedResponse, recentlyPlayedResponseSchema } from "../../types/spotify"

//All functions that pertain to getting recently played tracks

/**
 * Ability to get the recently played tracks on spotify
 * @param authToken Auth token for spotify API authorization
 * @param request Options for request, e.g. custom limit, etc
 * @returns 
 */
export const getRecentlyPlayedTracks = async (authToken: string, request?: recentlyPlayedRequest)
    :Promise<{success: true, data: recentlyPlayedResponse} | {success: false, error: any}> => {
    try {
        let response: AxiosResponse<recentlyPlayedResponse> = await axios.request({
            method: "GET",
            url: spotifySettings.baseApiUrl + spotifySettings.api.recentlyPlayed,
            params: {
                limit: recentlyPlayedLimit,
                ...request
            },
            headers: {
                Authorization: authToken
            }
        })

        let checkResponse = recentlyPlayedResponseSchema.safeParse(response.data)

        if(checkResponse.success) {
            return {
                success: true,
                data: response.data
            }
        }

        return {
            success: false,
            error: checkResponse.error
        }

    } catch (err) {
        console.log(err)
        return {
            success: false,
            error: err
        }
    }
}
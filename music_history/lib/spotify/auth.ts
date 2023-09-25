//File gives all the auth functions
import axios, { Axios, AxiosError, AxiosResponse } from "axios"
import { refreshAuthTokenResponse, refresh_body } from "../../types/spotify"
import { spotifySettings } from "../../const/spotify"

/**
 * Refreshes the auth token from spotify
 * Used when auth token has expired
 */
export const refreshAuthToken = async (refreshToken: string) => {
    let returned: {success: true, data: refreshAuthTokenResponse} | {success: false}
    try {
        const requestBody: refresh_body = {
            grant_type: spotifySettings.grant_type.refresh_token,
            refresh_token: refreshToken,
            client_id: spotifySettings.clientId,
            client_secret: spotifySettings.clientSecret
        }
    
        const response:AxiosResponse<refreshAuthTokenResponse> = await axios.request({
            method: "POST",
            url: spotifySettings.authUrl,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            data: new URLSearchParams(requestBody)
        })

        returned = {
            success: true,
            data: response.data
        }
        return returned
    } catch (err:any) {
        console.log('An error has occured')
        //catch and return error
        if(err instanceof AxiosError && err.isAxiosError) {
            if(err.response?.data) {

            }
        }
        returned = {
            success: false
        }
        return returned
    }

}


export const createAuthorization = (authResponse: refreshAuthTokenResponse) => {
    return authResponse.token_type + " " + authResponse.access_token
}
import { Connection, RowDataPacket } from "mysql2/promise"
import { integration } from "../../types/db"

//Obtains integration file
export const obtainIntegration = async (connection: Connection, provider: string, user_id: number) => {

    let response = await connection.execute(
        'SELECT * FROM `integration` WHERE `user_id` = ? AND `provider` = ?',
        [user_id, provider]
    )
    const result = response[0] as Array<integration>
    if(result?.length != 1) {
        return {
            success: false
        }
    }


    return {
        success: true,
        data: result[0]
    }

}


export const obtainArtist = async (connection: Connection, spotify_id: string) => {

    let response = await connection.execute(
        'SELECT * FROM `artist` WHERE `id` = ?',
        [spotify_id]
    )
    const result = response[0] as Array<any>
    if(result?.length != 1) {
        return {
            success: false
        }
    }


    return {
        success: true,
        data: result[0]
    }
}

export const obtainSong = async (connection: Connection, spotify_id: string) => {

    let response = await connection.execute(
        'SELECT * FROM `song` WHERE `id` = ?',
        [spotify_id]
    )
    const result = response[0] as Array<any>
    if(result?.length != 1) {
        return {
            success: false
        }
    }


    return {
        success: true,
        data: result[0]
    }

}
import { Connection } from "mysql2/promise";
import { integration } from "../types/integration";



export const findUsersWithSpotify = async (connection: Connection) =>  {
    let response = await connection.execute(
        'SELECT * FROM `integration` WHERE `provider` = ?',
        ['spotify']
    )

    const result = response[0] as Array<integration>
    if(result?.length == 0 || undefined) {
        return {
            success: false
        }
    }


    return {
        success: true,
        data: result
    }

}
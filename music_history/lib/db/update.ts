import { Connection, RowDataPacket } from "mysql2/promise"
import { integration } from "../../types/db"


export const updateLastUsed = async (connection: Connection, integration: integration, lastPlayed: Date | null) => {
    if(!lastPlayed) {
        console.log("No data added, not updating")
        return {
            success: true
        }
    }

    let response = await connection.execute(
        'UPDATE `integration` SET last_used = ? WHERE `user_id` = ? AND `provider` = ?',
        [lastPlayed, integration.user_id, integration.provider]
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
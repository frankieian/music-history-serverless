import { Connection, RowDataPacket } from "mysql2/promise"
import { integration } from "../../types/db"


export const updateLastUsed = async (connection: Connection, integration: integration) => {

    let response = await connection.execute(
        'UPDATE `integration` SET last_used = ? WHERE `user_id` = ? AND `provider` = ?',
        [new Date(), integration.user_id, integration.provider]
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
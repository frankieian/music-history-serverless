
import mysql from "mysql2/promise"

export const createDbConnection = async () => {
    const connection = await mysql.createConnection(process.env.DATABASE_URL ?? "")

    return connection
}


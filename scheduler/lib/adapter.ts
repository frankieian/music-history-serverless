import { createDbConnection } from "../config/db"
import { findUsersWithSpotify } from "./db"
import { sendSQSMessage } from "./sqs"
import { translateIntegrations } from "./translate"


export const schedulerAdapter = async() => {
    const sqlConnection = await createDbConnection()

    //Find all users with spotify integration
    let allUsers = await findUsersWithSpotify(sqlConnection)

    if(!allUsers.success || !allUsers.data) throw new Error("Could not get users")

    console.log('all users are', allUsers.data)

    let translation = translateIntegrations(allUsers.data)

    console.log('translation', translation)

    //Send message
    await sendSQSMessage(translation)
}
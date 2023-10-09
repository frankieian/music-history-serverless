import { EventBridgeEvent } from "aws-lambda";
import { schedulerAdapter } from "./lib/adapter";

export const schedulerHandler = async (event: EventBridgeEvent<any, any>) => {
    try {
        console.log("Scheduler runned!")

        await schedulerAdapter()
    } catch (err) {
        console.log(err)
        throw new Error('Message could not be completely processed')
    }
}

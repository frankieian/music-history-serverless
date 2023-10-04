import { SQSEvent } from "aws-lambda";
import { musicRunner } from "./lib/adapter";


export const musicHistoryHandler = async (event: SQSEvent) => {
    try {
        console.log("Example music history!")

        //Make sure this record is only one, other reject message
        let body = event?.Records?.length == 1 ? event?.Records[0] : null

        //if(!body) throw new Error("Invalid record sent")


        await musicRunner({provider: 'spotify', user_id: 0})
    } catch (err) {
        console.log(err)
        throw new Error('Message could not be completely processed')
    }
}

import { SQSEvent } from "aws-lambda";
import { musicRunner } from "./lib/adapter";


export const musicHistoryHandler = async (event: SQSEvent) => {
    try {
        console.log("Music history Handler!")

        //Make sure this record is only one, other reject message
        let record = event?.Records?.length == 1 ? event?.Records[0] : null

        console.log("Record", record?.body)

        if(!record || !record.body) throw new Error("Invalid record sent")

        let body = JSON.parse(record.body)


        await musicRunner(body)
    } catch (err) {
        console.log(err)
        throw new Error('Message could not be completely processed')
    }
}

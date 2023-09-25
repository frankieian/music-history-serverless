import { SQSEvent } from "aws-lambda";
import { musicRunner } from "./lib/adapter";


export const musicHistoryHandler = async (event: SQSEvent) => {
    console.log("Example music history!")


    await musicRunner({})
}

import { SQSEvent } from "aws-lambda";


export const schedulerHandler = async (event: SQSEvent) => {
    console.log("Example!")
}

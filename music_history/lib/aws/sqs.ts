import { SQSClient, SendMessageCommand, SendMessageCommandInput, SendMessageCommandOutput } from "@aws-sdk/client-sqs";
import { musicMessageBody } from "../../types/generic";

export const sendSQSMessage = async (bodies: musicMessageBody[]) => {
    const client = new SQSClient({ 
        region: process.env.SQS_REGION as string,
        credentials: {
            accessKeyId: process.env.SQS_ACCESS_KEY as string,
            secretAccessKey: process.env.SQS_SECRET_KEY as string
        }
    });

    for(let i = 0; i< bodies.length; i++){

        let body = bodies[i]
        let date = new Date()

        let input: SendMessageCommandInput = {
            QueueUrl: process.env.MUSIC_HISTORY_SQS_URL,
            MessageBody: JSON.stringify(body),
            MessageDeduplicationId: body.user_id + body.provider + date.toISOString(),
            MessageGroupId: body.user_id + body.provider
        }

        let command = new SendMessageCommand(input)

        let response = await client.send(command)
    }
}
import { musicMessageBody } from "../../music_history/types/generic";
import { integration } from "../types/integration";



export const translateIntegrations = (integrations: integration[]) => {

    let translate:musicMessageBody[] =  integrations.map(i => ({
        provider: i.provider,
        user_id: i.user_id
    }))

    return translate

}
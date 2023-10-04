


export type integration = {
    id: string,
    provider: string,
    user_id: number,
    refresh_token: string,
    status: string,
    created_at: Date
}

export type songDoc = {
    id: string,
    name: string,
    duration: number,
}

export type artistDoc = {
    id: string,
    name: string,
}
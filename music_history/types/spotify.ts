import {z} from "zod"

export type refresh_body = {
    grant_type: string,
    refresh_token: string,
    client_id: string,
    client_secret: string
}

export type refreshAuthTokenResponse = {
    access_token: string,
    token_type: string,
    expires_in: number,
    scope: string
}

export type recentlyPlayedRequest = {
    limit?: number,
    after?: number,
    before?: number
}
export const imageObjectSchema = z.object({
    url: z.string(),
    height: z.number(),
    width: z.number()
})

export const simplifiedArtistObjectSchema = z.object({
    external_urls: z.object({
        spotify: z.string(),
    }),
    href: z.string(),
    id: z.string(),
    name: z.string(),
    type: z.string(),
    uri: z.string()
})

export const artistObjectSchema = simplifiedArtistObjectSchema.extend({
    followers: z.object({
        href: z.string().nullable(),
        total:z.number()
    }),
    genres: z.array(z.string()),
    images: z.array(imageObjectSchema),
    popularity: z.number()
})

export type artistObject = z.infer<typeof artistObjectSchema>

export const trackObjectSchema = z.object({
    album: z.object({
        album_type: z.string(),
        total_tracks: z.number(),
        available_markets: z.array(z.string()),
        external_urls: z.object({
            spotify: z.string()
        }),
        href: z.string(),
        id: z.string(),
        images: z.array(imageObjectSchema),
        name: z.string(),
        release_data: z.string(),
        release_date_precision: z.string(),
        restrictions: z.object({
            reason: z.string(),
        }),
        type: z.string(),
        uri: z.string(),
        artists: z.array(simplifiedArtistObjectSchema)
    }),
    artists: z.array(artistObjectSchema),
    available_markets: z.array(z.string()),
    disc_number: z.number(),
    duration_ms: z.number(),
    explicit: z.boolean(),
    external_ids: z.object({
        isrc: z.string(),
        ean: z.string(),
        upc: z.string(),
    }),
    external_urls: z.object({
        spotify: z.string()
    }),
    href: z.string(),
    id: z.string(),
    is_playable: z.boolean(),
    linked_from: z.object({

    }),
    restrictions: z.object({
        reason: z.string(),
    }),
    name: z.string(),
    popularity: z.number(),
    preview_url: z.string().nullable(),
    track_number: z.number(),
    type: z.string(),
    uri: z.string(),
    is_local: z.boolean(),
})
export type trackObject = z.infer<typeof trackObjectSchema>

export const playHistorySchema = z.object({
    track: trackObjectSchema,
    played_at: z.string(),
    context: z.object({
        type: z.string(),
        href: z.string(),
        external_urls: z.object({
            spotify: z.string()
        }),
        uri: z.string()
    }).nullable().optional()
}).deepPartial()

export const recentlyPlayedResponseSchema = z.object({
    href: z.string(),
    limit: z.number(),
    next: z.string().nullable(),
    cursors: z.object({
        after: z.string(),
        before: z.string()
    }),
    total: z.optional(z.number().nullable()),
    items: z.array(playHistorySchema)
})

export type recentlyPlayedResponse = z.infer<typeof recentlyPlayedResponseSchema>




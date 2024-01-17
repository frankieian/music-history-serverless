


export type musicMessageBody = {
    provider: string,
    user_id: number,
    after?: number//use as the spotify after filter instead if this exists 
}

export type musicHistoryRecord = {
    //id: string,
    user_id: number,
    song_id: string,
    played_at: Date
}

export type song = {
    //id: number,
    name: string,
    duration: number,
    spotify_id: string
}
export type song_genre = {
    song_id: number,
    genre_id: number,
}

export type artist = {
    //id: number,
    name: string,
    spotify_id: string
}
 


export type artist_song = {
    artist_id: number,
    song_id: number
}

export type artist_genre = {
    artist_id: number,
    genre_id: number
}

export type artistData = {artist: artist}
export type songTranslate = {song: song,  artists: artistData[]}
export type translateData = songTranslate & {played_at: string}
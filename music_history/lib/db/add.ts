import { Connection } from "mysql2/promise";
import { artistData, musicHistoryRecord, songTranslate, translateData } from "../../types/generic";
import { obtainArtist, obtainSong } from "./get";
import { tableName } from "../../const/spotify";
import {v4 as uuid} from "uuid"

export const addMusicHistory = async (sqlConnection: Connection,translatedData: translateData[], user_id: number) => {
    for(let i = 0; i <translatedData.length; i++) {
        let data = translatedData[i]
        //Add song data
        await addSong(sqlConnection, data)

        //Add music history record
        let record:musicHistoryRecord = {
            user_id,
            song_id: data.song.spotify_id,
            played_at: new Date(data.played_at)
        }

        await sqlConnection.execute(
            'INSERT IGNORE INTO `history` VALUES(?, ?, ?)',
            [record.user_id, record.song_id, record.played_at]
        )
    }

}

export const addSong = async (sqlConnection: Connection, songData: songTranslate) => {
    const song = songData.song
    const songSpotifyId = song.spotify_id
    const artists = songData.artists

    await sqlConnection.execute(
        'INSERT IGNORE INTO `song` VALUES(?, ?, ?)',
        [songSpotifyId, song.name, song.duration]
    )

    //Add artist
    await addArtists(sqlConnection, artists)
}

export const addArtists = async (sqlConnection: Connection, artistData: artistData[]) => {
    let artists = artistData.map(({artist}) => [artist.spotify_id, artist.name])

    await sqlConnection.query(
        'INSERT IGNORE INTO `artist` VALUES (?)',
        artists
    )
}

export const addArtistSong = async (sqlConnection: Connection, songSpotifyId:string, artistSpotifyIds: string[]) => {
    for(let i = 0; i < artistSpotifyIds.length; i++) {
        let artist = artistSpotifyIds[i]
        await sqlConnection.execute(
            'INSERT INTO `artist_song` VALUES(?, ?)',
            [songSpotifyId, artist]
        )

    }
}
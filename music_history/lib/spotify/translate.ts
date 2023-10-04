//Translates the data into specific format

import * as genericType from "../../types/generic";
import { artistObject, recentlyPlayedResponse, trackObject } from "../../types/spotify";

export const translateSpotifyHistory = (response: recentlyPlayedResponse) => {
    const items = response.items
    const translatedDataArray:genericType.translateData[] = []

    for(let i = 0; i < items.length; i++) {
        const item = items[i]
        const track = item.track
        const played_at = item.played_at
        if(!played_at) continue //ignore track played

        let translation = translateSong(track as trackObject)

        translatedDataArray.push({...translation, played_at})
    }
    return translatedDataArray
}

export const parseDate = (dateString: string) => {
    
    let date = new Date(dateString)

    return date
}


export const translateArtist = (artistArray: artistObject[]): genericType.artistData []=> {
    let translation: genericType.artistData[] = []
    for(let i = 0; i < artistArray.length; i++) {
        let currentArtist = artistArray[i]
        let spotify_id = currentArtist.id
        let artistObject:genericType.artist = {
            name: currentArtist.name,
            spotify_id: spotify_id

        }
        translation.push({artist: artistObject})
    }

    return translation
}

export const translateSong = (track: trackObject): genericType.songTranslate => {
    const trackName = track?.name
    const artistArray = track?.artists

    const duration = track.duration_ms
    const spotify_id = track.id

    const songObject: genericType.song = {
        name: trackName,
        duration,
        spotify_id
    }

    const artists = translateArtist(artistArray)
    //TODO translate artists with genre

    return {
        song: songObject,
        artists
    }

}
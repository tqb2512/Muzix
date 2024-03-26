import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { song, album, artist, artist_contribute_song, playlist, user, playlist_song } from "@prisma/client";

interface Response {
    url: string;
}

interface Song extends song {
    playlist_song: playlist_song[];
    album: album & {
        artist: artist;
    };
    artist_contribute_song: artist_contribute_song & {
        artist: artist;
    }[];
}

interface Playlist extends playlist {
    user: user;
}


export const playlistsAPI = createApi({
    reducerPath: "playlists",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        getCoverById: builder.query<Response, string>({
            query: (id) => `playlists/cover?id=${id}` as string,
        }),
        getSongsById: builder.query<{ songs: Song[] }, string>({
            query: (id) => `playlists/${id}/songs` as string,
        }),
        getInfoById: builder.query<{ playlist: Playlist }, string>({
            query: (id) => `playlists/${id}` as string,
        }),
    }),
});

export const { useGetCoverByIdQuery, useGetSongsByIdQuery, useGetInfoByIdQuery } = playlistsAPI;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {artist, album, song, artist_contribute_song} from "@prisma/client";
interface Response {
    url: string;
}

interface Artist extends artist {
    album: album[];
}

interface Song extends song {
    album: album & {
        artist: artist;
    };
    artist_contribute_song: artist_contribute_song & {
        artist: artist;
    }[];
}

export const artistsAPI = createApi({
    reducerPath: "artists",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        getCoverById: builder.query<Response, string>({
            query: (id) => `artists/cover?id=${id}` as string,
        }),
        getInfoById: builder.query<{ artist: Artist }, string>({
            query: (id) => `artists/${id}` as string,
        }),
        getSongsById: builder.query<{ songs: Song[] }, string>({
            query: (id) => `artists/${id}/songs` as string,
        }),
    }),
});

export const { useGetCoverByIdQuery, useGetInfoByIdQuery, useGetSongsByIdQuery } = artistsAPI;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { song, album, artist, artist_contribute_song } from "@prisma/client";

interface Song extends song {
    album: album & {
        artist: artist;
    };
    artist_contribute_song: artist_contribute_song & {
        artist: artist;
    }[];
}

export const songsAPI = createApi({
    reducerPath: "songs",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        getFileById: builder.query<Response, string>({
            query: (id) => `songs/getFile?id=${id}` as string,
        }),
        getInfoById: builder.query<{ songs: Song[] }, string>({
            query: (id) => `songs/getInfo?id=${id}` as string,
        }),
    }),
});

export const { useGetFileByIdQuery, useGetInfoByIdQuery } = songsAPI;
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {album, artist, artist_contribute_song, song} from "@prisma/client";

interface Response {
    url: string;
}

interface Song extends song {
    album: album & {
        artist: artist;
    };
    artist_contribute_song: artist_contribute_song & {
        artist: artist;
    }[];
}

interface Album extends album {
    artist: artist;
}

export const albumsAPI = createApi({
    reducerPath: "albums",
    baseQuery: fetchBaseQuery({baseUrl: "/api"}),
    endpoints: (builder) => ({
        getCoverById: builder.query<Response, string>({
            query: (id) => `albums/cover?id=${id}` as string,
        }),
        getInfoById: builder.query<{ album: Album }, string>({
            query: (id) => `albums/${id}` as string,
        }),
        getSongsById: builder.query<{ songs: Song[] }, string>({
            query: (id) => `albums/${id}/songs` as string,
        }),
    }),
});

export const {useGetCoverByIdQuery, useGetInfoByIdQuery, useGetSongsByIdQuery} = albumsAPI;
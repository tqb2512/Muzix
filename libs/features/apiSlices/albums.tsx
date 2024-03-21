import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { song, album } from "@prisma/client";
interface Response {
    url: string;
}

export const albumsAPI = createApi({
    reducerPath: "albums",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        getCoverbyId: builder.query<Response, string>({
            query: (id) => `albums/cover?id=${id}` as string,
        }),
        getInfoById: builder.query<album, string>({
            query: (id) => `albums/${id}` as string,
        }),
        getSongsById: builder.query<{ songs: song[] }, string>({
            query: (id) => `albums/${id}/songs` as string,
        }),
    }),
});

export const { useGetCoverbyIdQuery, useGetInfoByIdQuery, useGetSongsByIdQuery } = albumsAPI;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Response {
    url: string;
}

export const songsAPI = createApi({
    reducerPath: "songs",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        getSongbyId: builder.query<Response, string>({
            query: (id) => `songs/get?id=${id}` as string,
        }),
    }),
});

export const { useGetSongbyIdQuery } = songsAPI;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    }),
});

export const { useGetCoverbyIdQuery } = albumsAPI;
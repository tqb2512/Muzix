import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Response {
    url: string;
}

export const artistsAPI = createApi({
    reducerPath: "artists",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        getCoverbyId: builder.query<Response, string>({
            query: (id) => `artists/cover?id=${id}` as string,
        }),
    }),
});

export const { useGetCoverbyIdQuery } = artistsAPI;
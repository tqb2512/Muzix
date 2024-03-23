import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Response {
    url: string;
}

export const usersAPI = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        getCoverbyId: builder.query<Response, string>({
            query: (id) => `users/cover?id=${id}` as string,
        }),
    }),
});

export const { useGetCoverbyIdQuery } = usersAPI;
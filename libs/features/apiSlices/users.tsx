import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Response {
    url: string;
}

export const usersAPI = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        getCoverById: builder.query<Response, string>({
            query: (id) => `users/cover?id=${id}` as string,
        }),
    }),
});

export const { useGetCoverByIdQuery } = usersAPI;
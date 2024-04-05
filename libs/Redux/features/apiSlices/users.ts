import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {user, playlist, artist, album} from "@prisma/client";

interface Response {
    url: string;
}

interface User extends user {
    playlist: playlist[];
    user_following_artist: {
        artist: artist;
    }[];
    user_following_playlist: {
        playlist: {
            user: user;
        }
    }[];
    user_like_album: {
        album: {
            artist: artist;
        }
    }[];
    user_like_song: {
        song: {
            album: {
                artist: artist;
            }
        }
    }[];
}

export const usersAPI = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        getCoverById: builder.query<Response, string>({
            query: (id) => `users/cover?id=${id}` as string,
        }),
        getUserById: builder.query<{ user: User }, string>({
            query: (id) => `users/${id}` as string,
        }),
    }),
});

export const { useGetCoverByIdQuery, useGetUserByIdQuery  } = usersAPI;
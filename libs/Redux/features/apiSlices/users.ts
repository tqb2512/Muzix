import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { user, playlist, artist, album, song, user_following_artist, user_following_playlist, user_like_album, user_like_song, subscription } from "@prisma/client";

interface Response {
    url: string;
}

interface User extends user {
    playlist: playlist[];
    user_following_artist: user_following_artist & {
        artist: artist;
    }[];
    user_following_playlist: user_following_playlist & {
        playlist: playlist & {
            user: user;
        }
    }[];
    user_like_album: user_like_album & {
        album: album & {
            artist: artist;
        }
    }[];
    user_like_song: user_like_song & {
        song: song & {
            album: album & {
                artist: artist;
            }
        }
    }[];
}

interface UserAction {
    user_id: string;
    action: "follow" | "unfollow" | "like" | "unlike" | "create";
    type: "artist" | "playlist" | "user" | "song" | "album";
    id: string;
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
        sendAction: builder.mutation<void, UserAction>({
            query: (body) => ({
                url: `users/${body.user_id}`,
                method: "POST",
                body: body,
            }),
        }),
        getSubscription: builder.query<{subscription: subscription}, string>({
            query: (id) => `users/${id}/subscription` as string,
        }),
    }),
});

export const { useGetCoverByIdQuery, useGetUserByIdQuery, useSendActionMutation, useGetSubscriptionQuery } = usersAPI;
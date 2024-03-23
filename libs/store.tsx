import { configureStore } from "@reduxjs/toolkit";
import player from "./features/slices/player";
import queue from "./features/slices/queue";
import user from "./features/slices/user";
import { songsAPI } from "./features/apiSlices/songs";
import { albumsAPI } from "./features/apiSlices/albums";
import { playlistsAPI } from "./features/apiSlices/playlists";
import { sectionsAPI } from "./features/apiSlices/sections";
import { artistsAPI } from "./features/apiSlices/artists";
import { usersAPI } from "./features/apiSlices/users";

export const store = configureStore({
    reducer: {
        player,
        queue,
        user,
        [songsAPI.reducerPath]: songsAPI.reducer,
        [albumsAPI.reducerPath]: albumsAPI.reducer,
        [playlistsAPI.reducerPath]: playlistsAPI.reducer,
        [sectionsAPI.reducerPath]: sectionsAPI.reducer,
        [artistsAPI.reducerPath]: artistsAPI.reducer,
        [usersAPI.reducerPath]: usersAPI.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(songsAPI.middleware, albumsAPI.middleware, playlistsAPI.middleware, sectionsAPI.middleware, artistsAPI.middleware, usersAPI.middleware);
    }

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
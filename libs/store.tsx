import { configureStore } from "@reduxjs/toolkit";
import player from "./features/slices/player";
import queue from "./features/slices/queue";
import { songsAPI } from "./features/apiSlices/songs";
import { albumsAPI } from "./features/apiSlices/albums";
import { playlistsAPI } from "./features/apiSlices/playlists";
import { sectionsAPI } from "./features/apiSlices/sections";
import { artistsAPI } from "./features/apiSlices/artists";

export const store = configureStore({
    reducer: {
        player,
        queue,
        [songsAPI.reducerPath]: songsAPI.reducer,
        [albumsAPI.reducerPath]: albumsAPI.reducer,
        [playlistsAPI.reducerPath]: playlistsAPI.reducer,
        [sectionsAPI.reducerPath]: sectionsAPI.reducer,
        [artistsAPI.reducerPath]: artistsAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(songsAPI.middleware, albumsAPI.middleware, playlistsAPI.middleware, sectionsAPI.middleware, artistsAPI.middleware);
    }

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
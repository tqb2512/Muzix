import { configureStore } from "@reduxjs/toolkit";
import player from "./features/slices/player";
import queue from "./features/slices/queue";
import { songsAPI } from "./features/apiSlices/songs";

export const store = configureStore({
    reducer: {
        player,
        queue,
        [songsAPI.reducerPath]: songsAPI.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(songsAPI.middleware);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
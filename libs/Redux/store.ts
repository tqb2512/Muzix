import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, REGISTER, PAUSE, PERSIST, PURGE } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import player from "./features/slices/player";
import queue from "./features/slices/queue";
import user from "./features/slices/user";
import { songsAPI } from "./features/apiSlices/songs";
import { albumsAPI } from "./features/apiSlices/albums";
import { playlistsAPI } from "./features/apiSlices/playlists";
import { sectionsAPI } from "./features/apiSlices/sections";
import { artistsAPI } from "./features/apiSlices/artists";
import { usersAPI } from "./features/apiSlices/users";

const rootReducer = combineReducers({
    player,
    queue,
    user,
    [songsAPI.reducerPath]: songsAPI.reducer,
    [albumsAPI.reducerPath]: albumsAPI.reducer,
    [playlistsAPI.reducerPath]: playlistsAPI.reducer,
    [sectionsAPI.reducerPath]: sectionsAPI.reducer,
    [artistsAPI.reducerPath]: artistsAPI.reducer,
    [usersAPI.reducerPath]: usersAPI.reducer
});

export function createPersistStore() {
    const isServer = typeof window === "undefined";
    if (isServer) {
        return {
            getItem() {
                return Promise.resolve(null);
            },
            setItem() {
                return Promise.resolve();
            },
            removeItem() {
                return Promise.resolve();
            },
        };
    }
    return createWebStorage("local");
}
const storage = typeof window !== "undefined"
    ? createWebStorage("local")
    : createPersistStore();

const persist = {
    key: 'root',
    storage: storage,
    blacklist: [songsAPI.reducerPath, albumsAPI.reducerPath, playlistsAPI.reducerPath, sectionsAPI.reducerPath, artistsAPI.reducerPath, usersAPI.reducerPath]
}

const persistedReducer = persistReducer(persist, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (
        getDefaultMiddleware => getDefaultMiddleware({
            serializableCheck: false,
        }).concat(
            songsAPI.middleware,
            albumsAPI.middleware,
            playlistsAPI.middleware,
            sectionsAPI.middleware,
            artistsAPI.middleware,
            usersAPI.middleware,
        )
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { song } from "@prisma/client";
import { setSong } from "../slices/player";

export interface Queue {
    songs: song[];
}

const initialState: Queue = {
    songs: [],
};

const queueSlice = createSlice({
    name: "songQueue",
    initialState,
    reducers: {
        play: (state, action: PayloadAction<song>) => {
            state.songs.unshift(action.payload);
            setSong(action.payload);
        },
        clear: (state) => {
            state.songs = [];
        },
        push: (state, action: PayloadAction<song>) => {
            state.songs.push(action.payload);
        },
        shift: (state) => {
            state.songs.shift();
        },
        removeAtIndex: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            if (index >= 0 && index < state.songs.length) {
                state.songs.splice(index, 1);
            }
        },
        playAtIndex: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            if (index >= 0 && index < state.songs.length) {
                const song = state.songs[index];
                state.songs.splice(index, 1);
                state.songs.unshift(song);
                setSong(song);
            }
        }
    },
});

export const { play, clear, push, shift, removeAtIndex, playAtIndex } = queueSlice.actions;
export default queueSlice.reducer;
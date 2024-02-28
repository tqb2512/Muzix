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
    },
});

export const { play, clear, push, shift, removeAtIndex } = queueSlice.actions;
export default queueSlice.reducer;
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {song} from "@prisma/client";

export interface Player {
    song: song;
    urlSource: string;
    urlImage: string;
    time: number;
    status: "playing" | "paused" | "stopped";
}

const initialState: Player = {
    song: {} as song,
    urlSource: "",
    urlImage: "",
    time: 0,
    status: "stopped",
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setUrlSource: (state, action: PayloadAction<string>) => {
            state.urlSource = action.payload;
        },
        setUrlImage: (state, action: PayloadAction<string>) => {
            state.urlImage = action.payload;
        },
        setSong: (state, action: PayloadAction<song>) => {
            state.song = action.payload;
        },
        setTime: (state, action: PayloadAction<number>) => {
            state.time = action.payload;
        },
        setStatus: (state, action: PayloadAction<"playing" | "paused" | "stopped">) => {
            state.status = action.payload;
        },
    },
});

export const {setUrlSource, setUrlImage, setSong, setTime, setStatus} = playerSlice.actions;
export default playerSlice.reducer;

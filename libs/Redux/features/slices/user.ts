import {
    album,
    artist,
    playlist,
    song,
    user,
    user_following_artist,
    user_following_playlist,
    user_like_album,
    user_like_song
} from "@prisma/client";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface User extends user {
    playlist: playlist[];
    user_following_artist: (user_following_artist & {
        artist: artist;
    })[];
    user_following_playlist: (user_following_playlist & {
        playlist: playlist & {
            user: user;
        }
    })[];
    user_like_album: (user_like_album & {
        album: album & {
            artist: artist;
        }
    })[];
    user_like_song: (user_like_song & {
        song: song & {
            album: album & {
                artist: artist;
            }
        }
    })[];
}

const userSlice = createSlice({
    name: "user",
    initialState: {} as User,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            return action.payload;
        },
        clearUser: (state) => {
            return {} as User;
        },
        followArtist: (state, action: PayloadAction<{ artist: artist, user_id: string }>) => {
            state.user_following_artist.push(
                {
                    artist: action.payload.artist,
                    created_at: new Date(),
                    user_id: action.payload.user_id,
                    artist_id: action.payload.artist.artist_id,
                }
            );
        },
        unfollowArtist: (state, action: PayloadAction<string>) => {
            const index = state.user_following_artist.findIndex((follow) => follow.artist.artist_id === action.payload);
            if (index !== -1) {
                state.user_following_artist.splice(index, 1);
            }
        },
        likeAlbum: (state, action: PayloadAction<{ album: album, artist: artist, user_id: string }>) => {
            state.user_like_album.push(
                {
                    album: {
                        ...action.payload.album,
                        artist: action.payload.artist,
                    },
                    created_at: new Date(),
                    user_id: action.payload.user_id,
                    album_id: action.payload.album.album_id,
                }
            );
        },
        unlikeAlbum: (state, action: PayloadAction<string>) => {
            const index = state.user_like_album.findIndex((like) => like.album.album_id === action.payload);
            if (index !== -1) {
                state.user_like_album.splice(index, 1);
            }
        },
        likeSong: (state, action: PayloadAction<{ song: song, album: album, artist: artist, user_id: string }>) => {
            state.user_like_song.push(
                {
                    song: {
                        ...action.payload.song,
                        album: {
                            ...action.payload.album,
                            artist: action.payload.artist,
                        },
                    },
                    created_at: new Date(),
                    user_id: action.payload.user_id,
                    song_id: action.payload.song.song_id,
                }
            );
        },
        unlikeSong: (state, action: PayloadAction<string>) => {
            const index = state.user_like_song.findIndex((like) => like.song.song_id === action.payload);
            if (index !== -1) {
                state.user_like_song.splice(index, 1);
            }
        },
        followPlaylist: (state, action: PayloadAction<{ playlist: playlist, user: user, user_id: string }>) => {
            state.user_following_playlist.push(
                {
                    playlist: {
                        ...action.payload.playlist,
                        user: action.payload.user,
                    },
                    created_at: new Date(),
                    user_id: action.payload.user_id,
                    playlist_id: action.payload.playlist.playlist_id,
                }
            );
        },
        unfollowPlaylist: (state, action: PayloadAction<string>) => {
            const index = state.user_following_playlist.findIndex((follow) => follow.playlist.playlist_id === action.payload);
            if (index !== -1) {
                state.user_following_playlist.splice(index, 1);
            }
        },
        addPlaylist: (state, action: PayloadAction<playlist>) => {
            state.playlist.push(action.payload);
        },
        removePlaylist: (state, action: PayloadAction<string>) => {
            const index = state.playlist.findIndex((playlist) => playlist.playlist_id === action.payload);
            if (index !== -1) {
                state.playlist.splice(index, 1);
            }
        },
    },
});

export const {
    setUser,
    clearUser,
    followArtist,
    unfollowArtist,
    likeAlbum,
    unlikeAlbum,
    likeSong,
    unlikeSong,
    followPlaylist,
    unfollowPlaylist,
    addPlaylist,
    removePlaylist
} = userSlice.actions;
export default userSlice.reducer;
import {NextResponse} from "next/server";
import {elastic, prisma} from "@/app/api/base";
import {album, artist, artist_contribute_song, playlist, song, user} from "@prisma/client";

const SongsPoints = {
    liked: 0.3,
    followedArtist: 0.2,
    matchLyrics: 0.1,
}

const AlbumsPoints = {
    liked: 0.3,
    followedArtist: 0.2,
}

const ArtistsPoints = {
    followed: 0.7,
}

const PlaylistsPoints = {
    followed: 0.2,
    followedUser: 0.2,
}

export interface Song extends song {
    type: "song",
    points: number,
    album: album & {
        artist: artist
    },
    artist_contribute_song: (artist_contribute_song & {
        artist: artist
    })[]
}

export interface Album extends album {
    type: "album",
    points: number,
    artist: artist
}

export interface Artist extends artist {
    type: "artist",
    points: number
}

export interface Playlist extends playlist {
    type: "playlist",
    points: number,
    user: user
}

export interface Result {
    topResult: Song | Album | Artist | Playlist | null;
    songs: Song[];
    albums: Album[];
    artists: Artist[];
    playlists: Playlist[];
}

export async function GET(req: Request) {
    const query = new URL(req.url).searchParams.get("query") || "";
    const userId = new URL(req.url).searchParams.get("userId") || "";

    if (!userId) {
        return NextResponse.json({error: "userId is required"}, {status: 400});
    }

    const user = await prisma.user.findUnique({
        where: {
            user_id: userId
        },
        include: {
            user_following_artist: true,
            user_following_playlist: true,
            user_like_album: true,
            user_like_song: true,
            playlist: true,
        }
    });

    let matchQueryResult: any[] = [];

    await elastic.search({
        index: "muzix",
        q: query,
    }).then((res) => {
        matchQueryResult = res.hits.hits;
    });

    if (matchQueryResult.length === 0) {
        return NextResponse.json({error: "No results found"}, {status: 404});
    }

    let Result: Result = {
        topResult: null,
        songs: [],
        albums: [],
        artists: [],
        playlists: [],
    }

    const prismaSongs = await prisma.song.findMany({
        where: {
            song_id: {
                in: matchQueryResult.filter((result) => result._source.table === "song").map((result) => result._source.public_song_song_id)
            }
        },
        include: {
            album: {
                include: {
                    artist: true
                }
            },
            artist_contribute_song: {
                include: {
                    artist: true
                }
            }
        }
    });


    const prismaAlbums = await prisma.album.findMany({
        where: {
            album_id: {
                in: matchQueryResult.filter((result) => result._source.table === "album").map((result) => result._source.public_album_album_id)

            },
        },
        include: {
            artist: true
        }
    });

    const prismaArtists = await prisma.artist.findMany({
        where: {
            artist_id: {
                in: matchQueryResult.filter((result) => result._source.table === "artist").map((result) => result._source.public_artist_artist_id)

            }
        }
    });

    const prismaPlaylists = await prisma.playlist.findMany({
        where: {
            playlist_id: {
                in: matchQueryResult.filter((result) => result._source.table === "playlist").map((result) => result._source.public_playlist_playlist_id)

            }
        },
        include: {
            user: true
        }
    });

    const songs: Song[] = prismaSongs.map((song) => {
        let points = matchQueryResult.find((result) => result._source.public_song_song_id === song.song_id)?._score || 0;

        if (user) {
            if (user.user_like_song.some((like) => like.song_id === song.song_id)) {
                points += SongsPoints.liked;
            }

            if (user.user_following_artist.some((follow) => follow.artist_id === song.album.artist_id)) {
                points += SongsPoints.followedArtist;
            }

            if (song.artist_contribute_song.some((artist) => user.user_following_artist.some((follow) => follow.artist_id === artist.artist_id))) {
                points += SongsPoints.followedArtist;
            }
        }

        return {
            ...song,
            type: "song",
            points
        }
    });

    const albums: Album[] = prismaAlbums.map((album) => {
        let points = matchQueryResult.find((result) => result._source.public_album_album_id === album.album_id)?._score || 0;

        if (user) {
            if (user.user_like_album.some((like) => like.album_id === album.album_id)) {
                points += AlbumsPoints.liked;
            }

            if (user.user_following_artist.some((follow) => follow.artist_id === album.artist_id)) {
                points += AlbumsPoints.followedArtist;
            }
        }

        return {
            ...album,
            type: "album",
            points
        }
    });

    const artists: Artist[] = prismaArtists.map((artist) => {
        let points = matchQueryResult.find((result) => result._source.public_artist_artist_id === artist.artist_id)?._score || 0;

        if (user) {
            if (user.user_following_artist.some((follow) => follow.artist_id === artist.artist_id)) {
                points += ArtistsPoints.followed;
            }
        }

        return {
            ...artist,
            type: "artist",
            points
        }
    });

    const playlists: Playlist[] = prismaPlaylists.map((playlist) => {
        let points = matchQueryResult.find((result) => result._source.public_playlist_playlist_id === playlist.playlist_id)?._score || 0;

        if (user) {
            if (user.user_following_playlist.some((follow) => follow.playlist_id === playlist.playlist_id)) {
                points += PlaylistsPoints.followed;
            }

            if (user.playlist.some((userPlaylist) => userPlaylist.playlist_id === playlist.playlist_id)) {
                points += PlaylistsPoints.followedUser;
            }
        }

        return {
            ...playlist,
            type: "playlist",
            points
        }
    });

    Result.songs = songs.sort((a, b) => b.points - a.points);
    Result.albums = albums.sort((a, b) => b.points - a.points);
    Result.artists = artists.sort((a, b) => b.points - a.points);
    Result.playlists = playlists.sort((a, b) => b.points - a.points);
    Result.topResult = Math.max(Result.songs[0]?.points || 0, Result.albums[0]?.points || 0, Result.artists[0]?.points || 0, Result.playlists[0]?.points || 0) === 0 ? null : [...Result.songs, ...Result.albums, ...Result.artists, ...Result.playlists].sort((a, b) => b.points - a.points)[0];

    return NextResponse.json({Result}, {status: 200});
}
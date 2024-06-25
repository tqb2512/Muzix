import {NextResponse} from "next/server";
import {prisma, s3Client} from "@/app/api/base";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import {readFileSync} from "fs";

export async function GET(req: Request) {

    const user_id = req.url.split("/").pop() || "";

    if (user_id === "") {
        return NextResponse.json({error: "No user_id provided"}, {status: 400});
    }

    const user = await prisma.user.findUnique({
        where: {
            user_id: user_id
        },
        include: {
            playlist: true,
            user_following_artist: {
                include: {
                    artist: true
                }
            },
            user_following_playlist: {
                include: {
                    playlist: {
                        include: {
                            user: true
                        }

                    }
                }
            },
            user_like_album: {
                include: {
                    album: {
                        include: {
                            artist: true
                        }
                    }
                }
            },
            user_like_song: {
                include: {
                    song: {
                        include: {
                            album: {
                                include: {
                                    artist: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    return NextResponse.json({user}, {status: 200});
}

export async function POST(req: Request) {
    const {action, type, id} = await req.json();
    const user_id = req.url.split("/").pop()?.split("?")[0] || "";
    const playlist_id = new URL(req.url).searchParams.get("playlist_id") || ""

    if (user_id === "") {
        return NextResponse.json({error: "No user_id provided"}, {status: 400});
    }

    switch (action) {
        case "follow":
            switch (type) {
                case "artist":
                    await prisma.user_following_artist.create({
                        data: {
                            user_id: user_id,
                            artist_id: id
                        }
                    });
                    break;
                case "playlist":
                    await prisma.user_following_playlist.create({
                        data: {
                            user_id: user_id,
                            playlist_id: id
                        }
                    });
                    break;
                case "user":
                    await prisma.user_following_user.create({
                        data: {
                            user1_id: user_id,
                            user2_id: id
                        }
                    });
                    break;
                default:
                    return NextResponse.json({error: "Invalid type"}, {status: 400});
            }
            break;
        case "like":
            switch (type) {
                case "song":
                    await prisma.user_like_song.create({
                        data: {
                            user_id: user_id,
                            song_id: id
                        }
                    });
                    break;
                case "album":
                    await prisma.user_like_album.create({
                        data: {
                            user_id: user_id,
                            album_id: id
                        }
                    });
                    break;
                default:
                    return NextResponse.json({error: "Invalid type"}, {status: 400});
            }
            break;
        case "unfollow":
            switch (type) {
                case "artist":
                    await prisma.user_following_artist.delete({
                        where: {
                            user_id_artist_id: {
                                user_id: user_id,
                                artist_id: id
                            }
                        }
                    });
                    break;
                case "playlist":
                    await prisma.user_following_playlist.delete({
                        where: {
                            user_id_playlist_id: {
                                user_id: user_id,
                                playlist_id: id
                            }
                        }
                    });
                    break;
                case "user":
                    await prisma.user_following_user.delete({
                        where: {
                            user1_id_user2_id: {
                                user1_id: user_id,
                                user2_id: id
                            }
                        }
                    });
                    break;
                default:
                    return NextResponse.json({error: "Invalid type"}, {status: 400});
            }
            break;
        case "unlike":
            switch (type) {
                case "song":
                    await prisma.user_like_song.delete({
                        where: {
                            user_id_song_id: {
                                user_id: user_id,
                                song_id: id
                            }
                        }
                    });
                    break;
                case "album":
                    await prisma.user_like_album.delete({
                        where: {
                            user_id_album_id: {
                                user_id: user_id,
                                album_id: id
                            }
                        }
                    });
                    break;
                default:
                    return NextResponse.json({error: "Invalid type"}, {status: 400});
            }
            break;
        case "create":
            switch (type) {
                case "playlist":
                    const playlist = await prisma.playlist.create({
                        data: {
                            user_id: user_id,
                            name: "New Playlist",
                        }
                    })
                    s3Client.send(new PutObjectCommand({
                        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET || "",
                        Key: `Images/Playlists/${playlist.playlist_id}/cover.jpg`,
                        Body: await readFileSync("public/next.svg"),
                        ContentType: "image/jpeg"
                    }));
                    break;
            }
            break;
        case "remove":
            switch (type) {
                case "playlist":
                    await prisma.playlist.delete({
                        where: {
                            playlist_id: id
                        }
                    });
                    break;
                case "song":
                    await prisma.playlist_song.delete({
                        where: {
                            playlist_id_song_id: {
                                playlist_id: playlist_id,
                                song_id: id
                            }
                        }
                    });
                    break;
            }
            break;
        case "add":
            switch (type) {
                case "song":
                    await prisma.playlist_song.create({
                        data: {
                            playlist_id: playlist_id,
                            song_id: id
                        }
                    });
                    break;
            }
            break;
        default:
            return NextResponse.json({error: "Invalid action"}, {status: 400});
    }

    return NextResponse.json({success: true}, {status: 200});
}
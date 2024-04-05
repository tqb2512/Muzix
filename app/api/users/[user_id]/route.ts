import { NextResponse } from "next/server";
import { prisma } from "@/app/api/base";

export async function GET(req: Request) {

    const user_id = req.url.split("/").pop() || "";

    if (user_id === "") {
        return NextResponse.json({ error: "No user_id provided" }, { status: 400 });
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

    return NextResponse.json({ user }, { status: 200 });
}
"use client"
import React from "react";
import { song, album, artist } from "@prisma/client";
import * as queue from "@/libs/features/slices/queue";
import { useDispatch } from "react-redux";
import Link from "next/link";
import HomeContainer from "@/components/HomeContainer";

interface Song extends song {
  album: album & {
    artist: artist;
  };
}

export default function Home() {

  const dispatch = useDispatch();
  const [songs, setSongs] = React.useState<Song[]>([]);

  React.useEffect(() => {
    fetch("/api/songs")
      .then((res) => res.json())
      .then((data) => {
        setSongs(data.songs);
      });
  }, []);

  return (
    <div className="h-full">
      <HomeContainer />
    </div>
  );
}

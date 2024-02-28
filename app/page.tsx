"use client"
import React from "react";
import { song, album, artist } from "@prisma/client";
import * as queue from "@/libs/features/slices/queue";
import { useDispatch } from "react-redux";

interface Song extends song{
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
    <div>
      <ul>
        {songs.map((song) => {
          return (
            <li key={song.song_id}>
              {song.name} - {song.album.name} - {song.album.artist.name}
              <button onClick={() => dispatch(queue.play(song))}>Play</button>
              <button onClick={() => dispatch(queue.push(song))}>Add to Queue</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

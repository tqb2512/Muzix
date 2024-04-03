"use client";
import * as sectionsAPI from "@/libs/features/apiSlices/sections";
import React, {useEffect} from "react";
import Section from "./Section";
import {album, artist, playlist, section, section_albums, section_artists, section_playlists} from "@prisma/client";

interface Section extends section {
    section_albums: section_albums & {
        album: album & {
            artist: artist
        }
    }[];
    section_artists: section_artists & {
        artist: artist
    }[];
    section_playlists: section_playlists & {
        playlist: playlist
    }[];
}

export default function HomeContainer() {

    const [sections, setSections] = React.useState<Section[]>([]);
    const {data} = sectionsAPI.useGetSectionsQuery(20);

    useEffect(() => {
        if (data) {
            setSections(data.sections);
        }
    }, [data]);

    return (
        <div>
            <div>
                {sections.map((section) => (
                    <Section key={section.section_id} section={section}/>
                ))}
            </div>
            <div>
                {sections.map((section) => (
                    <Section key={section.section_id} section={section}/>
                ))}
            </div>
            <div>
                {sections.map((section) => (
                    <Section key={section.section_id} section={section}/>
                ))}
            </div>
            <div>
                {sections.map((section) => (
                    <Section key={section.section_id} section={section}/>
                ))}
            </div>
            <div>
                {sections.map((section) => (
                    <Section key={section.section_id} section={section}/>
                ))}
            </div>
            <div>
                {sections.map((section) => (
                    <Section key={section.section_id} section={section}/>
                ))}
            </div>
        </div>
    )
}
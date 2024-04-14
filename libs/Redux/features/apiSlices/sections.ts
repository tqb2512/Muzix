import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { section, section_albums, section_artists, section_playlists, album, artist, playlist } from "@prisma/client";

export interface Section extends section {
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

export const sectionsAPI = createApi({
    reducerPath: "sections",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        getSections: builder.query<{ sections: Section[] }, number>({
            query: (limit) => `sections?limit=${limit}` as string,
        }),
        getSectionById: builder.query<{ section: Section }, string>({
            query: (section_id) => `sections/${section_id}` as string,
        }),
    }),
});

export const { useGetSectionsQuery, useGetSectionByIdQuery } = sectionsAPI;
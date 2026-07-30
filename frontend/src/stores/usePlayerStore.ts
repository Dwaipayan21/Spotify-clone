import type { Song } from "@/types";
import {create} from "zustand";

interface PlayerStore {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;

    initializeQueue: (songs: Song[]) => void;
    playAlbum:(songs:Song[], startIndex?: number) => void;
    setCurrentSong: (song: Song | null) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    initializeQueue:(songs: Song[]) => {
        set({
            queue:songs,
            currentSong: get().currentSong || songs[0],
            currentIndex: get().currentIndex === -1 ?0: get().currentIndex

        })
    },

    playAlbum: (songs: Song[], startIndex?: number) => {
        if(songs.length ===0) return; //if there is no song

        const safeStartIndex = startIndex ?? 0;
        const song  = songs[safeStartIndex];

        set({
            queue: songs,
            currentSong: song,
            currentIndex: startIndex,
            isPlaying: true,
        });
    },

    setCurrentSong: (song: Song | null) => {
        if(!song) return; // if there is no song

        const songIndex = get().queue.findIndex(s=> s._id === song._id); //find the song index

        set({
            currentSong: song,
            isPlaying: true,
            currentIndex:  songIndex !== -1 ? songIndex : get().currentIndex,
        });
    },
    togglePlay: () =>{
        const willStartPlaying = !get().isPlaying;

        //negate the state
        set({
            isPlaying: willStartPlaying,
        })
    },
    playNext: () => {
        const { currentIndex, queue} = get();
        const nextIndex = currentIndex+1;

        //if there is a next song to play ,play it
        if(nextIndex< queue.length){
            const nextSong = queue[nextIndex]
            set({
                currentSong: nextSong,
                currentIndex: nextIndex,
                isPlaying: true,
            });
        } else{
            // no next song
            set({ isPlaying: false});
        }
    },
    playPrevious: () => {
        const { currentIndex, queue} = get();
        const previousIndex = currentIndex-1;

        // previous song exists
        if(previousIndex>=0){
            const prevSong = queue[previousIndex];

            set({
                currentSong:prevSong,
                currentIndex: previousIndex,
                isPlaying: true,
            });
        } else {
            //no prev song
            set({ isPlaying: false});
        }
    },
}));
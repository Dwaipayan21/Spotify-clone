import { axiosInstance } from "@/lib/axios";
import type { Album, Song } from "@/types";
import { create } from "zustand";

interface MusicStore {
    songs: Song[];
    albums: Album[];
    isAlbumLoading: boolean;
    isSongsLoading:boolean;
    error: string | null;
    currentAlbum: Album | null;
    featuredSongs: Song[];
    madeForYouSongs: Song[];
    trendingSongs: Song[];
    

    fetchAlbums : () => Promise<void>;
    fetchAlbumById: (id: string) => Promise<void>;
    fetchFeaturedSongs : () => Promise<void>;
    fetchMadeForYouSongs: () => Promise<void>;
    fetchTreandingSongs: ()=> Promise<void>;

};

export const useMusicStore = create<MusicStore>((set) => ({
    albums:[],
    songs:[],
    isAlbumLoading:false,
    isSongsLoading:false,
    error: null,
    currentAlbum:null,
    madeForYouSongs:[],
    featuredSongs: [],
    trendingSongs: [],

    fetchAlbums: async () => {
        //data fetch logic...
        set({isAlbumLoading : true, error: null });

        try {
          const response = await axiosInstance.get("/albums");
          set({albums : response.data});  
        } catch (error: any) {
            set({ error: error.response.data.message });
        }finally{
            set({ isAlbumLoading : false });
        }
    },

    fetchAlbumById: async (id) => {
        set({isAlbumLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/albums/${id}`);
            set({currentAlbum: response.data})
        } catch (error: any) {
            set({error: error.response.data.message});
        }finally{
            set({ isAlbumLoading: false});
        }
    },

    fetchFeaturedSongs: async () => {
        set({ isSongsLoading:true, error: null});
        try {
            const response = await axiosInstance.get("/songs/featured");
            set({featuredSongs: response.data})
        } catch (error: any) {
            set({error: error.response.data.message});
        } finally{
            set({isSongsLoading: false});
        }
    },

    fetchMadeForYouSongs: async() => {
         set({isSongsLoading:true, error: null});
        try {
            const response = await axiosInstance.get("/songs/made-for-you");
            set({featuredSongs: response.data})
        } catch (error: any) {
            set({error: error.response.data.message});
        } finally{
            set({isSongsLoading: false});
        }
    },

    fetchTreandingSongs: async() => {
         set({isSongsLoading:true, error: null});
        try {
            const response = await axiosInstance.get("/songs/trending");
            set({featuredSongs: response.data})
        } catch (error: any) {
            set({error: error.response.data.message});
        } finally{
            set({isSongsLoading: false});
        }
    },
}));
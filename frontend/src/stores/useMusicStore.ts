import { axiosInstance } from "@/lib/axios";
import type { Album, Song, Stats } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface MusicStore {
    songs: Song[];
    albums: Album[];
    isAlbumLoading: boolean;
    isSongsLoading:boolean;
    isStatsLoading: boolean;
    error: string | null;
    currentAlbum: Album | null;
    featuredSongs: Song[];
    madeForYouSongs: Song[];
    trendingSongs: Song[];
    stats: Stats;
    

    fetchAlbums : () => Promise<void>;
    fetchAlbumById: (id: string) => Promise<void>;
    fetchFeaturedSongs : () => Promise<void>;
    fetchMadeForYouSongs: () => Promise<void>;
    fetchTreandingSongs: ()=> Promise<void>;
    fetchStats: () => Promise<void>;
    fetchSongs: () => Promise<void>;
    deleteSong: (id: string) => Promise<void>;
    deleteAlbum: (id: string) => Promise<void>;

};

export const useMusicStore = create<MusicStore>((set) => ({
    albums:[],
    songs:[],
    isAlbumLoading:false,
    isSongsLoading:false,
    isStatsLoading:false,
    error: null,
    currentAlbum:null,
    madeForYouSongs:[],
    featuredSongs: [],
    trendingSongs: [],
    stats: {
        totalSongs: 0,
        totalAlbums: 0,
        totalUsers: 0,
        totalArtists: 0,
    },

    deleteAlbum: async(id) => {
        set({isAlbumLoading:true, error: null});
        try {
        await axiosInstance.delete(`/admin/albums/${id}`);
        set( (state) => ({
            albums: state.albums.filter((album) => album._id !== id), // delete the current album from the ui
            songs: state.songs.map( (song) => 
            song.albumId === state.albums.find((a) => a._id === id)?.title ? {...song, album: null }: song),// delete the songs of the deleted album from the ui 
        }));
        toast.success("Album deleted successfully");
        } catch (error: any) {
            console.error("Error deleting album:", error);
            toast.error("Error deleting album");
        }finally{
            set({isAlbumLoading: false});
        }
    },

    deleteSong: async(id) => {
        set({isSongsLoading:true, error: null});
        try {
            await axiosInstance.delete(`/admin/songs/${id}`);

            set( state => ({
                songs: state.songs.filter(song => song._id !== id) // delete the songs from the ui
            }))
            toast.success("Song deleted successfully"); // a cool notification to show that the song has been deleted successfully
        } catch (error: any) {
            console.error("Error deleting song:", error);
            toast.error("Error deleting song");
        } finally {
            set({isSongsLoading: false});
        }
    },

    fetchSongs: async() => {
        set({isSongsLoading:true, error: null});
        try {
            const response = await axiosInstance.get("/songs");
            set({songs: response.data});
        } catch (error: any) {
            set({error: error.response.data.message});
        } finally{
            set({isSongsLoading: false});
        }
    },

    fetchStats: async() => {
        set({isStatsLoading:true, error: null});
        try {
            const response = await axiosInstance.get("/stats");
            set({stats: response.data});
        } catch (error: any) {
            set({error: error.response.data.message});
        }finally{
            set({isStatsLoading: false});
        }
    },

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
            set({madeForYouSongs: response.data})
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
            set({trendingSongs: response.data})
        } catch (error: any) {
            set({error: error.response.data.message});
        } finally{
            set({isSongsLoading: false});
        }
    },
}));
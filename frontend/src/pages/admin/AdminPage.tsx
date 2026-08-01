import { useAuthStore } from '@/stores/useAuthStore'
import React, { useEffect } from 'react'
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Album, Music } from 'lucide-react';
import SongTabContent from './components/SongTabContent';
import AlbumtabContent from './components/AlbumtabContent';
import { useMusicStore } from '@/stores/useMusicStore';

const AdminPage = () => {
    const {isAdmin, isLoading} = useAuthStore();

    const { fetchAlbums, fetchSongs, fetchStats} = useMusicStore();
    useEffect(() => {
       fetchAlbums();
       fetchSongs();
       fetchStats(); 
    },[fetchAlbums, fetchSongs, fetchStats]);

    if(!isAdmin && !isLoading) return <div>You are not the admin...</div>

  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 
    to-black text-zinc-100 p-8'>
        <Header />

        <DashboardStats />

        <Tabs defaultValue="songs" className="space-y-4">
            <TabsList className="p-1 bg-zinc-800/50 ">
                {/* Songs */}
                <TabsTrigger value="songs" className="data-[state=active]:bg-zinc-700">
                    <Music className='mr-2 size-4'/>
                    Songs
                </TabsTrigger>
                {/* Albums */}
                <TabsTrigger value="albums" className="data-[state=active]:bg-zinc-700">
                    <Album className='mr-2 size-4'/>
                    Albums
                </TabsTrigger>
            </TabsList>
    
            <TabsContent value="songs">
                <SongTabContent />
            </TabsContent>
            <TabsContent value="albums">
                <AlbumtabContent />
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default AdminPage
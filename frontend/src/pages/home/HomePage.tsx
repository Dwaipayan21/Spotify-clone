import Topbar from '@/components/Topbar'
import { useMusicStore } from '@/stores/useMusicStore'
import React, { useEffect } from 'react'
import FeaturedSection from './components/FeaturedSection';

const HomePage = () => {

  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTreandingSongs,
    isLoading,
    error,
    featuredSongs,
    madeForYouSongs,
    trendingSongs,
  } = useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTreandingSongs();
  },[featuredSongs, madeForYouSongs, trendingSongs]);

  console.log({isLoading, madeForYouSongs, featuredSongs, trendingSongs});

  return (
    <div className='rounded-md overflow-hidden'>
      <Topbar />
      <FeaturedSection />
    </div>
  )
}

export default HomePage
import FeaturedGridSkeleton from '@/components/skeletons/FeaturedGridSkeleton';
import { useMusicStore } from '@/stores/useMusicStore'
import { P } from 'node_modules/@clerk/clerk-react/dist/useAuth-BfjxAfMb.d.mts';
import React from 'react'

type Props = {}

const FeaturedSection = (props: Props) => {
    const {isSongsLoading, featuredSongs, error} = useMusicStore();

    if(isSongsLoading) return <FeaturedGridSkeleton />

    if(error) return <p className='text-red-500 mb-4 text-lg'>{error}</p>

  return (
    <div>FeaturedSection</div>
  )
}

export default FeaturedSection
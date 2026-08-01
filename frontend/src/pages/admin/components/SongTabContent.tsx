import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Music } from 'lucide-react'
import React from 'react'
import SongsTable from './SongsTable'
import AddSongDialog from '@/layout/components/AddSongDialog'

const SongTabContent = () => {
  return (
    <Card className='bg-zinc-800/50 border-zinc-700/50'>
      <CardHeader className='p-3'>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2 '>
              <Music className='size-5 text-emerald-500'/>
              Song Library
            </CardTitle>
            <CardDescription className='pt-1'>Manage your music tracks</CardDescription>
          </div>
          <AddSongDialog />
        </div>
      </CardHeader>
      <CardContent>
        <SongsTable />
      </CardContent>
    </Card>
  )
}

export default SongTabContent
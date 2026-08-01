import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './components/LeftSidebar';
import FriendsActivity from './components/FriendsActivity';
import Topbar from '@/components/Topbar';
import AudioPlayer from './components/AudioPlayer';
import PlayBackControls from './components/PlayBackControls';

const MainLayout = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect( () => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // Check if the window width is less than 640px (sm breakpoint)
        };

        checkMobile(); // Initial check

        window.addEventListener('resize', checkMobile); // Add event listener for window resize
        return () => window.removeEventListener('resize', checkMobile); // Cleanup the event listener on unmount
    },[]);

  return (
    <div className='h-screen bg-black text-white
    flex flex-col'>
        
        <ResizablePanelGroup orientation='horizontal' 
            className='flex-1 flex h-full overflow-hidden p-2'>
                <AudioPlayer />
            {/* left sidebar */}
            <ResizablePanel defaultSize="20%" minSize={isMobile ? "0%": "10%"} maxSize="20%">
                <LeftSidebar />
            </ResizablePanel>

            <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'/>

            {/* main content */}

            <ResizablePanel defaultSize={isMobile ? "80%": "60%"}>
                <Outlet />
            </ResizablePanel>

            {!isMobile && (
                <>
                    <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'/>

                    {/* right sidebar */}
                    <ResizablePanel defaultSize="20%" minSize="0%" maxSize="25%" collapsedSize="0%">
                        <FriendsActivity />
                    </ResizablePanel>
                </>
            )}
        </ResizablePanelGroup>
        
        <PlayBackControls />
    </div>
  )
}

export default MainLayout
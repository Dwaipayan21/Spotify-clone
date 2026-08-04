import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatDuration } from '@/pages/album/AlbumPage';
import { usePlayerStore } from '@/stores/usePlayerStore'
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume1 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { WalkingCharacter } from '@/components/WalkingCharacter';

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;// the logic of duration of song
}

export const PlayBackControls = () => {
    const { currentSong, isPlaying, togglePlay, playNext, playPrevious} = usePlayerStore();

    const [ volume, setVolume] = useState(75); //initial volume level = 75
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null >(null);


    useEffect( () => {
        audioRef.current = document.querySelector("audio") as HTMLAudioElement | null;

        const audio = audioRef.current;
        if(!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);

        const handleEnded = () => {
            usePlayerStore.setState({ isPlaying: false});
        }

        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("ended", handleEnded);
        };
    },[currentSong]);

    // change the time of the audio when the user seeks using the slider
    const handleSeek = (value: number | readonly number[], eventDetail?: any) => {
        const seekTime = typeof value === 'number' ? value : value[0];

        if (audioRef.current) {
            audioRef.current.currentTime = seekTime;
        }
    }

    //for the character
    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <footer className='h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4'>
        <div className='flex justify-between items-center gap-4 min-w-[180px] mx-auto'>
            {/* currently playing song */}

            <div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]'>
                {currentSong && (
                    <>
                        <img
                            src={currentSong.imageUrl}
                            alt={currentSong.title}
                            className='w-14 h-14 object-cover rounded-md'
                        />
                        <div className='flex-1 min-w-0'>
                            <div className='font-medium truncate hover:underline cursor-pointer'>
                                {currentSong.title}
                            </div>
                            <div className='text-sm text-zinc-400 truncate hover:underline cursor-pointer'>
                                {currentSong.artist}
                            </div>
                        </div>
                    </>
                )}
			</div>

            {/* player controls */}
            <div className='flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]'>
                <div className='flex items-center gap-4 sm:gap-6'>
                    {/* shuffle button */}
                    <Button
                        size='icon'
                        variant='ghost'
                        className='hidden sm:inline-flex hover:text-white text-zinc-400'
                    >
                        <Shuffle className='h-4 w-4' />
                    </Button>
                    {/* previous button */}
                    <Button
                        size='icon'
                        variant='ghost'
                        className='hover:text-white text-zinc-400'
                        onClick={playPrevious}
                        disabled={!currentSong}
                    >
                        <SkipBack className='h-4 w-4' />
                    </Button>
                    {/* play/pause button */}
                    <Button
                        size='icon'
                        className='bg-white hover:bg-white/80 text-black rounded-full h-8 w-8'
                        onClick={togglePlay}
                        disabled={!currentSong}
                    >
                        {isPlaying ? <Pause className='h-5 w-5' /> : <Play className='h-5 w-5' />}
                    </Button>
                    {/* next button */}
                    <Button
                        size='icon'
                        variant='ghost'
                        className='hover:text-white text-zinc-400'
                        onClick={playNext}
                        disabled={!currentSong}
                    >
                        <SkipForward className='h-4 w-4' />
                    </Button>
                    {/* repeat button */}
                    <Button
                        size='icon'
                        variant='ghost'
                        className='hidden sm:inline-flex hover:text-white text-zinc-400'
                    >
                        <Repeat className='h-4 w-4' />
                    </Button>
                </div>

                {/* progress bar */}
                <div className='hidden sm:flex items-center gap-2 w-full'>
                    <div className='text-xs text-zinc-400'>
                        {formatTime(currentTime)}
                    </div>
                    <div style={{position: 'relative', width: '100%'}}>
                        <WalkingCharacter progress={progressPercent} isPlaying={isPlaying && !!currentSong } />
                        <Slider 
                            value={[currentTime]}
                            max={duration || 100}
                            step={1}
                            className='w-full hover:cursor-grab active:cursor-grabbing'
                            onValueChange={handleSeek}
                        />
                    </div>
                    <div className='text-xs text-zinc-400'>{formatTime(duration)}</div>
                </div>
            </div>

            {/* volume controls */}
            <div className='hidden sm:flex items-center gap-2 min-w-[180px] w-[30%] justify-end'>
                {/* mic */}
                <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
                    <Mic2 className='h-4 w-4' />
                </Button>
                {/* Listen music */}
                <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
                    <ListMusic className='h-4 w-4' />
                </Button>
                {/* laptop icon */}
                <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
                    <Laptop2 className='h-4 w-4' />
                </Button>

                <div className='flex items-center gap-2'>
                    <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
                        <Volume1 className='size-4'/>
                    </Button>

                    <Slider 
                        value={[volume]}
                        max={100}
                        step={1}
                        className='w-20 hover:cursor-grab active:cursor-grabbing '
                        onValueChange={(value) => {
                            const nextVolume = typeof value === 'number' ? value : value[0];
                            setVolume(nextVolume);
                            if (audioRef.current) {
                                audioRef.current.volume = nextVolume / 100; //calculation of volume increment
                            }
                        }}
                    />
                </div>
            </div>
        </ div>
    </footer>
  )
}

export default PlayBackControls
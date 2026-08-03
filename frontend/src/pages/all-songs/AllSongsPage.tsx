import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Pause } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { axiosInstance } from "@/lib/axios";
import type { Song } from "@/types";

const HEADINGS: Record<string, string> = {
  "made-for-you": "Made For You Songs",
  "trending": "Trending Songs",
};

const AllSongsPage = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  useEffect(() => {
    if (!type) return;
    setIsLoading(true);
    axiosInstance
      .get(`/songs/${type}?limit=50`)
      .then((res) => setSongs(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [type]);

  const handlePlaySong = (index: number) => {
    const isCurrentSongPlaying = songs[index]?._id === currentSong?._id;
    if (isCurrentSongPlaying) {
      togglePlay();
    } else {
      playAlbum(songs, index);
    }
  };

  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
        
        <div className="relative min-h-full">
          <div
            className="absolute inset-0 bg-gradient-to-b from-zinc-800/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            {/* Header */}
            <div className="sticky top-0 z-20 flex items-center gap-4 px-4 sm:px-6 py-4 bg-zinc-900/95 backdrop-blur-sm border-b border-white/5">
              <button onClick={() => navigate(-1)} className="text-zinc-400 hover:text-white">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {type ? HEADINGS[type] : "Songs"}
              </h1>
            </div>
            {/* Song lists (randomly oriented) */}
            <div className="p-4 sm:p-6">
              {isLoading ? (
                <p className="text-zinc-400">Loading...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-700 hover:bg-transparent">
                      <TableHead className="w-12 text-zinc-400">#</TableHead>
                      <TableHead className="text-zinc-400">Title</TableHead>
                      <TableHead className="text-zinc-400">Artist</TableHead>
                      <TableHead className="text-zinc-400">Album</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {songs.map((song, index) => {
                      const isCurrentSong = currentSong?._id === song._id;
                      return (
                        <TableRow
                          key={song._id}
                          onClick={() => handlePlaySong(index)}
                          className="group border-zinc-800 hover:bg-zinc-800/50 cursor-pointer"
                        >
                          {/* index where play pause appears  */}
                          <TableCell className="w-12">
                            <div className="flex items-center justify-center">
                              {isCurrentSong && isPlaying ? (
                                <Pause className="size-4 text-green-500" />
                              ) : (
                                <>
                                  <span className="group-hover:hidden text-zinc-400">
                                    {index + 1}
                                  </span>
                                  <Play className="size-4 hidden group-hover:block text-green-500" />
                                </>
                              )}
                            </div>
                          </TableCell>
                            
                          {/* song image and title  */}
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={song.imageUrl}
                                alt={song.title}
                                className="size-10 rounded object-cover"
                              />
                              <span className={`font-medium truncate ${isCurrentSong ? "text-green-500" : ""}`}>
                                {song.title}
                              </span>
                            </div>
                          </TableCell>
                          
                          {/* artist name  */}
                          <TableCell className="text-zinc-400 truncate">
                            {song.artist}
                          </TableCell>
                          

                          {/* parent album */}
                          <TableCell className="text-zinc-400 truncate">
                            {song.albumTitle || "Single"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AllSongsPage;
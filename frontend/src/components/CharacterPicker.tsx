import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { characters } from "@/assets/characters";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Ban } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CharacterPicker() {
  const { selectedCharacterId, setSelectedCharacterId } = usePlayerStore();
  const current = characters.find((c) => c.id === selectedCharacterId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <Button
          size="icon"
          variant="ghost"
          className="size-6 rounded-full overflow-hidden border border-zinc-700 bg-zinc-800 hover:border-zinc-500 shrink-0"
          aria-label="Choose song pet"
        >
          {current ? (
            <img src={current.thumbnail} alt={current.name} className="w-full h-full object-cover" />
          ) : (
            <Ban className="size-3.5 text-zinc-400" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="bg-zinc-900 border-zinc-800">
        <DropdownMenuItem onClick={() => setSelectedCharacterId(null)} className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
            <Ban className="w-3.5 h-3.5 text-zinc-400" />
          </div>
          <span>None</span>
        </DropdownMenuItem>

        {characters.map((c) => (
          <DropdownMenuItem
            key={c.id}
            onClick={() => setSelectedCharacterId(c.id)}
            className="flex items-center gap-2"
          >
            <img src={c.thumbnail} alt={c.name} className="w-6 h-6 rounded-full object-cover" />
            <span>{c.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
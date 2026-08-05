import LottieImport from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import { useRef, useEffect } from "react";
import { characters } from "@/assets/characters";
import { usePlayerStore } from "@/stores/usePlayerStore";

const Lottie = (LottieImport as any).default ?? LottieImport;

interface WalkingCharacterProps {
  progress: number;
  isPlaying: boolean;
}

export function WalkingCharacter({ progress, isPlaying }: WalkingCharacterProps) {
  const { selectedCharacterId } = usePlayerStore();
  const ref = useRef<LottieRefCurrentProps>(null);
  const character = characters.find((c) => c.id === selectedCharacterId);

  useEffect(() => {
    if (!ref.current) return;
    if (isPlaying) ref.current?.play();
    else ref.current?.pause();
  }, [isPlaying, character?.id]);

  if (!character) return null;

  const baseSize = 80;
  const size = baseSize * (character.scale ?? 1);
  const offsetY = character.offsetY ?? 0;
  const trailOffset = 4;

  return (
    <div
      style={{
        position: "absolute",
        // left: `${progress}%`,
        left: `calc(${progress}% - ${trailOffset}px)`, //just incase
        top: "50%",
        transform: `translate(-50%, calc(-100% + ${offsetY}px))`,
        width: size,
        height: size,
        opacity: isPlaying ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <Lottie
        key={character.id}
        lottieRef={ref}
        animationData={character.animationData}
        loop
        autoplay={isPlaying}
      />
    </div>
  );
}
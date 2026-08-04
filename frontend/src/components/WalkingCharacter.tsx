import LottieImport from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import { useRef, useEffect } from "react";
import { defaultCharacter } from "@/assets/characters";

const Lottie = (LottieImport as any).default ?? LottieImport;

interface WalkingCharacterProps {
  progress: number;
  isPlaying: boolean;
}

export function WalkingCharacter({ progress, isPlaying }: WalkingCharacterProps) {
  const ref = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (isPlaying) ref.current?.play();
    else ref.current?.pause();
  }, [isPlaying]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${progress}%`,
        top: "50%",
        transform: "translate(-50%, -100%)",
        width: 80,
        height: 62,
        opacity: isPlaying ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
        zIndex: 10,
        
        }}
    >
      <Lottie lottieRef={ref} animationData={defaultCharacter.animationData} loop autoplay={false} />
    </div>
  );
}
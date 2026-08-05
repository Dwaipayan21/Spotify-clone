import walkingAvocado from "./walkingAvocado.json";
import Avo from "./Avo.png";
import walkingOrange from "./WalkingOrange.json";
import Zesty from "./Zesty.png";
import walkingCat from "./walkingCat.json";
import Bloop from "./Bloop.png";
 

export interface CharacterOption {
  id: string;
  name: string;
  animationData: object;
  thumbnail: string;
  offsetY?: number;
  scale?:number;
}

export const characters: CharacterOption[] = [
  { id: "avocado", name: "Avo", animationData: walkingAvocado, thumbnail: Avo ,offsetY:18, scale:1},
  { id: "orange", name: "Zesty", animationData: walkingOrange, thumbnail: Zesty ,offsetY:29, scale:1.2},
  { id: "cat", name: "Bloop", animationData: walkingCat, thumbnail: Bloop, offsetY:1.1,scale: 0.70 },
  // { id: "cat", name: "Walking cat", animationData: walkingCat}
]


export const defaultCharacter = characters[0];
import walkingAvocado from "./HMN5TakMJb.json";

export interface CharacterOption {
  id: string;
  name: string;
  animationData: object;
}

export const characters: CharacterOption[] = [
  { id: "avocado", name: "Walking avocado", animationData: walkingAvocado },
  // { id: "cat", name: "Walking cat", animationData: walkingCat}
]


export const defaultCharacter = characters[0];
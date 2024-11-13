export interface Scene {
  id: string | null;
  name: string | null;
  type: string | null;
  url: string | null;
  tags: string | null;
}

export interface SceneResponse extends Scene {
  owner: string | null;
  createdAt: string;
  updatedAt: string;
}

export const SCENE_TYPES = [
  "All",
  "Character",
  "Creature",
  "Place",
  "Thing"
] 
export interface Scene {
  id: string | null;
  name: string | null;
  type: string | null;
  url: string | null;
  tags: string | null;
  orientation: string | null;
  table: string;
}

export interface SceneUpdateObject {
  id: string;
  name: string;
  type: string;
  table: string
  url?: string;
  tags?: string;
  orientation?: string;
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

export interface SortedScenes {
  [key: string]: SceneResponse[];
  character: SceneResponse[];
  creature: SceneResponse[];
  place: SceneResponse[];
  thing: SceneResponse[];
}
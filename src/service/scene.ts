import { Client } from './client';

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

export async function getScene(id: string): Promise<SceneResponse | null> {
  try {
    const {errors, data: scene} = await Client.models.Scene.get({id})

    if (errors) {
      console.error("errors returned from scene creation:", errors);
      return null;
    }

    return scene
  } catch (e) {
    console.error("error while getting scene:", e)
    return null;
  }
}

export async function createScene(scene: Scene): Promise<SceneResponse | null> {
  try {
    const { errors, data: newScene } = await Client.models.Scene.create({
      id: crypto.randomUUID(),
      name: scene.name,
      type: scene.type,
      url: scene.url,
      tags: scene.tags
    })

    if (errors) {
      console.error("errors returned from scene creation:", errors);
      return null;
    }

    console.log("New scene:", newScene)
    return newScene
  } catch (e) {
    console.error("error while creating scene:", e)
    return null;
  }
}

export async function listScenes(): Promise<SceneResponse[]> {
  try {
    const { errors, data: scenes } = await Client.models.Scene.list()

    if (errors) {
      console.error("errors returned from listing scenes:", errors);
      return [];
    }

    return scenes
  } catch (e) {
    console.error("error while getting scenes:", e)
    return []
  }
}
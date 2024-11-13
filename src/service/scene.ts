import { Scene, SceneResponse } from "../types";
import { Client } from "../client";

export async function getScene(id: string): Promise<SceneResponse | null> {
  try {
    const { errors, data: scene } = await Client.models.Scene.get({ id });

    if (errors) {
      console.error("errors returned from scene creation:", errors);
      return null;
    }

    return scene;
  } catch (e) {
    console.error("error while getting scene:", e);
    return null;
  }
}

export async function createScene(scene: Scene): Promise<SceneResponse | null> {
  if (!scene.name) {
    console.error("scene name is required");
    return null;
  }
  if (!scene.type) {
    console.error("scene type is required")
    return null;
  }
  try {
    const { errors, data: newScene } = await Client.models.Scene.create({
      id: crypto.randomUUID(),
      name: scene.name,
      type: scene.type,
      table: "scenes",
      url: scene.url,
      tags: scene.tags,
    });

    if (errors) {
      console.error("errors returned from scene creation:", errors);
      return null;
    }

    return newScene;
    
  } catch (e) {
    console.error("error while creating scene:", e);
    return null;
  }
}

export async function listScenes(type: string | null): Promise<SceneResponse[]> {
  console.log("listing scenes by type:", type);
  if (!type || type === 'all') {
    return listAllScenes();
  } else {
    return listScenesByType(type);
  }
}

async function listAllScenes(): Promise<SceneResponse[]> {
  try {
    const { errors, data: scenes } = await Client.models.Scene.listSceneByTableAndName({table: "scenes"}, { sortDirection: 'ASC'});

    if (errors) {
      console.error("errors returned from listing scenes:", errors);
      return [];
    }

    return scenes;
  } catch (e) {
    console.error("error while getting scenes:", e);
    return [];
  }
}

async function listScenesByType(type: string): Promise<SceneResponse[]> {
  try {
    const { errors, data: scenes } = await Client.models.Scene.listSceneByTypeAndName({type: type}, { sortDirection: 'ASC'});

    if (errors) {
      console.error("errors returned from listing scenes:", errors);
      return [];
    }

    return scenes;
  } catch (e) {
    console.error("error while getting scenes:", e);
    return [];
  }
}

export async function deleteScene(id: string): Promise<SceneResponse | null> {
  try {
    const { errors, data: deletedScene } = await Client.models.Scene.delete({
      id,
    });

    if (errors) {
      console.error("errors returned from deleting scene:", errors);
      return null;
    }

    console.log("Deleted scene:", deletedScene);
    return deletedScene;
  } catch (e) {
    console.error("error while deleting scene:", e);
    return null;
  }
}

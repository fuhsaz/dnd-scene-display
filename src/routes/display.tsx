import { useEffect, useMemo, useRef, useState } from "react";
import { SceneResponse, SortedScenes } from "../types";
import { getScene } from "../service/scene";
import { useLoaderData } from "react-router-dom";
import ControlWindow from "../components/control/ControlWindow";
import SceneDisplay from "../components/SceneDisplay";
import { useAppSelector } from "../components/reducers/hooks";

export default function DisplayPage() {

  const [loading, setLoading] = useState<boolean>(false);
  const [scene, setScene] = useState<SceneResponse | null>(null);

  const isControlVisible = useAppSelector((state) => state.appState.isControlVisible);
  const sceneId = useAppSelector((state) => state.scenes.selectedSceneId);

  const allScenes = useLoaderData() as SceneResponse[];
  const sortedScenes: SortedScenes = useMemo(() => {
    const scenes: SortedScenes = {
      character: [],
      creature: [],
      place: [],
      thing: [],
    };

    allScenes.forEach((scene) => {
      switch (scene.type) {
        case "character":
          scenes.character.push(scene);
          break;
        case "creature":
          scenes.creature.push(scene);
          break;
        case "place":
          scenes.place.push(scene);
          break;
        case "thing":
          scenes.thing.push(scene);
          break;
        default:
          break;
      }
    });

    return scenes;
  }, [allScenes]);

  const styleSheets = useMemo(() => Array.from(document.styleSheets), []);

  const extRef = useRef<Window | null>(null);

  useEffect(() => {
    if (sceneId) {
      loadScene(sceneId);
    }

    async function loadScene(id: string) {
      setLoading(true);
      const response = await getScene(id);

      if (response !== null) {
        setScene(response);
      }
      setLoading(false);
    }
  }, [sceneId]);

  return (
    <>
      {loading ? <div className="alert alert-primary mt-4">Loading...</div> : null}
      {!loading && scene ? <SceneDisplay showInfo={false} scene={scene} /> : null}
      {!loading && !scene ? <div>Nothing to display</div> : null}

      {isControlVisible ? (
        <ControlWindow
          ref={extRef}
          sortedScenes={sortedScenes}
          styles={styleSheets}
        />
      ) : null}
    </> 
  );
}

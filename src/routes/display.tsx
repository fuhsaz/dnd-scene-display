import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SceneResponse, SortedScenes } from '../types';
import { getScene } from "../service/scene";
import { downloadImage } from "../service/image";
import { useLoaderData } from "react-router-dom";
import ControlWindow from "../components/control/ControlWindow";

export default function DisplayPage() {
  console.log("display page rendered")
  const [loading, setLoading] = useState<boolean>(false);
  const [sceneId, setSceneId] = useState<string>("");
  const [scene, setScene] = useState<SceneResponse | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isControlVisible, setIsControlVisible] = useState<boolean>(false) 

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

  const styleSheets = useMemo(() => Array.from(document.styleSheets), [])

  const extRef = useRef<Window | null>(null)

  const setId = useCallback((sceneId: string) => {
    setSceneId(sceneId)
  }, [setSceneId])

  const setControlVisibility = useCallback((visibility: boolean) => {
    setIsControlVisible(visibility)
  }, [setIsControlVisible])

  useEffect(() => {
    if (sceneId) {
      loadScene(sceneId);
    }

    async function loadScene(id: string) {
      setLoading(true);
      const response = await getScene(id);

      if (response !== null) {
        setScene(response);

        const downloadedImageUrl = await downloadImage(response.url ?? "")
        setImageUrl(downloadedImageUrl)
      }
      setLoading(false);
    }
  }, [sceneId]);

  function toggleControl() {
    if (!isControlVisible) {
      setIsControlVisible(true)
    } else {
      extRef.current?.close();
      setIsControlVisible(false)
    }
  }

  return (
    <>
      <div>Display</div>
      <div>
        <h1>Temp</h1>
        <input
          type="text"
          onChange={(e) => {
            setSceneId(e.target.value);
          }}
        />
        <button type="button" onClick={() => {toggleControl()}}>{isControlVisible ? 'Hide' : 'Show'} Control</button>
      </div>
      {scene ? (
        <div className="d-flex flex-grow-1 justify-content-center">
          <img
            src={imageUrl ?? undefined}
            alt={scene?.name || ""}
            className="img-fluid"
          />
        </div>
      ) : (
        <div>Nothing to display</div>
      )}
      { isControlVisible ?
        <ControlWindow setId={setId} setVisibility={setControlVisibility} ref={extRef} sortedScenes={sortedScenes} styles={styleSheets} />
      : null}
    </>
  );
}

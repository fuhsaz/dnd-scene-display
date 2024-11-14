import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { downloadImage } from "../service/image";
import { Scene, SceneResponse } from "../types";
import SceneViewMode from "../components/sceneDetails/ViewMode";
import SceneForm from "../components/SceneForm";

function SceneDetails() {
  const scene = useLoaderData() as SceneResponse;

  const [mode, setMode] = useState<string>("view");
  const [imageObjectUrl, setImageObjectUrl] = useState<string>("");

  useEffect(() => {

    if (scene.url) {
      (async () => {
          setImageObjectUrl(await downloadImage(scene.url ?? ""));
      })();
    }

  }, [scene.url]);

  const handleUpdateScene = async (scene: Scene, file: File | null, deleteFile: boolean, redirect: boolean) => {
    
  }

  return (
    <>
      {mode === "view" ? (
        <SceneViewMode
          imageUrl={imageObjectUrl}
          scene={scene}
          setMode={setMode}
        />
      ) : null}
      {mode === "edit" ? 
        <SceneForm onSave={handleUpdateScene} scene={scene} />
      : null}
    </>
  );
}

export default SceneDetails;

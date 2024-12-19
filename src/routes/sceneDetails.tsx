import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { useEffect, useState } from "react";
import { downloadImage, uploadImage } from "../service/image";
import { Scene, SceneResponse } from "../types";
import SceneViewMode from "../components/sceneDetails/ViewMode";
import SceneForm from "../components/SceneForm";
import { updateScene } from "../service/scene";

function SceneDetails() {
  const { revalidate } = useRevalidator();
  const navigate = useNavigate();
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

  const handleUpdateScene = async (scene: Scene, file: File | null, redirect: boolean, deleteFile?: boolean) => {
    const imageId = crypto.randomUUID();
    let path = "";

    if (file) {
      const result = await uploadImage(imageId, file);
      console.log("result:", result); 
      
      if (!result) {
        console.error("no result returned from uploadData");
        return;
      }

      path = result.path;
    } 

    if (!file && deleteFile) {
      scene.url = path;
    }

    try {
      const updatedScene = await updateScene(scene);
      console.log("Updated scene:", updatedScene);

      if (redirect) {
        navigate(`/manage/${scene.type}`);
      } else {
        revalidate();
      }
    } catch (e) {
      console.error("error updating scene:", e);
    }

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

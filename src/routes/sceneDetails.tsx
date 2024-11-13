import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImage } from "../service/image";
import { SceneResponse } from "../types";
import SceneViewMode from "../components/sceneDetails/ViewMode";

function SceneDetails() {
  const scene = useLoaderData() as SceneResponse;

  const [mode, setMode] = useState<string>("view");
  const [imageObjectUrl, setImageObjectUrl] = useState<string>("");

  useEffect(() => {
    if (scene.url) {
      downloadImage(scene.url);
    }

    async function downloadImage(url: string) {
      if (url) {
        const imageResponse = await getImage(url);
        const result = await imageResponse.result;
        const imageBlob = await result.body.blob();
        setImageObjectUrl(URL.createObjectURL(imageBlob));
      }
    }
  }, [scene.url]);

  return (
    <>
      {mode === "view" ? (
        <SceneViewMode imageUrl={imageObjectUrl} scene={scene} setMode={setMode} />
      ) : null}
      {mode === "edit" ? (
        <div>Edit</div>
      ) : null}
    </>
  );
}

export default SceneDetails;

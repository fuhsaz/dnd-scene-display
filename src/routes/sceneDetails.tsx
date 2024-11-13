import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { downloadImage } from "../service/image";
import { SceneResponse } from "../types";
import SceneViewMode from "../components/sceneDetails/ViewMode";

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

  return (
    <>
      {mode === "view" ? (
        <SceneViewMode
          imageUrl={imageObjectUrl}
          scene={scene}
          setMode={setMode}
        />
      ) : null}
      {mode === "edit" ? <div>Edit</div> : null}
    </>
  );
}

export default SceneDetails;

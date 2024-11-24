import { useEffect, useState } from "react";
import { downloadImage } from "../service/image";
import { SceneResponse } from "../types";

interface SceneDisplayProps {
  scene: SceneResponse;
}

export default function SceneDisplay({ scene }: SceneDisplayProps) {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (scene.url) {
        setImageUrl(await downloadImage(scene.url ?? ""));
      }
    })();
  }, [scene.url]);

  return (
    <div className="container h-100">
      <div className="row h-100">
        <div className="col-sm-12 scene-container">
          <h1 className="text-center">{scene.name}</h1>
          <div className="image-container">
            <img
              src={imageUrl}
              alt={scene.name ?? ""}
              className={`display-image ${scene.orientation ?? "portrait"}`}
            />
          </div>
        </div>
      </div>
    </div>
  ); 
}

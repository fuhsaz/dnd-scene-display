import { useEffect, useMemo } from "react";
import { downloadImage } from "../service/image";
import { SceneResponse } from "../types";

interface SceneDisplayProps {
  scene: SceneResponse;
  showInfo: boolean;
}

export default function SceneDisplay({ scene, showInfo }: SceneDisplayProps) {
  const img = useMemo(() => document.createElement("img"), []);

  img.alt = scene.name ?? "";

  useEffect(() => {
    (async () => {
      if (scene.url) {
        const url = await downloadImage(scene.url);
        img.src = url;

        const poll = setInterval(() => {
          if (img.naturalWidth) {
            clearInterval(poll);
          }
        }, 10);

        const imageContainer = document.querySelector(".image-container");

        const containerWidth = imageContainer?.clientWidth;
        const containerHeight = imageContainer?.clientHeight;

        img.style.maxHeight = `${containerHeight}px`;
        img.style.maxWidth = `${containerWidth}px`;

        img.style.objectFit = "contain";

        if (scene.orientation === "landscape") {
          img.style.width = "100%";
        } else {
          img.style.height = "100%";
        }

        imageContainer?.appendChild(img);
      }
    })();
  }, [img, scene.url, scene.orientation]);

  return (
    <div className="container h-100">
      <div className="row h-100">
        <div className="col-sm-12 scene-container">
          <h1 className="text-center">{scene.name}</h1>
          {showInfo ? (
            <div className="info-container">
              <div>{scene.type}</div>
            </div>
          ) : null}
          <div className="image-container" />
        </div>
      </div>
    </div>
  );
}

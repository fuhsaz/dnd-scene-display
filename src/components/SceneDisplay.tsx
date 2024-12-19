import { useEffect, useMemo } from "react";
import { downloadImage } from "../service/image";
import { SceneResponse } from "../types";
import { deleteScene } from "../service/scene";
import { useNavigate } from "react-router-dom";

interface SceneDisplayProps {
  isManagePage?: boolean;
  scene: SceneResponse;
  showInfo: boolean;

  setMode?: React.Dispatch<React.SetStateAction<string>>
}

export default function SceneDisplay({
  isManagePage = false,
  scene,
  showInfo,
  setMode,
}: SceneDisplayProps) {
  const img = useMemo(() => document.createElement("img"), []);
  const nav = useNavigate();

  img.alt = scene.name ?? "";

  async function confirmDeleteScene(id: string) {
    if (id && window.confirm("Are you sure you want to delete this scene? This can't be undone.")) {
      console.log("delete scene with id:", id);
      try {
        await deleteScene(id);
        nav(`/manage/${scene.type}`);
      } catch (e) {
        console.error("error deleting scene: ", e);
      }
    }
  }

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
          <div className="position-relative">
            <h1 className="text-center">{scene.name}</h1>
            {isManagePage ? (
              <div className="btn-group position-absolute top-0 end-0 pt-1">
                <button type="button" className="btn btn-outline-primary me-3" onClick={() => { if (setMode) setMode("edit") }}>Edit</button>
                <button type="button" className="btn btn-outline-danger" onClick={() => {confirmDeleteScene(scene.id ?? "")}}>Delete</button>
              </div>
            ) : null}
          </div>
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

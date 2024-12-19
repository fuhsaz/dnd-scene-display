import { ChangeEvent, useState } from "react";
import { Scene, SCENE_TYPES } from "../types";
import { useNavigate } from "react-router-dom";
import { deleteImage } from "../service/image";

interface SceneFormProps {
  onSave: (scene: Scene, file: File | null, deleteFile: boolean, redirect: boolean) => void;
  scene: Scene | null;
}

export default function SceneForm({ onSave, scene }: SceneFormProps) {
  const nav = useNavigate();

  const [name, setName] = useState<string>(scene?.name || "");
  const [type, setType] = useState<string>(scene?.type || "");
  const [orientation, setOrientation] = useState<string>(
    scene?.orientation || "portrait"
  );
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  function isFormIncomplete() {
    return !(!!(file || scene) && !!name && !!type);
  }

  async function confirmDeleteImage(url: string) {
    if (scene && window.confirm("Are you sure you want to delete this image? This can't be undone.")) {
      try {
        await deleteImage(url);
        scene.url = "";
        onSave(scene, null, true, false);
      } catch (e) {
        console.error("error deleting image: ", e);
      }
    }
  }

  return (
    <>
      <form>
        <div className="form-group row">
          <div className="col-sm-12 col-md-8 col-lg-6">
            <label htmlFor="scene-name">Name</label>
            <input
              type="text"
              className="form-control"
              id="scene-name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row mt-2">
          <div className="col-sm-12 col-md-8 col-lg-6">
            <label htmlFor="scene-type">Type</label>
            <select
              className="form-control"
              id="scene-type"
              defaultValue={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>Select</option>
              {SCENE_TYPES.map((type) => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group row mt-2">
          <div className="col-sm-12 col-md-8 col-lg-6">
            <div>Orientation</div>
            <div className="row">
              <div className="col-lg-6">
                <label>
                  Portrait&nbsp;&nbsp;
                  <input
                    type="radio"
                    value="portrait"
                    checked={orientation === "portrait"}
                    onChange={() => {
                      setOrientation("portrait");
                    }}
                  />
                </label>
              </div>
              <div className="col-lg-6">
                <label>
                  Landscape&nbsp;&nbsp;
                  <input
                    type="radio"
                    value="landscape"
                    checked={orientation === "landscape"}
                    onChange={() => {
                      setOrientation("landscape");
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group row mt-2">
          <div className="col-sm-12 col-md-8 col-lg-6">
            {!scene || !scene.url ? (
              <>
                <label htmlFor="image-input">Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="image-input"
                  onChange={(e) => {
                    handleFileSelect(e);
                  }}
                />
              </>
            ) : null}
            {scene && scene.url ? (
              <button
                className="btn btn-danger"
                onClick={() => {
                  if (scene.url) confirmDeleteImage(scene.url);
                }}
              >
                Delete Image
              </button>
            ) : null}
          </div>
        </div>
        <div className="form-group row mt-3">
          <div
            className="col-sm-12 col-md-8 col-lg-6"
            style={{ textAlign: "right" }}
          >
            <div className="d-flex gap-4">
              <button
                className="btn btn-success d-flex flex-grow-1 justify-content-center"
                disabled={isFormIncomplete()}
                onClick={() => {
                  onSave(
                    {
                      id: null,
                      name,
                      type,
                      table: "scenes",
                      url: null,
                      tags: null,
                      orientation,
                    },
                    file,
                    false,
                    true
                  );
                }}
                type="button"
              >
                {scene ? "Update" : "Save"}
              </button>
              <button
                className="btn btn-danger d-flex flex-grow-2 justify-content-center px-4"
                onClick={() => {
                  nav("/manage/all");
                }}
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

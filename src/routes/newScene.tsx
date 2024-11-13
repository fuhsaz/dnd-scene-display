import { ChangeEvent, useEffect, useState } from "react";
import { deleteImage, uploadImage } from "../service/image";
import { SCENE_TYPES } from "../types";
import { createScene } from "../service/scene";
import { useRevalidator } from "react-router-dom";

export default function NewScene() {
  const revalidator = useRevalidator();

  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSaveNewScene = async () => {
    const imageId = crypto.randomUUID();
    if (!file) {
      console.error("no file provided to upload");
      return;
    }

    const result = await uploadImage(imageId, file);
    console.log("result:", result);

    if (!result) {
      console.error("no result returned from uploadData");
      return;
    }
    
    try {
      const newScene = await createScene({
        id: null,
        name: name,
        type: type,
        url: result.path,
        tags: "",
      });
  
      console.log("New scene:", newScene);
      resetForm();
      revalidator.revalidate();

    } catch (e) {
      console.error("error creating scene, will try to delete image")
      try {
        deleteImage(result.path);
      } catch (e) {
        console.error("error deleting image, it may still exist at path:", result.path)
      }
    }
  };

  function isFormIncomplete() {
    return !(!!file && !!name && !!type);
  }

  function resetForm() {
    setFile(null);
    setName("");
    setType("");
  }

  useEffect(() => {
    console.log("type changed:", type);
  }, [type]);

  return (
    <div>
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
        <div className="form-group row">
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
        <div className="form-group row">
          <div className="col-sm-12 col-md-8 col-lg-6">
            <label htmlFor="image-input">Image</label>
            <input
              type="file"
              className="form-control"
              id="image-input"
              onChange={(e) => {
                handleFileSelect(e);
              }}
            />
          </div>
        </div>
        <div className="form-group row mt-3">
          <div
            className="col-sm-12 col-md-8 col-lg-6"
            style={{ textAlign: "right" }}
          >
            <button
              className="btn btn-success mx-3"
              disabled={isFormIncomplete()}
              onClick={handleSaveNewScene}
              type="button"
            >
              Create
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                return;
              }}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

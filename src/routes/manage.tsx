import { ChangeEvent, useState } from "react";
import { Client } from "../service/client";
import { uploadImage } from "../service/image";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import { SceneResponse } from "../service/scene";

export default function ManagePage() {
  const [file, setFile] = useState<File | null>(null);

  const scenes = useLoaderData() as SceneResponse[];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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

    try {
      const result = await uploadImage(imageId, file);
      console.log("result:", result);

      if (!result) {
        console.error("no result returned from uploadData");
        return;
      }

      const { errors, data: newScene } = await Client.models.Scene.create({
        name: "temp",
        type: "temp",
        url: result.path,
        tags: ""
      })

      if (errors) {
        console.error("errors returned from scene creation:", errors);
        return;
      }

      console.log("New scene:", newScene)

    } catch (e) {
      console.error("error uploading image:", e);
    }
  };

  return (
    <>
      <h1>Manage</h1>
      <div className="d-flex">
        <div className="flex-grow-1">
          {scenes.map((scene) => {
            return (
              <div key={scene.url}>
                <div>{scene.name}</div>
                <div>{scene.url}</div>
                <div><Link to={`${scene.id}`}>Details &gt;&gt;</Link></div>
              </div>
            )
          })}
        </div>
        <div className="flex-grow-3">
          <Outlet />
        </div>
      </div>
      <div>
        <input
          type="file"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <button disabled={!file} onClick={handleSaveNewScene}>
          Create New Scene
        </button>
      </div>
    </>
  );
}

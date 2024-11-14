import { deleteImage, uploadImage } from "../service/image";
import { Scene } from "../types";
import { createScene } from "../service/scene";
import { useNavigate, useRevalidator } from "react-router-dom";
import SceneForm from "../components/SceneForm";

export default function NewScene() {
  const { revalidate } = useRevalidator();
  const navigate = useNavigate();

  const handleSaveNewScene = async (scene: Scene, file: File | null, deleteFile: boolean, redirect: boolean) => {

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
    } else {
      console.log("no file provided to upload");
    }

    try {
      const newScene = await createScene({
        id: null,
        name: scene.name,
        type: scene.type,
        url: path,
        orientation: scene.orientation,
        tags: "",
      });

      console.log("New scene:", newScene);
      
      if (redirect) {
        navigate(`/manage/${scene.type}`);
      } else {
        revalidate();
      }

    } catch (e) {
      console.error("error creating scene:", e);
      
      if (path) {
        console.log("will try to delete image");

        try {
          deleteImage(path);
        } catch (e) {
          console.error(
            "error deleting image, it may still exist at path:",
            path
          );
        }
      }
    }
  };

  return (
    <div className="new-scene">
      <h1>New Scene</h1>
      <SceneForm onSave={handleSaveNewScene} scene={null} />
    </div>
  );
}

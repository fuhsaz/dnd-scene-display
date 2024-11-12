import { useLoaderData } from "react-router-dom";
import { SceneResponse } from "../service/scene";
import { useEffect, useState } from "react";
import { getImage } from "../service/image";

function SceneDetails() {

  const scene = useLoaderData() as SceneResponse;

  const [imageObjectUrl, setImageObjectUrl] = useState<string>("") 

  useEffect(() => {

    if (scene.url) {
      downloadImage(scene.url)
    }

    async function downloadImage (url: string) {
      if (url) {
        const imageResponse = await getImage(url);
        const result = await imageResponse.result;
        const imageBlob = await result.body.blob();
        setImageObjectUrl(URL.createObjectURL(imageBlob));
      }
    }
   
  }, [scene.url])

  return (
    <div>
      <h1>{scene.name}</h1>
      <p>{scene.type}</p>
      <p><i>{scene.tags}</i></p>
      <p>{scene.url}</p>
      <img src={imageObjectUrl} alt="temp" />
    </div>
  );
}

export default SceneDetails;
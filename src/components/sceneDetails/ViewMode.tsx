import { SceneResponse } from "../../types"

interface SceneViewModeProps {
  imageUrl: string,
  scene: SceneResponse,

  setMode: React.Dispatch<React.SetStateAction<string>>
}

export default function SceneViewMode({imageUrl, scene}: SceneViewModeProps) {
  
  return(
    <div className="d-flex gap-5">
      <div>
        <h1>{scene.name}</h1>
        <p>{scene.type}</p>
        <p>
          <i>{scene.tags}</i>
        </p>
      </div>
      <div className="d-flex flex-grow-1 justify-content-center">
        <img src={imageUrl} alt={scene.name || ""} className="img-fluid" />
      </div>
    </div>
  )
}
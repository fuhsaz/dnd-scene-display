import { SceneResponse } from "../../types"
import SceneDisplay from "../SceneDisplay"

interface SceneViewModeProps {
  imageUrl: string,
  scene: SceneResponse,

  setMode: React.Dispatch<React.SetStateAction<string>>
}

export default function SceneViewMode({scene, setMode}: SceneViewModeProps) {

  
  return(
    <div className="h-100">
      <SceneDisplay scene={scene} showInfo={true} isManagePage={true} setMode={setMode}/>
    </div>
  )
}
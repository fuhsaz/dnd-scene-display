import { SceneResponse } from "../../types";

interface ListOfTypeProps {
  scenes: SceneResponse[];
  filterText: string;
  setId: (sceneId: string) => void;
}

export default function ListOfType({ scenes, filterText, setId }: ListOfTypeProps) {
  const filteredScenes = scenes.filter((scene) => {
    return scene.name?.toLowerCase().includes(filterText.toLowerCase());
  });

  return (
    <div
      style={{
        overflowY: "scroll",
      }}
    >
      {filteredScenes.map((scene, index) => {
        return (
          <div key={scene.url} className={`controller-list-item ${index % 2 === 0 ? 'bg-primary' : 'bg-default'}`} onClick={() => {console.log("click"); setId(scene.id ?? "")}}>
            <div className="px-3 py-2">{scene.name}</div>
          </div>
        );
      })}
    </div>
  );
}

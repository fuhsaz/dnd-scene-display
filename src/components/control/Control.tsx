import { useState } from "react";
import { SCENE_TYPES, SortedScenes } from '../../types';
import ListOfType from "./ListOfType";

interface ControlProps {
  setId: (sceneId: string) => void;
  sortedScenes: SortedScenes;
}

export default function Control({ setId, sortedScenes }: ControlProps) {
  console.log("control rendered");

  const [selectedTab, setSelectedTab] = useState<string>("character");
  const [filterText, setFilterText] = useState<string>("");

  console.log(sortedScenes);

  return (
    <div>
      <div className="container">
        <ul className="nav nav-tabs">
          {SCENE_TYPES.filter((st) => st !== "All").map((st) => (
            <li className="nav-item" key={`tab-${st}`}>
              <button
                className="nav-link"
                onClick={() => {
                  setSelectedTab(st);
                }}
              >
                {st + 's'}
              </button>
            </li>
          ))}
        </ul>
        <div className="form-group">
          <label htmlFor="filter-input">Filter</label>
          <input
            type="text"
            className="form-control"
            id="filter-input"
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        {Object.keys(sortedScenes)
          .filter((key) => key.toLowerCase() === selectedTab.toLowerCase())
          .map((sceneType) => (
            <div
              key={`sceneList-${sceneType}`}
              className="container"
              style={
                selectedTab.toLocaleLowerCase() === sceneType
                  ? {}
                  : { display: "none" }
              }
            >
              <h2>
                {sceneType.charAt(0).toUpperCase() + sceneType.slice(1) + "s"}
              </h2>
              <ListOfType scenes={sortedScenes[sceneType]} filterText={filterText} setId={setId}  />
            </div>
          ))}
      </div>
    </div>
  );
}
 
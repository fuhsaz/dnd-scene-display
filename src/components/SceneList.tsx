import { Link, NavLink } from "react-router-dom";
import { SCENE_TYPES, SceneResponse } from "../types";

interface SceneListProps {
  scenes: SceneResponse[];
}

export default function SceneList({ scenes }: SceneListProps) {
  return (
    <>
      <ul className="nav nav-tabs">
        {SCENE_TYPES.map((st) => (
          <li className="nav-item" key={st}>
            <NavLink
              to={`/manage/${st.toLowerCase()}`}
              className={({ isActive }) =>
                `nav-link ${isActive ? " active" : ""}`
              }
            >
              {st}
            </NavLink>
          </li>
        ))}
        <li className="nav-item border-left">
          <NavLink to="/manage/all/new" className="nav-link">New +</NavLink>
        </li>
      </ul>
      {scenes.map((scene) => {
        return (
          <div key={scene.url}>
            <div>{scene.name}</div>
            <div>
              <Link to={`${scene.id}`}>Details &gt;&gt;</Link>
            </div>
          </div>
        );
      })}
    </>
  );
}

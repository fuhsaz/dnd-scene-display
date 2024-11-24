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
          <NavLink to="/manage/all/new" className="nav-link">
            New +
          </NavLink>
        </li>
      </ul>
      <div className="overflow-y-scroll">
        {scenes.map((scene, index) => {
          return (
            <Link
              key={scene.url}
              to={`${scene.id}`}
              className="text-decoration-none"
            >
              <div
                className={`px-2 py-2  ${
                  index % 2 === 0 ? "bg-primary" : "bg-default"
                }`}
              >
                {scene.name}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

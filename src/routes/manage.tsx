import { Outlet, useLoaderData } from "react-router-dom";
import { SceneResponse } from "../types";
import SceneList from "../components/SceneList";

export default function ManagePage() {

  const scenes = useLoaderData() as SceneResponse[];

  return (
    <>
      <div className="h-100 d-flex gap-5">
        <div className="flex-shrink-1">
          <SceneList scenes={scenes}/>
        </div>
        <div className="flex-grow-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}

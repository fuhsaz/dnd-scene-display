import { Link, Outlet, useLoaderData } from "react-router-dom";
import { SceneResponse } from "../types";
import SceneList from "../components/SceneList";

export default function ManagePage() {

  const scenes = useLoaderData() as SceneResponse[];

  return (
    <>
      <div className="d-flex justify-content-between">
      <Link to="new" className="d-inline-block btn btn-outline-primary btn-sm my-2 px-2 rounded align-content-center">+ New</Link>
      </div>
      <div className="d-flex gap-5">
        <div>
          <SceneList scenes={scenes}/>
        </div>
        <div className="flex-grow-1">
          <Outlet />
        </div>
      </div>
      <div>
        
      </div>
    </>
  );
}

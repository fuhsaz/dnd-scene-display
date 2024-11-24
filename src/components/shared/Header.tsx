import { useAuthenticator } from "@aws-amplify/ui-react";
import { NavLink } from "react-router-dom";
import ControlIcon from "../../icons/ControlIcon";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";
import { setControlVisibility } from "../reducers/appStateSlice";
import LogOutIcon from "../../icons/LogOutIcon";

export default function Header() {
  const { signOut } = useAuthenticator();
  const isControlVisible = useAppSelector(
    (state) => state.appState.isControlVisible
  );

  const dispatch = useAppDispatch();

  const toggleControl = () => {
    if (isControlVisible) {
      dispatch(setControlVisibility(false));
    } else {
      dispatch(setControlVisibility(true));
    }
  };

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            D&D Scene Display
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* What is aria-current? */}
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? " active" : ""}`
                  }
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/manage/all"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? " active" : ""}`
                  }
                  aria-current="page"
                >
                  Manage
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li
                className="nav-item mx-3"
                onClick={() => {
                  toggleControl();
                }}
              >
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    toggleControl();
                  }}
                >
                  <ControlIcon />
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-primary" onClick={signOut}>
                  <LogOutIcon />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

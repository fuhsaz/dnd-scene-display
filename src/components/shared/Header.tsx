import { useAuthenticator } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";

// interface HeaderProps {
//   temp: string;
// }

export default function Header() {

  const {signOut} = useAuthenticator();

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
                <Link to="/" className="nav-link" aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/manage" className="nav-link" aria-current="page">Manage</Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button onClick={signOut}>Sign Out</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

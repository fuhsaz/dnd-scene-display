import Header from "../components/shared/Header";
import Footer from '../components/shared/Footer';
import { Outlet } from "react-router-dom";

function App() {

  return (
    <div className="root container-fluid">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
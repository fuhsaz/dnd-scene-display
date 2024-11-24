import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="main container-fluid">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;

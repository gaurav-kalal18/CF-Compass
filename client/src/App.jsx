import { Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import Overview from "./pages/Overview";
import Insights from "./pages/Insights";
import Practice from "./pages/Practice";
import Contests from "./pages/Contests";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Overview />}
        />

        <Route
          path="/insights"
          element={<Insights />}
        />

        <Route
          path="/practice"
          element={<Practice />}
        />

        <Route
          path="/contests"
          element={<Contests />}
        />

      </Routes>

      <Footer />

    </>
  );
}

export default App;
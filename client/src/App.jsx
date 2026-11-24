import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { useSearch } from "./context/useSearch";
import Overview from "./pages/Overview";
import Insights from "./pages/Insights";
import Practice from "./pages/Practice";
import Contests from "./pages/Contests";
import "./styles/dashboard.css";

export default function App() {
  const { searchError, loading } = useSearch();

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main" tabIndex={-1} className="shell main-content">
        <div className="search-feedback" role="status">
          {loading && "Fetching Codeforces profile…"}
        </div>
        {searchError && <p className="inline-error" role="alert">{searchError}</p>}
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/contests" element={<Contests />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

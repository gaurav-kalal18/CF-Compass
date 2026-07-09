import { useState } from "react";
import { useSearch } from "../../context/SearchContext";
import "./SearchBar.css";

function SearchBar() {
  const [inputHandle, setInputHandle] = useState("");

  const { searchHandle, loading } = useSearch();

  async function handleSubmit() {
    if (!inputHandle.trim()) return;

    await searchHandle(inputHandle);
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter Codeforces Handle"
        value={inputHandle}
        disabled={loading}
        onChange={(e) => setInputHandle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
      >
       {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}

export default SearchBar;
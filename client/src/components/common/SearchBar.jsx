import { useId, useState } from "react";
import { useSearch } from "../../context/useSearch";

export default function SearchBar({ prominent = false }) {
  const id = useId();
  const { handle, searchHandle, loading } = useSearch();
  const [inputHandle, setInputHandle] = useState(handle ?? "");

  function submit(event) {
    event.preventDefault();
    searchHandle(inputHandle);
  }

  return (
    <form className={prominent ? "handle-search handle-search--prominent" : "handle-search"} onSubmit={submit} role="search" aria-label="Codeforces profile">
      <label htmlFor={id} className={prominent ? "search-label" : "visually-hidden"}>
        Codeforces handle
      </label>
      <div className="handle-search-controls">
        <input
          id={id}
          type="text"
          placeholder="e.g. tourist"
          value={inputHandle}
          onChange={(event) => setInputHandle(event.target.value)}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          readOnly={loading}
          required
        />
        <button className="button" type="submit" disabled={loading || !inputHandle.trim()}>
          {loading ? "Analyzing…" : "Analyze"}
        </button>
      </div>
    </form>
  );
}

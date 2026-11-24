import { useEffect, useState } from "react";
import API from "../services/api";
import { SearchContext } from "./useSearch";

export function SearchProvider({ children }) {
  const [analysis, setAnalysis] = useState(null);
  const [searching, setSearching] = useState("");
  const [error, setError] = useState("");
  const [historyResult, setHistoryResult] = useState(null);
  const [historyAttempt, setHistoryAttempt] = useState(0);

  useEffect(() => {
    if (!analysis) return;

    const controller = new AbortController();
    const path = "/profile/rating/" + encodeURIComponent(analysis.profile.handle);

    API.get(path, { signal: controller.signal, timeout: 20000 })
      .then(({ data }) => {
        const rows = Array.isArray(data) ? data : data?.result;
        if (!Array.isArray(rows)) throw new Error("Unexpected rating history format");

        const contests = rows.slice().sort(
          (first, second) => first.ratingUpdateTimeSeconds - second.ratingUpdateTimeSeconds
        );

        if (!controller.signal.aborted) {
          setHistoryResult({ analysis, attempt: historyAttempt, contests, failed: false });
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setHistoryResult({ analysis, attempt: historyAttempt, contests: [], failed: true });
        }
      });

    return () => controller.abort();
  }, [analysis, historyAttempt]);

  async function searchHandle(value) {
    const username = value.trim();
    if (!username || searching) return;

    setSearching(username);
    setError("");

    try {
      const handle = encodeURIComponent(username);
      const options = { timeout: 30000 };
      const [profile, analytics] = await Promise.all([
        API.get("/profile/" + handle, options),
        API.get("/analytics/" + handle, options),
      ]);
      setAnalysis({ profile: profile.data, analytics: analytics.data });
    } catch {
      setError("Couldn’t load @" + username + ". Check the handle or try again.");
    } finally {
      setSearching("");
    }
  }

  const history = historyResult && historyResult.analysis === analysis && historyResult.attempt === historyAttempt
    ? historyResult
    : null;

  return (
    <SearchContext.Provider
      value={{
        profile: analysis?.profile,
        analytics: analysis?.analytics,
        handle: analysis?.profile.handle,
        loading: Boolean(searching),
        searchError: error,
        searchHandle,
        history,
        retryHistory: () => setHistoryAttempt((attempt) => attempt + 1),
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

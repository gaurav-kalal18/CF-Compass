import { useEffect, useState } from "react";
import API from "../services/api";
import { SearchContext } from "./useSearch";

async function loadRatingHistory(handle, signal) {
  const { data } = await API.get("/profile/rating/" + handle, { signal });
  const rows = Array.isArray(data) ? data : data?.result;
  if (!Array.isArray(rows)) throw new Error("Unexpected rating history format");

  return rows.slice().sort(
    (first, second) => first.ratingUpdateTimeSeconds - second.ratingUpdateTimeSeconds
  );
}

async function loadAnalytics(handle, signal) {
  const { data } = await API.get("/analytics/" + handle, { signal });
  if (!Array.isArray(data?.topicAnalytics)) throw new Error("Unexpected analytics format");

  return data;
}

function useProfileResource(profile, loadResource) {
  const [result, setResult] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!profile) return;

    const controller = new AbortController();

    async function load() {
      try {
        const data = await loadResource(encodeURIComponent(profile.handle), controller.signal);
        if (!controller.signal.aborted) setResult({ profile, attempt, data, failed: false });
      } catch {
        if (!controller.signal.aborted) setResult({ profile, attempt, data: null, failed: true });
      }
    }

    load();
    return () => controller.abort();
  }, [profile, attempt, loadResource]);

  const current = result && result.profile === profile && result.attempt === attempt ? result : null;
  return [current, () => setAttempt((previous) => previous + 1)];
}

export function SearchProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [ratings, retryHistory] = useProfileResource(profile, loadRatingHistory);
  const [submissions, retryAnalytics] = useProfileResource(profile, loadAnalytics);

  async function searchHandle(value) {
    const username = value.trim();
    if (!username || loading) return;

    setLoading(true);
    setSearchError("");

    try {
      const { data } = await API.get("/profile/" + encodeURIComponent(username));
      if (typeof data?.handle !== "string" || !data.handle) throw new Error("Unexpected profile format");

      setProfile(data);
    } catch (error) {
      if (!error.response || [502, 503, 504].includes(error.response.status)) {
        setSearchError("The analysis service didn’t respond. Wait a moment, then try Analyze again.");
      } else {
        setSearchError("Couldn’t load @" + username + ". Check the Codeforces handle and try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SearchContext.Provider
      value={{
        profile,
        analytics: submissions?.data,
        analyticsFailed: submissions?.failed ?? false,
        retryAnalytics,
        handle: profile?.handle,
        loading,
        searchError,
        searchHandle,
        history: ratings && { contests: ratings.data ?? [], failed: ratings.failed },
        retryHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

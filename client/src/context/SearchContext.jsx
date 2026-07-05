import { createContext, useContext, useState } from "react";
import API from "../services/api";

const SearchContext = createContext();

export function SearchProvider({ children }) {

  const [handle, setHandle] = useState("");

  const [profile, setProfile] = useState(null);

  const [analytics, setAnalytics] = useState(null);

  const [loading, setLoading] = useState(false);

  async function searchHandle(username) {

    if (!username.trim()) return;

    try {

      setLoading(true);

      const [profileResponse, analyticsResponse] =
        await Promise.all([
          API.get(`/profile/${username}`),
          API.get(`/analytics/${username}`)
        ]);

      setHandle(username);

      setProfile(profileResponse.data);

      setAnalytics(analyticsResponse.data);

    }

    catch (error) {

      console.error(error);

      setProfile(null);

      setAnalytics(null);

      alert("Unable to fetch Codeforces profile.");

    }

    finally {

      setLoading(false);

    }

  }

  return (

    <SearchContext.Provider
      value={{

        handle,

        profile,

        analytics,

        loading,

        searchHandle,

      }}
    >

      {children}

    </SearchContext.Provider>

  );

}

export function useSearch() {

  return useContext(SearchContext);

}
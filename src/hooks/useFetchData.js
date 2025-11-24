import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

/**
 * Custom hook to fetch data from backend API
 * @param {string} endpoint - API endpoint (e.g., '/api/alldata', '/api/voices')
 * @param {any} defaultValue - default value if fetch fails
 * @returns {object} - { data, loading, error }
 */
export const useFetchData = (endpoint, defaultValue = []) => {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}${endpoint}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${endpoint}:`, err);
        setError(err.message);
        setData(defaultValue);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetchData;

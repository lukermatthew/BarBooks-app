import { useEffect, useState, useCallback } from 'react';
import type { Summary } from '../type/summary';

export function useSummary() {
  const [data, setData] = useState<null | Summary>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(() => {
    setLoading(true);
    setError(null);

    fetch('http://localhost:3000/api/summary')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch summary');
        return res.json();
      })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return { data, loading, error, refetchSummary: fetchSummary };
}

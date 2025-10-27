// hooks/useUserOptions.ts
import { useAuth } from "@clerk/react-router";
import { useEffect, useRef, useState } from "react";
import { fetchUsers } from "../../api/fetch/fetchUsers";

export type Option = { value: string; label: string };

export function useUserOptions() {
  const { getToken } = useAuth();
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // keep a stable ref to getToken so we don't depend on its identity
  const getTokenRef = useRef(getToken);
  useEffect(() => { getTokenRef.current = getToken; }, [getToken]);

  const alive = useRef(true);
  useEffect(() => () => { alive.current = false; }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const token = await getTokenRef.current();
        if (!token) throw new Error("No user credentials");

        const users = await fetchUsers(token);
        const opts = users.map(u => {
          const name = `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim();
          return { value: u.id, label: name || u.email || u.id };
        });

        if (!cancelled && alive.current) setOptions(opts);
      } catch (e: any) {
        if (!cancelled && alive.current) setError(e?.message ?? "Failed to load employees");
      } finally {
        if (!cancelled && alive.current) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []); // ← empty deps: runs once on mount

  const reload = async () => {
    // simple reload that reuses the same logic without creating new deps
    setLoading(true);
    setError(null);
    try {
      const token = await getTokenRef.current();
      if (!token) throw new Error("No user credentials");
      const users = await fetchUsers(token);
      const opts = users.map(u => {
        const name = `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim();
        return { value: u.id, label: name || u.email || u.id };
      });
      if (alive.current) setOptions(opts);
    } catch (e: any) {
      if (alive.current) setError(e?.message ?? "Failed to load employees");
    } finally {
      if (alive.current) setLoading(false);
    }
  };

  return { options, loading, error, reload };
}

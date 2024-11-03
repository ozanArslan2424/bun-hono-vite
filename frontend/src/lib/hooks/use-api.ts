import { type ApiRoutes } from "@shared/types";
import { ClientResponse, hc } from "hono/client";
import { StatusCode } from "hono/utils/http-status";
import { useEffect, useState } from "react";

export const apiClient = hc<ApiRoutes>("/");

export function useApi<T>(
  callback: (client: typeof apiClient) => () => Promise<ClientResponse<T, StatusCode, "json">>
): {
  data: T | null;
  loading: boolean;
} {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    async function fetchNotes() {
      const res = await callback(apiClient)();
      const data = await res.json();
      setData(data);
      setLoading(false);
    }

    fetchNotes();
  }, []);

  return { data, loading };
}

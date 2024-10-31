import React from "react";

export function useFetch<T>(url: string, { autoInvoke = true, ...options } = {}) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState(null);

  const controller = React.useRef<AbortController | null>(null);

  const refetch = React.useCallback(() => {
    if (!url) {
      return;
    }
    if (controller.current) {
      controller.current.abort();
    }
    controller.current = new AbortController();
    setLoading(true);
    return fetch(url, { signal: controller.current.signal, ...options })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
        return res;
      })
      .catch((err) => {
        setLoading(false);
        if (err.name !== "AbortError") {
          setError(err);
        }
        throw err;
      });
  }, [url]);

  const abort = React.useCallback(() => {
    if (controller.current) {
      controller.current?.abort("");
    }
  }, []);

  React.useEffect(() => {
    if (autoInvoke) {
      refetch();
    }
    return () => {
      if (controller.current) {
        controller.current.abort("");
      }
    };
  }, [refetch, autoInvoke]);

  return { data, loading, error, refetch, abort };
}

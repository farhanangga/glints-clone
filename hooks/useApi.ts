"use client";

import { useEffect, useState } from "react";

export function useApi<T>(url: string) {
  const [payload, setPayload] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);
    fetch(url, { signal: ctrl.signal, cache: "no-store" })
      .then(async (res) => {
        const json = await res.json().catch(() => null);
        if (!res.ok) throw new Error(json?.message ?? `Gagal memuat data (${res.status}).`);
        setPayload(json as T);
      })
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setError(
          e instanceof TypeError
            ? "Tidak dapat terhubung ke server. Periksa koneksi internetmu."
            : (e as Error).message
        );
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setLoading(false);
      });
    return () => ctrl.abort();
  }, [url, tick]);

  return { payload, loading, error, reload: () => setTick((t) => t + 1) };
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type SignatureCountContextValue = {
  count: number | null;
  loading: boolean;
  error: boolean;
  refresh: () => Promise<void>;
};

const SignatureCountContext = createContext<SignatureCountContextValue | null>(
  null
);

export function SignatureCountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/signatures", { cache: "no-store" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch count");
      }

      setCount(data.count);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({ count, loading, error, refresh }),
    [count, loading, error, refresh]
  );

  return (
    <SignatureCountContext.Provider value={value}>
      {children}
    </SignatureCountContext.Provider>
  );
}

export function useSignatureCount() {
  const context = useContext(SignatureCountContext);
  if (!context) {
    throw new Error(
      "useSignatureCount must be used within SignatureCountProvider"
    );
  }
  return context;
}

// context/RevisionCardsProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { getRevisionCards } from "@/types/ResponseTypes";
import { getRevisionCardsRequest } from "@/hooks/useRevise"; // your API call function

export interface RevisionCardsContextType {
  reviseCard: getRevisionCards | null;
  loading: boolean;
  fetchRevisionData: (id: string, type: string) => Promise<void>;
}

const RevisionCardsContext = createContext<RevisionCardsContextType | undefined>(
  undefined
);

export function RevisionCardsProvider({ children }: { children: ReactNode }) {
  const [reviseCard, setReviseCard] = useState<getRevisionCards | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchRevisionData(id: string, type: string) {
    setLoading(true);
    try {
      const data = await getRevisionCardsRequest({ id, type });
      setReviseCard(data ?? null);
    } catch (error) {
      console.error("Error fetching revision data:", error);
      setReviseCard(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <RevisionCardsContext.Provider
      value={{
        reviseCard,
        loading,
        fetchRevisionData,
      }}
    >
      {children}
    </RevisionCardsContext.Provider>
  );
}

export function useReviseContext() {
  const context = useContext(RevisionCardsContext);
  if (!context) {
    throw new Error(
      "useRevisionCardsContext must be used within a RevisionCardsProvider"
    );
  }
  return context;
}

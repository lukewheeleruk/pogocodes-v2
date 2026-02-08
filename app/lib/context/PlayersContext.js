"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { getPlayers } from "@/app/lib/data";
import { profileSchema } from "@/app/lib/profileSchema";
import {
  areFiltersEqual,
  filtersFromSearchParams,
  mergeFiltersIntoSearchParams,
  normalizeFilters,
} from "@/app/lib/filters";

const PlayersContext = createContext(null);

export function PlayersProvider({
  children,
  initialPlayers = [],
  initialCursor = null,
  initialFilters = {},
}) {
  const [players, setPlayers] = useState(initialPlayers);
  const [cursor, setCursor] = useState(initialCursor);
  const [filters, setFiltersState] = useState(normalizeFilters(initialFilters));
  const [loading, setLoading] = useState(false);
  const hasFetchedOnceRef = useRef(false);

  const setFilters = (nextValue) => {
    setFiltersState((prev) => {
      const resolved =
        typeof nextValue === "function" ? nextValue(prev) : nextValue;
      return normalizeFilters(resolved);
    });
  };

  // Keep local filters in sync with browser URL when user uses back/forward.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const urlFilters = filtersFromSearchParams(params);
      setFiltersState((prev) =>
        areFiltersEqual(prev, urlFilters) ? prev : urlFilters
      );
    };

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  // Keep browser URL in sync with local filters without triggering route navigation.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentParams = new URLSearchParams(window.location.search);
    const nextParams = mergeFiltersIntoSearchParams(currentParams, filters);
    const currentQuery = currentParams.toString();
    const nextQuery = nextParams.toString();

    if (currentQuery === nextQuery) return;

    const nextUrl = nextQuery
      ? `${window.location.pathname}?${nextQuery}`
      : window.location.pathname;
    window.history.pushState(null, "", nextUrl);
  }, [filters]);

  // 🔄 Fetch when filters change
  useEffect(() => {
    // Skip duplicate initial client fetch; server already fetched initial state.
    if (!hasFetchedOnceRef.current) {
      hasFetchedOnceRef.current = true;
      return;
    }

    const fetchPlayers = async () => {
      setLoading(true);
      try {
        // Fetch players based on current filters
        const { players: fetchedPlayers, cursor: newCursor } = await getPlayers(
          filters
        );
        setPlayers(fetchedPlayers);
        setCursor(newCursor);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [filters]);

  // 📝 Submit profile
  const submitProfile = async (profileData, user) => {
    if (!user) throw new Error("Must be signed in to submit a profile.");

    // ✅ Validate with Zod before writing to Firestore
    const parsed = profileSchema.safeParse(profileData);
    if (!parsed.success) {
      // throw the first error message, or you could return parsed.error.format()
      throw new Error(parsed.error.errors[0].message);
    }

    const validData = parsed.data; // guaranteed to conform to schema

    const docRef = doc(db, "dev_profiles", user.uid);

    const snap = await getDoc(docRef);
    const exists = snap.exists();

    const rawData = {
      ...validData,
      lastBump: Timestamp.now(),
      uid: user.uid,
      location: validData.location
        ? {
            ...validData.location,
            display: `${validData.location.city || ""}${
              validData.location.city && validData.location.country ? ", " : ""
            }${validData.location.country || ""}`,
          }
        : null,
    };

    await setDoc(docRef, rawData, { merge: true });

    // 🔹 Add country to countries collection
    if (validData.location?.country) {
      const countryDocRef = doc(
        db,
        "dev_countries",
        validData.location.country
      );
      const snap = await getDoc(countryDocRef);
      if (!snap.exists()) {
        await setDoc(countryDocRef, { name: validData.location.country });
      }
    }

    // Refresh players list
    const data = await getPlayers();
    setPlayers(data.players);
    setCursor(data.cursor);

    return exists ? "updated" : "created";
  };

  const handleLoadMore = async () => {
    if (!cursor) return;
    setLoading(true);
    try {
      const data = await getPlayers(filters, cursor);
      setPlayers((prev) => [...prev, ...data.players]);
      setCursor(data.cursor);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PlayersContext.Provider
      value={{
        players,
        cursor,
        filters,
        loading,
        setFilters,
        handleLoadMore,
        submitProfile,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
}

export function usePlayersContext() {
  const ctx = useContext(PlayersContext);
  if (!ctx)
    throw new Error("usePlayersContext must be used within PlayersProvider");
  return ctx;
}

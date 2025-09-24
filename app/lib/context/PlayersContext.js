"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { getPlayers } from "@/app/lib/data";
import { profileSchema } from "@/app/lib/profileSchema";

const PlayersContext = createContext(null);

export function PlayersProvider({
  children,
  initialPlayers = [],
  initialCursor = null,
  initialFilters = { team: null, tags: null, country: null },
}) {
  const [players, setPlayers] = useState(initialPlayers);
  const [cursor, setCursor] = useState(initialCursor);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const { replace } = useRouter();

  // 🔄 Fetch when filters change + sync URL
  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        // Fetch players based on current filters
        const { players: fetchedPlayers, cursor: newCursor } = await getPlayers(
          filters
        );
        setPlayers(fetchedPlayers);
        setCursor(newCursor);

        // Sync filters to URL dynamically
        const urlParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value != null) urlParams.set(key, value);
        });

        replace(`${pathname}?${urlParams.toString()}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [filters, pathname, replace]);

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

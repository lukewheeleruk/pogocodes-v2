"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { getPlayers } from "@/app/lib/data";

export function usePlayers({
  initialPlayers = [],
  initialCursor = null,
  initialFilters = { team: null, tags: null },
} = {}) {
  const [players, setPlayers] = useState(initialPlayers);
  const [cursor, setCursor] = useState(initialCursor);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const { replace } = useRouter();

  // Fetch on filter changes + sync URL
  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const data = await getPlayers(filters);
        setPlayers(data.players);
        setCursor(data.cursor);

        const urlParams = new URLSearchParams(filters);
        filters.team
          ? urlParams.set("team", filters.team)
          : urlParams.delete("team");
        filters.tags
          ? urlParams.set("tags", filters.tags)
          : urlParams.delete("tags");
        replace(`${pathname}?${urlParams.toString()}`);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, [filters, pathname, replace]);

  const submitProfile = async (profileData, user) => {
    if (!user) throw new Error("Must be signed in to submit a profile.");

    const docRef = doc(db, "dev_profiles", user.uid);

    // 🔎 Check if profile exists already
    const snap = await getDoc(docRef);
    const exists = snap.exists();

    const rawData = {
      ...profileData,
      lastBump: Timestamp.now(),
      uid: user.uid,
    };

    // ✅ setDoc with merge updates if exists, creates if not
    await setDoc(docRef, rawData, { merge: true });

    // 🔄 refresh players list
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

  const setTeamFilter = (value) => {
    setFilters((prev) => ({
      ...prev,
      team: value === "all-teams" ? null : value,
    }));
  };

  const setTagsFilter = (value) => {
    setFilters((prev) => ({
      ...prev,
      tags: value === "all-tags" ? null : value,
    }));
  };

  return {
    players,
    cursor,
    filters,
    loading,
    setFilters,
    setTeamFilter,
    setTagsFilter,
    handleLoadMore,
    submitProfile,
  };
}

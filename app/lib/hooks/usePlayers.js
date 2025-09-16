"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  };
}

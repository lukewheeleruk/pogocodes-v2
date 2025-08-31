"use client";

import { useRef } from "react";
import { usePlayers } from "@/app/lib/hooks/usePlayers";
import Sidebar from "@/app/ui/Sidebar";
import PlayerList from "@/app/ui/PlayerList";

export default function HomePage({
  initialPlayers,
  initialCursor,
  initialFilters,
}) {
  const formRef = useRef(null);

  const {
    players,
    filters,
    loading,
    setFilters,
    setTeamFilter,
    setTagsFilter,
    handleLoadMore,
    submitProfile,
  } = usePlayers({ initialPlayers, initialCursor, initialFilters });

  return (
    <div className="w-[1000px] mx-auto flex gap-12 pt-12">
      <Sidebar
        filters={filters}
        setFilters={setFilters}
        setTeamFilter={setTeamFilter}
        setTagsFilter={setTagsFilter}
        submitProfile={submitProfile}
        formRef={formRef}
      />

      <PlayerList
        players={players}
        handleLoadMore={handleLoadMore}
        loading={loading}
      />
    </div>
  );
}

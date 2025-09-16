"use client";

import { usePlayers } from "@/app/lib/hooks/usePlayers";
import Controls from "@/app/ui/Controls";
import PlayerList from "@/app/ui/PlayerList";
import SkyscraperAdArea from "@/app/ui/SkyscraperAdArea";

export default function HomePage({
  initialPlayers,
  initialCursor,
  initialFilters,
}) {
  const { players, filters, loading, setFilters, handleLoadMore } = usePlayers({
    initialPlayers,
    initialCursor,
    initialFilters,
  });

  return (
    <div className="flex flex-col lg:flex-row lg:max-w-[1280px] mx-auto">
      <Controls filters={filters} setFilters={setFilters} />
      <PlayerList
        players={players}
        handleLoadMore={handleLoadMore}
        loading={loading}
      />
      <SkyscraperAdArea />
    </div>
  );
}

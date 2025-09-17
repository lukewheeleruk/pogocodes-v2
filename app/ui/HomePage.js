"use client";

import { usePlayers } from "@/app/lib/hooks/usePlayers";
import { useAuth } from "@/app/lib/hooks/useAuth";
import Controls from "@/app/ui/Controls";
import PlayerList from "@/app/ui/PlayerList";
import SkyscraperAdArea from "@/app/ui/SkyscraperAdArea";

export default function HomePage({
  initialPlayers,
  initialCursor,
  initialFilters,
}) {
  const {
    players,
    filters,
    loading,
    setFilters,
    handleLoadMore,
    submitProfile,
  } = usePlayers({
    initialPlayers,
    initialCursor,
    initialFilters,
  });

  const { user, profile, setProfile } = useAuth();

  return (
    <div className="flex flex-col lg:flex-row lg:max-w-[1280px] mx-auto">
      <Controls
        user={user}
        profile={profile}
        setProfile={setProfile}
        filters={filters}
        setFilters={setFilters}
        submitProfile={submitProfile}
      />
      <PlayerList
        players={players}
        handleLoadMore={handleLoadMore}
        loading={loading}
      />
      <SkyscraperAdArea />
    </div>
  );
}

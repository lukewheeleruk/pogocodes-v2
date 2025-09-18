"use client";

import { AuthProvider } from "@/app/lib/context/AuthContext";
import { PlayersProvider } from "@/app/lib/context/PlayersContext";
import Controls from "@/app/ui/Controls";
import PlayerList from "@/app/ui/PlayerList";
import SkyscraperAdArea from "@/app/ui/SkyscraperAdArea";

export default function HomePage({
  initialPlayers,
  initialCursor,
  initialFilters,
}) {
  return (
    <AuthProvider>
      <PlayersProvider
        initialPlayers={initialPlayers}
        initialCursor={initialCursor}
        initialFilters={initialFilters}
      >
        <div className="flex flex-col lg:flex-row lg:max-w-[1280px] mx-auto">
          <Controls />
          <PlayerList />
          <SkyscraperAdArea />
        </div>
      </PlayersProvider>
    </AuthProvider>
  );
}

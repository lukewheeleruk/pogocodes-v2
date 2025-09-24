"use client";

import { AuthProvider } from "@/app/lib/context/AuthContext";
import { PlayersProvider } from "@/app/lib/context/PlayersContext";
import Controls from "@/app/ui/Controls";
import PlayerList from "@/app/ui/PlayerList";

export default function HomePage({
  initialPlayers,
  initialCursor,
  initialFilters,
  countries,
}) {
  return (
    <AuthProvider>
      <PlayersProvider
        initialPlayers={initialPlayers}
        initialCursor={initialCursor}
        initialFilters={initialFilters}
      >
        <div className="flex flex-col">
          <Controls countries={countries} />
          <PlayerList />
        </div>
      </PlayersProvider>
    </AuthProvider>
  );
}

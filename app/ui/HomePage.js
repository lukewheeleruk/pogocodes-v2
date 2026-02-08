"use client";

import { PlayersProvider } from "@/app/lib/context/PlayersContext";
import { useEffect } from "react";
import Header from "@/app/ui/Header";
import Filters from "@/app/ui/Filters";
import PlayerList from "@/app/ui/PlayerList";
import { toast } from "sonner";

export default function HomePage({
  initialPlayers,
  initialCursor,
  initialFilters,
  countries,
}) {
  useEffect(() => {
    if (sessionStorage.getItem("bumpedProfile") === "true") {
      toast.success("Profile bumped successfully.");
      sessionStorage.removeItem("bumpedProfile"); // ✅ clear it so it only shows once
    }
  }, []);
  return (
    <PlayersProvider
      initialPlayers={initialPlayers}
      initialCursor={initialCursor}
      initialFilters={initialFilters}
    >
      <div className="flex flex-col">
        <Header />
        <div className="px-0 sm:px-4 pb-4">
          <Filters countries={countries} />
        </div>
        <PlayerList />
      </div>
    </PlayersProvider>
  );
}

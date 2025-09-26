"use client";

import { AuthProvider } from "@/app/lib/context/AuthContext";
import { PlayersProvider } from "@/app/lib/context/PlayersContext";
import { useEffect } from "react";
import Header from "@/app/ui/Header";
import PlayerList from "@/app/ui/PlayerList";
import { toast } from "sonner";

export default function HomePage({ initialPlayers, initialCursor, countries }) {
  useEffect(() => {
    if (sessionStorage.getItem("bumpedProfile") === "true") {
      toast.success("Profile bumped successfully.");
      sessionStorage.removeItem("bumpedProfile"); // ✅ clear it so it only shows once
    }
  }, []);
  return (
    <AuthProvider>
      <PlayersProvider
        initialPlayers={initialPlayers}
        initialCursor={initialCursor}
      >
        <div className="flex flex-col">
          <Header countries={countries} />
          <PlayerList />
        </div>
      </PlayersProvider>
    </AuthProvider>
  );
}

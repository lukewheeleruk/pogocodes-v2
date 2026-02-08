"use client";

import { usePlayersContext } from "@/app/lib/context/PlayersContext";
import Player from "@/app/ui/Player";
import { Button } from "@/components/ui/button";

export default function PlayerList() {
  const { players, handleLoadMore, loading } = usePlayersContext();
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col w-full px-0 sm:px-4 gap-4">
        {players.map((player) => (
          <Player {...player} key={player.code} />
        ))}
      </div>
      <div className="py-6 mx-auto">
        <Button
          variant="outline"
          size="lg"
          className="w-72 bg-white border-black text-black hover:bg-white/90 hover:text-black"
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load more"}
        </Button>
      </div>
    </div>
  );
}

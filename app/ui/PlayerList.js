"use client";

import { usePlayersContext } from "@/app/lib/context/PlayersContext";
import Player from "@/app/ui/Player";
import { Button } from "@/components/ui/button";

export default function PlayerList() {
  const { players, handleLoadMore, loading } = usePlayersContext();
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col w-full border-l border-r">
        {players.map((player) => (
          <Player {...player} key={player.code} />
        ))}
      </div>
      <div className="py-6 mx-auto">
        <Button className="w-64" onClick={handleLoadMore} disabled={loading}>
          {loading ? "Loading..." : "Load more"}
        </Button>
      </div>
    </div>
  );
}

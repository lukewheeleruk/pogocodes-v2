"use client";

import Player from "@/app/ui/Player";
import { Button } from "@/components/ui/button";

export default function PlayerList({ players, handleLoadMore, loading }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {players.map(({ username, code, team, tags, message, level }) => (
        <Player
          username={username}
          code={code}
          team={team}
          tags={tags}
          message={message}
          level={level}
          key={code}
        />
      ))}

      <Button variant="outline" onClick={handleLoadMore} disabled={loading}>
        {loading ? "Loading..." : "Load more"}
      </Button>
    </div>
  );
}

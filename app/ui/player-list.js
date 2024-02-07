"use client";

import { useEffect, useState } from "react";
import { getAdditionalPlayers, getInitialPlayers } from "@/app/lib/data";
import { useRouter, usePathname } from "next/navigation";
import Player from "@/app/ui/player";

export default function PlayerList({
  initialPlayers,
  initialCursor,
  searchParams,
}) {
  // hooks
  const pathname = usePathname();
  const { replace } = useRouter();

  // state
  const [players, setPlayers] = useState(initialPlayers);
  const [cursor, setCursor] = useState(initialCursor);
  const [currentParams, setCurrentParams] = useState(searchParams);

  const loadMorePlayers = async () => {
    const newPlayers = [...players];
    const { additionalPlayers, newCursor } = await getAdditionalPlayers(
      cursor,
      currentParams
    );
    additionalPlayers.forEach((player) => {
      newPlayers.push(player);
    });
    setPlayers(newPlayers);
    setCursor(newCursor);
  };

  const refreshAfterParamsChange = async () => {
    const urlParams = new URLSearchParams(currentParams);
    if (currentParams.team) {
      urlParams.set("team", currentParams.team);
    } else {
      urlParams.delete("team");
    }
    if (currentParams.tags) {
      urlParams.set("tags", currentParams.tags);
    } else {
      urlParams.delete("tags");
    }
    const { initialPlayers, initialCursor } = await getInitialPlayers(
      currentParams
    );
    setPlayers(initialPlayers);
    setCursor(initialCursor);
    replace(`${pathname}?${urlParams.toString()}`);
  };

  useEffect(() => {
    refreshAfterParamsChange();
  }, [currentParams]);

  const handleTeamChange = (team) => {
    if (!team) {
      setCurrentParams({ ...currentParams, team: null });
    } else {
      setCurrentParams({ ...currentParams, team: team });
    }
  };

  const handleTagsChange = (tags) => {
    if (!tags) {
      setCurrentParams({ ...currentParams, tags: null });
    } else {
      setCurrentParams({ ...currentParams, tags: tags });
    }
  };

  return (
    <div>
      <div className="flex gap-4">
        <button onClick={() => handleTeamChange()}>All teams</button>
        <button onClick={() => handleTeamChange("valor")}>Valor</button>
        <button onClick={() => handleTeamChange("mystic")}>Mystic</button>
        <button onClick={() => handleTeamChange("instinct")}>Instinct</button>
      </div>

      <div className="flex gap-4">
        <button onClick={() => handleTagsChange()}>All tags</button>
        <button onClick={() => handleTagsChange("gifts")}>Gifts</button>
        <button onClick={() => handleTagsChange("raids")}>Raids</button>
        <button onClick={() => handleTagsChange("pvp")}>PvP</button>
        <button onClick={() => handleTagsChange("trades")}>Trades</button>
      </div>

      <div className="flex flex-col gap-4">
        {players.map(({ username, code, team, tags }) => (
          <Player
            username={username}
            code={code}
            team={team}
            tags={tags}
            key={code}
          />
        ))}
      </div>
      <button onClick={loadMorePlayers}>Load more</button>
    </div>
  );
}

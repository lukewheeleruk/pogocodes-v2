"use client";

import { useEffect, useState } from "react";
import { getAdditionalPlayers, getInitialData } from "@/app/lib/data";
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
    const { initialPlayers, initialCursor } = await getInitialData(
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
      setCurrentParams({});
    } else {
      setCurrentParams({ team: team });
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

      <div className="flex flex-col gap-4">
        {players.map(({ username, code, team }) => (
          <Player username={username} code={code} team={team} key={code} />
        ))}
      </div>
      <button onClick={loadMorePlayers}>Load more</button>
    </div>
  );
}

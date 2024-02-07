"use client";
// this component is the core of our application, and is packed with interactivity (filters, loading more profiles, etc.)
// and as such needs to be a CLIENT component
import { useEffect, useState } from "react";
import { getAdditionalPlayers, getInitialData } from "@/app/lib/data";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
// this getAdditionalPlayers function is what enables us to load more players into the list upon a button press in the UI,
// beyond the five we initially receive from the page load on the server
import Player from "@/app/ui/player";

export default function PlayerList({
  initialPlayers,
  initialCursor,
  searchParams,
}) {
  const [players, setPlayers] = useState(initialPlayers);
  const [cursor, setCursor] = useState(initialCursor);
  const [currentParams, setCurrentParams] = useState(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const loadMorePlayers = async () => {
    const newPlayers = [...players];
    // the current players will need to still be there once we've added more, hence the destructuring
    // of the current players array state into the new one, before we add the new players
    const { additionalPlayers, newCursor } = await getAdditionalPlayers(
      cursor,
      currentParams
    );
    // get the next five players by passing in the current cursor and letting the getAdditionalPlayers
    // function retrieve the relevant next entries from Firestore
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

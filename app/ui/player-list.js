"use client";
// this component is the core of our application, and is packed with interactivity (filters, loading more profiles, etc.)
// and as such needs to be a CLIENT component
import { useState } from "react";
import { getAdditionalPlayers } from "@/app/lib/data";
// this getAdditionalPlayers function is what enables us to load more players into the list upon a button press in the UI,
// beyond the five we initially receive from the page load on the server
import Player from "@/app/ui/player";

export default function PlayerList({ initialPlayers, initialCursor }) {
  const [players, setPlayers] = useState(initialPlayers);
  const [cursor, setCursor] = useState(initialCursor);

  const loadMorePlayers = async () => {
    const newPlayers = [...players];
    // the current players will need to still be there once we've added more, hence the destructuring
    // of the current players array state into the new one, before we add the new players
    const { additionalPlayers, newCursor } = await getAdditionalPlayers(cursor);
    additionalPlayers.forEach((player) => {
      newPlayers.push(player);
    });
    setPlayers(newPlayers);
    setCursor(newCursor);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        {players.map(({ username, code }) => (
          <Player username={username} code={code} key={code} />
        ))}
      </div>
      <button onClick={loadMorePlayers}>Load more</button>
    </div>
  );
}

import { getPlayers } from "@/app/lib/data";
import Player from "@/app/ui/player";

export default async function PlayerList() {
  const players = await getPlayers();

  return (
    <div className="flex flex-col gap-4">
      {players.map(({ username, code }) => (
        <Player username={username} code={code} key={code} />
      ))}
    </div>
  );
}

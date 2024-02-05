import Player from "./player";
import { dummyPlayers as players } from "../lib/dummyPlayers";

export default function PlayerList() {
  return (
    <div className="flex flex-col gap-4">
      {players.map(({ name, level, team, bio }) => (
        <Player name={name} level={level} team={team} bio={bio} />
      ))}
    </div>
  );
}

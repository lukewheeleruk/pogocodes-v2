import { getInitialData } from "@/app/lib/data";
import PlayerList from "@/app/ui/player-list";

export default async function Home() {
  const { initialPlayers, initialCursor } = await getInitialData();
  return (
    <main className="flex justify-center">
      <PlayerList
        initialPlayers={initialPlayers}
        initialCursor={initialCursor}
      />
    </main>
  );
}

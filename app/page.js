import { getInitialPlayers } from "@/app/lib/data";
import PlayerList from "@/app/ui/player-list";

export default async function Home({ searchParams }) {
  const { initialPlayers, initialCursor } = await getInitialPlayers(
    searchParams
  );
  return (
    <main className="flex justify-center">
      <PlayerList
        initialPlayers={initialPlayers}
        initialCursor={initialCursor}
        searchParams={searchParams}
      />
    </main>
  );
}

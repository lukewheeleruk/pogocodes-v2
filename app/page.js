import { getPlayers } from "@/app/lib/data";
import PlayerList from "@/app/ui/player-list";

export default async function Home({ searchParams }) {
  const { players, cursor } = await getPlayers(searchParams);
  return (
    <main className="flex justify-center">
      <PlayerList
        initialPlayers={players}
        initialCursor={cursor}
        initialFilters={searchParams}
      />
    </main>
  );
}

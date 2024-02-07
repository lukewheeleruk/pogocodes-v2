import { getInitialData } from "@/app/lib/data";
import PlayerList from "@/app/ui/player-list";

export default async function Home({ searchParams }) {
  console.log(searchParams);
  const { initialPlayers, initialCursor } = await getInitialData(searchParams);
  const initialTeam = searchParams?.team || null;
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

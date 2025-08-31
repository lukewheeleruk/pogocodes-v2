import HomePage from "@/app/ui/HomePage";
import { getPlayers } from "@/app/lib/data";

//this should work

export default async function Page({ searchParams }) {
  // Await searchParams to make it safe
  const params = await searchParams;

  // Now build initial filters
  const initialFilters = {
    team: params.team ?? null,
    tags: params.tags ?? null,
  };

  // Fetch initial players
  const { players: initialPlayers, cursor: initialCursor } = await getPlayers(
    initialFilters
  );

  return (
    <HomePage
      initialPlayers={initialPlayers}
      initialCursor={initialCursor}
      initialFilters={initialFilters}
    />
  );
}

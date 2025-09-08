import HomePage from "@/app/ui/HomePage";
import { getPlayers } from "@/app/lib/data";

export default async function Page({ searchParams }) {
  const params = await searchParams;

  const initialFilters = {
    team: params.team ?? null,
    tags: params.tags ?? null,
  };

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

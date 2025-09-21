import HomePage from "@/app/ui/HomePage";
import { getPlayers, getCountries } from "@/app/lib/data";

export default async function Page({ searchParams }) {
  const params = await searchParams;

  const initialFilters = {
    team: params.team ?? null,
    tags: params.tags ?? null,
    country: params.country ?? null,
  };

  const { players: initialPlayers, cursor: initialCursor } = await getPlayers(
    initialFilters
  );

  const countries = await getCountries();

  return (
    <HomePage
      initialPlayers={initialPlayers}
      initialCursor={initialCursor}
      initialFilters={initialFilters}
      countries={countries}
    />
  );
}

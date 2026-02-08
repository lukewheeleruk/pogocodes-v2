import HomePage from "@/app/ui/HomePage";
import { getPlayers, getCountries } from "@/app/lib/data";
import { filtersFromSearchParamsObject } from "@/app/lib/filters";

export default async function Page({ searchParams }) {
  const resolvedSearchParams = (await searchParams) || {};
  const initialFilters = filtersFromSearchParamsObject(resolvedSearchParams);

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

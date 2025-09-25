import HomePage from "@/app/ui/HomePage";
import { getPlayers, getCountries } from "@/app/lib/data";

export default async function Page() {
  const { players: initialPlayers, cursor: initialCursor } = await getPlayers();

  const countries = await getCountries();

  return (
    <HomePage
      initialPlayers={initialPlayers}
      initialCursor={initialCursor}
      countries={countries}
    />
  );
}

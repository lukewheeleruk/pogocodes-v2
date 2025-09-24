import Filters from "./Filters";
import AddProfileDialog from "@/app/ui/AddProfileDialog";
import { auth } from "@/app/lib/firebase";
import { signOut } from "firebase/auth";
import { useAuthContext } from "@/app/lib/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function Controls({ countries }) {
  const { user } = useAuthContext();
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex flex-col text-center p-8 gap-6 border-b">
          <h1 className="text-4xl font-bold">
            Browse Pokemon Go friend codes from around the world.
          </h1>
          <p>
            Filter by country, team, and tag such as gifts or raids. Add your
            profile to get added by other trainers!
          </p>
          <div className="flex flex-col items-center gap-2">
            <AddProfileDialog />

            {user && (
              <Button
                variant="outline"
                className="w-64"
                onClick={() => signOut(auth)}
              >
                Sign out
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center p-4 border-b">
          <Filters countries={countries} />
        </div>
      </div>
      <div className="flex flex-col gap-2"></div>
    </div>
  );
}

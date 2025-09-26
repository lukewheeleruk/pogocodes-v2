import Filters from "./Filters";
import localFont from "next/font/local";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useAuthContext } from "@/app/lib/context/AuthContext";
import AddProfileButton from "./AddProfileButton";
import { Button } from "@/components/ui/button";

const myFont = localFont({
  src: "../../public/ZalandoSansExpanded-VariableFont_wght.ttf",
  variable: "--font-zalando",
});

export default function Controls({ countries }) {
  const { user, profile } = useAuthContext();

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex flex-col text-center md:text-left p-8 gap-6 border-b">
          <h1 className={`text-4xl font-bold text-balance ${myFont.className}`}>
            Browse Pokemon Go friend codes from around the world.
          </h1>
          <p className="text-muted-foreground">
            Filter by country, team, and tag such as gifts or raids. Add your
            profile to get added by other trainers!
          </p>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <AddProfileButton profile={profile} user={user} />

            {user && (
              <Button variant="outline" onClick={() => signOut(auth)}>
                Sign out
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center p-4 border-b">
          <Filters countries={countries} />
        </div>
      </div>
    </div>
  );
}

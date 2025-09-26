import Filters from "./Filters";
import localFont from "next/font/local";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useAuthContext } from "@/app/lib/context/AuthContext";
import AddProfileButton from "./AddProfileButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const myFont = localFont({
  src: "../../public/ZalandoSansExpanded-VariableFont_wght.ttf",
  variable: "--font-zalando",
});

export default function Header({ countries }) {
  const { user, profile } = useAuthContext();

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col">
        <section className="flex justify-between items-center p-4 h-16">
          <span className={`text-purple-600 font-bold ${myFont.className}`}>
            pogo.codes
          </span>
          {user && (
            <div onClick={() => signOut(auth)} className="cursor-pointer">
              <Avatar>
                <AvatarImage src={user?.photoURL} />
                <AvatarFallback>LW</AvatarFallback>
              </Avatar>
            </div>
          )}
        </section>
        <div className="flex flex-col text-center p-8 gap-8">
          <h1 className={`text-4xl font-bold text-balance ${myFont.className}`}>
            Browse Pokemon Go friend codes from around the world.
          </h1>
          <p className="text-muted-foreground text-balance">
            Filter by country, team, and tag such as gifts or raids. Add your
            profile to get added by other trainers!
          </p>
          <div className="flex flex-col items-center gap-2">
            <AddProfileButton profile={profile} user={user} />
          </div>
        </div>
        <div className="flex items-center p-4">
          <Filters countries={countries} />
        </div>
      </div>
    </div>
  );
}

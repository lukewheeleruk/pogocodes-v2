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

export default function Header() {
  const { user, profile } = useAuthContext();

  return (
    <div className="flex flex-col justify-between mb-8 rounded-b-3xl">
      <div className="flex flex-col">
        <section className="flex justify-between items-center p-4 h-16">
          <span className={`text-primary font-bold ${myFont.className}`}>
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
        <div className="flex flex-col text-center p-8 gap-7">
          <h1
            className={`text-6xl font-bold text-balance tracking-tight ${myFont.className}`}
          >
            Browse Pokemon Go friend codes from around the world.
          </h1>
          <p className="text-xl text-foreground/85 text-balance max-w-3xl mx-auto leading-snug">
            Filter by country, team, and tag such as gifts or raids. Add your
            profile to get added by other trainers!
          </p>
          <div className="flex flex-col items-center gap-3 pt-1">
            <AddProfileButton profile={profile} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

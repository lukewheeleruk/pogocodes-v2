import { auth } from "@/app/lib/firebase";
import { useAuthContext } from "@/app/lib/context/AuthContext";
import { signOut } from "firebase/auth";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import Image from "next/image";

export default function ProfileToolbar() {
  const { profile } = useAuthContext();
  const avatar = createAvatar(adventurer, {
    seed: profile?.code || "guest",
    size: 32,
    radius: 50,
    backgroundColor: ["b6e3f4", "c0aede", "ffdfbf", "ffbde4", "ffffb3"],
  }).toDataUri();
  return (
    <div className="flex flex-row justify-between p-4 items-center border-b">
      {profile && (
        <div className="flex items-center gap-2" onClick={() => signOut(auth)}>
          <Image
            src={avatar}
            alt="Your avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <h3 className="text-base">{profile?.username || "Not signed in"}</h3>
        </div>
      )}
    </div>
  );
}

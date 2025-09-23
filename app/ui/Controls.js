"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/app/lib/firebase";
import AddProfileDialog from "./AddProfileDialog";
import Filters from "./Filters";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useAuthContext } from "@/app/lib/context/AuthContext";

export default function Controls({ countries }) {
  const { user } = useAuthContext();

  const router = useRouter();

  return (
    <div className="flex flex-col justify-between p-6 lg:sticky lg:top-0 lg:h-screen lg:flex-none lg:w-60">
      <div className="flex flex-col gap-12">
        <AddProfileDialog />
        <Filters countries={countries} />
      </div>
      <div className="flex flex-col gap-2">
        {user ? (
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => signOut(auth)}
          >
            Sign out
          </Button>
        ) : (
          <Button className="w-full" onClick={() => router.push("/signin")}>
            Sign in
          </Button>
        )}
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddProfileDialog() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    // User not logged in -> regular button that redirects
    return (
      <Button className="w-full" onClick={() => router.push("/signin")}>
        Add your profile
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Add your profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add your profile</DialogTitle>
          <DialogDescription>
            Fill in your trainer details below. Your profile will appear in the
            list immediately after submitting.
          </DialogDescription>
        </DialogHeader>
        {/* form will go here */}
      </DialogContent>
    </Dialog>
  );
}

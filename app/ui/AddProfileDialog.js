"use client";

import { useState } from "react";
import { useAuthContext } from "@/app/lib/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import SubmitProfileForm from "@/app/ui/SubmitProfileForm";

export default function AddProfileDialog() {
  const { profile, user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if (!user) {
    return (
      <Button className="w-full" onClick={() => router.push("/signin")}>
        Add your profile
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          {profile ? "Update your profile" : "Add your profile"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {profile ? "Update your profile" : "Add your profile"}
          </DialogTitle>
          <DialogDescription>
            Fill in your trainer details below. Your profile will appear in the
            list immediately after submitting.
          </DialogDescription>
        </DialogHeader>
        <SubmitProfileForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

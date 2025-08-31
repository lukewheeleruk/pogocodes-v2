"use client";

import { useRef } from "react";
import { addProfile } from "@/app/lib/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddProfileDialog({ onProfileAdded, resetFilters }) {
  const ref = useRef(null);

  const submitForm = async (formData) => {
    await addProfile(formData);
    onProfileAdded();
    ref.current?.reset();
    resetFilters();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <span className={buttonVariants({ variant: "default" })}>
          Add your profile
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add your profile</DialogTitle>
          <DialogDescription>
            Fill in your trainer details below. Your profile will appear in the
            list immediately after submitting.
          </DialogDescription>
          <form
            ref={ref}
            action={submitForm}
            className="flex flex-col mt-8 mb-8 gap-4"
          >
            <input name="username" placeholder="Username" />
            <input name="code" placeholder="Friend code" />
            <select name="team" defaultValue="">
              <option value="">Select your team</option>
              <option value="valor">Valor</option>
              <option value="mystic">Mystic</option>
              <option value="instinct">Instinct</option>
            </select>
            <textarea name="message" placeholder="Type your message here" />
            <Button>Submit</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

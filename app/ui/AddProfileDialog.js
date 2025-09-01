"use client";

import { useRef } from "react";
import { addProfile } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
      <DialogTrigger asChild>
        <Button>Add your profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add your profile</DialogTitle>
          <DialogDescription>
            Fill in your trainer details below. Your profile will appear in the
            list immediately after submitting.
          </DialogDescription>
        </DialogHeader>

        <form
          ref={ref}
          action={submitForm}
          className="flex flex-col gap-4 mt-6"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Your trainer name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="code">Friend Code</Label>
            <Input id="code" name="code" placeholder="XXXX XXXX XXXX" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="team">Team</Label>
            <Select name="team">
              <SelectTrigger id="team">
                <SelectValue placeholder="Select your team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="valor">Valor</SelectItem>
                <SelectItem value="mystic">Mystic</SelectItem>
                <SelectItem value="instinct">Instinct</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Say something to other trainers..."
            />
          </div>

          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

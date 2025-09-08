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
import { Checkbox } from "@/components/ui/checkbox";
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

          {/* Team + Level side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <Label htmlFor="level">Player Level</Label>
              <Select name="level">
                <SelectTrigger id="level">
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 50 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-4">
              {["raids", "gifts", "pvp", "trades"].map((tag) => {
                const inputId = `form-tag-${tag}`; // unique ID for the form
                return (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox id={inputId} name="tags" value={tag} />
                    <Label htmlFor={inputId} className="capitalize">
                      {tag}
                    </Label>
                  </div>
                );
              })}
            </div>
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

"use client";
import { useAuthContext } from "@/app/lib/context/AuthContext";
import { usePlayersContext } from "@/app/lib/context/PlayersContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function AddProfileDialog() {
  const { user, profile, setProfile } = useAuthContext();
  const { submitProfile } = usePlayersContext();

  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Controlled inputs
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [team, setTeam] = useState("");
  const [level, setLevel] = useState("");
  const [tags, setTags] = useState([]); // array of strings
  const [message, setMessage] = useState("");

  // Prepopulate when profile changes
  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setCode(profile.code || "");
      setTeam(profile.team || "");
      setLevel(profile.level || "");
      setTags(profile.tags || []);
      setMessage(profile.message || "");
    }
  }, [profile]);

  if (!user) {
    // User not logged in -> redirect to signin
    return (
      <Button className="w-full" onClick={() => router.push("/signin")}>
        Add your profile
      </Button>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = {
      username,
      code,
      team,
      level,
      tags,
      message,
    };
    await submitProfile(profileData, user);
    setProfile({ ...profile, ...profileData }); // update local profile state
    setOpen(false); // close dialog on success
  };

  const tagOptions = ["raids", "gifts", "pvp", "trades"];

  const handleTagChange = (tagValue) => {
    setTags((prev) =>
      prev.includes(tagValue)
        ? prev.filter((t) => t !== tagValue)
        : [...prev, tagValue]
    );
  };

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

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Username */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your trainer name"
            />
          </div>

          {/* Friend Code */}
          <div className="flex flex-col gap-2">
            <label htmlFor="code" className="text-sm font-medium">
              Trainer Code
            </label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="XXXX XXXX XXXX"
            />
          </div>

          {/* Team Select */}
          <div className="flex flex-col gap-2">
            <label htmlFor="team" className="text-sm font-medium">
              Team
            </label>
            <Select value={team} onValueChange={setTeam}>
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

          {/* Level Select */}
          <div className="flex flex-col gap-2">
            <label htmlFor="level" className="text-sm font-medium">
              Player Level
            </label>
            <Select value={level} onValueChange={setLevel}>
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

          {/* Tags Checkboxes */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Tags</span>
            <div className="flex flex-wrap gap-4 mt-1">
              {tagOptions.map((tag) => {
                const checked = tags.includes(tag);
                return (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => handleTagChange(tag)}
                    />
                    <span className="capitalize">{tag}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Say something to other trainers..."
            />
          </div>

          <Button type="submit" className="w-full">
            {profile ? "Update Profile" : "Add Profile"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

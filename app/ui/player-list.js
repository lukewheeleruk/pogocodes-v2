"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";
import { getPlayers } from "@/app/lib/data";
import { useRouter, usePathname } from "next/navigation";
import { addProfile } from "@/app/lib/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import Player from "@/app/ui/player";

export default function PlayerList({
  initialPlayers,
  initialCursor,
  initialFilters,
}) {
  // refs
  const ref = useRef(null);
  // hooks
  const pathname = usePathname();
  const { replace } = useRouter();
  // state
  const [players, setPlayers] = useState(initialPlayers);
  const [cursor, setCursor] = useState(initialCursor);
  const [filters, setFilters] = useState(initialFilters);

  const refreshAfterFiltersChange = async () => {
    const urlParams = new URLSearchParams(filters);
    if (filters.team) {
      urlParams.set("team", filters.team);
    } else {
      urlParams.delete("team");
    }
    if (filters.tags) {
      urlParams.set("tags", filters.tags);
    } else {
      urlParams.delete("tags");
    }
    const data = await getPlayers(filters);
    setPlayers(data.players);
    setCursor(data.cursor);
    replace(`${pathname}?${urlParams.toString()}`);
  };

  useEffect(() => {
    refreshAfterFiltersChange();
  }, [filters]);

  const handleLoadMore = async () => {
    const newPlayers = [...players];
    const data = await getPlayers(filters, cursor);
    data.players.forEach((player) => {
      newPlayers.push(player);
    });
    setPlayers(newPlayers);
    setCursor(data.cursor);
  };

  const handleRadioTeamChange = (value) => {
    console.log("The selected value is: ", value);
    if (value === "all-teams") {
      setFilters({ ...filters, team: null });
    } else {
      setFilters({ ...filters, team: value });
    }
  };

  const handleRadioTagsChange = (value) => {
    console.log("The selected value is: ", value);
    if (value === "all-tags") {
      setFilters({ ...filters, tags: null });
    } else {
      setFilters({ ...filters, tags: value });
    }
  };

  const submitForm = async (formData) => {
    await addProfile(formData);
    const { players, cursor } = await getPlayers();
    setPlayers(players);
    setCursor(cursor);
  };

  return (
    <div className="w-[1000px] flex gap-12 pt-12">
      <div className="flex flex-col gap-12 items-baseline">
        {/* <Image src="/new-logo-color.svg" width={100} height={16} /> */}
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
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
              <form
                ref={ref}
                action={async (formData) => {
                  await submitForm(formData);
                  ref.current?.reset();
                  setFilters({ team: null, tags: null });
                }}
                className="flex flex-col mt-8 mb-8"
              >
                <input name={"username"} placeholder="Username"></input>
                <input name={"code"} placeholder="Friend code"></input>
                {/* <input name={"team"} placeholder="Team"></input> */}
                <select name={"team"} placeholder="Select your team">
                  <option value="">Select your team</option>
                  <option value="valor">Valor</option>
                  <option value="mystic">Mystic</option>
                  <option value="instinct">Instinct</option>
                </select>
                <textarea
                  name={"message"}
                  placeholder="Type your message here"
                ></textarea>
                <Button>Submit</Button>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <RadioGroup
          defaultValue={filters.team ? filters.team : "all-teams"}
          onValueChange={handleRadioTeamChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all-teams" id="all-teams" />
            <Label htmlFor="all-teams">All teams</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mystic" id="mystic" />
            <Label htmlFor="mystic">Mystic</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="valor" id="valor" />
            <Label htmlFor="valor">Valor</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="instinct" id="instinct" />
            <Label htmlFor="instinct">Instinct</Label>
          </div>
        </RadioGroup>

        <RadioGroup
          defaultValue={filters.tags ? filters.tags : "all-tags"}
          onValueChange={handleRadioTagsChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all-tags" id="all-tags" />
            <Label htmlFor="all-tags">All tags</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gifts" id="gifts" />
            <Label htmlFor="gifts">Gifts</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="raids" id="raids" />
            <Label htmlFor="raids">Raids</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="trades" id="trades" />
            <Label htmlFor="trades">Trades</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pvp" id="pvp" />
            <Label htmlFor="pvp">PvP</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {players.map(({ username, code, team, tags, message, level }) => (
          <Player
            username={username}
            code={code}
            team={team}
            tags={tags}
            message={message}
            level={level}
            key={code}
          />
        ))}
        <Button variant="outline" onClick={handleLoadMore}>
          Load more
        </Button>
      </div>
    </div>
  );
}

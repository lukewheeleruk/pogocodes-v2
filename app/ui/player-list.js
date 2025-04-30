"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";
import { getPlayers } from "@/app/lib/data";
import { useRouter, usePathname } from "next/navigation";
import { addProfile } from "@/app/lib/actions";
import Player from "@/app/ui/player";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { updateLevelOnAllRecords } from "@/seed";

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

  const handleTeamChange = (team) => {
    if (!team) {
      setFilters({ ...filters, team: null });
    } else {
      setFilters({ ...filters, team: team });
    }
  };

  const handleTagsChange = (tags) => {
    if (!tags) {
      setFilters({ ...filters, tags: null });
    } else {
      setFilters({ ...filters, tags: tags });
    }
  };

  const submitForm = async (formData) => {
    await addProfile(formData);
    const { players, cursor } = await getPlayers();
    setPlayers(players);
    setCursor(cursor);
  };

  return (
    <div className="w-[800px]">
      <div className="flex gap-4">
        <button onClick={() => handleTeamChange()}>All teams</button>
        <button onClick={() => handleTeamChange("valor")}>Valor</button>
        <button onClick={() => handleTeamChange("mystic")}>Mystic</button>
        <button onClick={() => handleTeamChange("instinct")}>Instinct</button>
      </div>

      <div className="flex gap-4">
        <button onClick={() => handleTagsChange()}>All tags</button>
        <button onClick={() => handleTagsChange("gifts")}>Gifts</button>
        <button onClick={() => handleTagsChange("raids")}>Raids</button>
        <button onClick={() => handleTagsChange("pvp")}>PvP</button>
        <button onClick={() => handleTagsChange("trades")}>Trades</button>
      </div>

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
        <button>Submit</button>
      </form>

      <div className="flex flex-col gap-4">
        {players.map(({ username, code, team, tags, message, level }) => (
          <>
            <Player
              username={username}
              code={code}
              team={team}
              tags={tags}
              message={message}
              level={level}
              key={code}
            />
            <Separator />
          </>
        ))}
      </div>
      <Button variant="outline" onClick={handleLoadMore}>
        Load more
      </Button>
    </div>
  );
}

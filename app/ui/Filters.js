"use client";

import { usePlayersContext } from "@/app/lib/context/PlayersContext";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function Filters() {
  const { filters, setFilters } = usePlayersContext();
  const handleTeamChange = (value) => {
    setFilters({
      ...filters,
      team: value === "all-teams" ? null : value,
    });
  };

  const handleTagsChange = (value) => {
    setFilters({
      ...filters,
      tags: value === "all-tags" ? null : value,
    });
  };

  const handleClearFilters = () => {
    setFilters({ team: null, tags: null });
  };

  const isAnyFilterActive = filters.team || filters.tags;

  return (
    <div className="flex flex-col sm:flex-row lg:flex-col gap-6 w-full">
      {/* Team Filter */}
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="team-filter">Team</Label>
        <Select
          onValueChange={handleTeamChange}
          value={filters.team || "all-teams"}
        >
          <SelectTrigger id="team-filter">
            <SelectValue placeholder="Select a team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-teams">All teams</SelectItem>
            <SelectItem value="mystic">Mystic</SelectItem>
            <SelectItem value="valor">Valor</SelectItem>
            <SelectItem value="instinct">Instinct</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tags Filter */}
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="tags-filter">Tags</Label>
        <Select
          onValueChange={handleTagsChange}
          value={filters.tags || "all-tags"}
        >
          <SelectTrigger id="tags-filter">
            <SelectValue placeholder="Select a tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-tags">All tags</SelectItem>
            <SelectItem value="gifts">Gifts</SelectItem>
            <SelectItem value="raids">Raids</SelectItem>
            <SelectItem value="trades">Trades</SelectItem>
            <SelectItem value="pvp">PvP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isAnyFilterActive && (
        <div className="w-full mt-2">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="w-full"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}

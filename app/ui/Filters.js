"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Filters({ filters, setFilters }) {
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

  return (
    <div className="flex flex-col gap-6">
      {/* Team Filters */}
      <div>
        <RadioGroup
          defaultValue={filters.team || "all-teams"}
          onValueChange={handleTeamChange}
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
      </div>

      {/* Tags Filters */}
      <div>
        <RadioGroup
          defaultValue={filters.tags || "all-tags"}
          onValueChange={handleTagsChange}
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
    </div>
  );
}

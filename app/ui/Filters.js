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

export default function Filters({ countries }) {
  const { filters, setFilters } = usePlayersContext();

  const handleFilterChange = (filterName, value, defaultValue) => {
    setFilters({
      ...filters,
      [filterName]: value === defaultValue ? null : value,
    });
  };

  const handleClearFilters = () => {
    setFilters(
      Object.keys(filters).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {})
    );
  };

  // check if any filter is active to conditionally render "Clear all filters" button
  const isAnyFilterActive = Object.values(filters).some(Boolean);

  return (
    <div className="flex flex-col sm:flex-row lg:flex-col gap-6 w-full">
      {/* Team Filter */}
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="team-filter">Team</Label>
        <Select
          onValueChange={(value) =>
            handleFilterChange("team", value, "all-teams")
          }
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
          onValueChange={(value) =>
            handleFilterChange("tags", value, "all-tags")
          }
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

      {/* Country Filter */}
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="country-filter">Country</Label>
        <Select
          onValueChange={(value) =>
            handleFilterChange("country", value, "all-countries")
          }
          value={filters.country || "all-countries"}
        >
          <SelectTrigger id="country-filter">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-countries">All countries</SelectItem>
            {countries.map((country, i) => (
              <SelectItem key={i + 1} value={country.name}>
                {country.name}
              </SelectItem>
            ))}
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

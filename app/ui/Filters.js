"use client";

import { useState } from "react";
import { usePlayersContext } from "@/app/lib/context/PlayersContext";
import { Button } from "@/components/ui/button";
import { ListFilter, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function Filters({ countries }) {
  const { filters, setFilters } = usePlayersContext();
  const [tempFilters, setTempFilters] = useState(filters);
  const [open, setOpen] = useState(false);

  const handleTempChange = (filterName, value, defaultValue) => {
    setTempFilters({
      ...tempFilters,
      [filterName]: value === defaultValue ? null : value,
    });
  };

  const handleClearTempFilters = () => {
    setTempFilters(
      Object.keys(tempFilters).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {})
    );
  };

  const handleSaveFilters = () => {
    setFilters(tempFilters);
    setOpen(false); // ✅ close sheet after saving
  };

  const handleClearFilter = (key) => {
    // instantly clear a specific filter
    const updated = { ...filters, [key]: null };
    setFilters(updated);
    setTempFilters(updated);
  };

  const isAnyTempFilterActive = Object.values(tempFilters).some(Boolean);

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Filters button */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <ListFilter size={16} />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-6 mt-6">
            {/* Team Filter */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="team-filter">Team</Label>
              <Select
                onValueChange={(value) =>
                  handleTempChange("team", value, "all-teams")
                }
                value={tempFilters.team || "all-teams"}
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
            <div className="flex flex-col gap-2">
              <Label htmlFor="tags-filter">Tags</Label>
              <Select
                onValueChange={(value) =>
                  handleTempChange("tags", value, "all-tags")
                }
                value={tempFilters.tags || "all-tags"}
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
            <div className="flex flex-col gap-2">
              <Label htmlFor="country-filter">Country</Label>
              <Select
                onValueChange={(value) =>
                  handleTempChange("country", value, "all-countries")
                }
                value={tempFilters.country || "all-countries"}
              >
                <SelectTrigger id="country-filter">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-countries">All countries</SelectItem>
                  {countries.map((country, i) => (
                    <SelectItem key={i} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <SheetFooter className="mt-8 flex flex-col gap-2">
            <Button
              variant="outline"
              disabled={!isAnyTempFilterActive}
              onClick={handleClearTempFilters}
            >
              Clear all
            </Button>
            <Button onClick={handleSaveFilters}>Save filters</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Active filters as badges */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(filters).map(([key, value]) =>
          value ? (
            <Badge
              key={key}
              variant="secondary"
              className="flex items-center gap-1 cursor-pointer h-9 border-gray-200"
              onClick={() => handleClearFilter(key)}
            >
              {value}
              <X size={12} className="ml-1" />
            </Badge>
          ) : null
        )}
      </div>
    </div>
  );
}

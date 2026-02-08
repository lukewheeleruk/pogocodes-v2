"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const handleTempChange = (filterName, value, defaultValue) => {
    setTempFilters({
      ...tempFilters,
      [filterName]: value === defaultValue ? null : value,
    });
  };

  const handleDesktopChange = (filterName, value, defaultValue) => {
    const updated = {
      ...filters,
      [filterName]: value === defaultValue ? null : value,
    };
    setFilters(updated);
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

  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const selectTriggerClass =
    "h-11 rounded-xl border-black bg-white text-foreground shadow-sm transition-colors hover:bg-[#63F3A0]/35 focus:ring-2 focus:ring-black";
  const chipClass =
    "flex items-center gap-1 cursor-pointer h-9 border border-black/35 bg-white/90 text-foreground hover:bg-white";

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="md:hidden flex items-center justify-between gap-4">
        {/* Filters button */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-black bg-background hover:bg-[#63F3A0] hover:text-foreground"
            >
              <ListFilter size={16} />
              {activeFilterCount > 0 && (
                <Badge className="h-4 w-4 flex items-center justify-center rounded-full p-0 text-xs bg-primary text-primary-foreground">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-card">
            <SheetHeader>
              <SheetTitle className="text-3xl font-bold">Filters</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-6 mt-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="team-filter-mobile">Team</Label>
                <Select
                  onValueChange={(value) =>
                    handleTempChange("team", value, "all-teams")
                  }
                  value={tempFilters.team || "all-teams"}
                >
                  <SelectTrigger id="team-filter-mobile">
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

              <div className="flex flex-col gap-2">
                <Label htmlFor="tags-filter-mobile">Tags</Label>
                <Select
                  onValueChange={(value) =>
                    handleTempChange("tags", value, "all-tags")
                  }
                  value={tempFilters.tags || "all-tags"}
                >
                  <SelectTrigger id="tags-filter-mobile">
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

              <div className="flex flex-col gap-2">
                <Label htmlFor="country-filter-mobile">Country</Label>
                <Select
                  onValueChange={(value) =>
                    handleTempChange("country", value, "all-countries")
                  }
                  value={tempFilters.country || "all-countries"}
                >
                  <SelectTrigger id="country-filter-mobile">
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
                className={chipClass}
                onClick={() => handleClearFilter(key)}
              >
                {value}
                <X size={12} className="ml-1" />
              </Badge>
            ) : null
          )}
        </div>
      </div>

      <div className="hidden md:flex flex-col gap-2 pt-2 w-full">
        <div className="grid w-full grid-cols-12 items-end gap-3">
          <div className="col-span-3 flex flex-col gap-1">
            <Label htmlFor="team-filter-desktop" className="text-xs text-foreground/70">
              Team
            </Label>
            <Select
              onValueChange={(value) =>
                handleDesktopChange("team", value, "all-teams")
              }
              value={filters.team || "all-teams"}
            >
              <SelectTrigger
                id="team-filter-desktop"
                className={selectTriggerClass}
              >
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

          <div className="col-span-3 flex flex-col gap-1">
            <Label htmlFor="tags-filter-desktop" className="text-xs text-foreground/70">
              Tags
            </Label>
            <Select
              onValueChange={(value) =>
                handleDesktopChange("tags", value, "all-tags")
              }
              value={filters.tags || "all-tags"}
            >
              <SelectTrigger
                id="tags-filter-desktop"
                className={selectTriggerClass}
              >
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

          <div className="col-span-4 flex flex-col gap-1">
            <Label
              htmlFor="country-filter-desktop"
              className="text-xs text-foreground/70"
            >
              Country
            </Label>
            <Select
              onValueChange={(value) =>
                handleDesktopChange("country", value, "all-countries")
              }
              value={filters.country || "all-countries"}
            >
              <SelectTrigger
                id="country-filter-desktop"
                className={selectTriggerClass}
              >
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

          <Button
            variant="outline"
            size="sm"
            className="col-span-2 h-11 rounded-xl border-black bg-white px-5 hover:bg-[#63F3A0]/45 hover:text-foreground"
            onClick={() => setFilters({ team: null, tags: null, country: null })}
            disabled={activeFilterCount === 0}
          >
            Clear all
          </Button>
        </div>
      </div>
    </div>
  );
}

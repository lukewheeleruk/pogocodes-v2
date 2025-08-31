"use client";

import AddProfileDialog from "./AddProfileDialog";
import Filters from "./Filters";

export default function Sidebar({ filters, setFilters, submitForm }) {
  return (
    <div className="flex flex-col gap-12 items-baseline">
      <AddProfileDialog
        onProfileAdded={submitForm}
        resetFilters={() => setFilters({ team: null, tags: null })}
      />
      <Filters filters={filters} setFilters={setFilters} />
    </div>
  );
}

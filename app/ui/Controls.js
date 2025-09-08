"use client";

import AddProfileDialog from "./AddProfileDialog";
import Filters from "./Filters";

export default function Controls({ filters, setFilters, submitForm }) {
  return (
    <div className="flex flex-col p-6 gap-12 items-baseline lg:flex-none lg:w-60">
      <AddProfileDialog
        onProfileAdded={submitForm}
        resetFilters={() => setFilters({ team: null, tags: null })}
      />
      <Filters filters={filters} setFilters={setFilters} />
    </div>
  );
}

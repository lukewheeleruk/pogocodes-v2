const TEAM_VALUES = new Set(["mystic", "valor", "instinct"]);
const TAG_VALUES = new Set(["gifts", "raids", "trades", "pvp"]);

export const FILTER_KEYS = ["team", "tags", "country"];

function first(value) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeFilters(input = {}) {
  const team = normalizeString(input.team);
  const tags = normalizeString(input.tags);
  const country = normalizeString(input.country);

  return {
    team: TEAM_VALUES.has(team) ? team : null,
    tags: TAG_VALUES.has(tags) ? tags : null,
    country: country || null,
  };
}

export function filtersFromSearchParams(searchParams) {
  return normalizeFilters({
    team: searchParams.get("team"),
    tags: searchParams.get("tags"),
    country: searchParams.get("country"),
  });
}

export function filtersFromSearchParamsObject(searchParams = {}) {
  return normalizeFilters({
    team: first(searchParams.team),
    tags: first(searchParams.tags),
    country: first(searchParams.country),
  });
}

export function areFiltersEqual(a = {}, b = {}) {
  return FILTER_KEYS.every((key) => (a[key] || null) === (b[key] || null));
}

export function mergeFiltersIntoSearchParams(baseSearchParams, filters) {
  const params = new URLSearchParams(baseSearchParams?.toString() || "");
  const normalized = normalizeFilters(filters);

  FILTER_KEYS.forEach((key) => params.delete(key));
  FILTER_KEYS.forEach((key) => {
    if (normalized[key]) {
      params.set(key, normalized[key]);
    }
  });

  return params;
}

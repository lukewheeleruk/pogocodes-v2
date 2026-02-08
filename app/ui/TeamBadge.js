export default function TeamBadge({ team, level }) {
  const hasKnownTeam = ["mystic", "valor", "instinct"].includes(team);
  const textClass = `text-sm font-medium ${
    hasKnownTeam ? "text-foreground" : "text-muted-foreground"
  }`;
  const bgClass =
    "rounded-full px-2 py-0.5 border flex items-center bg-secondary border-border/30";

  return (
    <div className="flex items-center gap-2">
      <div className={bgClass}>
        <span className={textClass}>
          Lv. {level} — <span className="capitalize">{team}</span>
        </span>
      </div>
    </div>
  );
}

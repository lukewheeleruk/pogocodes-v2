import TeamBadge from "@/app/ui/TeamBadge";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PlayerControlButtons from "@/app/ui/PlayerControlButtons";
import { formatDistanceToNow } from "date-fns";

export default function Player({
  username,
  code,
  team,
  tags,
  message,
  level,
  lastBump,
  location,
}) {
  return (
    <article className="flex p-4 border gap-4 rounded-xl">
      <section className="flex-1 flex flex-col gap-2">
        {/* Section: to keep location and header together without a gap for better flow */}

        {/* Header: username, team badge, timestamp */}
        <header className="flex justify-between items-start">
          <h2 className="flex gap-2 items-center text-2xl font-bold">
            {username}
            <TeamBadge team={team} level={level} />
          </h2>
          <time
            dateTime={new Date(lastBump).toISOString()}
            className="text-sm text-muted-foreground"
          >
            {formatDistanceToNow(new Date(lastBump), { addSuffix: true })}
          </time>
        </header>

        {/* Location (optional) */}
        {location && (
          <div className="flex gap-1 items-center text-muted-foreground">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{location.display}</span>
          </div>
        )}

        {/* Tags */}
        {tags?.length > 0 && (
          <ul className="flex gap-2 items-center flex-wrap">
            {tags.map((tag) => (
              <li key={tag}>
                <Badge variant="secondary" className="text-xs uppercase">
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        )}

        {/* Message */}
        <p className="text-muted-foreground">{message}</p>

        {/* Footer: controls */}
        <footer className="flex justify-end gap-4">
          <PlayerControlButtons
            code={code}
            username={username}
            team={team}
            level={level}
          />
        </footer>
      </section>
    </article>
  );
}

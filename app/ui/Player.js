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
    <div className="flex flex-row p-4 border-b gap-4">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex flex-1 justify-between">
            <div className="flex gap-2">
              <h2 className="text-lg font-bold">{username}</h2>
              <TeamBadge team={team} level={level} />
            </div>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(lastBump), { addSuffix: true })}
            </p>
          </div>

          {location && (
            <div className="flex gap-2 align-center items-center text-sm">
              <MapPin className="w-4 h-4 text-gray-500" />
              <p className="text-sm text-gray-600">{location.display}</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 items-center flex-wrap">
          {tags?.map((tag) => (
            <Badge variant="secondary" className="text-xs uppercase" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>

        <p className="text-gray-600">{message}</p>
        <div className="flex flex-row-reverse gap-4">
          <PlayerControlButtons
            code={code}
            username={username}
            team={team}
            level={level}
          />
        </div>
      </div>
    </div>
  );
}

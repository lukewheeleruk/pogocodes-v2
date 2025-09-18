import Image from "next/image";
import TeamBadge from "@/app/ui/TeamBadge";
import { Badge } from "@/components/ui/badge";
import PlayerControlButtons from "@/app/ui/PlayerControlButtons";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import { formatDistanceToNow } from "date-fns";

export default function Player({
  username,
  code,
  team,
  tags,
  message,
  level,
  lastBump,
}) {
  const avatar = createAvatar(adventurer, {
    seed: code,
    size: 64,
    radius: 50,
    backgroundColor: ["b6e3f4", "c0aede", "ffdfbf", "ffbde4", "ffffb3"],
  }).toDataUri();

  return (
    <div className="flex flex-row p-4 border-b gap-4">
      <div>
        <Image
          src={avatar}
          alt={`${username}'s avatar`}
          width={64}
          height={64}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-1 justify-between">
          <div className="flex gap-2">
            <h2 className="text-lg font-bold">{username}</h2>
            <TeamBadge team={team} level={level} />
          </div>
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(lastBump), { addSuffix: true })}
          </p>
        </div>

        <div className="flex gap-2">
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

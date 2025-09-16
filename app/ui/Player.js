import Image from "next/image";
import TeamBadge from "@/app/ui/TeamBadge";
import { Badge } from "@/components/ui/badge";
import PlayerControlButtons from "@/app/ui/PlayerControlButtons";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";

export default function Player({ username, code, team, tags, message, level }) {
  const avatar = createAvatar(adventurer, {
    seed: code,
    size: 72,
    radius: 50,
    backgroundColor: ["b6e3f4", "c0aede", "ffdfbf", "ffbde4", "ffffb3"],
  }).toDataUri();

  return (
    <div className="flex flex-row p-4 border-b gap-4">
      <div>
        <Image
          src={avatar}
          alt={`${username}'s avatar`}
          width={72}
          height={72}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex gap-2">
          <h2 className="text-2xl font-bold">{username}</h2>
          <TeamBadge team={team} level={level} />
        </div>
        <div className="flex gap-2">
          {tags?.map((tag) => (
            <div className="text-sm uppercase" key={tag}>
              <Badge variant="secondary">{tag}</Badge>
            </div>
          ))}
        </div>
        <p className="pt-2 text-gray-600">{message}</p>
        <div className="flex flex-row-reverse gap-4 mt-2">
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

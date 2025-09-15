import TeamBadge from "@/app/ui/TeamBadge";
import { Badge } from "@/components/ui/badge";
import PlayerControlButtons from "@/app/ui/PlayerControlButtons";

export default function Player({ username, code, team, tags, message, level }) {
  return (
    <div className="flex flex-col gap-2 p-6 border-b">
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
        <PlayerControlButtons code={code} />
      </div>
    </div>
  );
}

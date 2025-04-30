import { formatCode } from "@/app/lib/formatting";
import TeamBadge from "@/app/ui/team-badge";

export default function Player({ username, code, team, tags, message, level }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        <h2 className="text-xl font-medium">{username}</h2>
        <TeamBadge team={team} level={level} />
      </div>
      <div className="flex gap-4">
        {tags?.map((tag) => (
          <div className="text-sm uppercase text-gray-400" key={tag}>
            {tag}
          </div>
        ))}
      </div>
      <p className="text-gray-600">{message}</p>
      <div className="flex flex-row-reverse">
        <h4 className="font-medium font-mono text-xl">{formatCode(code)}</h4>
      </div>
    </div>
  );
}

import { formatCode } from "@/app/lib/formatting";
import TeamBadge from "@/app/ui/TeamBadge";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Player({ username, code, team, tags, message, level }) {
  return (
    <div className="flex flex-col gap-2 p-6 border-b">
      <div className="flex gap-2">
        <h2 className="text-xl font-medium">{username}</h2>
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
      <div className="flex flex-row-reverse">
        <Button
          variant="outline"
          size="lg"
          onClick={null}
          className="flex items-center gap-4 font-mono"
        >
          <Copy className="w-5 h-5" strokeWidth={3} />
          <h4 className="font-medium font-mono text-xl">{formatCode(code)}</h4>
        </Button>
      </div>
    </div>
  );
}

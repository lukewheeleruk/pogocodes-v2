import { useState } from "react";
import { Copy, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCode } from "@/app/lib/formatting";
import TeamBadge from "@/app/ui/TeamBadge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QRCode from "react-qr-code";

export default function PlayerControlButtons({ username, team, level, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={handleCopy}
        className="flex items-center gap-4 font-mono w-64"
      >
        <Copy className="w-5 h-5" strokeWidth={3} />
        <h4 className="font-bold text-lg">
          {copied ? "Copied" : formatCode(code)}
        </h4>
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <LayoutGrid className="w-5 h-5" strokeWidth={3} />
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center gap-4">
          <DialogHeader>
            <DialogTitle>
              <div className="flex gap-2">
                <h2 className="text-2xl font-bold">{username}</h2>
                <TeamBadge team={team} level={level} />
              </div>
            </DialogTitle>
          </DialogHeader>
          <QRCode value={code} size={200} />
          <p className="text-sm text-gray-500">
            Scan this code in Pokémon Go to add as a friend
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}

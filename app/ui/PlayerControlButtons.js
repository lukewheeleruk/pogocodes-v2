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
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <LayoutGrid className="w-5 h-5" strokeWidth={2} />
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center gap-4 w-fit">
          <DialogHeader>
            <DialogTitle>
              <div className="flex flex-col justify-center gap-2">
                <div className="flex gap-2">
                  <h2 className="text-2xl font-bold">{username}</h2>
                  <TeamBadge team={team} level={level} />
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          <QRCode value={code} size={200} />
          <p className="text-lg font-bold font-mono">{formatCode(code)}</p>
        </DialogContent>
      </Dialog>
      <Button
        variant="outline"
        onClick={handleCopy}
        className="flex items-center gap-2 font-mono w-48"
      >
        <Copy className="w-5 h-5" strokeWidth={2} />
        <h4 className="text-base font-bold">
          {copied ? "Copied" : formatCode(code)}
        </h4>
      </Button>
    </>
  );
}

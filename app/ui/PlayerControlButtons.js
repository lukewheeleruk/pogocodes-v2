import { Copy, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCode } from "@/app/lib/formatting";

export default function PlayerControlButtons({ code }) {
  return (
    <>
      <Button
        variant="outline"
        onClick={null}
        className="flex items-center gap-4 font-mono"
      >
        <Copy className="w-5 h-5" strokeWidth={3} />
        <h4 className="font-bold text-lg">{formatCode(code)}</h4>
      </Button>
      <Button variant="outline" onClick={null}>
        <LayoutGrid className="w-5 h-5" strokeWidth={3} />
      </Button>
    </>
  );
}

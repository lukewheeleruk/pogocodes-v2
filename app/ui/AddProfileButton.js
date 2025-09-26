"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const BUMP_COOLDOWN = 12 * 60 * 60 * 1000; // 12 hours in ms

export default function AddProfileButton({ profile, user }) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(0);

  // Update remaining time for bump cooldown
  useEffect(() => {
    if (!profile?.lastBump) return;

    const getLastBumpMs = () => {
      if (typeof profile.lastBump?.toMillis === "function") {
        return profile.lastBump.toMillis();
      }
      return profile.lastBump;
    };

    const updateTime = () => {
      const now = Date.now();
      const lastBumpMs = getLastBumpMs();
      const remaining = Math.max(lastBumpMs + BUMP_COOLDOWN - now, 0);
      setTimeLeft(remaining);
    };

    updateTime(); // initial calculation
    const interval = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(interval);
  }, [profile?.lastBump]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return `${seconds}s`;
  };

  const handleClick = () => {
    if (user) {
      router.push("/submit");
    } else {
      router.push("/signin");
    }
  };

  const bumpDisabled = profile && timeLeft > 0;

  return (
    <Button size="lg" onClick={handleClick} disabled={bumpDisabled}>
      {profile
        ? bumpDisabled
          ? `Bump profile in ${formatTime(timeLeft)}`
          : "Bump your profile"
        : "Add your profile"}
    </Button>
  );
}

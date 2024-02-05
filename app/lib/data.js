import { db } from "@/app/lib/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

export async function getPlayers() {
  const players = [];
  const q = query(
    collection(db, "dev_profiles"),
    orderBy("lastBump", "desc"),
    limit(5)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    players.push(doc.data());
  });
  return players;
}

import { db } from "@/app/lib/firebase";
import {
  getDoc,
  doc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
  where,
} from "firebase/firestore";

const justGetWhatWeNeed = (playerObject) => {
  return {
    username: playerObject.username,
    code: playerObject.code,
    team: playerObject.team,
    tags: playerObject.tags,
  };
};

const buildFirestoreQuery = (filters, cursor) => {
  let q = query(collection(db, "dev_profiles"));
  if (filters.team) {
    q = query(q, where("team", "==", filters.team));
  }
  if (filters.tags) {
    q = query(q, where("tags", "array-contains", filters.tags));
  }
  q = query(q, orderBy("lastBump", "desc"), limit(2));
  if (cursor) {
    q = query(q, startAfter(cursor));
  }
  return q;
};

export async function getPlayers(searchParams, cursorDocId) {
  const players = [];
  let cursor = null;
  let docSnap = null;
  if (cursorDocId) {
    docSnap = await getDoc(doc(db, "dev_profiles", cursorDocId));
  }
  const querySnapshot = await getDocs(
    buildFirestoreQuery(searchParams, docSnap)
  );
  querySnapshot.forEach((doc) => {
    players.push(justGetWhatWeNeed(doc.data()));
    cursor = doc.id;
  });
  return { players: players, cursor: cursor };
}

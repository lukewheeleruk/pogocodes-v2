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

export async function getInitialPlayers(searchParams) {
  const initialPlayers = [];
  let initialCursor = null;
  const querySnapshot = await getDocs(buildFirestoreQuery(searchParams));
  querySnapshot.forEach((doc) => {
    initialPlayers.push(justGetWhatWeNeed(doc.data()));
    initialCursor = doc.id;
  });
  return { initialPlayers: initialPlayers, initialCursor: initialCursor };
}

export async function getAdditionalPlayers(cursor, searchParams) {
  const additionalPlayers = [];
  let newCursor = null;
  const docSnap = await getDoc(doc(db, "dev_profiles", cursor));
  const querySnapshot = await getDocs(
    buildFirestoreQuery(searchParams, docSnap)
  );
  querySnapshot.forEach((doc) => {
    additionalPlayers.push(justGetWhatWeNeed(doc.data()));
    newCursor = doc.id;
  });
  return { additionalPlayers: additionalPlayers, newCursor: newCursor };
}

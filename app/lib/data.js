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

function justGetWhatWeNeed(playerObject) {
  return {
    username: playerObject.username,
    code: playerObject.code,
    team: playerObject.team,
    tags: playerObject.tags,
  };
}

export async function getInitialPlayers(searchParams) {
  const initialPlayers = [];
  let initialCursor = "";
  let q = null;
  if (searchParams.team && searchParams.tags) {
    q = query(
      collection(db, "dev_profiles"),
      where("team", "==", searchParams.team),
      where("tags", "array-contains", searchParams.tags),
      orderBy("lastBump", "desc"),
      limit(2)
    );
  } else if (searchParams.team && !searchParams.tags) {
    q = query(
      collection(db, "dev_profiles"),
      where("team", "==", searchParams.team),
      orderBy("lastBump", "desc"),
      limit(2)
    );
  } else if (searchParams.tags && !searchParams.team) {
    q = query(
      collection(db, "dev_profiles"),
      where("tags", "array-contains", searchParams.tags),
      orderBy("lastBump", "desc"),
      limit(2)
    );
  } else {
    q = query(
      collection(db, "dev_profiles"),
      orderBy("lastBump", "desc"),
      limit(2)
    );
  }

  const querySnapshot = await getDocs(q);
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
  let q = null;

  if (searchParams.team && searchParams.tags) {
    q = query(
      collection(db, "dev_profiles"),
      where("team", "==", searchParams.team),
      where("tags", "array-contains", searchParams.tags),
      orderBy("lastBump", "desc"),
      limit(2),
      startAfter(docSnap)
    );
  } else if (searchParams.team && !searchParams.tags) {
    q = query(
      collection(db, "dev_profiles"),
      where("team", "==", searchParams.team),
      orderBy("lastBump", "desc"),
      limit(2),
      startAfter(docSnap)
    );
  } else if (searchParams.tags && !searchParams.team) {
    q = query(
      collection(db, "dev_profiles"),
      where("tags", "array-contains", searchParams.tags),
      orderBy("lastBump", "desc"),
      limit(2),
      startAfter(docSnap)
    );
  } else {
    q = query(
      collection(db, "dev_profiles"),
      orderBy("lastBump", "desc"),
      limit(2),
      startAfter(docSnap)
    );
  }

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    additionalPlayers.push(justGetWhatWeNeed(doc.data()));
    newCursor = doc.id;
  });
  return { additionalPlayers: additionalPlayers, newCursor: newCursor };
}

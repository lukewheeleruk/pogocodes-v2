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
  };
}

export async function getInitialData(searchParams) {
  const initialPlayers = [];
  let initialCursor = "";
  let q = null;
  if (searchParams?.team) {
    q = query(
      collection(db, "dev_profiles"),
      where("team", "==", searchParams.team),
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
  if (searchParams?.team) {
    q = query(
      collection(db, "dev_profiles"),
      orderBy("lastBump", "desc"),
      limit(2),
      where("team", "==", searchParams.team),
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

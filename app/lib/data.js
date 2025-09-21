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

// Clean up Firestore data for client use
const transformPlayer = (docSnap) => {
  const data = docSnap.data();
  return {
    id: docSnap.id, // keep UID as unique identifier
    username: data.username,
    code: data.code,
    team: data.team,
    tags: data.tags,
    message: data.message,
    level: data.level,
    location: data.location || null,
    lastBump: data.lastBump ? data.lastBump.toMillis() : null, // ✅ JSON-safe
  };
};

const buildFirestoreQuery = (filters, cursor) => {
  let q = query(collection(db, "dev_profiles"));
  if (filters?.team) {
    q = query(q, where("team", "==", filters.team));
  }
  if (filters?.tags) {
    q = query(q, where("tags", "array-contains", filters.tags));
  }
  if (filters?.country) {
    q = query(q, where("location.country", "==", filters.country));
  }
  q = query(q, orderBy("lastBump", "desc"), limit(5));
  if (cursor) {
    q = query(q, startAfter(cursor));
  }
  return q;
};

export async function getPlayers(filters, cursorDocId) {
  const players = [];
  let cursor = null;
  let docSnap = null;

  if (cursorDocId) {
    docSnap = await getDoc(doc(db, "dev_profiles", cursorDocId));
  }

  const querySnapshot = await getDocs(buildFirestoreQuery(filters, docSnap));
  querySnapshot.forEach((doc) => {
    players.push(transformPlayer(doc));
    cursor = doc.id;
  });

  return { players, cursor };
}

export async function getCountries() {
  const countries = [];
  const querySnapshot = await getDocs(
    query(collection(db, "dev_countries"), orderBy("name", "asc"))
  );
  querySnapshot.forEach((doc) => {
    countries.push(doc.data());
  });
  return countries;
}

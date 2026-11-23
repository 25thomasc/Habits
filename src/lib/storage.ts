import { openDB, type IDBPDatabase } from 'idb';
import type { Habit } from './types';

const DB_NAME = 'habits';
const STORE = 'habits';
const VERSION = 1;

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}

export async function loadHabits(): Promise<Habit[]> {
  const db = await getDB();
  const all = (await db.getAll(STORE)) as Habit[];
  return all.sort((a, b) => a.order - b.order);
}

export async function saveAll(habits: Habit[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(STORE, 'readwrite');
  await tx.store.clear();
  for (const h of habits) await tx.store.put(h);
  await tx.done;
}

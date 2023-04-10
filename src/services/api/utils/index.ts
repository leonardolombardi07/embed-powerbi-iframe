import type {
  CollectionReference,
  DocumentData,
  Firestore,
} from "firebase/firestore";
import { collection } from "firebase/firestore";
import type { Inventory } from "@/types";
import type { CollectionName } from "../types";
import { getServices } from "../instance";
import { EMULATOR_BASE_URL } from "../constants";

const { firestore } = getServices();

function getTypedCollection<T = DocumentData>(
  firestore: Firestore,
  name: CollectionName
) {
  return collection(firestore, name) as CollectionReference<T>;
}

function getCollections() {
  const inventoriesCol = getTypedCollection<Inventory>(
    firestore,
    "inventories"
  );
  return { inventoriesCol };
}

function getEmulatorUrl(port: number) {
  return `${EMULATOR_BASE_URL}:${port}`;
}

export { getCollections, getEmulatorUrl };

import { doc, setDoc, onSnapshot, query, getDocs } from "firebase/firestore";
import type { Inventory } from "@/types";
import { getCollections } from "../utils";
import { DataObserver, createEmptyScopes } from "./utils";

export const { inventoriesCol } = getCollections();

type CreateInventoryForm = Omit<
  Inventory,
  "id" | "scope1" | "scope2" | "scope3" | "createdAt"
>;

async function createInventory(form: CreateInventoryForm) {
  const newDoc = doc(inventoriesCol);
  await setDoc(newDoc, {
    id: newDoc.id,
    ...form,
    createdAt: new Date().toLocaleDateString(),
    ...createEmptyScopes(),
  });
  return newDoc.id;
}

function onInventoriesChange(observer: DataObserver<Inventory[]>) {
  const unsubscribe = onSnapshot(inventoriesCol, {
    next: (snapshot) => {
      const inventories = snapshot.docs.map((doc) => doc.data());
      observer.next(inventories);
    },
    error: observer.error,
    complete: observer.complete,
  });
  return unsubscribe;
}

function onInventoryChange(id: string, observer: DataObserver<Inventory>) {
  const unsubscribe = onSnapshot(doc(inventoriesCol, id), {
    next: (snapshot) => {
      const inventory = snapshot.data();
      if (!inventory) {
        throw new Error(`No data for inventory with id ${id}`);
      }
      observer.next(inventory);
    },
    error: observer.error,
    complete: observer.complete,
  });
  return unsubscribe;
}

export { createInventory, onInventoriesChange, onInventoryChange };
export type { CreateInventoryForm };

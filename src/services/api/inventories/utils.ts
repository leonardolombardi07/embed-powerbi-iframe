import { Inventory } from "@/types";
import { FirebaseError } from "firebase/app";

function createEmptyScopes(): Pick<Inventory, "scope1" | "scope2" | "scope3"> {
  return {
    scope1: {
      fugitive_emissions: {},
    },
    scope2: {
      eletricity: {},
    },
    scope3: {
      business_travel: {},
    },
  };
}

interface DataObserver<T> {
  next: (data: T) => void;
  error?: (error: FirebaseError) => void;
  complete?: () => void;
}

export { createEmptyScopes };
export type { DataObserver };

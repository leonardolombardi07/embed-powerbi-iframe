import { FirebaseApp } from "firebase/app";
import { initializeApp, getApps } from "firebase/app";
import type { Firestore } from "firebase/firestore";
import { connectFirestoreEmulator } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import type { Auth } from "firebase/auth";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { CONFIG } from "./config";
import { EMULATOR_BASE_URL, EMULATOR_PORT } from "./constants";

interface FirebaseClientServices {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

function getRawServices(): FirebaseClientServices {
  const app = initializeApp(CONFIG);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  return { app, auth, firestore };
}

function getServices() {
  const initializedApp = getApps().at(0);
  if (!initializedApp) {
    const services = getRawServices();
    const { auth, firestore } = services;

    if (process.env.NODE_ENV === "development") {
      connectAuthEmulator(
        auth,
        `http://${getEmulatorUrl(EMULATOR_PORT.AUTH)}`,
        {
          disableWarnings: true,
        }
      );
      connectFirestoreEmulator(
        firestore,
        EMULATOR_BASE_URL,
        EMULATOR_PORT.FIRESTORE
      );
    }
    return services;
  }

  return getRawServices();
}

function getEmulatorUrl(port: number) {
  return `${EMULATOR_BASE_URL}:${port}`;
}

export { getServices };

import type { NextOrObserver } from "firebase/auth";
import { updateProfile as firebaseUpdateProfile } from "firebase/auth";
import {
  signInAnonymously,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
} from "firebase/auth";
import { getServices } from "../instance";
import { User } from "@/types";

const { auth } = getServices();

async function signIn() {
  return signInAnonymously(auth);
}

async function signOut() {
  return firebaseSignOut(auth);
}

function onAuthStateChanged(nextOrObserver: NextOrObserver<User>) {
  return firebaseOnAuthStateChanged(auth, nextOrObserver);
}

async function updateProfile(info: {
  displayName?: string | null;
  photoURL?: string | null;
}) {
  if (!auth.currentUser) throw new Error("No authenticated user");
  await firebaseUpdateProfile(auth.currentUser, info);
  await auth.currentUser.reload();
  return auth.currentUser;
}

export { updateProfile, signIn, signOut, onAuthStateChanged };

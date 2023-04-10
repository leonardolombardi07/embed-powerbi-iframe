import React from "react";
import * as Api from "@/services/api";
import { User } from "@/types";

interface UserState {
  user: User | null;
}

interface UserActions {
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
}

interface IUserContext {
  state: UserState;
  actions: UserActions;
}

const UserContext = React.createContext<IUserContext | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = React.useState<UserState>({
    user: null,
  });

  React.useEffect(function onAppMount() {
    const unsubscribe = Api.onAuthStateChanged({
      next: (user) => {
        setUser({ user });
      },
      error: (error) => {
        // TODO: maybe warn the user with a notification?
      },
      complete: () => {},
    });

    return function onUnmount() {
      unsubscribe();
    };
  }, []);

  const value: IUserContext = React.useMemo(
    () => ({ state: user, actions: { setUser } }),
    [user, setUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      `${useUser.name} must be used within an ${UserProvider.name}`
    );
  }
  return context;
}

export { UserProvider, useUser };

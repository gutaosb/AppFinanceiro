import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext(null);

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("User atualizado:");
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

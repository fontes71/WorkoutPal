import { getLocalUser } from "@/assets/functions/auth";
import { User } from "@/domain/auth";
import { createContext, useEffect, useState } from "react";

type UserContextType = {
  userContext: User | null;
  setUserContext: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType>({
  userContext: null,
  setUserContext: () => {},
});

const UserProvider = ({ children }: any) => {
  const [userContext, setUserContext] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getLocalUser();
      setUserContext(userData);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ userContext, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

import React from "react";

type UserContextType = {
  session: string;
  signOut: () => void;
};

export const UserContext = React.createContext<UserContextType>({
  session: "",
  signOut: () => {},
});

export const useUser = () => {
  const { session, signOut } = React.useContext(UserContext);

  return { session, signOut };
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = React.useState("");

  const getSession = async () => {
    const token = localStorage.getItem("seven-single-tables-session-token");
    if (token) {
      setSession(token);
    }
  };

  const signOut = async () => {
    localStorage.removeItem("seven-single-tables-session-token");
    setSession("");
  };

  React.useEffect(() => {
    getSession();
  }, []);

  React.useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("seven-single-tables-session-token", token);
      window.location.replace(window.location.origin);
    }
  }, []);

  return (
    <UserContext.Provider value={{ session, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

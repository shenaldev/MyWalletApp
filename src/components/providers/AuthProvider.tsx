import { PropsWithChildren, createContext, useState } from "react";
import { User } from "../../types/User";

const AuthContext = createContext<User | null>(null);

type AuthProviderProps = PropsWithChildren & { isLogedIn?: boolean };

export default function AuthProvider({
  children,
  isLogedIn,
}: AuthProviderProps) {
  const [user] = useState<User | null>(
    isLogedIn ? { id: 1, name: "John Doe" } : null,
  );

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

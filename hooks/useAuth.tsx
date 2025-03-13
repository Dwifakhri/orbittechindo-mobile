import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  user: any;
  login: (userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const auth = await AsyncStorage.getItem("auth");
        if (auth) {
          setUser(JSON.parse(auth)); // Fix: Parse stored JSON
        }
      } catch (error) {
        console.error("Failed to load user from storage", error);
      }
    };

    loadUser();
  }, []);

  const login = async (userData: any) => {
    try {
      await AsyncStorage.setItem("auth", JSON.stringify(userData)); // Fix: Store as JSON
      setUser(userData);
    } catch (error) {
      console.error("Failed to save user to storage", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("auth");
      setUser(null);
    } catch (error) {
      console.error("Failed to remove user from storage", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

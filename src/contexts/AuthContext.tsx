import { createContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  type User,
  updateProfile,
  reload,
  deleteUser
} from "firebase/auth";
import { auth } from "../services/firebase";

import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  updateName: (name: string) => Promise<void>;
  handleDeleteAccount: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(user, { displayName: name });
    } catch (error: any) {
      throw error;
    }
  };

  const updateName = async (name: string) => {
    if (!user) return;
    await updateProfile(user, { displayName: name });
    await reload(user);
    setUser({ ...user, displayName: name });
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    try {
      await deleteUser(user);
    } catch (error: any) {
      if (error.code === "auth/requires-recent-login") {
        toast.error('Please logout and login again before deleting your account')
      }
    }
  };

  const forgotPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithGoogle,
        register,
        forgotPassword,
        logout,
        updateName,
        handleDeleteAccount
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

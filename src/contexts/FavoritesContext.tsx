import { createContext, useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

interface FavoritesContextType {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  addFavorite: (id: number) => Promise<void>;
  removeFavorite: (id: number) => Promise<void>;
  toggleFavorite: (id: number) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType>(
  {} as FavoritesContextType,
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    const fetchFavorites = async () => {
      const docRef = doc(db, "favorites", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFavorites(docSnap.data().products ?? []);
      }
    };

    fetchFavorites();
  }, [user]);

  const addFavorite = async (id: number) => {
    if (!user) return;

    const docRef = doc(db, "favorites", user.uid);
    await setDoc(docRef, { products: arrayUnion(id) }, { merge: true });
    setFavorites((prev) => [...prev, id]);
  };

  const removeFavorite = async (id: number) => {
    if (!user) return;
    const docRef = doc(db, "favorites", user.uid);
    await setDoc(docRef, { products: arrayRemove(id) }, { merge: true });
    setFavorites((prev) => prev.filter((f) => f !== id));
  };

  const toggleFavorite = async (id: number) => {
    if (isFavorite(id)) {
      await removeFavorite(id);
    } else {
      await addFavorite(id);
    }
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
};

export { FavoritesContext }
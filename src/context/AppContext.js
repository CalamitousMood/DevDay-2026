import React, { createContext, useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from './AuthContext';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { currentUser } = useAuth();

  //Favorites (Firestore when logged in)
  const [favorites, setFavorites] = useState([]);

  // Load favorites from Firestore whenever the logged-in user changes
  useEffect(() => {
    if (!currentUser) {
      setFavorites([]); // Logged out → clear favorites from UI
      return;
    }

    async function loadFavorites() {
      const snap = await getDoc(doc(db, 'favorites', currentUser.uid));
      if (snap.exists()) {
        setFavorites(snap.data().items || []);
      } else {
        setFavorites([]); // First time this user logs in — no favorites yet
      }
    }

    loadFavorites();
  }, [currentUser]);

  // Write the updated favorites array back to Firestore
  const saveFavoritesToFirestore = useCallback(async (updatedFavorites) => {
    if (!currentUser) return;
    await setDoc(doc(db, 'favorites', currentUser.uid), {
      items: updatedFavorites,
    });
  }, [currentUser]);

  // toggleFavorite
  const toggleFavorite = (food) => {
    if (!currentUser) {
      addToast('You must be logged in to favorite items');
      return;
    } 
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === food.id || f.name === food.name);
      let updated;
      if(exists){
        updated = prev.filter((f) => f.name !== food.name);
        addToast('Removed ${food.name} from favorites');
      } else{
        updated = [...prev, food];
        addToast('Added ${food.name} to favorites');
      }
      /*
      const updated = exists
        ? prev.filter((f) => f.id !== food.id && f.name !== food.name)
        : [...prev, food];
        */
      saveFavoritesToFirestore(updated);
      return updated;
    });
  };

  // Toasts
  const [toasts, setToasts] = useState([]);
  const addToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };


  return (
    <AppContext.Provider value={{
      favorites,
      toggleFavorite,
      toasts,
      addToast,
    }}>
      {children}
    </AppContext.Provider>
  );
};
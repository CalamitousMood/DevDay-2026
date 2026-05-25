import React, { createContext, useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from './AuthContext';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { currentUser } = useAuth();

  // ─── Favorites (Firestore when logged in) ────────────────────────────────
  const [favorites, setFavorites] = useState([]);

  // Load favorites from Firestore whenever the logged-in user changes
  useEffect(() => {
    // write your code here!
    if(!currentUser) {
      setFavorites([]);   //Clear favorites from UI when logged out
      return;
    }

    // create your function here!
    async function loadFavorites() {
      const snap = await getDoc(doc(db, 'favorites', currentUser.uid));
      if(snap.exists()){
        setFavorites(snap.data().items || []);
      } else{
        setFavorites([]); //Log in- no favorites yet empty array
      }
    }

    loadFavorites();
  }, [currentUser]);

  
  // create your function here as well! (Reference slides for help)

  const toggleFavorite = (food) => {
    // Must be logged in to save favorites
    if (!currentUser) {
      addToast('🔒 Log in to save favorites!');
      return;
    }

    
    setFavorites((prev) => {
      // Write your code here!
      const exists = prev.some((f) => f.id === food.id || f.name === food.name); //Item exist?
      let updated;

      if (exists) {
      // here as well!
      updated = prev.filter((f) => f.name !== food.name); //Remove item from favorites if it already exists
      addToast('Removed ${food.name} from Favorites');
      } else {
        // and here too
        updated = [...prev, food]; //Add item to favorites if it doesn't exist
        addToast(`❤️ Added ${food.name} to Favorites!`);
      }
      // write your code here as well!
      saveFavoritesToFirestore(updated);
      return updated;
    }); 
  };

  // ─── Cart (local state only) ──────────────────────────────────────────────
  const [cart, setCart] = useState([]);

  const addToCart = (food) => {
    setCart((prev) => [...prev, food]);
    addToast(`🛒 Added ${food.name} to Cart`);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // ─── Toasts ───────────────────────────────────────────────────────────────
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <AppContext.Provider value={{
      favorites, toggleFavorite,
      cart, addToCart, removeFromCart,
      toasts,
    }}>
      {children}
    </AppContext.Provider>
  );
};

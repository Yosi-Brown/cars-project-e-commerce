import { createContext, useEffect, useState } from "react";
import { toastFire } from "../utils/Toaster";


export const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const updateFavorites = (newFavorite) => {
        // Check if the product is already in the favorites
        const isFavoriteExists = favorites.find(fav => fav._id === newFavorite._id);

        if (!isFavoriteExists) {
            const updatedFavorites = [...favorites, newFavorite];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            toastFire(true, "added to Wishlist ")
        }
    };

    const removeFavorite = (favoriteId) => {
        const updatedFavorites = favorites.filter(fav => fav._id !== favoriteId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        toastFire(true, "Deleted from Wishlist ")

    };

    const removeAllFavorites = () => {
        setFavorites([]);
        localStorage.removeItem('favorites');
    };

    const value = {
        favorites,
        updateFavorites,
        removeFavorite,
        removeAllFavorites,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export default FavoritesProvider;

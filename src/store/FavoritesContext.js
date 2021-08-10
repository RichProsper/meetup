import { createContext, useState } from "react"

const FavoritesContext = createContext({
    favorites: [],
    totalFavorites: 0,
    addFavorite: newFavorite => {},
    removeFavorite: id => {},
    itemIsFavorite: id => {}
})
export default FavoritesContext

export const FavoritesContextProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])
    
    const addFavorite = newFavorite => setFavorites(prevFavorites => prevFavorites.concat(newFavorite))
    
    const removeFavorite = id => {
        setFavorites(prevFavorites => prevFavorites.filter(prevFavorite => prevFavorite.id !== id))
    }
    
    const itemIsFavorite = id => favorites.some(favorite => favorite.id === id)
    
    const context = {
        favorites,
        totalFavorites: favorites.length,
        addFavorite,
        removeFavorite,
        itemIsFavorite
    }
    
    return (
        <FavoritesContext.Provider value={context}>
            {children}
        </FavoritesContext.Provider>
    )
}
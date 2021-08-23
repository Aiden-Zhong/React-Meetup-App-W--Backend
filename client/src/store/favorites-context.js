import { createContext, useReducer } from "react";
import AppReducer from './AppReducer'
import axios from 'axios'

const initialFavorite = {
    favorites: []
}

export const FavoritesContext = createContext(initialFavorite);

export const FavoritesContextProvider = ({ children }) => {
    const [userFavorites, dispatch] = useReducer(AppReducer, initialFavorite);

    const getFavorites = async () => {
        try {
            const res = await axios.get('/api/v1/meetups/favorites');
            dispatch({
                type: 'GET_FAVORITES',
                payload: res.data.data
            })
            
        } catch (err) {
            alert(err);
        }
    }


    const toggleFavorite = async (id, favorited) => {
        const res = await axios.put(`/api/v1/meetups/${id}`);
        if (!favorited) {
            dispatch({
                type: 'ADD_FAVORITE',
                payload: res.data.data
            })
        } else {
            dispatch({
                type: 'DELETE_FAVORITE',
                payload: id
            })
        }

    }


    // const itemIsFavoritesHandler = (meetupId)=> {
    //     return userFavorites.some(meetup => meetup.id === meetupId)
    // }



    const context = {
        favorites: userFavorites.favorites,
        totoalFavorites: userFavorites.length,
        toggleFavorite,
        getFavorites
        //itemIsFavorite: itemIsFavoritesHandler,
    };

    return <FavoritesContext.Provider value={context}>
        {children}
    </FavoritesContext.Provider>
}

export default FavoritesContext
/* eslint-disable default-case */
// eslint-disable-next-line import/no-anonymous-default-export
export default (userFavorites, action) => {
    switch (action.type) {
        case 'ADD_FAVORITE' :
            return {
                ...userFavorites,
                favorites: [...userFavorites.favorites, action.payload]
            }
        case 'DELETE_FAVORITE': 
            return {
                ...userFavorites,
                favorites: userFavorites.favorites.filter(favorite => favorite._id !== action.payload)
            }
        case 'GET_FAVORITES': 
            return {
                ...userFavorites,
                favorites: action.payload
            }
    }
}
import { useContext, useEffect } from "react"
import FavoritesContext from "../store/favorites-context"
import MeetupList from "../components/meetups/MeetupList"


const Favorites = () => {
    const { favorites, getFavorites, totalFavorites } = useContext(FavoritesContext)


    useEffect(() => {
        getFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let content;

    if (totalFavorites === 0) {
        content = <p> No Favorite Yettttttttttttttttttttt</p>;
    } else {
        //content = <MeetupList meetups={favoritesCtx.favorites} />;
        content = <MeetupList meetups={favorites} />;
    }

    return (
        <section>
            <h1>My Favorites </h1>
            {content}
            <h2> </h2>
        </section>
    )
}

export default Favorites

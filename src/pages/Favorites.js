import { useContext } from "react"
import FavoritesContext from "../store/favorites-context"
import MeetupList from "../components/meetups/MeetupList"

const Favorites = () => {
    const favoritesCtx = useContext(FavoritesContext)

    let content;

    if (favoritesCtx.totalFavorites === 0) {
        content = <p> No Favorite Yettttttttttttttttttttt</p>;
    } else {
        content = <MeetupList meetups={favoritesCtx.favorites}/>;
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

import { useContext, useState } from 'react'
import classes from './MeetupItem.module.css'
import Card from '../ui/Card'
import FavoritesContext from '../../store/favorites-context'

const MeetupItem = (props) => {
    const {toggleFavorite} = useContext(FavoritesContext);
    const [isFavorited, setIsFavorited] = useState(props.favorited)
    


    

    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <img src={props.image} alt={props.title} />
                </div>
                <div className={classes.content}>
                    <h3>{props.title}</h3>
                    <address>{props.address}</address>
                    <p>{props.description}</p>
                </div>
                <div className={classes.actions}>
                    <button onClick={() => 
                    {toggleFavorite(props.id, props.favorited)
                        setIsFavorited(!props.favorited)
                    }}>{isFavorited ? 'Remove from Favorite' : 'To Favorite'}</button>
                </div>

            </Card>
        </li>
    )
}

export default MeetupItem

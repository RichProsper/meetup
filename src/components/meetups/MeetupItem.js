import Card from '../layouts/Card'
import classes from './MeetupItem.module.css'
import { useContext } from 'react'
import FavoritesContext from '../../store/FavoritesContext'

export default function MeetupItem({ meetup }) {
    const favsContext = useContext(FavoritesContext)
    const itemIsFavorite = favsContext.itemIsFavorite(meetup.id)

    const toggleFavoriteStatus = () => {
        if (itemIsFavorite) {
            favsContext.removeFavorite(meetup.id)
        }
        else {
            favsContext.addFavorite({...meetup})
        }
    }

    return (
        <li className={classes.MeetupItem}>
            <Card> {/* This is done using the 'children' prop of Card */}
                <div className={classes.image}>
                    <img src={meetup.image} alt={meetup.title} />
                </div>
                <div className={classes.content}>
                    <h3>{meetup.title}</h3>
                    <address>{meetup.address}</address>
                    <p>{meetup.description}</p>
                </div>
                <div className={classes.action}>
                    <button type="button" onClick={toggleFavoriteStatus}>
                        {itemIsFavorite ? 'Remove From Favorites' : 'Add To Favorites'}
                    </button>
                </div>
            </Card>
        </li>
    )
}
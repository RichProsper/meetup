import classes from './Page.module.css'
import navClasses from '../components/layouts/MainNav.module.css'
import { useEffect, useContext } from 'react'
import FavoritesContext from '../store/FavoritesContext'
import MeetupList from '../components/meetups/MeetupList'

export default function Favorites() {
    const favsContext = useContext(FavoritesContext)

    useEffect(() => {
        // Set the active link based on the current page and set the page title to current page
        document.title = 'Favorites'
        document.querySelector('a[href="/new-meetup"]').className = ''
        document.querySelector('a[href="/"]').className = ''
        document.querySelector('a[href="/favorites"]').className = navClasses.active
    }, [])

    return (
        <section className={classes.Page}>
            <h1>My Favorites</h1>
            {favsContext.totalFavorites > 0 ? <MeetupList meetups={favsContext.favorites} /> : (
                <p>You have no favorites...</p>
            )}
            
        </section>
    )
}

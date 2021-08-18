import classes from './Page.module.css'
import navClasses from '../components/layouts/MainNav.module.css'
import { useEffect } from 'react'
import useMeetupsCtx from '../context/MeetupsContext'
import MeetupList from '../components/meetups/MeetupList'
import LoadingOverlay from '../components/layouts/LoadingOverlay'

export default function Favorites() {
    const { isLoading, totalFavorites, meetups } = useMeetupsCtx()

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
            {isLoading ? <LoadingOverlay text="Favorites" /> : (
                totalFavorites > 0 ? (
                    <MeetupList meetups={meetups.filter(meetup => meetup.isFavorite)} />
                ) : <p>You have no favorites...</p>
            )}
        </section>
    )
}

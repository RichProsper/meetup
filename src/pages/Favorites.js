import classes from './Page.module.css'
import navClasses from '../components/layouts/MainNav.module.css'
import { useEffect, useContext } from 'react'
import MeetupsContext from '../store/MeetupsContext'
import MeetupList from '../components/meetups/MeetupList'
import LoadingOverlay from '../components/layouts/LoadingOverlay'

export default function Favorites() {
    const MeetupsCtx = useContext(MeetupsContext)

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
            {MeetupsCtx.isLoading ? <LoadingOverlay text="Favorites" /> : (
                MeetupsCtx.totalFavorites > 0 ? (
                    <MeetupList meetups={MeetupsCtx.meetups.filter(meetup => meetup.isFavorite)} />
                ) : <p>You have no favorites...</p>
            )}
        </section>
    )
}

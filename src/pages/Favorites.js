import classes from './Page.module.css'
import navClasses from '../components/layouts/MainNav.module.css'
import { useEffect } from 'react'
import useMeetupsCtx from '../contexts/MeetupsContext'
import MeetupList from '../components/meetups/MeetupList'
import LoadingOverlay from '../components/layouts/LoadingOverlay'
import useAuthCtx from '../contexts/AuthContext'
import UserInfo from '../components/layouts/UserInfo'

export default function Favorites() {
    const { isLoading, totalFavorites, meetups } = useMeetupsCtx()
    const { currentUser, loadingUser } = useAuthCtx()

    useEffect(() => {
        // Set the page title to current page
        document.title = 'Favorites'
    }, [])

    useEffect(() => {
        if (!loadingUser) {
            document.querySelector('a[href="/new-meetup"]').className = ''
            document.querySelector('a[href="/"]').className = ''
            document.querySelector('a[href="/favorites"]').className = navClasses.active
        }
    }, [loadingUser])

    return (
        <section className={classes.Page}>
            {!loadingUser && <UserInfo currentUser={currentUser} />}
            
            <h1>My Favorites</h1>
            {isLoading ? <LoadingOverlay text="Favorites" /> : (
                totalFavorites > 0 ? (
                    <MeetupList meetups={meetups.filter(meetup => meetup.isFavorite)} />
                ) : <p>You have no favorites...</p>
            )}
        </section>
    )
}

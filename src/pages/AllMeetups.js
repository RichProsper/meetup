import MeetupList from '../components/meetups/MeetupList'
import classes from './Page.module.css'
import navClasses from '../components/layouts/MainNav.module.css'
import { useEffect } from 'react'
import useMeetupsCtx from '../contexts/MeetupsContext'
import LoadingOverlay from '../components/layouts/LoadingOverlay'
import { Link } from 'react-router-dom'
import useAuthCtx from '../contexts/AuthContext'
import UserInfo from '../components/layouts/UserInfo'

export default function AllMeetups() {
    const { isLoading, meetups } = useMeetupsCtx()
    const { currentUser, loadingUser } = useAuthCtx()

    // Handles initial reload
    useEffect(() => {
        // Set the page title to current page
        document.title = 'MeetUps'
    }, [])

    useEffect(() => {
        if (!loadingUser) {
            document.querySelector('a[href="/new-meetup"]').className = ''
            document.querySelector('a[href="/favorites"]').className = ''
            document.querySelector('a[href="/"]').className = navClasses.active
        }
    }, [loadingUser])

    return (
        <section className={classes.Page}>
            {!loadingUser && <UserInfo currentUser={currentUser} />}

            <h1>All Meetups</h1>
            {isLoading ? <LoadingOverlay text="Meetups" /> : (
                meetups.length > 0 ? <MeetupList meetups={meetups} /> : (
                    <p>
                        You have no Meetups. Add a
                        <Link to="/new-meetup" className={classes.link}>New Meetup</Link>
                        to get started.
                    </p>
                )
            )}
        </section>
    )
}
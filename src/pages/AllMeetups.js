import MeetupList from '../components/meetups/MeetupList'
import classes from './Page.module.css'
import navClasses from '../components/layouts/MainNav.module.css'
import { useEffect } from 'react'
import useMeetupsCtx from '../contexts/MeetupsContext'
import LoadingOverlay from '../components/layouts/LoadingOverlay'
import { Link } from 'react-router-dom'

export default function AllMeetups() {
    const { isLoading, meetups } = useMeetupsCtx()

    // Handles initial reload
    useEffect(() => {
        // Set the active link based on the current page and set the page title to current page
        document.title = 'MeetUps'
        document.querySelector('a[href="/new-meetup"]').className = ''
        document.querySelector('a[href="/favorites"]').className = ''
        document.querySelector('a[href="/"]').className = navClasses.active
    }, [])

    return (
        <section className={classes.Page}>
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
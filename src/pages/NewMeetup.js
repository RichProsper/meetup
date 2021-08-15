import NewMeetupForm from '../components/meetups/NewMeetupForm'
import classes from './Page.module.css'
import navClasses from '../components/layouts/MainNav.module.css'
import { useEffect, useContext } from 'react'
import MeetupsContext from '../context/MeetupsContext'

export default function NewMeetup() {
    const MeetupsCtx = useContext(MeetupsContext)

    useEffect(() => {
        // Set the active link based on the current page and set the page title to current page
        document.title = 'New Meetup'
        document.querySelector('a[href="/"]').className = ''
        document.querySelector('a[href="/favorites"]').className = ''
        document.querySelector('a[href="/new-meetup"]').className = navClasses.active
    }, [])

    return (
        <section className={classes.Page}>
            <h1>New Meetup</h1>
            <NewMeetupForm addMeetup={MeetupsCtx.addMeetup} />
        </section>
    )
}

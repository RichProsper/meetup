import NewMeetupForm from '../components/meetups/NewMeetupForm'
import classes from './Page.module.css'
import navClasses from '../components/layouts/MainNav.module.css'
import { useEffect } from 'react'
import useMeetupsCtx from '../contexts/MeetupsContext'
import useAuthCtx from '../contexts/AuthContext'
import UserInfo from '../components/layouts/UserInfo'

export default function NewMeetup() {
    const { addMeetup } = useMeetupsCtx()
    const { currentUser, loadingUser } = useAuthCtx()

    useEffect(() => {
        // Set the page title to current page
        document.title = 'New Meetup'
    }, [])

    useEffect(() => {
        if (!loadingUser) {
            document.querySelector('a[href="/"]').className = ''
            document.querySelector('a[href="/favorites"]').className = ''
            document.querySelector('a[href="/new-meetup"]').className = navClasses.active
        }
    }, [loadingUser])

    return (
        <section className={classes.Page}>
            {!loadingUser && <UserInfo currentUser={currentUser} />}
            
            <h1>New Meetup</h1>
            <NewMeetupForm addMeetup={addMeetup} />
        </section>
    )
}

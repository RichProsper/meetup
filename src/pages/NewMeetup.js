import NewMeetupForm from '../components/meetups/NewMeetupForm'
import classes from './Page.module.css'
import navClasses from '../components/layouts/MainNav.module.css'
import { useHistory } from 'react-router'
import { useEffect } from 'react'
import firebaseDb from '../firebase'

export default function NewMeetup() {
    const history = useHistory()

    useEffect(() => {
        // Set the active link based on the current page and set the page title to current page
        document.title = 'New Meetup'
        document.querySelector('a[href="/"]').className = ''
        document.querySelector('a[href="/favorites"]').className = ''
        document.querySelector('a[href="/new-meetup"]').className = navClasses.active
    }, [])

    const addMeetup = meetupData => {
        firebaseDb.child('meetups').push(meetupData, err => {
            if (err) console.log(err)
        }).then(() => {
            history.replace('/')
        })
    }

    return (
        <section className={classes.Page}>
            <h1>New Meetup</h1>
            <NewMeetupForm addMeetup={addMeetup} />
        </section>
    )
}

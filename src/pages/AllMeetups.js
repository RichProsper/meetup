import MeetupList from '../components/meetups/MeetupList'
import classes from './Page.module.css'
import navClasses from '../components/layouts/MainNav.module.css'
import { useState, useEffect } from 'react'
import firebaseDb from '../firebase'
import LoadingOverlay from '../components/layouts/LoadingOverlay'
import { Link } from 'react-router-dom'

export default function AllMeetups() {
    const [isLoading, setIsLoading] = useState(true)
    const [meetups, setMeetups] = useState([])

    // Handles initial reload
    useEffect(() => {
        // Set the active link based on the current page and set the page title to current page
        document.title = 'MeetUps'
        document.querySelector('a[href="/new-meetup"]').className = ''
        document.querySelector('a[href="/favorites"]').className = ''
        document.querySelector('a[href="/"]').className = navClasses.active

        // To stop 'Can't perform a React state update on an unmounted component' error
        let mounted = true
        // Get the Meetups Data
        firebaseDb.child('meetups').on('value', meetupsData => {  
            const data = meetupsData.val()
            const arr = []

            for (const key in data) {
                arr.push({
                    id: key,
                    ...data[key]
                })
            }
            
            if (mounted) {
                setIsLoading(false)
                setMeetups(arr)
            }
        })

        return function cleanup() {
            mounted = false
        }
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
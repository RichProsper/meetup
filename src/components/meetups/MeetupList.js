import classes from './MeetupList.module.css'
import MeetupItem from './MeetupItem'

export default function MeetupList({ meetups }) {
    return (
        <ul className={classes.MeetupList}>
            {meetups.map( meetup => <MeetupItem key={meetup.id} meetup={meetup} /> )}
        </ul>
    )
}
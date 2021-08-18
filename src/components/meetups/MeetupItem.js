import Card from '../layouts/Card'
import classes from './MeetupItem.module.css'
import { useState } from 'react'
import useMeetupsCtx from '../../contexts/MeetupsContext'
import Modal from '../layouts/Modal'

export default function MeetupItem({ meetup }) {
    const { toggleFavorite, removeMeetup } = useMeetupsCtx()
    const [modal, setModal] = useState(false)

    const toggleFavoriteStatus = () => toggleFavorite(meetup.id)

    const closeModal = () => setModal(false)

    return (
        <li className={classes.MeetupItem}>
            <Card> {/* This is done using the 'children' prop of Card */}
                <div className={classes.image}>
                    <img src={meetup.image} alt={meetup.title} />
                </div>
                <div className={classes.content}>
                    <h3>{meetup.title}</h3>
                    <address>{meetup.address}</address>
                    <p>{meetup.description}</p>
                </div>
                <div className={classes.action}>
                    <button type="button" onClick={toggleFavoriteStatus}>
                        {meetup.isFavorite ? 'Remove From Favorites' : 'Add To Favorites'}
                    </button>
                    <button type="button" onClick={() => {setModal(true)}}>
                        Delete Meetup
                    </button>
                </div>
            </Card>
            {modal && (
                <Modal
                    closeModal={closeModal}
                    headerText={meetup.title}
                    bodyText='Are you sure you want to delete this Meetup?'
                    meetupId={meetup.id}
                    removeMeetup={removeMeetup}
                />
            )}
        </li>
    )
}
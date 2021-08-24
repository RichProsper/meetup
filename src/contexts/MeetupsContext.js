import { createContext, useContext, useState, useEffect } from "react"
import { useHistory } from 'react-router'
import firebaseDb from "../firebase"
import useAuthCtx from "./AuthContext"

const MeetupsContext = createContext({
    isLoading: true,
    meetups: [],
    addMeetup: meetupData => {},
    removeMeetup: id => {},
    toggleFavorite: id => {},
    totalFavorites: 0
})

export default function useMeetupsCtx() {
    return useContext(MeetupsContext)
}

export const MeetupsContextProvider = ({ children }) => {
    const history = useHistory()
    const [meetups, setMeetups] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { currentUser } = useAuthCtx()

    useEffect(() => {
        // To stop 'Can't perform a React state update on an unmounted component' error
        let mounted = true
        // Get the Meetups Data
        if (currentUser) {
            firebaseDb.child(`meetups/${currentUser.uid}`).on('value', meetupsData => {  
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
        }

        return () => mounted = false
    }, [currentUser])

    /**
     * @param {Object} meetupData 
     */
    const addMeetup = meetupData => {
        firebaseDb.child(`meetups/${currentUser.uid}`).push(meetupData, err => {
            if (err) console.log(err)
        }).then(() => {
            history.replace('/')
        })
    }

    /**
     * @param {String} id 
     */
    const removeMeetup = id => {
        firebaseDb.child(`meetups/${currentUser.uid}/${id}`).remove(err => {
            if (err) console.log(err)
        })
    }
    
    /**
     * @param {String} id 
     */
    const toggleFavorite = id => {
        const fav = meetups.find(meetup => meetup.id === id)
        fav.isFavorite = !fav.isFavorite

        firebaseDb.child(`meetups/${currentUser.uid}/${id}`).set(fav, err => {
            if (err) console.log(err)
        })
    }
            
    const context = {
        isLoading,
        meetups,
        addMeetup,
        removeMeetup,
        toggleFavorite,
        totalFavorites: meetups.filter(meetup => meetup.isFavorite).length
    }
    
    return (
        <MeetupsContext.Provider value={context}>
            {children}
        </MeetupsContext.Provider>
    )
}
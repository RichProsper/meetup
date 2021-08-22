import classes from './NewMeetupForm.module.css'
import Card from '../layouts/Card'
import { useState, useRef } from 'react'

export default function NewMeetupForm({ addMeetup }) {
    const [isFocused, setIsFocused] = useState('title')
    const form = useRef()

    /**
     * @param {SubmitEvent} e 
     */
    const submitForm = e => {
        e.preventDefault()

        addMeetup({
            title: form.current.title.value,
            image: form.current.image.value,
            address: form.current.addr.value,
            description: form.current.desc.value,
            isFavorite: false
        })
    }

    return (
        <Card>
            <form ref={form} className={classes.NewMeetupForm} onSubmit={submitForm}>
                <div id="controls">
                    <div className={classes.control + (isFocused === 'title' ? ' ' + classes.focused : '')}>
                        <input 
                            name="title" 
                            type="text"
                            placeholder="Title..."
                            autoFocus
                            onFocus={() => {setIsFocused('title')}}
                            onBlur={() => {setIsFocused('')}}
                            required 
                        />
                        <span>Meetup Title *</span>
                    </div>
                    <div className={classes.control + (isFocused === 'image' ? ' ' + classes.focused : '')}>
                        <input 
                            name="image" 
                            type="url"
                            placeholder="URL..."
                            onFocus={() => {setIsFocused('image')}}
                            onBlur={() => {setIsFocused('')}}
                            required 
                        />
                        <span>Image URL *</span>
                    </div>
                    <div className={classes.control + (isFocused === 'addr' ? ' ' + classes.focused : '')}>
                        <input 
                            name="addr" 
                            type="text"
                            placeholder="Address..."
                            onFocus={() => {setIsFocused('addr')}}
                            onBlur={() => {setIsFocused('')}}
                            required 
                        />
                        <span>Address *</span>
                    </div>
                    <div className={classes.control + (isFocused === 'desc' ? ' ' + classes.focused : '')}>
                        <textarea 
                            name="desc" 
                            rows="5"
                            placeholder="Description..."
                            onFocus={() => {setIsFocused('desc')}}
                            onBlur={() => {setIsFocused('')}}
                            required
                        ></textarea>
                        <span>Description *</span>
                    </div>
                </div>

                <div className={classes.action}>
                    <button type="submit">Add Meetup</button>
                </div>
            </form>
        </Card>
    )
}
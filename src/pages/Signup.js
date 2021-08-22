import pageClasses from './Page.module.css'
import Card from '../components/layouts/Card'
import formCls from '../components/meetups/NewMeetupForm.module.css'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
    const [isFocused, setIsFocused] = useState('email')
    const form = useRef()

    // Handles initial reload
    useEffect(() => {
        // Set the active link based on the current page and set the page title to current page
        document.title = 'Sign Up'
        // document.querySelector('a[href="/new-meetup"]').className = ''
        // document.querySelector('a[href="/favorites"]').className = ''
        // document.querySelector('a[href="/"]').className = navClasses.active
    }, [])

    /**
     * @param {SubmitEvent} e 
     */
     const submitForm = e => {
        e.preventDefault()

        console.log('Submit Event fired!')
    }

    return (
        <section className={pageClasses.Page}>
            <h1>Sign Up</h1>

            <Card>
                <form ref={form} className={formCls.NewMeetupForm} onSubmit={submitForm}>
                    <div id="controls">
                        <div className={formCls.control + (isFocused === 'email' ? ' ' + formCls.focused : '')}>
                            <input 
                                name="email" 
                                type="email"
                                placeholder="Email..."
                                autoFocus
                                onFocus={() => {setIsFocused('email')}}
                                onBlur={() => {setIsFocused('')}}
                                required 
                            />
                            <span>Email *</span>
                        </div>
                        <div className={formCls.control + (isFocused === 'pass' ? ' ' + formCls.focused : '')}>
                            <input 
                                name="pass" 
                                type="password"
                                placeholder="Password..."
                                onFocus={() => {setIsFocused('pass')}}
                                onBlur={() => {setIsFocused('')}}
                                required 
                            />
                            <span>Password *</span>
                        </div>
                        <div className={formCls.control + (isFocused === 'passConfirm' ? ' ' + formCls.focused : '')}>
                            <input 
                                name="passConfirm" 
                                type="password"
                                placeholder="Confirm Password..."
                                onFocus={() => {setIsFocused('passConfirm')}}
                                onBlur={() => {setIsFocused('')}}
                                required 
                            />
                            <span>Confirm Password *</span>
                        </div>
                    </div>

                    <div className={formCls.action}>
                        <button type="submit">Sign Up</button>
                    </div>
                </form>

                <p className={pageClasses['auth-p']}>
                    Already have an account? <Link to="/signin" className={pageClasses.link}>Sign In</Link>
                </p>
            </Card>
        </section>
    )
}

import pageClasses from './Page.module.css'
import navClasses from '../components/layouts/MainNav.module.css'
import Card from '../components/layouts/Card'
import formCls from '../components/meetups/NewMeetupForm.module.css'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import LoadingOverlay from '../components/layouts/LoadingOverlay'
import useAuthCtx from '../contexts/AuthContext'

export default function Signin() {
    const [isFocused, setIsFocused] = useState('email')
    const form = useRef()
    const { signin, errMsgSignIn, setErrMsgSignIn, isLoading, loadingUser } = useAuthCtx()

    // Handles initial reload
    useEffect(() => {
        // Set the page title to current page
        document.title = 'Sign In'
        return () => setErrMsgSignIn('')
    }, [])

    useEffect(() => {
        if (!loadingUser) {
            // document.querySelector('a[href="/forgot-password"]').className = ''
            document.getElementById('signup').className = ''
            document.getElementById('signin').className = navClasses.active
        }
    }, [loadingUser])

    /**
     * @param {SubmitEvent} e 
     */
    const submitForm = async e => {
        e.preventDefault()
        signin(form.current.email.value, form.current.pass.value)
    }

    return (
        <section className={pageClasses.Page}>
            <h1>Sign In</h1>

            {isLoading ? <LoadingOverlay /> : (
                <Card>
                    <form ref={form} className={formCls.NewMeetupForm} onSubmit={submitForm}>
                        <div className={formCls.error}>
                            {errMsgSignIn && <span>{errMsgSignIn}</span>}
                        </div>
    
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
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title={"Must contain at least one number and one uppercase and lowercase letter," + 
                                    " and at least 8 or more characters"}
                                />
                                <span>Password *</span>
                            </div>
                        </div>
    
                        <div className={formCls.action}>
                            <button type="submit">Sign In</button>
                        </div>
                    </form>
    
                    <p className={pageClasses['auth-p']}>
                        Don't have an account? <Link to="/signup" className={pageClasses.link}>Sign Up</Link>
                    </p>
                </Card>            
            )}
        </section>
    )
}

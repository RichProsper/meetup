import pageClasses from './Page.module.css'
import navClasses from '../components/layouts/MainNav.module.css'
import Card from '../components/layouts/Card'
import formCls from '../components/meetups/NewMeetupForm.module.css'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import LoadingOverlay from '../components/layouts/LoadingOverlay'
import useAuthCtx from '../contexts/AuthContext'

export default function Signup() {
    const [isFocused, setIsFocused] = useState('email')
    const form = useRef()
    const { signup, errMsgSignUp, setErrMsgSignUp, isLoading, loadingUser } = useAuthCtx()

    // Handles initial reload
    useEffect(() => {
        // Set the page title to current page
        document.title = 'Sign Up'
        return () => setErrMsgSignUp('')
    }, [])

    useEffect(() => {
        if(!loadingUser) {
            document.getElementById('resetPass').className = ''
            document.getElementById('signin').className = ''
            document.getElementById('signup').className = navClasses.active
        }
    }, [loadingUser])

    /**
     * @param {SubmitEvent} e 
     */
    const submitForm = async e => {
        e.preventDefault()
        signup(form.current.email.value, form.current.pass.value, form.current.passConfirm.value)
    }

    return (
        <section className={pageClasses.Page}>
            <h1>Sign Up</h1>

            {isLoading ? <LoadingOverlay /> : (
                <Card>
                    <form ref={form} className={formCls.NewMeetupForm} onSubmit={submitForm}>
                        <div className={formCls.error}>
                            {errMsgSignUp && <span>{errMsgSignUp}</span>}
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
                            <div className={formCls.control + (isFocused === 'passConfirm' ? ' ' + formCls.focused : '')}>
                                <input 
                                    name="passConfirm" 
                                    type="password"
                                    placeholder="Confirm Password..."
                                    onFocus={() => {setIsFocused('passConfirm')}}
                                    onBlur={() => {setIsFocused('')}}
                                    required
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title={"Must contain at least one number and one uppercase and lowercase letter," + 
                                    " and at least 8 or more characters"}
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
            )}
        </section>
    )
}

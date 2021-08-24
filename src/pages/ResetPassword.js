import pageClasses from './Page.module.css'
import navClasses from '../components/layouts/MainNav.module.css'
import Card from '../components/layouts/Card'
import formCls from '../components/meetups/NewMeetupForm.module.css'
import { useState, useEffect, useRef } from 'react'
import LoadingOverlay from '../components/layouts/LoadingOverlay'
import useAuthCtx from '../contexts/AuthContext'

export default function Signin() {
    const [isFocused, setIsFocused] = useState('email')
    const form = useRef()
    const { 
        resetPassword, errMsgResetPass, setErrMsgResetPass, successMsgResetPass, setSuccessMsgResetPass, 
        isLoading, loadingUser 
    } = useAuthCtx()

    // Handles initial reload
    useEffect(() => {
        // Set the page title to current page
        document.title = 'Reset Password'
        return () => {
            setErrMsgResetPass('')
            setSuccessMsgResetPass('')
        }
    }, [])

    useEffect(() => {
        if (!loadingUser) {
            document.getElementById('signin').className = ''
            document.getElementById('signup').className = ''
            document.getElementById('resetPass').className = navClasses.active
        }
    }, [loadingUser])

    /**
     * @param {SubmitEvent} e 
     */
    const submitForm = async e => {
        e.preventDefault()
        resetPassword(form.current.email.value)
    }

    return (
        <section className={pageClasses.Page}>
            <h1>Reset Password</h1>

            {isLoading ? <LoadingOverlay /> : (
                <Card>
                    <form ref={form} className={formCls.NewMeetupForm} onSubmit={submitForm}>
                        <div className={formCls.error}>
                            {errMsgResetPass && <span>{errMsgResetPass}</span>}
                        </div>
                        <div className={formCls.success}>
                            {successMsgResetPass && <span>{successMsgResetPass}</span>}
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
                        </div>
    
                        <div className={formCls.action}>
                            <button type="submit">Reset Password</button>
                        </div>
                    </form>
                </Card>            
            )}
        </section>
    )
}
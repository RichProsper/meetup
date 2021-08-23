import { Link } from 'react-router-dom'
import classes from './MainNav.module.css'
import { useState, useRef } from 'react'
import useMeetupsCtx from '../../contexts/MeetupsContext'
import useAuthCtx from '../../contexts/AuthContext'

export default function MainNav() {    
    const { totalFavorites } = useMeetupsCtx()
    const { currentUser, loadingUser, signout } = useAuthCtx()
    const [toggle, setToggle] = useState(false)
    const btn = useRef()
    const bars = useRef()

    /**
     * @param {MouseEvent} e 
     */
    const closeToggle = e => {
        if (e.target !== btn.current && e.target !== bars.current) setToggle(false)
    }

    return (
        <header className={classes.MainNav} onClick={closeToggle}>
            <div className={classes.logo}>MeetUps</div>
            <nav>
                <button 
                    type="button" 
                    ref={btn}
                    className={classes.toggle} 
                    onClick={() => {setToggle(!toggle)}}
                >
                    {toggle ? <div className={classes.times}>&times;</div> : (
                        <div ref={bars} className={classes.bars}></div>
                    )}
                </button>

                <ul className={toggle ? classes.visible : ''} onClick={() => {setToggle(false)}}>
                    {!loadingUser && (
                        currentUser ? (
                            <>
                                <li><Link to="/">All Meetups</Link></li>
                                <li><Link to="/new-meetup">New Meetup</Link></li>
                                <li>
                                    <Link to="/favorites">
                                        My Favorites <span className={classes.badge}>{totalFavorites}</span>
                                    </Link>
                                </li>
                                <li><button type="button" onClick={signout}>Sign Out</button></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/signup" id="signup">Sign Up</Link></li>
                                <li><Link to="/signin" id="signin">Sign In</Link></li>
                            </>
                        )
                    )}
                </ul>
            </nav>
        </header>
    )
}

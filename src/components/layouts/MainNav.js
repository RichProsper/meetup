import { Link } from 'react-router-dom'
import classes from './MainNav.module.css'
import { useContext, useState, useRef } from 'react'
import FavoritesContext from '../../store/FavoritesContext'

export default function MainNav() {    
    const favsContext = useContext(FavoritesContext)
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
                    <li><Link to="/">All Meetups</Link></li>
                    <li><Link to="/new-meetup">New Meetup</Link></li>
                    <li>
                        <Link to="/favorites">
                            My Favorites <span className={classes.badge}>{favsContext.totalFavorites}</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

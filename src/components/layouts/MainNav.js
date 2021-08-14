import { Link } from 'react-router-dom'
import classes from './MainNav.module.css'
import { useContext, useState } from 'react'
import FavoritesContext from '../../store/FavoritesContext'

export default function MainNav() {    
    const favsContext = useContext(FavoritesContext)
    const [toggle, setToggle] = useState(false)

    return (
        <header className={classes.MainNav}>
            <div className={classes.logo}>MeetUps</div>
            <nav>
                <ul>
                    <li><Link to="/">All Meetups</Link></li>
                    <li><Link to="/new-meetup">New Meetup</Link></li>
                    <li>
                        <Link to="/favorites">
                            My Favorites <span className={classes.badge}>{favsContext.totalFavorites}</span>
                        </Link>
                    </li>
                </ul>
                <button type="button" className={classes.toggle} onClick={() => {setToggle(!toggle)}}>
                    {toggle ? <div className={classes.times}>&times;</div> : (
                        <div className={classes.bars}></div>
                    )}
                </button>
            </nav>
        </header>
    )
}

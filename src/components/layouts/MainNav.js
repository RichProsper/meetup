import { Link } from 'react-router-dom'
import classes from './MainNav.module.css'
import { useContext, useState } from 'react'
import FavoritesContext from '../../store/FavoritesContext'

export default function MainNav() {    
    const favsContext = useContext(FavoritesContext)
    const [toggle, setToggle] = useState(false)

    return (
        <header className={classes.MainNav} onClick={() => {setToggle(!toggle)}}>
            <div className={classes.logo}>MeetUps</div>
            <nav>
                <button type="button" className={classes.toggle}>
                    {toggle ? <div className={classes.times}>&times;</div> : (
                        <div className={classes.bars}></div>
                    )}
                </button>

                <ul className={toggle ? classes.visible : ''}>
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

import classes from './Landing.module.css'
import { Link } from 'react-router-dom'

export default function Landing() {
    return (
        <section className={classes.Landing}>
            <div className={classes.banner}></div>
            <div className={classes.main}>
                <span className={classes.logo}>MeetUps</span>
                <span className={classes.pitch}>
                    <span className={classes.gradient}>Save</span> your meet up locations.
                    <br /><span className={classes.gradient}>Choose</span> your favorites.
                    <br /><span className={classes.gradient}>View</span> them anytime, anyhwere, on any device.
                </span>
                <div className={classes.cta}>
                    <Link to="/signup" className={classes.link}>Sign Up</Link>
                    <Link to="/signin" className={classes.link}>Sign In</Link>
                </div>
            </div>
        </section>
    )
}
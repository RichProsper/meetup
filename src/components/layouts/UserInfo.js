import classes from './UserInfo.module.css'

export default function UserInfo({ currentUser }) {
    return (
        <div className={classes.UserInfo}>
            Signed in as: {currentUser.email}
        </div>
    )
}

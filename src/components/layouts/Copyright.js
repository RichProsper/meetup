import classes from './Copyright.module.css'

export default function Copyright() {
    return (
        <footer className={classes.Copyright}>
            Copyright &copy; {new Date().getFullYear()} Rich Prosper, All Rights Reserved.
        </footer>
    )
}

import classes from './LoadingOverlay.module.css'

export default function LoadingOverlay({ text }) {
    return (
        <div className={classes.LoadingOverlay}>
            <div className={classes.content}>
                <div className={classes["spinner-wrapper"]}>
                    <div className={classes.spinner}></div>
                </div>
                <h3>Loading {text}...</h3>
            </div>
        </div>
    )
}
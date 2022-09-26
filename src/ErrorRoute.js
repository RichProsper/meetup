import { Route, Redirect } from "react-router"
import useAuthCtx from "./contexts/AuthContext"

export default function ErrorRoute({ component: Component, ...rest }) {
    const { loadingUser, currentUser } = useAuthCtx()

    const isValidURL = url_ => {
        return [
            '/all-meetups', '/new-meetup', '/favorites', '/signup', '/signin', '/reset-password'
        ].findIndex(url => url === url_) !== -1
    }
    
    return (
        <Route
            {...rest}
            render={props => {
                return !loadingUser && !isValidURL(props.location.pathname) && (
                    currentUser ? <Redirect to="/all-meetups" /> : <Redirect to="/signin" />
                )
            }}
        ></Route>
    )
}

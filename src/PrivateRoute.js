import { Route, Redirect } from "react-router"
import useAuthCtx from "./contexts/AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
    const { loadingUser, currentUser } = useAuthCtx()
    
    return (
        <Route
            {...rest}
            render={props => {
                return !loadingUser && (
                    currentUser ? <Component {...props} /> : <Redirect to="/signin" />
                )
            }}
        ></Route>
    )
}

import { Route, Redirect } from "react-router"
import useAuthCtx from "./contexts/AuthContext"

export default function PublicRoute({ component: Component, ...rest }) {
    const { loadingUser, currentUser } = useAuthCtx()
    
    return (
        <Route
            {...rest}
            render={props => {
                return !loadingUser && (
                    currentUser ? <Redirect to="/" /> : <Component {...props} />
                )
            }}
        ></Route>
    )
}

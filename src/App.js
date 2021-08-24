import { BrowserRouter as Router, withRouter, Switch } from "react-router-dom"
import AllMeetups from './pages/AllMeetups'
import Favorites from './pages/Favorites'
import NewMeetup from './pages/NewMeetup'
import Signup from "./pages/Signup"
import Signin from "./pages/Signin";
import MainNav from './components/layouts/MainNav'
import AllContexts from "./contexts/AllContexts"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"
import ResetPassword from "./pages/ResetPassword"
import Copyright from "./components/layouts/Copyright"

export default function App() {
    return (
        <div id="App">
            <Router>
                <AllContexts>
                    <MainNav /> {/* Link Component cannot be used outside of Router component */}
                                        
                    <Switch> {/* Switch Component ensures only one page is shown at a time */}
                        <PrivateRoute exact path="/" component={withRouter(AllMeetups)} />
                        <PrivateRoute path="/new-meetup" component={withRouter(NewMeetup)} />
                        <PrivateRoute path="/favorites" component={withRouter(Favorites)} />
                        <PublicRoute path="/signup" component={withRouter(Signup)} />
                        <PublicRoute path="/signin" component={withRouter(Signin)} />
                        <PublicRoute path="/reset-password" component={withRouter(ResetPassword)} />
                    </Switch>

                    <Copyright />
                </AllContexts>
            </Router>
        </div>
    )
}

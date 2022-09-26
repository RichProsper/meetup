import { BrowserRouter as Router, withRouter, Switch } from 'react-router-dom'
import Landing from './pages/Landing'
import AllMeetups from './pages/AllMeetups'
import Favorites from './pages/Favorites'
import NewMeetup from './pages/NewMeetup'
import Signup from './pages/Signup'
import Signin from './pages/Signin';
import MainNav from './components/layouts/MainNav'
import AllContexts from './contexts/AllContexts'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import ErrorRoute from './ErrorRoute'
import ResetPassword from './pages/ResetPassword'

export default function App() {
    return (
        <Router>
            <AllContexts>                                    
                <Switch> {/* Switch Component ensures only one page is shown at a time */}
                    <PublicRoute exact path="/" component={withRouter(Landing)} />
                    <>
                        <MainNav />
                        <PrivateRoute path="/all-meetups" component={withRouter(AllMeetups)} />
                        <PrivateRoute path="/new-meetup" component={withRouter(NewMeetup)} />
                        <PrivateRoute path="/favorites" component={withRouter(Favorites)} />
                        <PublicRoute path="/signup" component={withRouter(Signup)} />
                        <PublicRoute path="/signin" component={withRouter(Signin)} />
                        <PublicRoute path="/reset-password" component={withRouter(ResetPassword)} />
                        {/* Catches all the invalid URLs and redirects to "/signin" */}
                        <ErrorRoute />
                    </> 
                </Switch>
            </AllContexts>
        </Router>
    )
}

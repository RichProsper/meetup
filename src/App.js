import { BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";
import AllMeetups from './pages/AllMeetups'
import Favorites from './pages/Favorites'
import NewMeetup from './pages/NewMeetup'
import MainNav from './components/layouts/MainNav'
import { FavoritesContextProvider } from './store/FavoritesContext'

export default function App() {
    return (
        <div id="App">
            <FavoritesContextProvider>
                <Router>
                    <MainNav /> {/* Link Component cannot be used outside of Router component */}
                    
                    <Switch> {/* Switch Component ensures only one page is shown at a time */}
                        <Route exact path="/" component={withRouter(AllMeetups)} />
                        <Route path="/new-meetup" component={withRouter(NewMeetup)} />
                        <Route path="/favorites" component={withRouter(Favorites)} />
                    </Switch>
                </Router>
            </FavoritesContextProvider>
        </div>
    )
}

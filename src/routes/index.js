import { Switch } from 'react-router-dom';
import Route from './Route'

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Home from '../pages/Home'
import Filme from '../pages/Filme'
import Favoritos from '../pages/Favoritos'
import Profile from '../pages/Profile'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/register" component={SignUp} />

            <Route exact path="/home" component={Home} isPrivate />
            <Route exact path="/filme/:id" component={Filme} isPrivate />
            <Route exact path="/favoritos" component={Favoritos} isPrivate />
            <Route exact path="/profile" component={Profile} isPrivate />
        </Switch>
    )
}

export default Routes
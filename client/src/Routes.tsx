import { BrowserRouter, Switch } from 'react-router-dom'
import { Home } from './pages/Home'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { Private } from './routes/Private'
import { Public } from './routes/Public'

export const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Public restricted={false} component={Landing} path="/" exact />
        </Switch>
        <Switch>
          <Public restricted={true} component={Login} path="/sign-in" exact />
        </Switch>
        <Switch>
          <Private component={Profile} path="/profile" exact />
        </Switch>
        <Switch>
          <Private component={Home} path="/home" exact />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

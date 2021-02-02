
import { Provider } from 'react-redux';
import { Router, Switch } from 'react-router-dom';
import App from '../App';
import PropTypes from 'prop-types';
import { createBrowserHistory } from "history";


import  Appointments  from '../page_modules/appointments/appointments.component';
import  Step_1  from '../page_modules/appointments/step_1/step_1.component';
import  Video_call  from '../page_modules/video_call/video_call.component';
import { RouteWithSubRoutes } from './router.helper';

let history = createBrowserHistory()
const routes = [
  {
    path: "/videollamadas",
    component: Video_call
  },
  {
    path: "/appointments",
    component: Appointments,
    routes: [
      {
        path: "/appointments/step-1",
        component: Step_1
      }
    ]
  },
  {
    path: "/",
    component: App
  },
];

const Root = ({ store }) =>{
    return (
        <Provider store={store}>
            <Router history={history}>
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
            </Switch>
            </Router>
        </Provider>
    )
}



Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
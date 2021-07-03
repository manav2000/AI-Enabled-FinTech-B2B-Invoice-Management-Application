import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store/mainStore';
import theme from '../src/utils/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import 'date-fns';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';


ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();



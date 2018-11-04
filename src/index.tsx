import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import HomeLayout from './layouts/home'
import stores from './stores';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider {...stores}>
    <HomeLayout/>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();

import 'config/i18n';
import 'core-js/features/set';
import 'core-js/features/map';

import React, { Suspense, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from 'App';
import { BrowserRouter as Router } from 'react-router-dom';

import { unregister } from './serviceWorker';

const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
`;

window.renderContainer = (containerId, history, data) => {
  ReactDOM.render(
    <StrictMode>
      <Router>
        <Suspense fallback="Loading...">
          <GlobalStyles />

          <App history={history} data={data} />
        </Suspense>
      </Router>
    </StrictMode>,
    document.getElementById(containerId)
  );
  unregister();
};

window.unmountContainer = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

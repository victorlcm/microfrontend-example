import 'config/i18n';
import 'core-js/features/set';
import 'core-js/features/map';

import React, { Suspense, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from 'App';

import { unregister } from './serviceWorker';

const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
`;

window.renderFragment = (containerId, history, data) => {
  ReactDOM.render(
    <StrictMode>
      <Suspense fallback="Loading...">
        <GlobalStyles />
        <App history={history} data={data} />
      </Suspense>
    </StrictMode>,
    document.getElementById(containerId)
  );
  unregister();
};

window.unmountFragment = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

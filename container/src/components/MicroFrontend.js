import React, { PureComponent } from 'react';

import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

class MicroFrontend extends PureComponent {
  static propTypes = {
    document: PropTypes.object,
    history: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    window: PropTypes.object,
  };

  static defaultProps = {
    document,
    window,
  };

  state = {
    hasError: false,
  };

  componentDidMount() {
    const { name, host, document } = this.props;
    const id = `micro-frontend-${name}`;

    axios
      .get(`${host}/asset-manifest.json`)
      .then(res => {
        const manifest = res.data;
        const script = document.createElement('script');
        script.id = `${id}-script`;
        script.src = manifest.files['main.js'];

        const style = document.createElement('link');
        style.id = `${id}-style`;
        style.rel = 'stylesheet';
        style.href = manifest.files['main.css'];

        this.entryPoints = {
          renderFunction: manifest.files.entryPoints.render,
          unmountFunction: manifest.files.entryPoints.unmount,
        };

        script.onload = this.renderMicroFrontend;

        document.head.appendChild(script);
        document.head.appendChild(style);
      })
      .catch(e => {
        console.error(e);
        this.setState({ hasError: true });
      });
  }

  componentWillUnmount() {
    const { name, window, document } = this.props;
    try {
      window[this.entryPoints.unmountFunction](`${name}-container`);
      document.getElementById(`micro-frontend-${name}-script`).remove();
      document.getElementById(`micro-frontend-${name}-style`).remove();
    } catch (e) {
      console.error(e);
      this.setState({ hasError: true });
    }
  }

  renderMicroFrontend = () => {
    const { name, window, history } = this.props;
    try {
      window[this.entryPoints.renderFunction](`${name}-container`, history);
    } catch (e) {
      this.setState({ hasError: true });
    }
  };

  render() {
    const { hasError } = this.state;
    const { name } = this.props;

    if (hasError) {
      return <h1>Algo deu errado</h1>;
    }

    return <main id={`${name}-container`} />;
  }
}

export default withRouter(MicroFrontend);

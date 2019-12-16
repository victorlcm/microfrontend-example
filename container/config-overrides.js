const ManifestPlugin = require('webpack-manifest-plugin'); // eslint-disable-line import/no-extraneous-dependencies

const generatePublicPath = () => {
  const publicPath = `${process.env.REACT_APP_BASE_MICROFRONTEND_URL}/`;
  return publicPath;
};

/* eslint no-param-reassign: 0 */
module.exports = {
  webpack: config => {
    // Disable split chunks
    config.optimization.runtimeChunk = false;
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };

    // Get the public path to prepend assets
    config.output.publicPath = generatePublicPath();

    // Expose render and unmount entrypoint functions in asset-manifest.json
    config.plugins = config.plugins.map(plugin => {
      if (plugin instanceof ManifestPlugin) {
        plugin.opts.seed = {
          entryPoints: {
            render: 'renderContainer',
            unmount: 'unmountContainer',
          },
        };
        plugin.opts.publicPath = generatePublicPath();
      }

      return plugin;
    });

    return config;
  },
  // Configure the dev server
  devServer: configFunction => {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);
      config.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      };
      return config;
    };
  },
};

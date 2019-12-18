const WorkboxWebpackPlugin = require('workbox-webpack-plugin');


module.exports = {
    webpack: {
        configure: (webpackConfig, { env }) => {
            webpackConfig.plugins = webpackConfig.plugins.map(plugin => {
                if(plugin.constructor.name === 'GenerateSW') {
                    return new WorkboxWebpackPlugin.InjectManifest({
                        swSrc: './src/sw.js',
                        swDest: 'service-worker.js'
                    })
                }

                return plugin
            })

            return webpackConfig;
        }
    },
    plugins: [
        // { plugin: new WorkboxWebpackPlugin.InjectManifest({
        //         swSrc: './src/sw.js',
        //         swDest: 'service-worker.js'
        //     }) },
        { plugin: require('@semantic-ui-react/craco-less') }
    ],
}
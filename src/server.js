import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import 'ignore-styles';
import React from 'react';
import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import { setConfig } from 'react-hot-loader';
import serialize from 'serialize-javascript';
import assets from '../public/webpack-assets.json';
import { App } from './common/containers';
import { getMetaTags, handleRequestsByRoute, getRedirectUrl } from './common/utils/serverHelper';
import apiClient from './common/utils/apiClient';
import createStore from './common/redux/create';
import { renderType } from './common/config';
import webpackConfig from '../webpack.dev';

dotenv.config();

const server = express();
const IS_DEV = process.env.MODE === 'development';

if (IS_DEV) {
    const compiler = webpack(webpackConfig);
    server.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        writeToDisk: true,
    }));
    server.use(require('webpack-hot-middleware')(compiler));

    setConfig({
        ignoreSFC: true, // RHL will be __completely__ disabled for SFC
        pureRender: true, // RHL will not change render method
    });
}


server
    .disable('x-powered-by')
    .get('/*', async (req, res) => {
        // Create a new class name generator.
        // if (error) {
        //     res.status(500).send(error.message);
        // } else if (redirectLocation) {
        //     res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        // } else if (renderProps) {
        const context = {};
        const client = new apiClient();
        const { store } = createStore(client, {}, 'server');
        await handleRequestsByRoute(store, req);
        store.rootTask.done.then(() => {
            const markup = renderToString(
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <App />
                    </StaticRouter>
                </Provider>
            );
            const metaTags = getMetaTags(store, req.path, req.query);
            console.log('its done and after meta tags');
            const finalState = store.getState();
            const response = getRedirectUrl(store, req);
            console.log(response, ' this is response');
            if (response.status === 301) {
                console.log('its doing redirect');
                res.redirect(response.status, response.redirectUrl);
            } else {
                res.status(200).send(
                    `<!doctype html>
                    <html lang="fa" dir="rtl">
                    <head>
                        <link rel="manifest" href="/manifest.json">
                        <link rel="shortcut icon" href="/favicon.ico?v=3" type="image/x-icon">
                        <meta property="twitter:card" content="summary" />
                        <meta property="twitter:site" content="@chibaki_ir" />
                        <meta property="twitter:creator" content="@chibaki_ir" />
                        <meta property="twitter:title" content="Chibaki - چی باکی" />
                        <meta property="twitter:description" content="${metaTags.description}"/>
                        <meta name="Description" content="${metaTags.description}">
                        <meta property="og:description" content="${metaTags.description}"/>
                        <meta property="twitter:image" content="https://chibaki.ir/assets/images/logo/logo-1-1.svg" />
                        <meta property="twitter:image:width" content="200" />
                        <meta property="twitter:image:height" content="200" />                
                        <meta property="og:image" content="https://chibaki.ir/assets/images/logo/logo-1-1.svg" />
                        <meta property="og:image:width" content=200" />
                        <meta property="og:image:height" content=200" />   
                        <meta property="og:site_name" content="چی باکی" />
                        <meta property="og:url" content="https://chibaki.ir" />
                        <meta http-equiv="content-language" content="fa" />
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                        <meta http-equiv="x-ua-compatible" content="ie=edge" />
                        <meta name="apple-mobile-web-app-capable" content="yes" />
                        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/ >
                        <meta property="og:type" content="website" />
                        <meta name="keywords" content="${metaTags.keywords}">
                        <meta property="og:locale" content="fa_IR" />
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="robots" content="index, follow"/>
                        <meta charset="utf-8" />
                        <title>${metaTags.title}</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-99324713-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-99324713-1');
</script>
<style>
.loader-wrapper {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999999;
}
.spinner {
    margin: 8rem auto;
    width: 40px;
    height: 40px;
    position: relative;
    text-align: center;
    
    -webkit-animation: sk-rotate 2.0s infinite linear;
    animation: sk-rotate 2.0s infinite linear;
 }

.dot1, .dot2 {
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: #1e87f0;
    border-radius: 100%;
    
    -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
    animation: sk-bounce 2.0s infinite ease-in-out;
}

.dot2 {
    top: auto;
    bottom: 0;
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}

@-webkit-keyframes sk-rotate {
    100% {
        -webkit-transform: rotate(360deg)
    }
}
@keyframes sk-rotate {
    100% {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg)
    }
}

@-webkit-keyframes sk-bounce {
    0%, 100% {
        -webkit-transform: scale(0.0)
    }
    50% {
        -webkit-transform: scale(1.0)
    }
}

@keyframes sk-bounce {
    0%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
    }
    50% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
    }
}
</style>

                  
                   
    ${
    assets.main.css
        ? `<link media="all" rel="stylesheet" href="${assets.main.css}">`
        : ''
}
    ${
    !IS_DEV
        ? `<script src="${assets.main.js}" defer></script>`
        : `<script src="${
            assets.main.js
        }" defer crossorigin></script>`
}
                    </head>
                    <body>
                        <div id="root">${markup}</div>
                        <div id="loader" class="loader-wrapper">
                            <div class="spinner">
                                <div class="dot1"></div>
                                <div class="dot2"></div>
                            </div>
                        </div>
                        <script>
                            window.__PRELOADED_STATE__ = ${serialize(finalState)};
                            window.__renderType__ = ${serialize(renderType)}
                        </script>   
                    </body>
                </html>`,
                );
            }
        }
        );
        if (context.url) {
            res.redirect(context.url);
        }
        // } else {
        //     res.status(404).send('Not found');
        // }
    }
    );

export default server;

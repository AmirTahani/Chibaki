import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import 'ignore-styles';
import React from 'react';
import express from 'express';
import serialize from 'serialize-javascript';
import { App } from './common/containers';
import assets from '../public/webpack-assets';
import { getMetaTags, handleRequestsByRoute } from './common/utils/serverHelper';
import apiClient from './common/utils/apiClient';
import createStore from './common/redux/create';
import { renderType } from './common/config';

console.log('salam injas');
const server = express();
server
    .disable('x-powered-by')
    .get('/*', async (req, res) => {
        // Create a new class name generator.
        // if (error) {
        //     res.status(500).send(error.message);
        // } else if (redirectLocation) {
        //     res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        // } else if (renderProps) {
        console.log('salam');
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
            const finalState = store.getState();

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
                        <script async src="/ga.js"></script>
                        <script type="text/javascript" >
                            (function (i, s, o, r) {
                                i['GoogleAnalyticsObject'] = r;
                                i[r] = i[r] || function () {
                                 (i[r].q = i[r].q || []).push(arguments)
                                }, i[r].l = 1 * new Date()
                               })(window, document, 'script', 'ga');
                            window.ga("create", 'UA-99324713-1', "auto");
                        </script>
    ${
    assets.main.css
        ? `<link media="all" rel="stylesheet" href="/${assets.main.css}">`
        : ''
}
    ${
    process.env.NODE_ENV === 'production'
        ? `<script src="${assets.main.js}" defer></script>`
        : `<script src="/${
            assets.main.js
        }" defer crossorigin></script>`
}
                    </head>
                    <body>
                        <div id="root">${markup}</div>
                        <script>
                            window.__PRELOADED_STATE__ = ${serialize(finalState)};
                            window.__renderType__ = ${serialize(renderType)}
                        </script>   
                    </body>
                </html>`,
            );
        });

        if (context.url) {
            res.redirect(context.url);
        }
        // } else {
        //     res.status(404).send('Not found');
        // }
    }
    );

export default server;

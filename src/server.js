// eslint-ignore-file
import { Provider } from 'react-redux';
import { match } from 'react-router';
import { renderToString } from 'react-dom/server';
import React from 'react';
import express from 'express';
import serialize from 'serialize-javascript';

import { App } from './common/containers';
import { getMetaTags, handleRequestsByRoute } from './common/utils/serverHelper';
import apiClient from './common/utils/apiClient';
import createStore from './common/redux/create';
import getRoutes from './common/containers/App/App';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = express();
server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get('/*', (req, res) => {
        match(
            { routes: getRoutes(), location: req.url },
            async function (error, redirectLocation, renderProps) {
                if (error) {
                    res.status(500).send(error.message);
                } else if (redirectLocation) {
                    res.redirect(302, redirectLocation.pathname + redirectLocation.search);
                } else if (renderProps) {
                    const context = {};
                    const client = new apiClient();
                    const store = createStore(client);
                    await handleRequestsByRoute(store, req);

                    store.rootTask.done.then(() => {
                        // Render the component to a string
                        const markup = renderToString(
                            <Provider store={store}>
                                <App {...renderProps} />
                            </Provider>
                        );
                        const metaTags = getMetaTags(store.getState(), req.path);
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
                    <meta property="twitter:image" content="https://chibaki.ir/assets/images/logo/logo-1-1.svg" />
                    <meta property="twitter:image:width" content="200" />
                    <meta property="twitter:image:height" content="200" />                
                    <meta property="og:image" content="https://chibaki.ir/assets/images/logo/logo-1-1.svg" />
                    <meta property="og:image:width" content=200" />
                    <meta property="og:image:height" content=200" />   
                    <meta property="og:site_name" content="چی‌باکی" />
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
${
    assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ''
}
${
    process.env.NODE_ENV === 'production'
        ? `<script src="${assets.client.js}" defer></script>`
        : `<script src="${
            assets.client.js
        }" defer crossorigin></script>`
}
                </head>
                <body>
                    <div id="root">${markup}</div>
                    <script>
                        window.__PRELOADED_STATE__ = ${serialize(finalState)};
                    </script>                 
                </body>
            </html>`,
                        );
                    });

                    if (context.url) {
                        res.redirect(context.url);
                    }
                } else {
                    res.status(404).send('Not found');
                }
            },
        );
    });

export default server;

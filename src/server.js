import React from 'react';
import express from 'express';
import { Provider } from 'react-redux';
import { match } from 'react-router';
import apiClient from './common/utils/apiClient';
import serialize from 'serialize-javascript';
import { renderToString } from 'react-dom/server';
import createStore from './common/redux/create';
import { App } from './common/containers';
import { loader } from './common/redux/modules/professions';

import getRoutes from './common/containers/App/App';
import professions from "./common/redux/modules/professions";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get('/*', (req, res) => {
        match(
            { routes: getRoutes(), location: req.url },
            async (error, redirectLocation, renderProps) => {
                if (error) {
                    res.status(500).send(error.message);
                } else if (redirectLocation) {
                    res.redirect(302, redirectLocation.pathname + redirectLocation.search);
                } else if (renderProps) {

                    // You can also check renderProps.components or renderProps.routes for
                    // your "not found" component or route respectively, and send a 404 as
                    // below, if you're using a catch-all route.
                    const context = {};
                    const client = new apiClient();
                    const store = createStore(client);

                    store.dispatch(loader());
                    store.rootTask.done.then(() => {
                        // Render the component to a string
                        const markup = renderToString(
                            <Provider store={store}>
                                <App {...renderProps} />
                            </Provider>
                        );
                        const route = req.path;
                        const subRoute = route.split('/').reverse()[0];
                        const finalState = store.getState();
                        const categories = finalState.professions.categories;
                        const metaTags = {
                            description: 'از مدرس زبان و برنامه نویس تا مربی بدن سازی و نقاش ساختمان, ما مناسبترین فرد را کاملاً رایگان برای ارائه‌ی خدمت به شما معرفی می کنیم',
                            title: 'Chibaki - چی باکی'
                        };
                        const professions = categories.reduce((acc, current) => {
                            acc.push(...current.professions);
                            return acc;
                        }, []);
                        professions.map(profession => {
                            const professionUrlTitle = profession.title.split(' ').join('_');
                            if (subRoute === professionUrlTitle) {
                                metaTags.description = profession.description;
                                metaTags.title = profession.title;
                            }
                        });

                        console.log(finalState, 'this is final state');

                        res.status(200).send(
                            `<!doctype html>
                <html lang="">
                <head>
                    <meta property="twitter:card" content="summary" />
                    <meta property="twitter:site" content="@chibaki_ir" />
                    <meta property="twitter:creator" content="@chibaki_ir" />
                    <meta property="twitter:title" content="Chibaki - چی باکی" />
                    <meta property="twitter:description" content="${metaTags.description}"/>
                    <meta property="twitter:image" content="/" />
                    <meta property="twitter:image:width" content=200" />
                    <meta property="twitter:image:height" content=200" />                
                    <meta property="og:image" content="https://chibaki.ir/assets/images/logo/logo-1-1.svg" />
                    <meta property="og:image:width" content=200" />
                    <meta property="og:image:height" content=200" />                    
                    <meta property="og:locale" content="fa_IR" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
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
                        window.__PRELOADED_STATE__ = ${serialize(finalState)}
                        window.__CLIENT__ = client;
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

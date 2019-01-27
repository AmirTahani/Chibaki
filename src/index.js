require('@babel/register');
require('@babel/polyfill');
const Loadable = require('react-loadable');
const http = require('http');
const cluster = require('cluster');
const { cpus } = require('os');
const app = require('./server');


const numCPUs = cpus().length;

function forker() {
    cluster.fork()
        .on('exit', (code) => {
            console.log(code, 'tjhios is code');
            console.warn('Universal worker died');
            if (code) forker();
        });
}

if (cluster.isMaster) {
    console.log((`Universal master (${process.pid})`));

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) forker();
} else {
    let currentApp = app;
    Loadable.preloadAll().then(() => {
        const server = app.listen(process.env.PORT || 3100, (error) => {
            if (error) {
                console.log(error);
            }
            console.log('🚀 started');
            if (module.hot) {
                console.log('✅  Server-side HMR Enabled!');

                module.hot.accept('./server', () => {
                    console.log('🔁  HMR Reloading `./server`...');
                    server.removeListener('request', currentApp);
                    const newApp = require('./server').default;
                    server.on('request', newApp);
                    currentApp = newApp;
                });
            }
        });
        server.on('uncaughtException', err => console.log((err)));
    });
    setInterval(() => {
        if (process.memoryUsage().rss > (Number(process.env.MEMORY_LIMIT) || 1) * 1024 * 1024 * 1024) process.exit(1);
    }, 1000);
}

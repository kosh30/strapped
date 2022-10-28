const NextServer = require('next/dist/server/next-server').default;
const serverless = require('serverless-http');
const config = require("../../dist/packages/frontend/.next/required-server-files.json");

const nextServer = new NextServer({
    hostname: 'localhost',
    port: 3000,
    dir: __dirname||'.',
    dev: false,
    conf: config.config,
})

module.exports={
    handler:serverless(nextServer.getRequestHandler(), {
        binary: ["*/*"],
    })
}

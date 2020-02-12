/**
 * Service Main EntryPoint
 */
const express = require("express");
const app = express();
const routes = require("./router/index");

app.use(routes);

/**
 * Kickstart node server
 */
function startListening(){
    return instance = app.listen(process.env.PORT || 80, () => {
        console.warn("Listening on port %s...", server.address().port);
    })
}

const server = startListening();

module.exports = {
    app: app,
    server: server
}

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const routes = require("./router/index");

app.use(routes);

function startListening(){
    return instance = app.listen(process.env.PORT || 8081, () => {
        console.warn("Listening on port %s...", server.address().port);
    })
}

const server = startListening();

module.exports = {
    app: app,
    server: server
}

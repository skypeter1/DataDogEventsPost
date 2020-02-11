const express = require("express");
const router = express.Router();
const got = require('got');

router.post("/loggly", function (req,res) {
    url = "https://api.github.com/users/mralexgray/repos";

    got(url, { json:true }).then(response => {
        res.status(200).json("{meesage:Ok}");
    }).catch(error => {
        console.log("Throws an error " + error);
    });
})

module.exports = router
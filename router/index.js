/**
 * Service Router
 * Here we define and set our router configurations
 */

const express = require("express");
const router = express.Router();
const got = require('got');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const apiUrl = "https://api.datadoghq.com/api/v1/events";
const api_key = (process.env.hasOwnProperty("DATADOG_APIKEY")) ? process.env.DATADOG_APIKEY : "607cb962dc483d8989f499dafbe1c54d";
const application_key = (process.env.hasOwnProperty("DATADOG_APPLICATION_KEY")) ? process.env.DATADOG_APPLICATION_KEY : "185dfd7b51e745382fed7f7ba682c9ab75e7e828";

/**
 * Routes
 */
router.post("/datadog", jsonParser, function (req,res) {
    var body = req.body;
    //console.log(req.headers);
    if(body.hasOwnProperty('alert_name') && body.hasOwnProperty('search_link') ){
        var payload = rewriteData(body);
        url = getDataDogUrl();
        //console.log(payload);
        got.post(url, { json:true, body:payload }).then(response => {
            if(response.statusCode === 202){
                console.log(response.statusMessage);
                res.status(200).json(response.body);  
            }else{
                res.sendStatus(400);  
            }
        }).catch(error => {
            console.log("Throws an error " + error);
            res.sendStatus(403);
        });
    }else{
        res.sendStatus(400);
    }
})

/**
 *  Functions block
 */
function getDataDogUrl(){
    let url = apiUrl + "?api_key=" + api_key + "&application_key=" + application_key;
    return url;
}

function rewriteData(body){
    let search_link = body.search_link;
    let num_hits = (body.hasOwnProperty('num_hits')) ? body.num_hits.toString() : "No hits";
    let recent_hits = (body.hasOwnProperty('recent_hits')) ? body.recent_hits.toString() : "No recent events";
    let dataDogPostData = {
        "title": body.alert_name,
        "text": body.edit_alert_link + '\n'+ search_link + '\n' + recent_hits + '\n' + num_hits,
        "priority": "normal",
        "tags": [
            "environment:demo"
        ],
        "alert_type": "info"
    }
    return dataDogPostData;
}

module.exports = router
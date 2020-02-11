const express = require("express");
const router = express.Router();
const got = require('got');
const bodyParser = require('body-parser')

// create application/json parser
const jsonParser = bodyParser.json();

//Sample payload
const samplePayloadLoggly = {
      "alert_name" : "IndexOutOfBounds Exception",
      "edit_alert_link" : "https://sample.loggly.com/alerts/edit/8188",
      "source_group" : "N/A",
      "start_time" : "Mar 17 11:41:40",
      "end_time" : "Mar 17 11:46:40",
      "search_link" : "https://sample.loggly.com/search/?terms=&source_group=&savedsearchid=112323&from=2015-03...",
      "query" : "* ",
      "num_hits" : 225,
      "recent_hits" : [ ],
      "owner_username" : "sample",
      "owner_subdomain" : "sample",
      "owner_email" : "pm@loggly.com"
    }


router.post("/loggly", function (req,res) {
    url = "https://api.github.com/users/mralexgray/repos";

    got(url, { json:true }).then(response => {
        res.status(200).json("{meesage:Ok}");
    }).catch(error => {
        console.log("Throws an error " + error);
    });
})

router.post("/datadog", jsonParser, function (req,res) {
    var body = req.body;
    if(body.hasOwnProperty('alert_name') && body.hasOwnProperty('search_link') ){
        var payload = rewriteData(body);
        url = "https://api.datadoghq.com/api/v1/events?api_key=607cb962dc483d8989f499dafbe1c54d&application_key=185dfd7b51e745382fed7f7ba682c9ab75e7e828";
        got.post(url, { json:true, body:payload }).then(response => {
            if(response.statusCode === 202){
                console.log(response.statusMessage);
                res.status(200).json(response.body);  
            }else{
                res.sendStatus(400);  
            }
        }).catch(error => {
            console.log("Throws an error " + error);
        });
    }else{
    res.sendStatus(400);
    }
})

function rewriteData(body){
    let search_link = body.search_link;
    let num_hits = body.num_hits;
    let recent_hits = body.recent_hits;

    var dataDogPostData = {
        "title": body.alert_name,
        "text": body.edit_alert_link,
        "priority": "normal",
        "tags": [
            "environment:test"
        ],
        "alert_type": "info"
    }
    return dataDogPostData;
}

module.exports = router
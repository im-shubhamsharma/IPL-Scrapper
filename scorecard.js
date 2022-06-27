const jsdom = require("jsdom");
let fs = require("fs");
let request = require("request");

let url = "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/gujarat-titans-vs-rajasthan-royals-final-1312200/full-scorecard";

request(url,cb);

function cb(error, response, body){
    if(error){
        console.log(error);
    }else if(response && response.statusCode == 404){
        console.log("Page not found");
    }else{
        extractData(body);
    }
}

function extractData(html){
    const JSDOM = jsdom.JSDOM;
    let dom = new JSDOM(html);
    let document = dom.window.document;

    let output = document.querySelectorAll(".ds-w-full.ds-table.ds-table-xs.ds-table-fixed.ci-scorecard-table")
}
const jsdom = require("jsdom");
const fs = require("fs");
const request = require("request");

let url =
  "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423";

request(url, cb);

function cb(error, response, body) {
  if (error) {
    console.log(error);
  } else if (response && response.statusCode == 404) {
    console.log("Page not found");
  } else {
    extractData(body);
  }
}

function extractData(html){
    const JSDOM = jsdom.JSDOM;
    const dom = new JSDOM(html);
    let document = dom.window.document;

    let output = document.querySelectorAll(".ds-block.ds-text-center.ds-uppercase.ds-text-ui-typo-primary.ds-underline-offset-4")

    let link = output[0].getAttribute("href");
    
    let allMatchLinks = `https://www.espncricinfo.com${link}`;
    
    console.log(allMatchLinks);
}

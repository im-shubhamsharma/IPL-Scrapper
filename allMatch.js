const jsdom = require("jsdom");
let fs = require("fs");
let request = require("request");

let url =
  "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/match-results";

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

function extractData(html) {
  const JSDOM = jsdom.JSDOM;
  let dom = new JSDOM(html);
  let document = dom.window.document;

  let output = document.querySelectorAll(
    ".ds-flex.ds-mx-4.ds-pt-2.ds-pb-3.ds-space-x-4.ds-border-t.ds-border-line-default-translucent"
  );

  for (let i = 0; i < output.length; i++) {
    let content = output[i];
    let link = content.querySelectorAll(
      ".ds-text-ui-typo.ds-underline-offset-4"
    );
    let scoreLink = link[2].getAttribute("href");
    let fullScoreLink = `https://www.espncricinfo.com${scoreLink}`;
    console.log(fullScoreLink);
  }
}

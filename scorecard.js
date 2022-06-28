const jsdom = require("jsdom");
let fs = require("fs");
let request = require("request");

let url =
  "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/gujarat-titans-vs-rajasthan-royals-final-1312200/full-scorecard";
// function scorecardExecutor(url) {
//   request(url, cb);
// }
  request(url, cb);

function cb(error, response, body) {
  if (error) {
    console.log(error);
  } else if (response && response.statusCode == 404) {
    console.log("Page not found");
  } else {
    // extractBattingData(body);
    getVenue(body);
  }
}

function extractBattingData(html) {
  const JSDOM = jsdom.JSDOM;
  let dom = new JSDOM(html);
  let document = dom.window.document;

  //---------------------TEAM NAME----------------
  let teamName = document.querySelectorAll(".ds-text-tight-l.ds-font-bold"); // team Name

  let team1Name = teamName[0].textContent;
  let team2Name = teamName[1].textContent;

  // console.log(team1);
  // console.log(team2);

  //---------------------BATTING TABLE DATA FOR BOTH TEAMS----------------

  let battingData = document.querySelectorAll(
    ".ds-w-full.ds-table.ds-table-xs.ds-table-fixed.ci-scorecard-table"
  ); // both batting table

  let team1BattingData = "" + "<table>" + battingData[0].innerHTML + "</table>";
  let team2BattingData = "" + "<table>" + battingData[1].innerHTML + "</table>";

  // let htmlString = "" + "<table>" + battingData[0].innerHTML + "</table>" + "<table>" + battingData[1].innerHTML + "</table>" ;

  // fs.writeFileSync("firstBattingTable.html", team1BattingData);
  // console.log("file created");

  //   processTeam(team1BattingData, team1Name, team2Name);
  //   processTeam(team2BattingData, team2Name, team1Name);
}

function processTeam(team1BattingData, ownTeam, opponent) {
  const JSDOM = jsdom.JSDOM;
  let dom = new JSDOM(team1BattingData);
  let document = dom.window.document;

  let allRowsData = document.querySelectorAll(
    "tbody .ds-border-b.ds-border-line.ds-text-tight-s"
  );

  for (let i = 0; i < allRowsData.length; i++) {
    let singleRowData = allRowsData[i];
    let colData = singleRowData.querySelectorAll("td");

    if (colData[0].textContent == "Extras") {
      break;
    }
    let pName = colData[0].textContent;
    let run = colData[2].textContent;
    let balls = colData[3].textContent;
    let fours = colData[5].textContent;
    let sixes = colData[6].textContent;
    let sr = colData[7].textContent;
    console.log(
      `${pName} scored ${run} runs played ${balls} balls with ${fours} fours and ${sixes} sixes with a Strike Rate of ${sr}`
    );
  }
  console.log("--------------------------------------------------------");
}

function getVenue(html) {
  const JSDOM = jsdom.JSDOM;
  let dom = new JSDOM(html);
  let document = dom.window.document;

  let venueTable = document.querySelector(
    ".ds-w-full.ds-table.ds-table-sm.ds-table-auto"
  );

  let venueHTML = "" + "<table>" + venueTable[0].innerHTML + "</table>";

  fs.writeFileSync("venueTable")

//   let venue = venueTable[0].document.querySelector(".ds-border-b.ds-border-line");

  console.log(venue);
}

// module.exports = {
//   scorecardFn: scorecardExecutor,
// };

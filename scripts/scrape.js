// Scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function (cb) {
    axios.get("https://www.gameinformer.com").then(function (response) {

        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        var topics = [];

        // Now, we grab every class article-title and promo-summary tag, and do the following:
        $("div.article-summary").each(function (i, element) {

            var headline = $(this).children("h2").text().trim();
            var sum = $(this).children("p").text().trim();

            if (headline && sum) {
                var headNeat = headline.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataTogether = {
                    topic: headNeat,
                    summary: sumNeat
                };

                topics.push(dataTogether);
            }
        });
        cb(topics)
    });
};

module.exports = scrape;

// // Making a request via axios for `nhl.com`'s homepage
// axios.get("https://www.gameinformer.com").then(function(response) {

//   // Load the body of the HTML into cheerio
//   var $ = cheerio.load(response.data);

//   // Empty array to save our scraped data
//   var results = [];

//   // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
//   $("div.article-summary").each(function(i, element) {

//     // Save the text of the h4-tag as "title"
//     var title = $(element).children("h2").text();

//     var summary = $(element).children("p").text();

//     var link = $(element).children("h2").children("a").attr("href");

//     if (title && summary && link) {
//       var titleNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
//       var summaryNeat = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
//       var linkNeat = link.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

//       var neatTogether = {
//           title: titleNeat,
//           summary: summaryNeat,
//           link: linkNeat
//       };

//       results.push(neatTogether);
//   }

//   });
  
//   // After looping through each h4.headline-link, log the results
//   console.log(results);
// });

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
        $(".article-body").each(function (i, element) {

            var head = $(this).children(".article-title").text().trim();
            var sum = $(this).children(".promo-summary").text().trim();

            if (head && sum) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
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
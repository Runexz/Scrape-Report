var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");


var topic = require("../models/topic");

module.exports = {
    fetch: function (cb) {
        scrape(function (data) {
            var articles = data;
            for (let i = 0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }

            topic.collection.insertMany(articles, { ordered: false }, function (err, docs) {
                cb(err, docs);
            });
        });
    },
    delete: function (query, cb) {
        topic.remove(query, cb);
    },
    get: function (query, cb) {
        topic.find(query)
            .sort({
                _id: -1
            })
            .exec(function (err, doc) {
                cb(doc);
            });
    },
    update: function (query, cb) {
        topic.update({ _id: query._id }, {
            $set: query
        }, {}, cb);
    }
}
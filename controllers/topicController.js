var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");


var Topic = require("../models/topic");

module.exports = {
    fetch: function (cb) {
        scrape(function (data) {
            var articles = data;
            for (let i = 0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }

            Topic.collection.insertMany(articles, { ordered: false }, function (err, docs) {
                cb(err, docs);
            });
        });
    },
    delete: function (query, cb) {
        Topic.remove(query, cb);
    },
    get: function (query, cb) {
        Topic.find(query)
            .sort({
                _id: -1
            })
            .exec(function (err, doc) {
                cb(doc);
            });
    },
    update: function (query, cb) {
        Topic.update({ _id: query._id }, {
            $set: query
        }, {}, cb);
    }
}
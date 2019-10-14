// Bring the scrape function from scripts folder to this file
var scrape = require("../scripts/scrape");

// Bring topics and notes from controller folder
var topicController = require("../controllers/topicController");
var notesController = require("../controllers/noteController");

// Include routes in server file
module.exports = function (router) {
    // Route renders the home handlebars page
    router.get("/", function (req, res) {
        res.render("home");
    });
    // Route renders the saved handlebars page
    router.get("/saved", function (req, res) {
        res.render("saved");
    });

    router.get("/api/fetch", function (req, res) {
        topicController.fetch(function (err, docs) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No new topics today. Restart Tomorrow!"
                });
            }
            else {
                res.json({
                    message: "Added " + docs.insertedCount + " new topics!"
                });
            }
        });
    });

    router.get("/api/topics", function (req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }

        topicController.get(query, function (data) {
            res.json(data);
        });
    });

    router.delete("/api/topics/:id", function (req, res) {
        var query = {};
        query._id = req.params.id;
        topicController.delete(query, function (err, data) {
            res.json(data);
        });
    });

    router.patch("/api/topics", function (req, res) {
        topicController.update(req.body, function (err, data) {
            res.json(data);
        });
    });

    router.get("/api/notes/:topic_id?", function (req, res) {
        var query = {};
        if (req.params.topic_id) {
            query._id = req.params.topic_id;
        }

        notesController.get(query, function (err, data) {
            res.json(data);
        });
    });

    router.delete("/api/notes/:id", function (req, res) {
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function (err, data) {
            res.json(data);
        });
    });

    router.post("/api/notes", function (req, res) {
        notesController.save(req.body, function (data) {
            res.json(data);
        })
    })
}
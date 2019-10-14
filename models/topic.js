var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var topicSchema = new Schema({
    topic: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    }
});

// This creates our model from the above schema, using mongoose's model method
var Topic = mongoose.model("Topic", topicSchema);

// Export the Topic model
module.exports = Topic;
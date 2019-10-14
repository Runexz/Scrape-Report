var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var noteSchema = new Schema({
    _topicId: {
        type: Schema.Types.ObjectId,
        ref: "Topic"
    },
    date: String,
    noteText: String
});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", topicSchema);

// Export the Topic model
module.exports = Note;
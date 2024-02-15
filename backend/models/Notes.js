const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);

// Notes for Student
const notesSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    title: {
      type: String,
      required: true,
    },
    attachment: {
      type: String,
      required: true,
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "File",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notes", notesSchema);

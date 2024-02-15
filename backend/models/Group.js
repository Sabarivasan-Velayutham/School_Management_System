const mongoose = require("mongoose");

// Individual Group in a Course
const groupSchema = new mongoose.Schema({
  group: {
    type: String,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: [],
    },
  ],
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
});

module.exports = mongoose.model("Group", groupSchema);

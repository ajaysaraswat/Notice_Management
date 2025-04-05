const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for the notice"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Please provide content for the notice"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
noticeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Notice = mongoose.model("Notice", noticeSchema);
module.exports = Notice;

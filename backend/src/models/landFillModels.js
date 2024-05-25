const mongoose = require("mongoose");

const LandFillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
        type: String,
        enum: ['Point'], 
        default: 'Point'
    },
    coordinates: {
        type: [Number], 
        required: true
    }
},
  description: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

LandFillSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("LandFill", LandFillSchema);

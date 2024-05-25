const { default: mongoose } = require("mongoose");
const landFillModel = require("../models/landFillModels");

exports.getAllLandFills = async (req, res, next) => {
    try {
      const allLandFills = await landFillModel.find();
  
      if (!allLandFills || allLandFills.length === 0) {
        return res.status(404).json({ error: "No landfills found" });
      }
  
      res.status(200).json(allLandFills);
    } catch (err) {
      console.error("Error getting LandFills:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


exports.createLandFill = async (req, res, next) => {
    try {
      const { name, location, description, city } = req.body;
      if (!name || !location || !description || !city) {
        
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const newLandFill = new landFillModel({
        name,
        location,
        description,
        city,
      });
  
      const savedLandFill = await newLandFill.save();
  
      res.status(201).json(savedLandFill);
    } catch (err) {
      console.error("Error creating LandFill:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  exports.getNearbyLandFills = async (req, res, next) => {
    try {
      const { latitude, longitude } = req.query;
  
      const lat = parseFloat(latitude);
      const long = parseFloat(longitude);
  
      if (isNaN(lat) || isNaN(long)) {
        return res.status(400).json({ error: "Latitude and longitude must be provided as numbers" });
      }
      console.log([long, lat])
  
      const nearbyLandFills = await landFillModel.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [long, lat]
            },
            distanceField: "distance",
            maxDistance: 10000, 
            spherical: true
          }
        }
      ]);
  
      res.status(200).json(nearbyLandFills);
    } catch (err) {
      console.error("Error getting nearby LandFills:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
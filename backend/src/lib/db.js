const mongoose = require('mongoose')


const ConnectToMongodb = () => {
    var MONGODB_URL = process.env.DATABASE_URL;
    return mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
                console.log("Connected to :", MONGODB_URL);
        })
        .catch((err) => {
            console.error("App starting error:", err.message);
        });
}

module.exports = ConnectToMongodb;
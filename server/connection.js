const mongoose = require('mongoose');

async function connectMongoDb(url) {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection failed", err);
        process.exit(1);
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

module.exports = {
    connectMongoDb,
};

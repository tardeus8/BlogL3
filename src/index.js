const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
console.log(process.env)
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/forum")
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error(err));

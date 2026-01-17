const express = require("express");
// CORS setup
const cors = require("cors");
const app = express();

// Enable CORS for React app on port 5173
app.use(cors({
    origin: "http://localhost:5173"
}));

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo","userThree", "userFour"]});
});

// Run this development server in port 
app.listen(4000, () => {
    console.log("Server started on port 4000");
});
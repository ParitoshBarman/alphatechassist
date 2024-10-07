require('dotenv').config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Define a schema for storing contact form messages
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

// Initialize Express
const app = express();
const PORT = 8080;
const staticPath = path.join(__dirname, "public");

app.set("view engine", "ejs");

app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Create a new contact document
        const newContact = new Contact({ name, email, message });

        // Save the message to the MongoDB database
        await newContact.save();

        res.json({ message: "Message stored successfully!", error: false });
    } catch (error) {
        console.log(error);
        res.json({ message: "Error storing the message.", error: true });
    }
});

app.get("/sitemap.xml", (req, res) => {
    const sitemapPath = path.join(staticPath, "sitemap.xml");
    res.sendFile(sitemapPath);
});

app.get("/ejs", (req, res) => {
    res.render("test.ejs");
});

// Start the server
app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});

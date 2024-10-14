require('dotenv').config();
const express = require("express")
const path = require("path");
const mongoose = require("mongoose");

// MongoDB Connection
// const mongoURI = process.env.MONGO_URI;
const mongoURI = "mongodb+srv://eloanbajajfinserv:zmo6Rq1H8Xs2R5ji@alphatechcluster.funme.mongodb.net/?retryWrites=true&w=majority&appName=alphaTechCluster";

console.log(mongoURI)

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
    phone: { type: String, required: true }, // New phone field
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

// const port = 8080;
const PORT = 8080;
const staticPath = path.join(__dirname, "public")

const app = express()

app.set("view engine", "ejs");

app.use(express.static(staticPath));
app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded

app.use(express.json());


app.get("/", (req, res)=>{
    res.render("index")
})

app.post("/contact", async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Create a new contact document with the phone field
        const newContact = new Contact({ name, email, phone, message });

        // Save the message to the MongoDB database
        await newContact.save();

        res.json({ message: "Message stored successfully!", error: false });
    } catch (error) {
        console.log(error);
        res.json({ message: "Error storing the message.", error: true });
    }
});


app.get("/privacy", (req, res)=>{
    res.render("privacy")
})
app.get("/terms", (req, res)=>{
    res.render("termsandcondition")
})

app.get("/sitemap.xml", (req, res) => {
    const sitemapPath = path.join(staticPath, "sitemap.xml");
    res.sendFile(sitemapPath);
});



app.get("/ejs", (req, res)=>{
    res.render("test.ejs")
})


app.listen(PORT, ()=>{
    console.log("Server is listing port" + PORT);
})



require('dotenv').config();
const express = require("express")
const path = require("path");

// const port = 8080;
const PORT = 8080;
const staticPath = path.join(__dirname, "public")

const app = express()

app.set("view engine", "ejs");

app.use(express.static(staticPath));
app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded



app.get("/", (req, res)=>{
    res.render("index")
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



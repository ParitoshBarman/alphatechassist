require('dotenv').config();
const express = require("express")
const path = require("path");
const mongoose = require("mongoose");
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


// Setup Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });


// MongoDB Connection
// const mongoURI = process.env.MONGO_URI;
const mongoURI = "mongodb+srv://eloanbajajfinserv:zmo6Rq1H8Xs2R5ji@alphatechcluster.funme.mongodb.net/?retryWrites=true&w=majority&appName=alphaTechCluster";

// console.log(mongoURI)

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

// Define the Application Schema
const applicationSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    occupation: String,
    areacode: String,
    phone: String,
    age: String,
    dob: String,
    address: String,
    message: String,
    resume: String
});


// Schema and Model
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    mainDescription: { type: String, required: true },
    subTitle: { type: String, required: true },
    subDescription: { type: String, required: true },
    quotes: { type: String },
    quotesAuthor: { type: String },
    videoThumbnail: { type: String },
    videoTitle: { type: String },
    videoDescription: { type: String },
    videoHighlightPoints: { type: [String] },
    videoYouTubeLink: { type: String },
    quotationParagraph: { type: String },
    lastParagraph: { type: String },
    tags: { type: [String] },
    blogAuthor: { type: String, required: true },
    createdDateTime: { type: Date, default: Date.now },
    modifiedDateTime: { type: Date, default: Date.now },
    comments: [{ email: String, name: String, message: String }],
    category: { type: String, required: true },
    autoSlug: { type: String, unique: true }
});


// Update User schema to include 'role'
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'normal' } // 'superuser' or 'normal'
});


const User = mongoose.model('User', userSchema);

const Contact = mongoose.model("Contact", contactSchema);
const Application = mongoose.model('Application', applicationSchema);
const Blog = mongoose.model('Blog', blogSchema);


// const port = 8080;
const PORT = 8080;
const staticPath = path.join(__dirname, "public")

const app = express()
const SECRET_KEY = 'your_secret_key_here';


// Middleware to protect routes based on role
function authenticateRole(role) {
    return (req, res, next) => {
        const token = req.cookies.token;
        if (!token) return res.redirect('/login');

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) return res.redirect('/login');
            if (user.role !== role) return res.status(403).send('Access Denied');
            req.user = user;
            next();
        });
    };
}


app.set("view engine", "ejs");

app.use(express.static(staticPath));
app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded

app.use('/uploads', express.static('uploads'));

app.use(cookieParser());


app.get("/", (req, res) => {
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
        res.json({ message: "Error storing the message.", error: true });
    }
});


app.get("/privacy", (req, res) => {
    res.render("privacy")
})
app.get("/terms", (req, res) => {
    res.render("termsandcondition")
})
app.get("/hire", (req, res) => {
    res.render("hire")
})
app.get("/blogupload", authenticateRole("superuser"), async(req, res) => {
    res.render("blogupload")
})


app.get('/messages', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.query.limit) || 9; // Default to 9 messages per page if not specified
        const skip = (page - 1) * limit; // Calculate the number of documents to skip

        const messages = await Contact.find().skip(skip).limit(limit); // Retrieve messages with pagination
        const totalMessages = await Contact.countDocuments(); // Count all documents
        res.json({ total: totalMessages, messages });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
});

// app.get("/sitemap.xml", (req, res) => {
//     const sitemapPath = path.join(staticPath, "sitemap.xml");
//     res.sendFile(sitemapPath);
// });
app.get('/sitemap.xml', async (req, res) => {
    try {
        const blogs = await Blog.find();
        let xmlSitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
        <loc>https://alphatechassist.com/</loc>
        <lastmod>2024-10-14</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
        </url>
        <url>
        <loc>https://alphatechassist.com/#services</loc>
        <lastmod>2024-10-14</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
        </url>
        <url>
        <loc>https://alphatechassist.com/#about</loc>
        <lastmod>2024-10-14</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
        </url>
        <url>
        <loc>https://alphatechassist.com/#contact</loc>
        <lastmod>2024-10-14</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
        </url>
        <url>
        <loc>https://alphatechassist.com/#portfolio</loc>
        <lastmod>2024-10-14</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
        </url>
        <url>
        <loc>https://alphatechassist.com/privacy</loc>
        <lastmod>2024-10-14</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.5</priority>
        </url>
        <url>
        <loc>https://alphatechassist.com/terms</loc>
        <lastmod>2024-10-14</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.5</priority>
        </url>
        <url>
        <loc>https://alphatechassist.com/hire</loc>
        <lastmod>2024-10-14</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.5</priority>
        </url>`;

        blogs.forEach(blog => {
            xmlSitemap += `
                <url>
                    <loc>https://alphatechassist.com/blog/${blog.autoSlug}</loc>
                    <lastmod>${new Date(blog.modifiedDateTime).toISOString()}</lastmod>
                    <changefreq>weekly</changefreq>
                    <priority>0.8</priority>
                </url>`;
        });

        xmlSitemap += `</urlset>`;

        // Save or send the sitemap
        res.header('Content-Type', 'application/xml');

        // res.status(200).json({blogs})
        res.send(xmlSitemap);
    } catch (error) {
        res.status(500).json({ message: 'Error generating sitemap', error });
    }
});


// Endpoint to receive form submissions
app.post('/apply', upload.single('upload'), async (req, res) => {




    // const { name, email, phone, position, resume, message } = req.body;
    const resumePath = req.file.path;

    const { firstname, lastname, email, occupation, areacode, phone, age, dob, address, message } = req.body;


    try {
        const application = new Application({ firstname, lastname, email, occupation, areacode, phone, age, dob, address, message, resume: resumePath });
        await application.save();
        res.status(200).send('Application submitted successfully');
    } catch (error) {
        res.status(500).send('Failed to submit application');
    }

    // res.status(200).send('Application submitted successfully');
});


// Routes
app.post('/blog', authenticateRole("superuser"), upload.single('image'), async (req, res) => {
    try {
        const blogData = req.body;
        blogData.image = req.file.path;

        if (blogData.videoHighlightPoints) {
            blogData.videoHighlightPoints = blogData.videoHighlightPoints.split(",").map(itm => itm.trim());
        }
        if (blogData.tags) {
            blogData.tags = blogData.tags.split(",").map(itm => itm.trim());
        }
        if (blogData.videoYouTubeLink) {
            blogData.videoYouTubeLink = blogData.videoYouTubeLink.replace("https://youtu.be/", "");
        }

        // Generate the base slug
        let baseSlug = blogData.title.toLowerCase().replace(/\s+/g, '-').slice(0, 100);
        baseSlug = baseSlug.replace("/", "-");
        let uniqueSlug = baseSlug;
        let counter = 1;

        // Check for uniqueness and append a counter if necessary
        while (await Blog.findOne({ autoSlug: uniqueSlug })) {
            uniqueSlug = `${baseSlug}-${counter}`;
            counter++;
        }

        blogData.autoSlug = uniqueSlug; // Assign the unique slug

        const blog = new Blog(blogData);
        await blog.save();
        res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog', error });
    }
});

app.get('/blogs', async (req, res) => {
    try {
        // Get pagination and filtering parameters from the query string
        const { page = 1, limit = 10, category } = req.query;
        const query = {};

        // Apply category filter if provided
        if (category) {
            query.category = category;
        }

        // Fetch blogs with pagination and filtering
        const blogs = await Blog.find(query)
            .skip((page - 1) * limit) // Skip based on the current page
            .limit(parseInt(limit));  // Limit the number of results

        // Get total count of blogs matching the filter (for pagination info)
        const totalBlogs = await Blog.countDocuments(query);

        // res.status(200).json({
        //     totalBlogs,
        //     currentPage: parseInt(page),
        //     totalPages: Math.ceil(totalBlogs / limit),
        //     blogs
        // });
        res.render("blogList", {
            blogs,
            totalBlogs,
            currentPage: page,
            totalPages: Math.ceil(totalBlogs / limit)
        })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs', error });
    }
});



// Route to fetch blog by slug
app.get('/blog/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await Blog.findOne({ autoSlug: slug });

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // res.status(200).json(blog);
        const latestBlogs = await Blog.find().sort({ createdDateTime: -1 }).limit(3);

        const currentBlog = await Blog.findOne({ autoSlug: slug });

        if (!currentBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        const previousBlog = await Blog.findOne({
            createdDateTime: { $lt: blog.createdDateTime } // Using 'createdDateTime' here
        }).sort({ createdDateTime: -1 });
        // console.log(previousBlog)

        res.render("blog-details", { blog, latestBlogs, previousBlog })
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving blog', error });
    }
});








app.get("/ejs", (req, res) => {
    res.render("test.ejs")
})




// Registration Page
app.get('/register', (req, res) => res.render('register'));

// Register User
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        res.send('Error registering user');
    }
});

// Login Page
app.get('/login', (req, res) => res.render('login'));



// Authenticate User
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        const hashedPassword = await bcrypt.hash(password, 10);


        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            return res.redirect('/dashboard');
        } else {
            return res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send('Internal server error');
    }
});


// Logout
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

// Register User (with role)
app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        res.send('Error registering user');
    }
});

// Superuser-only dashboard
app.get('/superuser-dashboard', authenticateRole('superuser'), (req, res) => {
    res.render('superuser-dashboard', { username: req.user.username });
});

// Normal user dashboard
app.get('/dashboard', authenticateRole('superuser'), async(req, res) => {
    // const blog = await Blog.findOne({ autoSlug: slug });
    // const username = "pari";
    const user = await User.findOne({ username:req.user.username });
    res.render('dashboard', { user: user, username: req.user.username });
});


app.listen(PORT, () => {
    console.log("Server is listing port" + PORT);
})



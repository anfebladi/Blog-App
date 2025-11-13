const express = require('express');
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const jwtRoutes = require("./routes/jwtRoutes")
const cookieParser = require('cookie-parser')

const Blog = require("./models/blog")
const  { authentication  } = require("./authentication/authentication.js")

const port = process.env.PORT || 3000;

// set view engine 
app.set("view engine", "ejs"); 


app.use(cookieParser()) 
app.use(express.static('static')); ///css
app.use(express.json());   // from json to js
app.use(express.urlencoded());

// connect to database
const uri = process.env.PERSONAL_URI

mongoose.connect(uri)  
    .then( () => app.listen(port ))
    .catch((err)=> console.log(err))





//Home page



app.get('/', (req,res)=> {
    res.render('home', {title: "blog app"})
})


//create blogs page
app.get("/blogs/new-blog", authentication, (req,res)=> {
    res.render("new-blog", { title: "Create a new blog"})
})







// all blogs
app.get("/blogs", authentication, (req,res)=> {
    Blog.find()
        .then((result)=> {
            res.render("blogs", {title: "All Blogs", blogs: result})
        })
        .catch((err)=> {
            console.log(err)
        })
})



//details page
app.get("/blogs/:id", (req,res)=>{
    const id = req.params.id.trim()
    Blog.findById(id)
        .then(result=>{
            res.render('details', {blog: result, title: "blog details"})
        })
        .catch(err=> {
            console.log(err)
        })
})


//delete blogs 
app.delete("/blogs/:id", (req,res)=> {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: "/blogs"})
        })
        .catch((err)=> {
            console.log(err)
        })
})

// create blogs 
app.post('/blogs',(req,res)=> {
    const blog = new Blog(req.body)
    blog.save()
        .then((result)=> {
            res.redirect("./blogs")
        })
        .catch((err)=> {
            console.log(err)
        })
})

//authentication routes 
app.use(jwtRoutes);


//cookies




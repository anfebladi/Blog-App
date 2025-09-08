const express = require('express');
const app = express();
require("dotenv").config();
const uri = process.env.personal_uri

const mongoose = require("mongoose");
const Blog = require("./models/blog")

const PORT = process.env.PORT || 3000;

mongoose.connect(uri)  
    .then( () => app.listen(PORT))
    .catch((err)=> console.log(err))

app.set("view engine", "ejs");
app.use(express.static('static'));
app.use(express.urlencoded())


//Home page
app.get("/",(req,res)=> {
    res.render("Home", {title: "Home"})
})



//create blogs page
app.get("/blogs/new-blog", (req,res)=> {
    res.render("new-blog", { title: "Create a new blog"})
})







// all blogs
app.get("/blogs", (req,res)=> {
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




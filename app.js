const express = require('express');
const app = express();
const post = require("./api/models/post");
const postdata = new post();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(200).send("hello");
})

app.get("/api/posts", (req, res) => {
    res.status(200).send(postdata.get());
})

app.get("/api/posts/:post_id",(req,res)=> {
    const postid = req.params.post_id;
    const foundpost = postdata.getinduvidualblogpost(postid);
    if(foundpost){
        res.status(200).send(foundpost)
    }else {
        res.status(404).send('not found');
    }
})

app.listen(port, () => console.log("server started at port 3000"));
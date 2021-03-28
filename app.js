const express = require('express');
const app = express();
const post = require("./api/models/post");
const multer = require("multer");
var upload = multer({dest : 'uploads/'});
const postdata = new post();

const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
  })

  const getExt = (mimeType) => {
      switch(mimeType){
          case "image/png":
              return ".png";
          case "image/jpeg":
                return ".jpeg";
      }
  }

var upload = multer({storage: storage});


app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use('/uploads',express.static("uploads"));
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

app.post("/api/posts",upload.single('post-image'),(req,res)=> {
    const newpost = {
        "id":`${Date.now()}`,
        "title":req.body.title,
        "content":req.body.content,
        "post_image":`uploads/${req.file.filename}`,
        "added_date":`${Date.now()}`,
    }
    postdata.add(newpost);
    res.status(201).send(newpost);
})

app.listen(port, () => console.log("server started at port 3000"));
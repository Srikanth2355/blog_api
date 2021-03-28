const path = "./data.json";
const fs = require("fs");


class Post {
    get(){
        return this.readdata();
    }

    getinduvidualblogpost(postid){
        const posts = this.readdata();
        const foundpost = posts.find((post)=> post.id == postid);
        return foundpost
    }

    add(newpost){
        const currentposts = this.readdata();
        currentposts.unshift(newpost);
        this.storedata(currentposts);
    }

    readdata(){
        let rawdata = fs.readFileSync(path);
        let posts = JSON.parse(rawdata);
        return posts;
    }
    
    storedata(rawdata){
        let data = JSON.stringify(rawdata);
        fs.writeFileSync(path,data);
    }
}

module.exports = Post;
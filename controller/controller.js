const express = require("express");
const router = express.Router();
const path = require("path");
const request = require("request");
const cheerio = require("cheerio");

const Comment = require("../models/Comment");
const Article = require("../models/Article");

router.get("/", (req, res) => {
    res.redirect("/articles");
});

router.get("scrape", (req, res) => {
    request("https://www.theverge.com/", (err, response, html) =>{
        const $ = cheerio.load(html);
        const titleArray = [];

        $(".c-entry-box--compact_title").each( (i, Element) =>{
            let result = ("");

            result.title = $(this)
            .children("a")
            .text();
            result.link = $(this)
            .children("a")
            .attr("href")

            if(result.title !== "" && result.link !==""){
                if(titleArray.indexOf(result.title) == -1){
                    titleArray.push(result.title);

                    Article.count({title: result.title}, (err, test) => {
                        if(test === 0){
                            const entry = new Article(result);

                            entry.save(function(err, doc){
                                if(err){
                                    console.log(err)
                                }else{
                                    console.log(doc)
                                }
                            })

                        }
                    })
                }else{
                    console.log("Article does exist")
                }
            }else{
                console.log("Not saved to the data base, missing data");
            }
        });
        // res.redirect("url: string")
        res.redirect("/");
    });
});

router.get("/articles", (req, res) =>{
    Article.find().sort({_id: -1}).exec( (err, doc) => {
        if(err){
            console.log(err);
        }else{
            let artcl = {article: doc};
            res.render("index", artcl);
        }
    });
});

router.get("/articles.json", (req, res) => {
    Article.find({}, function(err, doc){
        if(err){
            console.log(err);
        }else {
            res.json(doc);
        }
    });
});

router.get("/clearAll", (req, res) => {
    Article.remove({}, (err, doc) => {
        if(err) {
            console.log(err);
        }else {
            console.log("remove all Articles")
        }
    });
    res.redirect("/articles.json");
});

router.get("/readArticle/:id", (req, res) => {
    let articleId =req.params.id;
    let hbsObj = {
        article: [],
        body: []
    }
})

Article.findOne({_id: articleId})
.populate("comment")
.exec(function(err, res){
    if(err) {
        console.log("error: " + err);
    }else{
        hbsObj.article = doc;
        let link = doc.link;
        request(link, (err, response, html) => {
            var $ = cheerio.load(html);

            $(".1-col_main").each(function(i, element) {
                
            })
        })
    }
})


module.exports = router;

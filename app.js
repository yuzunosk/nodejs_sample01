const http = require('http');
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");

const index_page = fs.readFileSync("./public_html/hello.ejs", "UTF-8");
const other_page = fs.readFileSync("./public_html/other.ejs", "UTF-8");
const style_css = fs.readFileSync("./style.css", "UTF-8");

var server = http.createServer(getFormClient);

server.listen(3000);
console.log("server Start");


//ここまでメインプログラム

function getFormClient(req, res) {
    var url_parts = url.parse(req.url , true);
    switch (url_parts.pathname) {
        case "/":
            var message = "Indexページ",
                query = url_parts.query;
            
            if (query.msg != undefined) {
                message += "あなたは、「" + query.msg + "」と送りました。";
            }
            var content = ejs.render(index_page, {
                title: " Indexページ",
                content: message,
        
            });
                    res.writeHead("200", { 'Content-Type': "text/html" });
                    res.write(content);
                    res.end();
            
            break;
        case "/style.css":
            res.writeHead("200", { "Content-Type": "text/css"});
            res.write(style_css);
            res.end();
            break;
        
        case "/other":
            var content = ejs.render(other_page, {
                title: " Otherページ",
                content: "練習済み",
        
            });
                    res.writeHead("200", { 'Content-Type': "text/html" });
                    res.write(content);
                    res.end();
            
            break;
        default:
            res.writeHead("200", { "Content-Type": "text/plain" });
            res.end('no page...');
            break;
    }
        }
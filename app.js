const http = require('http');
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");
const qs = require("querystring");
var data = {
    "Taro": "09-000-000",
    "Toki": "09-111-111",
    "Aoki": "09-222-222",
    "Sora": "09-333-333",
};


const index_page = fs.readFileSync("./public_html/hello.ejs", "UTF-8");
const other_page = fs.readFileSync("./public_html/other.ejs", "UTF-8");
const style_css = fs.readFileSync("./style.css", "UTF-8");

var server = http.createServer(getFormClient);

server.listen(3000);
console.log("server Start");


//ここまでメインプログラム
// createServerの処理
function getFormClient(req, res) {
    // 引数にtrueを渡す事でパースを分解
    var url_parts = url.parse(req.url , true);
    switch (url_parts.pathname) {
        case "/":
            res_index(req, res);
            break;
        
        case "/style.css":
            res.writeHead("200", { "Content-Type": "text/css"});
            res.write(style_css);
            res.end();
            break;
        
        case "/other":
            res_other(req, res);
            break;
        default:
            res.writeHead("200", { "Content-Type": "text/plain" });
            res.end('no page...');
            break;
    }
}
        

//indexの処理

//res_index
function res_index(req, res) {
    var msg = "Indexページ";

    var content = ejs.render(index_page, {
    title: " Indexページ",
        content: msg,
        data: data,
});
        res.writeHead("200", { 'Content-Type': "text/html" });
        res.write(content);
        res.end();
}
  

//otherの処理

//res_other
function res_other(req, res) {
    var msg = "Otherページ";

    //POSTアクセス時
    if (req.method == "POST") {
        var body = "";

        //データ受診時のイベント処理
        req.on("data", (data) => {
            body += data;
        });

        //データ受信終了のイベント処理
        req.on("end", () => {
            var post_data = qs.parse(body); //データのパース
            msg += "あなたは、「" + post_data.msg + "」と書きました。";
            var content = ejs.render(other_page, {
                title: " Otherページ",
                content: msg,
            });
            res.writeHead("200", { 'Content-Type': "text/html" });
            res.write(content);
            res.end();
        });

        //GETアクセス時の処理
    } else {
        var msg = "No ページ";
        var content = ejs.render(other_page, {
            title: " Other",
            content: msg,
        });
        res.writeHead("200", { 'Content-Type': "text/html" });
        res.write(content);
        res.end();
    }
}
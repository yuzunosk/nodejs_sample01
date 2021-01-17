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

var data2 = {
    "Taro": ["taro@yamada" , "09-000-000" , "TOKYO"],
    "Toki": ["toki@yokohama" , "09-111-111" , "YOKOHAMA"],
    "Aoki": ["aoki@kouchi" , "09-222-222" , "KOCHI"],
    "Sora": ["sora@sora" , "09-333-333" , "Sora"],
};

var data3 = { msg: "no  message..." };


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

    //POSTアクセス時の処理
    if (req.method == "POST") {
        var body = "";

        //データ受信時の処理
        req.on("data", (data) => {
            body += data;
        });

        //データ受信終了時の処理
        req.on("end", () => {
            data = qs.parse(body); //データのパース
            // クッキーの保存
            setCookie("msg", data.msg, res);
            write_index(req, res);
        });
    } else {
        write_index(req, res);
    }
}

// indexの表示の作成
function write_index(req, res) {
    var msg = "伝言を表示します";
    var cookie_data = getCookie("msg", req);
    var content = ejs.render(index_page, {
        title: " Indexページ",
        content: msg,
        data: data,
        filename: "./public_html/data_item",
        cookie_data: cookie_data,
    });
        res.writeHead("200", { 'Content-Type': "text/html" });
        res.write(content);
        res.end();
}

//クッキーの値を設定
function setCookie(key, value, response) {
    var cookie = escape(value);
    response.setHeader("Set-Cookie", [key + "=" + cookie]);
}
  
//クッキーの値を朱徳
function getCookie(key, request) {
    var cookie_data = request.headers.cookie != undefined ? request.headers.cookie : "";
    console.log(cookie_data);
    var data = cookie_data.split(";");
    console.log(data);

    for (var i in data) {
    if (data[i].trim().startsWith(key + "=")) {
        var result = data[i].trim().substring(key.length + 1);
        return unescape(result);
    }
  }
return '';
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
                data: data2,
                filename: "./public_html/data_item.ejs",
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
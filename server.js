//httpモジュールの読み込み
var http = require("http"),
    //ファイルシステムの読み込み
    fs = require("fs"),
    //ejsの読み込み
    ejs = require("ejs"),
    //フォームから読み込む為に必要なモジュール
    qs = require("querystring");

//自身で作成したファイルはディレクトリの場所を指定する
var settings = require("./settings.js");
console.log(settings);
var template = fs.readFileSync(__dirname + "/public_html/bbs.ejs", "utf-8");

//投稿を保持していく配列が必要なので宣言しておく
var post = [];

//createServer()でサーバーを作成
var server = http.createServer();

//.on イベントの設定
//リクエストとレスポンスの設定
server.on("request", function (req, res) {
    if (req.method === "POST") {

    } else {

    }


    console.log(req.url);
    n++;
    var data = ejs.render(template, {
        title: "hello",
        content: "<strong>hello!!</strong>",
        n: n
    });
        res.writeHead(200, { "Content-Type": " text/html" });
        //返す文章
        res.write(data);
        //動作を終了
        res.end();
    });

server.listen(settings.port, settings.host);
console.log("server listening....");
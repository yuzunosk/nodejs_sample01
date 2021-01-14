var canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

const img = document.getElementById('img');
console.log(img);

var x = 0, //初期位置
 y = 0, //初期位置
 num = 20, //図形の大きさ
 dx = 2, //移動速度
 dy = 2;

function mycallBack() {
    console.log("描画開始");
    ctx.beginPath();
    ctx.fillStyle = randomColorCode();
    ctx.arc(x, y, 50, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mycallBack();
    x += dx;
    y += dy;
    console.log("実行しました。");
}

//クリックイベント
canvas.addEventListener("click", () => {
    console.log("this is click");
    intervalColor();
});

img.addEventListener('click', () => {
    img.src = "./img/8.jpeg"
});


//ランダムカラー
function randomColorCode() {
var randomColor = "#";
for (i = 0; i < 6; i++){
randomColor += genereterHex()
}

function genereterHex() {
return Math.floor(16*Math.random()).toString(16)
}

return randomColor

}

//ループ処理
var intervalColor = 
function() {
setInterval( draw ,100)
}

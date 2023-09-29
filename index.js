console.log("Hello, javaScript!")

var canvas = document.getElementById("myCanvas"); // Canvas要素を取得
var dataURL = canvas.toDataURL(); // Canvasの内容を画像データURLに変換

var image = new Image();
image.src = dataURL;
document.body.appendChild(image); // 画像を表示

var link = document.createElement('a');
link.href = dataURL;
link.download = 'canvas_image.png'; // 画像のダウンロード時のファイル名
link.click(); // ダウンロードリンクをクリック
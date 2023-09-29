console.log("Hello, javaScript!")

document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("myCanvas");
    if (canvas) {
        var dataURL = canvas.toDataURL();
        // ここで dataURL を使った処理を行う
        var dataURL = canvas.toDataURL(); // Canvasの内容を画像データURLに変換

        var image = new Image();
        image.src = dataURL;
        document.body.appendChild(image); // 画像を表示

        var link = document.createElement('a');
        link.href = dataURL;
        link.download = 'canvas_image.png'; // 画像のダウンロード時のファイル名
        link.click(); // ダウンロードリンクをクリック
    }
});

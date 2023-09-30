console.log("Hello, javaScript!")

// Canvas上でクリックされた座標を格納する変数
let clickX = 0;
let clickY = 0;

let magnification_rate = 16

let colors = ["000000", "FFFFFF", "FF0000", "00FF00", "0000FF", "FFFF00", "FF00FF", "00FFFF"]

document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var palette = document.getElementById("palette");
    var palette_context = palette.getContext("2d");
    if (canvas) {

        // 背景色を設定
        context.fillStyle = "lightgray"; // 背景色を設定
        context.fillRect(0, 0, canvas.width, canvas.height); // Canvas全体に描画

        var dataURL = canvas.toDataURL(); // Canvasの内容を画像データURLに変換

        var image = new Image();
        image.src = dataURL;
        image.id = "imageDownload";
        document.body.appendChild(image); // 画像を表示
        document.querySelector('#imageDownload').style.display = 'none';

        var link = document.createElement('a');
        link.href = dataURL;
        link.download = 'canvas_image.png'; // 画像のダウンロード時のファイル名
        link.textContent = "画像をダウンロード"
        document.body.appendChild(link); // 画像を表示
        // link.click(); // ダウンロードリンクをクリック

        // マウスボタンが押されたときのフラグ
        let isMouseDown = false;

        // マウスボタンが押されたときのイベントリスナーを追加
        document.addEventListener("mousedown", function(event) {
        if (event.button === 0) {
            // 左ボタンが押された場合
            isMouseDown = true;
            // currentColor = getRandomColor();
        }
        });

        // マウスボタンが離されたときのイベントリスナーを追加
        document.addEventListener("mouseup", function(event) {
        if (event.button === 0) {
            // 左ボタンが離された場合
            isMouseDown = false;
        }
        });

        // マウスが移動したときのイベントリスナー
        document.addEventListener("mousemove", function(event) {
            mouseX = event.clientX;
            mouseY = event.clientY;
        
            // マウスボタンが押されているかどうかを確認
            if (isMouseDown) {
            // マウスボタンが押されている場合の処理
            // console.log("マウスボタンが押されています。");
            // クリックされたイベントから座標を取得
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // 座標を変数に格納
            clickX = Math.floor(x);
            clickY = Math.floor(y);

            // 座標を表示（例: コンソールに表示）
            // console.log(`クリックされた座標: x=${Math.floor(x)}, y=${Math.floor(y)}`);
            changeColor()
            }
        });

        canvas.addEventListener('mousedown', function(event) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            clickX = Math.floor(x);
            clickY = Math.floor(y);

            changeColor()
        });

        palette.addEventListener('mousedown', function(event) {
            const rect = palette.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            clickX = Math.floor(x);
            clickY = Math.floor(y);
            const color = Math.floor(clickX/16) + Math.floor(clickY/16)*16
            currentColor = "#"+colors[color]

        });

        function changeColor() {
            // // ランダムな色を生成
            // currentColor = getRandomColor();
            
            // 色を変更して再描画
            context.fillStyle = currentColor;
            context.fillRect(clickX-clickX%magnification_rate, clickY-clickY%magnification_rate, magnification_rate, magnification_rate);

            // 新しいCanvasを作成し、大きさを元のCanvasの1/8に設定
            const newCanvas = document.createElement('canvas');
            const newCtx = newCanvas.getContext('2d');
            newCanvas.width = canvas.width / magnification_rate;
            newCanvas.height = canvas.height / magnification_rate;

            // 新しいCanvasに元のCanvasの内容を縮小描画
            newCtx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);

            dataURL = newCanvas.toDataURL(); // Canvasの内容を画像データURLに変換
            link.href = dataURL;
        }

        function paletteColor(x, y, color) {
            // // ランダムな色を生成
            // currentColor = getRandomColor();
            
            // 色を変更して再描画
            palette_context.fillStyle = color;
            palette_context.fillRect(x, y, 16, 16);

        }
        
        for (let i = 0; i < colors.length; i++) {
            paletteColor(i*16, 0, "#"+colors[i]);
        }

        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        let currentColor = getRandomColor();
    }
});

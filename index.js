console.log("Hello, javaScript!")

// Canvas上でクリックされた座標を格納する変数
let clickX = 0;
let clickY = 0;

document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
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

            currentColor = getRandomColor();
            changeColor()
          });

        function changeColor() {
            // // ランダムな色を生成
            // currentColor = getRandomColor();
            
            // 色を変更して再描画
            context.fillStyle = currentColor;
            context.fillRect(clickX-clickX%8, clickY-clickY%8, 8, 8);

            // 新しいCanvasを作成し、大きさを元のCanvasの1/8に設定
            const newCanvas = document.createElement('canvas');
            const newCtx = newCanvas.getContext('2d');
            newCanvas.width = canvas.width / 8;
            newCanvas.height = canvas.height / 8;

            // 新しいCanvasに元のCanvasの内容を縮小描画
            newCtx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);

            dataURL = newCanvas.toDataURL(); // Canvasの内容を画像データURLに変換
            link.href = dataURL;
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

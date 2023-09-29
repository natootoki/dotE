console.log("Hello, javaScript!")

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

        // Canvas要素にクリックイベントリスナーを追加
        canvas.addEventListener('click', changeColor);

        function changeColor() {
            // ランダムな色を生成
            currentColor = getRandomColor();
            
            // 色を変更して再描画
            context.fillStyle = currentColor;
            context.fillRect(0, 0, canvas.width, canvas.height);

            dataURL = canvas.toDataURL(); // Canvasの内容を画像データURLに変換
            // image.src = dataURL;
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
    }
});

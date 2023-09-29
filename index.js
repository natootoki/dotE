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

            for(var i=0;i<32;i++){
                for(var j=0;j<32;j++){
                    // ランダムな色を生成
                    currentColor = getRandomColor();
                    
                    // 色を変更して再描画
                    context.fillStyle = currentColor;
                    context.fillRect(i*8, j*8, (i+1)*8, (j+1)*8);

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
            }
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

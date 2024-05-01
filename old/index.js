console.log("Hello, javaScript!")

// Canvas上でクリックされた座標を格納する変数
let clickX = 0;
let clickY = 0;

let magnification_rate = 16

let color_num = ["00", "33", "66", "99", "CC", "FF"]

let colors = []

let palette_w = 36
let palette_h = 6

let backgroundColor = "#FFFFFF";

let grid = true;

let currentColor = "#000000";

let picture = []
let data = []

for (let i = 0; i < 32; i++) {
    const hoge = []
    for (let j = 0; j < 32; j++) {
        hoge.push(-1)
    }
    picture.push(hoge)
    data.push(hoge)
}

function picture_to_data(col) {
    // 入力は#FFFFFFなどを想定
    if(col==-1){
        return -1
    }else{
        var dat = 0
        var col_array = []
        for (let i = 1; i < col.length; i += 2) {
            col_array.push(col.slice(i, i + 2));
        }
        for(var i=0;i<col_array.length;i++){
            dat+=(color_num.indexOf(col_array[i]))*6**(2-i)
        }
        return dat
    }
}
console.log(picture_to_data("#000000"))

// 1. 二次元配列を文字列に変換する関数
function arrayToCSV(arr) {
    const rows = arr.map(row => row.join(',')); // 各行をカンマで結合
    return rows.join('\n'); // 改行で各行を結合
}

console.log(picture)

for (let i = 0; i < color_num.length**3; i++) {
    colors.push(color_num[Math.floor(i/6/6%6)]+color_num[Math.floor(i/6%6)]+color_num[i%6])
}

document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var palette = document.getElementById("palette");
    var palette_context = palette.getContext("2d");
    if (canvas) {

        // 背景色を設定
        context.fillStyle = backgroundColor // 背景色を設定
        // 背景を透明にする
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillRect(0, 0, canvas.width, canvas.height); // Canvas全体に描画

        // グリッド
        for(var i=1;i<32;i++){
            // 縦線
            context.beginPath();
            context.moveTo(i*16, 0); // x座標: 50, y座標: 50
            context.lineTo(i*16, 512); // x座標: 200, y座標: 100
            context.strokeStyle = 'black'; // 線の色
            context.lineWidth = 2; // 線の太さ
            if (i!=16){
                context.lineWidth = 1; // 線の太さ
            }
            context.stroke();
            context.closePath();

            // 縦線
            context.beginPath();
            context.moveTo(0, i*16); // x座標: 50, y座標: 50
            context.lineTo(512, i*16); // x座標: 200, y座標: 100
            context.strokeStyle = 'black'; // 線の色
            context.lineWidth = 2; // 線の太さ
            if (i!=16){
                context.lineWidth = 1; // 線の太さ
            }
            context.stroke();
            context.closePath();
        }

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

        // テキストファイルに保存する文字列
        const textData = arrayToCSV(picture);

        // データをBlobに変換
        const blob = new Blob([textData], { type: "text/plain" });

        // ダウンロード用のリンクを作成
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sample.txt"; // ファイル名を指定
        a.textContent = "データをダウンロード"
        document.body.appendChild(a);

        function drawing(){
            var canvas = document.getElementById("myCanvas");
            var context = canvas.getContext("2d");
        
            // 背景色を設定
            context.fillStyle = backgroundColor // 背景色を設定
            // 背景を透明にする
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillRect(0, 0, canvas.width, canvas.height); // Canvas全体に描画
        
            for(var i=0;i<picture.length;i++){
                for(var j=0;j<picture[i].length;j++){
        
                    if(picture[j][i]!=-1){
                        // 色を変更して再描画
                    context.fillStyle = picture[j][i];
                    context.fillRect(i*magnification_rate, j*magnification_rate, magnification_rate, magnification_rate);
                    }
                }
            }
        
            if(grid){
                for(var i=1;i<32;i++){
                    // 縦線
                    context.beginPath();
                    context.moveTo(i*16, 0); // x座標: 50, y座標: 50
                    context.lineTo(i*16, 512); // x座標: 200, y座標: 100
                    context.strokeStyle = 'black'; // 線の色
                    context.lineWidth = 2; // 線の太さ
                    if (i!=16){
                        context.lineWidth = 1; // 線の太さ
                    }
                    context.stroke();
                    context.closePath();
        
                    // 縦線
                    context.beginPath();
                    context.moveTo(0, i*16); // x座標: 50, y座標: 50
                    context.lineTo(512, i*16); // x座標: 200, y座標: 100
                    context.strokeStyle = 'black'; // 線の色
                    context.lineWidth = 2; // 線の太さ
                    if (i!=16){
                        context.lineWidth = 1; // 線の太さ
                    }
                    context.stroke();
                    context.closePath();
                }
            }

            posting()
        }

        function gridChange(){
            grid = !grid
            console.log(grid)
            drawing()
        }

        // ボタン要素を取得
        const button = document.getElementById('gridButton');

        // イベントリスナーを設定
        button.addEventListener('click', gridChange);

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
                drawing()
            }
        });

        canvas.addEventListener('mousedown', function(event) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            clickX = Math.floor(x);
            clickY = Math.floor(y);

            changeColor()
            drawing()
            posting()
        });

        palette.addEventListener('mousedown', function(event) {
            const rect = palette.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            clickX = Math.floor(x);
            clickY = Math.floor(y);
            const color = Math.floor(clickX/magnification_rate) + Math.floor(clickY/magnification_rate)*palette_w
            currentColor = "#"+colors[color]

            // Canvasをクリア
            palette_context.clearRect(0, 0, palette_w*magnification_rate, palette_h*magnification_rate);

            // ここに待機後に実行したいコードを記述
            for (var i = 0; i < color_num.length**3; i++) {
                paletteColor(i%palette_w*magnification_rate, Math.floor(i/palette_w)*magnification_rate, "#"+colors[i]);
            }

            // ここに待機後に実行したいコードを記述
            console.log("aiu")

            // 色を変更して再描画
            palette = document.getElementById("palette");
            palette_context = palette.getContext("2d");
            palette_context.strokeStyle = 'black'; // 枠線の色を設定
            palette_context.lineWidth = 1; // 枠線の太さを設定
            palette_context.rect(clickX-clickX%magnification_rate, clickY-clickY%magnification_rate, magnification_rate, magnification_rate);
            palette_context.stroke(); // 枠線を描画

        });

        function changeColor() {
            if(Math.floor(clickX/magnification_rate)<32 && Math.floor(clickY/magnification_rate)<32){
                if(Math.floor(clickX/magnification_rate)>=0 && Math.floor(clickY/magnification_rate)>=0){
                    // 色を変更して再描画
                    context.fillStyle = currentColor;
                    context.fillRect(clickX-clickX%magnification_rate, clickY-clickY%magnification_rate, magnification_rate, magnification_rate);
                    picture[Math.floor(clickY/magnification_rate)][Math.floor(clickX/magnification_rate)] = currentColor
                    console.log(picture)

                    posting()
                }
            }
        }

        function posting(){
            var canvas = document.getElementById("myCanvas");
            var context = canvas.getContext("2d");
            // 新しいCanvasを作成し、大きさを元のCanvasの1/8に設定
            const newCanvas = document.createElement('canvas');
            const newCtx = newCanvas.getContext('2d');
            newCanvas.width = canvas.width // magnification_rate;
            newCanvas.height = canvas.height // magnification_rate;
        
            // 新しいCanvasに元のCanvasの内容を縮小描画
            newCtx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
        
            dataURL = newCanvas.toDataURL(); // Canvasの内容を画像データURLに変換
            link.href = dataURL;

            // テキストファイルに保存する文字列
            const textData = arrayToCSV(picture);

            // データをBlobに変換
            const blob = new Blob([textData], { type: "text/plain" });

            // ダウンロード用のリンクを作成
            const url = window.URL.createObjectURL(blob);
            a.href = url;
        }

        function paletteColor(x, y, color) {
            palette = document.getElementById("palette");
            palette_context = palette.getContext("2d");
                    
            // 色を変更して再描画
            palette_context.fillStyle = color;
            palette_context.fillRect(x, y, magnification_rate, magnification_rate);
            palette_context.stroke()
        }
        
        for (let i = 0; i < color_num.length**3; i++) {
            // palette_context.clearRect(0, 0, palette_w*magnification_rate, palette_h*magnification_rate);
            paletteColor(i%palette_w*magnification_rate, Math.floor(i/palette_w)*magnification_rate, "#"+colors[i]);
        }

        document.getElementById('fileInput').addEventListener('change', function(event) {
            const file = event.target.files[0];
        
            if (file) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    const contents = e.target.result;
                    const lines = contents.split('\n'); // 改行で分割
        
                    picture = lines.map(line => line.split(',')); // カンマで分割

                    changeColor()
                    drawing()
                    posting()
                };
        
                reader.readAsText(file);
            }
        });
    }
});

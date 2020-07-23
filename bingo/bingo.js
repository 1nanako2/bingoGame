$(function(){
    "use strict";
    var
        max = 75, //75までの数字
        bingo = [], //空の配列
        status = true,
        roulette,
        random,
        number,
        result,
        $number = $("#number"),
		$result = $("#result"),
        $sound_play = $("#sound-play"),
        $sound_pause = $("#sound-pause");

    // li要素を生成
    for(var i = 1; i <= max; i++){
        bingo.push(i);
        $number.append($("<li>").text(("0" + i).slice(-2)));
    }
    //button要素のclickイベント設定
    $("#button").on("click", function(){
        // statusがtrueのとき（ルーレットが回る）
        if(status){　
            status = false;　//変数statusの値を反転させる
            $(this).text("STOP");　//ボタンのテキスト情報を書き換える
            $sound_play.trigger("play"); //play用の音を再生する
            $sound_pause.trigger("pause"); //pause用の音を一時停止する
            $sound_pause[0].currentTime = 0; //音再生の秒数を０に設定する
                                            //audio要素をjQueryで扱う場合、配列指定をする必要がある
            //ルーレットを回す
            //（10ミリ秒おきに数値を表示しているテキストをランダムに書き換えている）
            roulette = setInterval(function() {
                random = Math.floor(Math.random() * bingo.length);
                //Math.floor()小数点以下を切り捨てる Math.random()0以上1未満の疑似ランダムな数値を返す
                number = bingo[random]; //bingo配列からランダムな値を取り出す
                $result.text(number);//numberを表示する
            }, 10);
        // statusがfalseのとき（ルーレットが止まる）
        }else {
            status = true; //変数statusの値を反転させる
            $(this).text("START"); //ボタンのテキストをSTARTに書き換える
            $sound_pause.trigger("play"); //play用の音を一時停止する
            $sound_play.trigger("pause"); //pause用の音を再生する
            $sound_play[0].currentTime = 0;  //play用の音再生の秒数を０に設定する

            clearInterval(roulette);//ルーレットを止める

            result = bingo[random];//ルーレットを止めた時の数字をresult変数に保存する
            bingo.splice(random, 1);//bingo配列から選択した数字を削除する
            //randomから１つの要素を削除

            $result.text(result);//選択した結果（数字）をルーレットのエリアに表示する
            $number.find("li").eq(parseInt(result, 10) - 1).addClass("hit");//選択した結果（数字）のli要素の装飾を変える（選択済みのように見せる）
        }
    });
});
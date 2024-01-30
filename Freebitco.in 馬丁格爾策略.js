// ==UserScript==
// @name         Freebitco.in 馬丁格爾策略
// @namespace    http://tampermonkey.net/
// @version      v1
// @description  Use Martingale Strategy on FreeBitcoin MANUAL BET.
// @author       Peter Yu
// @match        https://freebitco.in/*
// ==/UserScript==

// 定義網址開頭
var jsonUrls = [
    "https://freebitco.in/",
];

// 取得當前網址
var currentUrl = window.location.href;

// 定義 "0" 鍵為開始腳本的目標按鍵
var targetKey = "0";

// 檢查當前網址是否以 jsonUrls 中的某些開頭開始
var isJsonUrl = jsonUrls.some(function(jsonUrl) {
    return currentUrl.startsWith(jsonUrl);
});

// 獲取 "BET HI" 按鈕
var BET_HI_Button = document.getElementById('double_your_btc_bet_hi_button');

// 獲取 "2x" 按鈕
var _2x_Button = document.getElementById('double_your_btc_2x');

// 獲取 "MIN" 按鈕
var MIN_Button = document.getElementById('double_your_btc_min');

// 定義紀錄輸幾次的變數
var lose_time = 0;

// 最大連輸次數
var Max_lose = 0;

// 如果當前網址符合 jsonUrls 的某些開頭，執行程式碼
if (isJsonUrl) {
    // 監聽整個文檔的按鍵按下事件
    document.addEventListener("keydown", function(event) {

        // 檢查是否按下的是目標按鍵
        if (event.key === targetKey) {

            // 顯示輸入對話框，詢問用戶欲迭代的 Martingale 次數，並存儲用戶輸入的值
            var iterations = prompt(" * 請輸入Martingale迭代次數： ", "10");

            // 將用戶輸入的字符串轉換為數字
            var numIterations = parseInt(iterations, 10);

            // 檢查是否成功轉換為數字，並且迭代次數大於 0
            if (!isNaN(numIterations) && numIterations > 0) {

                // 執行迭代操作
                console.log("---------------------------------------");
                console.log(" * Martingale迭代次數： " + numIterations);
                console.log(" * Martingale迭代開始！");
                // 記錄迭代開始時間
                var startTime = performance.now();
                var promise = Promise.resolve();

                // 最大連輸次數
                Max_lose = 0;

                // 進行 Martingale 迭代，賺取比特幣
                for (var i = 0; i < numIterations; i++) {
                    promise = promise
                    // Martingale
                        .then(Martingale)
                        .then(function () {
                        // 設定每次 Martingale 間的隨機延遲，範圍為 0.5 秒到 1.5 秒
                        return random_delay_decimal(5,10);
                    });
                }
                // 在所有 Martingale 迭代結束後顯示結束訊息
                promise.then(function() {
                    // 記錄迭代結束時間
                    var endTime = performance.now();
                    console.log(" * Martingale迭代結束！");
                    // 顯示用時
                    console.log(" * Martingale迭代次數： " + numIterations);
                    console.log(" * 總共用時 " + (endTime - startTime) / 1000 + " 秒，");
                    console.log(" * 也就是 " + (endTime - startTime) / 1000 / 60 + " 分鐘。");
                    console.log(" * 請注意，本次迭代的連輸次數是： " + Max_lose + " 次。");
                    console.log("---------------------------------------");
                });
            } else {

                // 用戶輸入無效，或者迭代次數小於等於 0
                console.log(" * 無效的迭代次數");

            }
        }
    });
} else {
    console.log(" * 當前網址不符合 JSON 開頭");
}

async function Martingale() {

    console.log(" - 執行一次Martingale");

    // 獲取 WIN PROFIT 元素
    var WIN_PROFIT_Element = document.getElementById('double_your_btc_stake');

    // 獲取 WIN PROFIT 的值
    var WIN_PROFIT_Value = WIN_PROFIT_Element.value;

    // 將 WIN PROFIT 的值轉換為浮點數
    var WIN_PROFIT_floatValue = parseFloat(WIN_PROFIT_Value);

    // 檢查 WIN PROFIT 是否等於 0.00000001，最低底注
    if (WIN_PROFIT_floatValue === 0.00000001) {

        console.log(" - WIN PROFIT為最低底注");

        // 按下 "BET HI" 的按鈕
        BET_HI_Button.click();

        // 設定檢查是否 "win" 前的延遲，0.5秒
        await delay(0.5);

        // 檢查是否 "win"
        // 獲取賭的結果資訊
        var resultElement = document.getElementById('double_your_btc_result');
        var winMessageElement = document.getElementById('double_your_btc_bet_win');
        var loseMessageElement = document.getElementById('double_your_btc_bet_lose');

        // 定義紀錄輸幾次的變數
        lose_time = 0;

        if (resultElement) {

            // 如果賭贏
            if (loseMessageElement.style.display == 'none') {

                // 顯示賭贏
                console.log("！賭贏！");
                console.log(" - 完成一次Martingale");
                return true; // 返回 true 表示跳出迴圈

                // 如果賭輸
            } else if (winMessageElement.style.display == 'none') {

                // 顯示賭輸
                console.log("！賭輸！");
                // 輸幾次次數增加
                lose_time++;
                // 紀錄最大連輸次數
                if (lose_time > Max_lose) {
                    Max_lose = lose_time;
                }

                // 如果持續賭輸
                while (winMessageElement.style.display == 'none') {

                    // 按下 "2x" 的按鈕
                    _2x_Button.click();
                    // 設定按完 "2x" 按鈕後的隨機延遲，範圍為 0.2 秒到 0.8 秒
                    await random_delay_decimal(2,6);
                    // 按下 "BET HI" 的按鈕
                    BET_HI_Button.click();
                    // 設定按完 "BET HI" 按鈕後，檢查是否 "win" 前的延遲，0.5秒
                    await delay(0.5);

                    // 再次獲取賭的結果資訊
                    winMessageElement = document.getElementById('double_your_btc_bet_win');
                    loseMessageElement = document.getElementById('double_your_btc_bet_lose');

                    // 如果賭輸
                    if (winMessageElement.style.display == 'none'){

                        // 顯示賭輸
                        console.log("！又賭輸！");
                        // 輸幾次次數增加
                        lose_time++;
                        // 紀錄最大連輸次數
                        if (lose_time > Max_lose) {
                            Max_lose = lose_time;
                        }
                        // 顯示當前迭代的賭輸次數
                        console.log("lose_time： " + lose_time);

                        // 如果賭贏
                    } else if (loseMessageElement.style.display == 'none') {
                        // 顯示賭贏
                        console.log("！終於賭贏！");
                    }
                }
                // 按下 "MIN" 的按鈕，重置底注
                MIN_Button.click();
                console.log(" - 完成一次Martingale");
                return true; // 返回 true 表示跳出迴圈
            }
        }

    } else {
        console.log(" -00 WIN PROFIT不為最低底注，請將WIN PROFIT設定為0.00000001");
    }
}

// 延遲函數(1秒)，n秒
async function delay(n) {
    // 顯示延遲時間
    console.log("delay: " + n);
    return new Promise(function(resolve) {
        setTimeout(resolve, n * 1000);
    });
}

// 隨機延遲函數(1秒)，範圍為 n ~ n+m 秒
async function random_delay(n, m) {
    var p = Math.floor(Math.random() * m) + n;
    // 顯示延遲時間
    console.log("delay: " + p);
    return new Promise(function(resolve) {
        setTimeout(resolve, p * 1000);
    });
}

// 隨機延遲函數(0.1秒)，範圍為 0.n ~ 0.n+m 秒
async function random_delay_decimal(n, m) {
    var p = (Math.floor(Math.random() * m) + n) * 0.1;
    // 顯示延遲時間
    console.log("delay: " + p);
    return new Promise(function(resolve) {
        setTimeout(resolve, p * 1000);
    });
}

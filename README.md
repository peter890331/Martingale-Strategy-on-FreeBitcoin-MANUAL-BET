# Martingale-Strategy-on-FreeBitcoin-MANUAL-BET
一個在 FreeBitcoin 的 MANUAL BET 上使用 馬丁格爾策略 (Martingale Strategy) 的 javascript 腳本。

A javascript that use Martingale Strategy on FreeBitcoin MANUAL BET.

---
### ❗ 警告：僅以此練習程式編寫，這個腳本只是用來練習 javascript，若要使用必須注意，下注有賺有賠，馬丁格爾策略 (Martingale Strategy) 在本金有限的情況下，絕對不是穩贏，其期望值絕對是負值，用於玩樂可以，但切勿想要用這個腳本賺錢，會賠光。本人對此內容不負任何法律責任。 ❗

### ❗ WARNING: Practice programming only, this script is only used to practice javascript, if want to use it, you must pay attention to the fact that there is a profit and a loss of bets, the Martingale Strategy in the case of a limited amount of capital, it is definitely not a sure-fire way to win, and its Expected Value are definitely negative, it's okay to use it for fun, but don't want to use this script to make money, you'll lose all your money. I will not be responsible for any law liability to this content. ❗

## Foreword
### Freebitcoin
Freebitcoin ([Website][3]) 是一個線上的比特幣水龍頭網站，可以透過簽到、抽獎或下注來賺取小額的比特幣。其中，在 MULTIPLY BTC 頁面中，有一個賭數字大或小的下注功能，其標示的勝率是47.5%，我們可以使用腳本將這裡的 MANUAL BET 進行自動化，以馬丁格爾策略 (Martingale Strategy) 來下注。

### 馬丁格爾策略
馬丁格爾策略 (Martingale Strategy) 是一個經典的賭博策略，簡而言之就是，在每次下注輸了之後，下一注就用雙倍的賭注再去押注，直到贏錢為止，再重新開始新的回合。如此一來，如果本金無限的話，贏錢那次就可以把前面輸的賭注都賺回來，但本金不可能無限，所以就算本金很大，連輸的機率相對再微小，都還是有賠光的可能，要謹慎使用。理論上本金越大，賠光的機率越小。

## Overview
這個腳本可以在安裝了篡改猴 (Tampermonkey) 的瀏覽器上使用，在安裝後，只要開啟 Freebitcoin 網頁，再按下數字鍵 "0"，輸入欲下注的次數即可。

每次下注，是使用最小底注（0.00000001聰），這樣賠光的機率相對較小。理論上本金越大，賠光的機率越小，基於你的本金，可以以單次賭數字大或小輸的機率 (52.5%)，來計算你在每次馬丁格爾策略 (Martingale Strategy) 獨立事件中賠光的機率，如下表可參考，假設我的本金有10000聰，我在連輸第13次時，會將本金賠光，在每次獨立事件中賠光的機率就是 $`0.525^{13} * 100 \approx 0.02 \%`$，前提是其標示的勝率屬實。

|  連輸的次數  |  當次賭注大小  |  總共輸掉的賭注大小  |  可能發生的機率  |
|  ----  |  ----  |  ----  |  ----  |
| 1  | 1聰 |  1聰  |  52.5 %  |
| 2  | 2聰 |  3聰  |  27.5 %  |
| 3  | 4聰 |  7聰  |  14.4 %  |
| 4  | 8聰 |  15聰  |  7.5 %  |
| 5  | 16聰 |  31聰  |  3.9 %  |
| 6  | 32聰 |  63聰  |  2 %  |
| 7  | 64聰 |  127聰  |  1 %  |
| 8  | 128聰 |  255聰  |  0.57 %  |
| 9  | 256聰 |  511聰  |  0.3 %  |
| 10  | 512聰 |  1023聰  |  0.15 %  |
| 11  | 1024聰 |  2047聰  |  0.08 %  |
| 12  | 2048聰 |  4095聰  |  0.04 %  |
| 13  | 4096聰 |  8191聰  |  0.02 %  |
| 14  | 8192聰 |  16383聰  |  0.01 %  |
| 15  | 16384聰 |  32768聰  |  0.006 %  |


設備和軟體要求：
  1.  一台已安裝瀏覽器（建議是Chrome或Brave）的電腦（建議是Windows系統）。
  2.  瀏覽器要裝上篡改猴 (Tampermonkey) 的擴充功能，可以在 chrome 線上應用程式商店中找到（[擴充連結][1]）。
  3.  （選用）：在進行下注的途中，可能會三不五時跳出 hCaptcha 的機器人驗證，雖然此腳本可以不受其影響持續進行，但可以使用 NopeCHA: CAPTCHA Solver 來進行自動驗證，一樣可以在 chrome 線上應用程式商店中找到（[擴充連結][2]），只是驗證成功的機會實測是滿低的。如果不會設定的話，我在一個網址有找到算詳細的設定教學（[驗證機器人設定教學][5]）
  4.  註冊 FreeBitcoin 網站 ([Website][3])，並累積一些本金，可以透過簽到或入金，理論上本金越大，賠光的機率越小。

[1]: https://chromewebstore.google.com/detail/%E7%AF%A1%E6%94%B9%E7%8C%B4/dhdgffkkebhmkfjojejmpbldmpobfkfo
[2]: https://chromewebstore.google.com/detail/nopecha-captcha-solver/dknlfmjaanfblgfdfebhijalfmhmjjjo
[3]: https://freebitco.in/
[5]: https://andy-pro.com/nopecha-%E5%9C%96%E5%BD%A2%E9%A9%97%E8%AD%89%E7%A2%BC%E7%A0%B4%E8%A7%A3%E5%99%A8-chrome%E4%BD%BF%E7%94%A8%E6%95%99%E5%AD%B8-%E8%87%AA%E5%8B%95%E9%BB%9E%E6%93%8A%E6%88%91%E4%B8%8D%E6%98%AF%E6%A9%9F/

## How to use, For users
### Steps:  
  1.  複製 Freebitco.in 馬丁格爾策略.js 腳本，在篡改猴 (Tampermonkey) 新增此腳本並儲存。
  2.  開啟 FreeBitcoin 網站，確定已登入帳號。
  3.   （選用）：點選入 MULTIPLY BTC 頁面，但其實也可以不用，只是方便看到輸贏。
  4.   （選用）：如果想要看到腳本運行的監控畫面，可以打開網頁的 Console，在 FreeBitcoin 網站畫面按下 F12 找到 Console 即可。
  5.   在 FreeBitcoin 網站畫面，按下數字鍵 "0"。
  6.   在跳出的對話框中輸入欲下注的次數，也就是你想賺幾聰，前提是都沒輸。
  7.   腳本即會開始運行。
  8.   贏了很開心，賠光別怪我。

## Make updates, For Developers
若你想修改腳本，可以嘗試加大底注，當然賠光的機率又更高，抑或是嘗試將腳本中的一些 delay 減小，但可能會有被網站發現的風險？

## Some screen recording and screenshots when using
目前懶得錄影跟截圖，贏太少了。

## Notes
### 自動簽到
在 Freebitcoin 中，有一個無風險賺取小額比特幣的功能，也就是在 FREE BTC 頁面中每個小時都可以進行一次數字輪盤的 ROLL，俗稱為簽到，而我在一個網址也有找到自動簽到的腳本（[自動簽到腳本連結][4]），有需要的話可以看一下，只不過如網頁中所寫的前置作業，新註冊的會員在每次簽到的時候，幾乎會需要進行一次 hCaptcha 的機器人驗證，所以也可以嘗試使用 NopeCHA: CAPTCHA Solver 來進行自動驗證，可以在 chrome 線上應用程式商店中找到（[擴充連結][2]），只是驗證成功的機會實測是滿低的。如果不會設定的話，我在一個網址有找到算詳細的設定教學（[驗證機器人設定教學][5]）

[4]: https://andy-pro.com/%F0%9F%9A%80%F0%9F%92%B0-freebitco-in-%E8%87%AA%E5%8B%95%E5%8C%96-%E8%85%B3%E6%9C%AC-%E9%80%B2%E9%9A%8E%E6%95%99%E5%AD%B8-freebitco-in-%E6%8E%9B%E6%A9%9F%E8%87%AA%E5%8B%95%E9%A0%98%E5%8F%96btc/

---
### ❗ 再次警告：僅以此練習程式編寫，這個腳本只是用來練習 javascript，若要使用必須注意，下注有賺有賠，馬丁格爾策略 (Martingale Strategy) 在本金有限的情況下，絕對不是穩贏，其期望值絕對是負值，用於玩樂可以，但切勿想要用這個腳本賺錢，會賠光。本人對此內容不負任何法律責任。 ❗

### ❗ WARNING AGAIN: Practice programming only, this script is only used to practice javascript, if want to use it, you must pay attention to the fact that there is a profit and a loss of bets, the Martingale Strategy in the case of a limited amount of capital, it is definitely not a sure-fire way to win, and its Expected Value are definitely negative, it's okay to use it for fun, but don't want to use this script to make money, you'll lose all your money. I will not be responsible for any law liability to this content. ❗

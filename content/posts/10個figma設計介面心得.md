---
title: "10個使用 Figma 設計介面心得，讓你的設計事半功倍"
slug: "10個figma設計介面心得"
date: "2022-04-24"
template: post
draft: false
category: "桌面"
socialImage: ""
tags:
  - "Figma"
---

Figma 是非常容易上手的 UI/UX 設計工具，線上多人協作功能讓開發者或 Product 的同事很容易瀏覽甚至修改設計，慳掉不少設計師的時間。[UX Tool](https://uxtools.co/survey-2021/#ui-design) 每年做的設計工具問卷顯示，使用 Figma 的人數已經由 2018 年的 21%，至今超越 Sketch 到 77%。上年 FigJam 的推出，更方便團隊一併使用 Freehand 般的白板協作。今日就跟大家分享十個使用 Figma 的小貼士。

![UX Tool 每年做的設計工具問卷顯示，使用 Figma的人數已經由2018年的21%，至今超越 Sketch到 77%。](/media/figma-tips-1.png)

## 1. 按住「Shift」鍵移動物件(Nudge) 的距離

預設在 Figma，按方向鍵可以移動物件 1px，若按住 Shift 一下就會移動 10px。但如果使用 8pt grid 的話，每次要手動調整 2px，其實 Preferences - Nudge Amount 可以自訂 Small Nudge 和 Big Nudge 的數值，如設定成 2px 及 16px，那麼所有物件移動的幅度也是 2 的倍數。

![](/media/figma-tips-1.png)

## 2. Figma 超易學習快捷鍵

下面幾個貼士也會提到鍵盤快捷鍵，不過 Figma 的 Keyboard Shortcuts 圖表（按 Ctrl + Shift + ? 或 Cmd + / 輸入 Keyboard Shortcuts）也值得表揚，它不單只簡單易明，它更保留用家曾否使用過鍵盤快捷鍵的紀錄，有如學習的紀錄知道還有哪個快捷鍵還未用過。如圖上可見，暫時這頁我只用過 3 個快捷鍵。

## 3. 快速動作欄 Cmd + /  可搜尋任何指令

剛才提到的 Cmd + / 也是十分常用的快捷鍵，按後會出現一條 Search Bar，然後就可以直接用文字搜尋任何指令，不用記下鍵盤快捷鍵。再者連 Plug-in 的指令同樣可以搜尋得到。

![](/media/figma-tips-3.png)

## 4. 超容易整理 Figma 設計檔的封面

Figma 預設將第一頁的設計自動成為檔案的縮圖，不過你亦可以右按任何一個 Artboard 然後按 Set as thumbnail 一鍵設定為縮圖。Figma 的預設 Artboard 大小也有 Plugin / File Cover，大小是 1920x960px，不過左右兩邊需預留 200px 的出血位。若你整好一個 Template 就可以共用到不同 Figma 檔案，用起上來也賞心悅目。

![](/media/figma-tips-4.png)

詳細可參考 Figma 的教學文章 https://help.figma.com/hc/en-us/articles/360038511413-Set-custom-thumbnails-for-files

![](/media/figma-tips-4-2.png)

## 5. Inspect 分頁可以快速複製文字

如你需要快速複製 Figma 內的文字，記得切換至 Inspect 一頁，選取文字時 Inspect 內將有 Content 可以一鍵複製，亦不怕原有文字被錯誤修改。

![](/media/figma-tips-5.png)

## 6. Cmd + K 可以比例縮放文字及物件

預設拖放一個物件，即使按住 Shift 鍵，也會按原有 Constraint 控制大小。如想比例縮放文字及物件，需要切換至 Scale (K 鍵)，那麼整個物件，包括文字也會按比例縮放。

![](/media/figma-tips-6.png)

## 7. 同時貼上物件於多個頁面

若要將物件貼上到不同的頁面 (Frames)，其實不需要逐一貼上。先複製上物件，然後選擇多於一個頁面，再貼上物件，物件就會同時貼上到所選的頁面內。

![](/media/figma-tips-7.png)

## 8. 自訂及修改 FigJam  物件及貼紙

若有使用過 FigJam 的話，會發現 FigJam 內不物件或貼紙也不能直接修改。不過，它們是可以複製到 Figma 裡面。到時候，就可以如 Figma 物件般修改，完成後可以複製回到 FigJam。

## 9. Figma 檔案有太多相片？轉用特別鏈結提升載入速度

有一次我的檔案累積過百張相片，導致載入速度太慢，甚至出現 RAM 耗盡無法打開檔案的警告。從客服得知，如果在檔案網址的最後，加上以下的 parameter，可讓 Figma 載入縮圖大小的相片：

`&thumbnails-only=1`

## 10. 改名快捷鍵 Cmd + R，更可支援 Regex  語法

不少人也知道選取多於一個物件，再按 Cmd+ R 可以改名，不過按順序改名是否有時不正確？因為 Figma 是按左欄 Layers 圖層的次序重新命名。配合 Plugin Sorter，可以自行決定各物件的順序方式（如在 Canvas 內的位置，從上而下，由左至右 就是 Sort Position）。更厲害的事，是 Figma 的 Rename 功能就是 Regex 語法，除了「現在名稱」、「數字」外，其實可以有更進階的命名邏輯，如掉轉文字次序、改為大寫、細寫等。

希望大家喜歡我們首個介紹 Figma 的系列。我們計劃在不同平台介紹更多 Figma 的功能，我地每日亦係我哋既[Discord 群組](https://discord.gg/Qe8eNn9Pxx)討論及交流使用 Figma 的心得。

![](/media/figma-tips-10.png)

### 關於 Friends of Figma Hong Kong：

我們是 Friends of Figma Hong Kong 🇭🇰，一個由設計主導的社群，即刻加入我哋嘅[網上 Discord 群組](https://discord.gg/Qe8eNn9Pxx)同睇吓[我哋網頁](https://friends.figma.com/hong-kong/)啦。
https://help.figma.com/hc/en-us/articles/360039958934-Rename-Layers

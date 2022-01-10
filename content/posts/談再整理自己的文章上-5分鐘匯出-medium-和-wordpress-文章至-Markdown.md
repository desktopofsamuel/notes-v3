---
title: '談再整理自己的文章（上） — 5分鐘匯出 Medium 和 Wordpress 文章至 Markdown'
slug: '談再整理自己的文章上-5分鐘匯出-medium-和-wordpress-文章至-Markdown'
date: '2020-02-24T05:02:29.085Z'
template: post
draft: false
category: '桌面'
tags:
  - Markdown
  - Medium
  - Wordpress
  - 網誌
  - Gatsby
  - React
  - Static Site Generator
---

經過多年，我的網誌又再搬家了，有時候已經忘記了有甚麼平台還要發佈。Wordpress 也是寫下寫就中斷了。

寫這篇文的沿起，是一月的時候，回顧自己 2020 的目標。雖然新年目標都希望自己寫得更頻密，結果出來還是不太好，過去兩年頂多也是一月一篇，寫的大多都是英文關於設計的文章。

一年前在學 React 用 Gatsby 寫個人網頁，2019 年尾終於完成最後一塊拼圖！把原本相片 Portfolio 的網頁也搬過去。寫下自己「整」不同東西的過程，或許才是本身最值得寫的題材。趁現在武漢肺炎肆虐，留在家中的時間多了，決定連網誌也搬家，分享整 Blog 的過程，順便回顧一下自己網誌隔幾年就會搬家的習慣（每次搬家也跟自己說是最後一次）。

觀及三代的網誌，其實也是平行存在的，只不過是按有發佈文章的年期分割。

## 第一代 — Wordpress （2007- 2017）

![](/media/medium-export-wordpress-1st-gen.png)

Xanga （? - 2013 ）時寫的東西，還是不要獻醜，Wordpress 世代律很有興致分了兩個網誌，一個是個人的（2008-2017），另一個是科技（2011-2014）。兩邊或許中間也轉過不少 theme，不過始終也是也使用免費的 Wordpress.com 而非自行架站的開源 Wordpress。

## 第二代 Medium （2012 - 現在）

![](/media/medium-export-medium-2gen.png)

Medium 第一天開放的時候，我已經是用戶，當年還是搶著註冊 @samuelwong 的用戶名（後來註冊個人網頁才統一成 @desktopofsamuel） 。

![](/media/medium-export-medium-letter.png)

當時還有一封來自創辦人 Ev Williams 的邀請信。Medium 初期的文章以英語為主，華文博客世界大約是 17 年紛紛跳槽到本來英語為主 Medium 上寫文。Medium 本來以收費模式分帳予作者，是個頗理想的方式讓人可以寫文為生。不過，Medium 的付費牆越來越大的時候，先前的熱潮倒成了逃亡潮，幾個有名 Medium Publications（如 [The Mission](https://medium.com/the-mission) 、[Hackernoon](https://hackernoon.com/about-removing-medium-from-hackernooncom-jh212hct) 和 [FreeCodeCamp](https://www.freecodecamp.org/)）卻宣佈離去。在 2019 年 10 月 Medium 調整作者收入計算方法，由按「拍手」（Clap）數量到閱讀時間為計算收入最重要因素，今年 2020 年初更宣佈對海外作者預先留起 30%收入作徵稅用途，現在寫手收入已經大不如前，Medium 也應該頭痛如何繼續下去。

## 第三代 Gatsby （2020 - ?）

![](/media/medium-export-gatsby-3gen.png)

2020 年，個人化朝著兩大方向發展。近年越來越多人建立自己的 Subscription Mail List，最直接送到讀者的 Inbox，廣告收益也較高，有些記者或作者的 Mail List 甚至是付費才能加入的，這大概是更加親密的 Patreon 吧。

第二，就是自架網站。以往架站有一定固定成本，網址 Domain 的每年續約費用再加上寄存 Hosting 的開支。Netlify 的出現卻讓靜態網頁找到一個免費的家，只要駁上程式碼 repo 如 Github，就可以自動發佈。而 Gatsby 就是一個以 React 為本的新的靜態網頁框架（Static Site Generator），可以接駁不同 CMS 或直接打 Code 製作自己的網誌或作品集。

轉到個人網站有幾個好處，首先是客製化，網頁的自由度大，有更強的辨認度，比起文章放在 Medium 跟全世界其他作者一式一樣好了。

Medium 倒只是一個發佈及社交平台，用作更多 backlink 和獲得更高 SEO 排名的方法。最終 call to action 的地方，還是全盤自己控制的個人網頁。而外國不少 coder 和 designer 也由 Medium 轉到自己網頁，畢竟 Medium pivot 成付費平台後也不再是原本的 CMS 的概念。

所以現在主站 [desktopofSamuel.com](https://www.desktopofsamuel.com) 就是英語版，有自己設計的作品集和自我介紹。副站 [notes.desktopofSamuel.com](https://notes.desktopofsamuel.com) 就是新的中文網誌。新網誌希望開始寫多一點自己日常生活在科技的嘗試，開展不同的寫作計劃，如 [Paul Stamatiou 我的器材頁](https://paulstamatiou.com/stuff-i-use/)。大部分文章還是會發佈到 Medium ，但你亦可以用 Feedly 或其他 App 訂閱[我的 RSS](https://notes.desktopofsamuel.com/rss.xml)。

## 匯出 Medium 和 Wordpress 文章至 Markdown

今次將分享一下快速用 Gatsby 建立網誌的過程。我最初也是只懂 HTML 和 CSS 摸著學。如果跟著一個 template 開始的話，往後也是用 CMS 上載文章，其實沒有想像中那麼複雜的。

上半部分先教大家如何匯出文章，現在寫作很熱門的不是用甚麼軟件，而是 Markdown 這個格式。基本上，Markdown 就是易讀易寫的文字格式，可以匯出成不同風格的 HTML 檔。現時熱門的筆記應用如 Notion 和 Bear 都支援 Markdown 。iPad 上著名的寫作 App 如 iA Writer 和 Ulysses 也同樣支援。（偏偏 Evernote 現在還未支援）

只要學會幾種基本 Markdown 語法，如標題用 「#」標記、鏈結是 `[鏈結顯示的文字](網址)` ，就可以開始編寫。很多新網誌的 Framework ， Markdown 格式也通用，換然之，匯出 Markdown 將是持久保存網誌的方法。

### 如何從 Wordpress 匯入 Markdown 文章

我們會使用 Will Boyd 開發的 [Wordpress Export To Markdown](https://github.com/lonekorean/wordpress-export-to-markdown)。他的 script 體貼仔細支援不同 folder 的建立格式及相片下載。如果已經有 Node.js 、NPM 和 Git 可以跳過第 2 和第 3 步。

![](/media/wordpress-export-20200511.png)

1.  Wordpress 匯出
    要從 Wordpress 匯入 Markdown 文章，先在自己的 Wordpress 匯出，選「所有內容」的 XML 檔，然後更名為 `export.xml`。
2.  安裝 Node.js 和 npm
    這段 script 是用 Node.js 寫的，所以先需要下載 Node.js。我建議是 下載 NVM （Node Version Manger）(Windows, Mac / Linux) NVM 的好處是比較容易讓你轉換不同 Node.js 的版本，如這 script 需要 Node.js v12.14（我原本 Node.js 是 v10 然後便發生錯誤）。或想簡單一點就到 Node.js 下載。

    1.  打開 CMD，然後輸入 `nvm` 測試是否安裝好
    2.  輸入 `nvm install v12.14.0` 開始下載
    3.  輸入 `nvm use v12.14.0` 開始使用
    4.  輸入 `node -v` 檢查版本是否 v12.14

3.  下載 Script

    1.  在 Github 按緣色按鍵下載 Zip 檔，或直接 `git clone https://github.com/lonekorean/wordpress-export-to-markdown`
    2.  用 `cd ../` 轉到下載的位置 如 `cd C:\Users\Samuel\Downloads`
    3.  再轉到 `cd wordpress-export-to-markdown` 的 folder
    4.  複製剛才在 Wordpress Export 的 `export.xml` 檔到同一 folder 內

4.  運行 Script

    1.  先安裝這段 script 需要的 dependencies，輸入 `npm install`
    2.  再運行 script `node index.js`
    3.  Script 將會問幾條問題作設定，如 xml 檔名，output 的 folder 名，是否需要按年月日分開 folder，是否下載所有相片
    4.  若跟隨我用 Gatsby-Starter-Lumen，最好跟回 Netlify CMS 的格式（不分日期，只加日期於檔名前，下載所有圖片）

### 如何從 Medium 匯入 Markdown 文章

1. Medium 匯出
   到 Medium 的 Settings 下載自己所有 Data，Posts 這個 folder 將有所有文章。可惜的是，你的所有回覆也被視作 posts，要自行手動挑走。

2. 安裝 Node.js 和 npm
   安裝 Node.js 不在此重覆，重溫上面如何從 Wordpress 匯入 Markdown 文章教學
3. 安裝 Gautam Dhameja 的 `medium-2-md` script https://github.com/gautamdhameja/medium-2-md ，或直接在 npm 下載
4. 按指示運行
   `medium-2-md convertLocal /posts -dfi`

## 手動更新環節

由於 Gatsby 不同 template 的格式各有不同，要視乎用哪種方法去 query 所有 markdown 檔案（這也是 Gatsby 的彈性）。Markdown 的 frontmatter 最後還是要我們自己手動處理，Frontmatter 就是每個 markdown 的屬性，如我將使用的 Gatsby-Starter-Lumen 需要標明 template 是屬於 `post` 而非 `page`，以及 `draft`的狀態是`false`。再者，以上兩段 script 裡的 tags 和 category 的命名未必符合。所以我將需要手動處理統一所有 Markdown 的 Frontmatter。

```
template: post
draft: false
category: "notes"
tags:
- "tag1"
slug: "xxxx"
```

每個檔案也要加回這五個 frontmatter，這可以顯示出來。當然若你有過千篇文章的話，應該再花時間鑽研 script 去處理。不過，我的文章數量不太多，所以不用了。另外由於這個 Starter 的媒體庫名是 media 而非 images ，我們要把所有完成 Markdown 的`images/` 替換成 `media/`，用 VSCode 的 Search & Replace 就好了，最後便把所有 Markdown 複製到 `Content / Post`，然後所有相片複製到 `Static / Media` 。不過我留意到有時下載的圖片是 Error 的，有機會引致 Gatsby 出現問題，所以要再三檢查一下，所有相片是否正常下載到。

### 後記和感想

最後也花一星期的時間去整理百多篇文章，面對自己十年來的寫作也是頗痛苦的過程，有些太年青的想法最終也是收起來自己收藏。

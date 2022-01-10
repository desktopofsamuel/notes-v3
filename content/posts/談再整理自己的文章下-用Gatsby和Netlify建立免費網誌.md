---
title: "談再整理自己的文章（下） — 用Gatsby和Netlify建立免費網誌"
slug: "談再整理自己的文章下-用Gatsby和Netlify建立免費網誌"
date: "2020-05-15T05:02:29.085Z"
template: post
draft: false
category: "桌面"
socialImage: "/media/0_7mFG5Gf-8jEdpIpH.jpg"
tags:
  - Markdown
  - Medium
  - Wordpress
  - 網誌
  - Gatsby
  - React
  - Static Site Generator
---

![Photo by [Jess Bailey](https://unsplash.com/@jessbailey?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)](/media/0_7mFG5Gf-8jEdpIpH.jpg)

架設自己的網站，需要自己網址和自行架設伺服器，往往是大家轉用獨立網站卻步的地方。以往自行架站，Wordpress 均需要支援 mySQL 資料庫儲存資訊。（以 Digital Ocean 的 Droplet 為例，每月至少需要 USD\$5 。）

用 Static Site Generator 如 Gatsby 和 Hugo 的好處，是輸出靜態（static）的 HTML 網頁，若使用 Netlify 的平台，它免費支援自訂網址，以及每月首 100GB 的流量也是免費，大大減低架站的開支。不過，壞處是更新沒有 Wordpress 那麼方便，不過有了 Netlify CMS 等配套，只要學懂少少 coding 也可以應付。

首先你將需要以下的帳户和軟件（稍後亦會逐個介紹）：

1.  Node.js 及 npm
2.  VS Code（或任何 IDE 以便修改程式碼和網誌 Markdown 檔案）
3.  Github（需註冊帳户，再下載 Github Desktop App）
4.  Yarn（或 NPM）
5.  Netlify（需註冊帳户，可連繫至 Github 户口直接授權登入

![](/media/1_JyR2gNUgh_yjUqnNCN1kRA.png)

Gatsby 是基於 nodeJS 以 React 將 Markdown 檔案，製成 HTML 網頁。Gatsby 本身已有 Starter Template 作不同用途，有個人作品集、網誌、相片集、商店等。今次我們將使用 [Gatsby Starter Lumen](https://www.gatsbyjs.org/starters/alxshelepenok/gatsby-starter-lumen/) ，製作一個簡約設計的網誌。

這個 Starter 已經支援網誌的基本功能，如分類、標籤、頁面、SEO 、Netlify CMS 等等。我的中文網誌也是用這個 starter ，再自行更改（如[地圖](https://notes.desktopofsamuel.com/travel/)一頁的相片 Grid ）。不過缺點是這個 Starter 尚未支援 MDX ，不過不影響基本使用。

## 設定開發環境

其實[ Gatsby 的官方教學](https://www.gatsbyjs.org/tutorial/part-zero/)也有詳述如何設定開發環境，我將以自己經驗最簡單、最少打 command line 的方法 walkthrough 整個過程。我將以 Mac 為例（ Windows 只有少許安裝工具的差別）。

1.  首先，我們需要 Node.js 。你可直接從[網上下載](https://nodejs.org/en/)安裝檔。安裝後，在 Command / Terminal 檢查版本即安裝完成。在 Mac 你可能需要額外安裝[XCode Command Line Tools](https://osxdaily.com/2014/02/12/install-command-line-tools-mac-os-x/)。Node.js 已內置 npm （Node Package Manager)，檢查兩個版本。Node 的版本應是 12 以上。

```
npm --version
node --version
```

2. 安裝 Gatsby 的 Command Line Interface，讓你可以執行 Gatsby 的指令。 Mac 或許你需要 sudo 加在前方才能安裝（需輸入密碼）。

```
npm install -g gatsby-cli
```

3. 安裝 [Visual Studio Code](https://code.visualstudio.com/)或其他 IDE，安裝後你便可以轉用 VSCode 內置 Integrated Terminal。

![](/media/1_w6_yLEbha0U6p3zUE3GkuQ.png)

4. 安裝 Git，Git 是讓你的程式碼同步的方案。簡單起見，我們可以[直接使用 Github](https://desktop.github.com/)，註冊帳戶後下載 Github 的 Desktop App 然後登入。

![](/media/1_OXYg_qNo_12UevdKxjRLiA.png)

5. 回到 [Gatsby Starter Lumen](https://www.gatsbyjs.org/starters/alxshelepenok/gatsby-starter-lumen/) 頁，複製中間的一行指令，貼上到 Integrated Terminal 上，然後按 Enter 開始。這樣 Terminal 便會直接以 Lumen 的 Repo 複製到新資料夾。gatsby-starter-lumen 將是新資料夾的名稱。

```
gatsby new gatsby-starter-lumen https://github.com/alxshelepenok/gatsby-starter-lumen
```

![](/media/1_d-UEHPW7ybuqijjeNWOi0g.png)

## 使用 Gatsby Starter 直接開站

6. 下載完成後，Gatsby 將詢問使用 Yarn 或 npm 安裝 dependencies。按個人喜好，我選擇 Yarn 按 Enter，會自動安裝這個 Starter 所需的其他應用。

![](/media/1_UK1pQNye4uPRQWFZd8Qeew.png)

7. 等候數分鐘，Template 已經下載及安裝完成。由於我們建立了的新資料夾，在 Terminal 打以下指令轉換目錄，再啟用本機伺服器。

```cd gatsby-starter-lumen
gatsby develop
```

8. 正常情況應成功運行 Development Server，在瀏覽器打開以下網址便可預覽。 http://localhost:8000/

![](/media/1_NjkY8w8MjuUrNm5jolg1Ww.png)

9. Lumen 本身支援自訂化，有幾個檔案可以簡單修改內容。Config.js 檔可以自訂網頁基本資料、左欄自我簡介資訊、和 Menu 的鏈結。如欲更改頭像，則替放圖片到 static 內的 photo.jpg。

```
/config.js
/static/photo.jpg
```

10. 如要匯入文章，[上集](https://notes.desktopofsamuel.com/posts/%E8%AB%87%E5%86%8D%E6%95%B4%E7%90%86%E8%87%AA%E5%B7%B1%E7%9A%84%E6%96%87%E7%AB%A0%E4%B8%8A-5%E5%88%86%E9%90%98%E5%8C%AF%E5%87%BA-medium-%E5%92%8C-wordpress-%E6%96%87%E7%AB%A0%E8%87%B3-Markdown#%E6%89%8B%E5%8B%95%E6%9B%B4%E6%96%B0%E7%92%B0%E7%AF%80)已經解釋了如何將 Medium 和 Wordpress 轉換為 Markdown 檔。將網誌都存放於 content/posts 內，由於處理 Markdown 的過程可能有手民之誤（圖片鍵結不正確，Frontmatter 有誤等等），有機會出現 Render Error，我的做法是 5 篇一次過複製再檢查。之前就試過貪心，最後找了很久才知道哪裡出錯。Gatsby 是支援 Hot-reload (毋需按爛 F5 鏈自動更新），不過如果你見不到有改變，可能需要清除 cache。

```
按 Ctrl + C 停止 Development Server
gatsby clean
gatsby develop
```

另外就圖片存放位置的補充，配合到 Netlify CMS 的關係，所有圖片均存放在 static/media 內。不過另一做法是放到 content/post/ 內。Netfliy 有[額外的設定](https://www.netlifycms.org/docs/configuration-options/)可以支援這個做法。

```
content/
 post /
 blog article 1 /

- index.md
- article-photo-1.jpg
- article-photo-2.jpg
  blog article 2 /
- index.md
- article-photo-1.jpg
- article-photo-2.jpg

```

而 Markdown 內引用圖片的語法也需調整。

```
![photo caption](./article-photo-1.jpg)
```

11. 最後，在 Terminal 測試網頁能否成功建立，如成功的話將可以上傳。否則需要降錯看哪個檔案有誤。

```
gatsby build
```

## 利用 Github 同步程式碼

Git 是一個程式碼版本控制的流程，Github 就是採用這技術的其中一個平台。我們使用 Github 將電腦、伺服器的程式碼同步，才做到修改內容可於網頁上見到改變。

12. 在 Github 選擇 Add an Existing Repository from your Hard Drive，然後選擇 gatsby-starter-lumen 一資料夾。

![](/media/1_n2mf_wdSPqyuy6qHeap9Tg.png)

13. 左下角 Summary 輸入 “Initial Commit” 然後按 “Commit to Master” ，再於頂欄選擇 Publish Repository ，Repo 便會上傳到 Github.com，你在 Project Settings 設定該 repo 是公開還是私人。

![](/media/1_vywzcwZWf25qL4sW4cccXA.png)

# 利用 Netlify 將網頁自動發佈

14. 若 Source Code 已上載到 Github，便可以 Netlify 設定作自動發佈。到 [Netlify 網頁](https://www.netlify.com/)，然後用你的 Github 帳戶授權登入。

15. 按指示[安裝 Netlify App](https://github.com/apps/netlify) 到 Github。你可選擇授權所有 Github 的 Repo 或指定的 Repo。

16. 然後 Create A New Site，選擇 Github 後應找到自己的 Repo。

![](/media/1_lpAiJW61PfNg-rP_mf2LmA.png)

17. 選擇 Master Branch 去 Deploy，其餘的 Build Settings 也是預設。的按 Deploy 後等候數分鐘，我們的網頁便大功告成！

![](/media/1_lpAiJW61PfNg-rP_mf2LmA.png)

![](/media/1_YdqZZgEYbg6CZN0CUo9qVA.png)

## 關於 Master Branch 的設定

留意現時本機的設定是發佈到 Master Branch ，即所有更改將直接透過 Netlify 發佈。這個做法是比較危險的，Best Practice 應是建立新的 Develop Branch，然後用 Merge Request 的方法將修改經測試後才併入 Master Branch。

如已在 Github 安裝 Netlify App，它每次 Pull Request 也會讓你可以 Preview 測試是否成功。

![](/media/1_WKc7pmL67eML__EQ0zJIvA.png)

## 關於 Netlify CMS 的設定

如只是更新內容，Lumen 這個 starter 的好處是已經直接支援 Netlify CMS，意思是可於網上直接修改及新增網頁內容。

1.  在 Netlify 的 Site Settings > Identity > Services 啟用 Git Gateway
2.  到 Netlify 網頁的 Identity 頁新增用戶，然後輸入自己的電郵，建立帳戶。
3.  郵箱待一會收到電郵，便可以設定密碼。

![](/media/1_Q_KAumaqw2U16AxvGIMsMg.png)

4. 後台網址是你的網址再加/admin，輸入電郵和密碼繼續。

[https://heuristic-colden-e715d4.netlify.app/admin/](https://heuristic-colden-e715d4.netlify.app/admin/#/)

5. 登入後就可以修改網頁內容，每次 Publish 將會重新 Build 網頁一次。

6. 記得在 Site Settings > Identity > Registration 設定只限註冊是 Invite Only 否則任何人也可以自由修改內容。

## 總結

這次示範開站，近 17 個步驟，零成本，幾乎是零 Code 的更改（只修改了網站內容及自訂文字）。再改下去便已經要對 Gatsby 、React 有一定認識（如 contact 沒有 medium 怎麼辦）。

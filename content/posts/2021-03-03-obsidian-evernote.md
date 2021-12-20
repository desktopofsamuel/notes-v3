---
template: post
title: Obsidian 上手及使用 Git 跨平台同步
slug: Obsidian上手及使用Git跨平台同步
date: 2021-03-03T16:00:00Z
category: '桌面'
socialImage: '/media/obsidian-screenshot.png'
tags: ['Obsidian', 'Evernote', 'Git', 'Productivity', '筆記']
---

> 更新：2021 年 7 月終於推出了 [Obsidian 的 Mobile App](https://obsidian.md/mobile)，同步功能只支援 Obsidian Sync 和本文章介紹的 Git (輔以 Working Copy)。iCloud、 Google Drive 等雲端服務則暫未支援。

## 前言： 不捨得用了 11 年的 Evernote

一直都在尋找 Evernote 的替代品，畢竟功能上已被競爭對手超越太遠了。不過，念著用了 11 年的感情，以及試過幾個 App 還是有些痛點（Bear 仍未有 Web 版本，Notion 速度太慢、block-based 對寫作來說不算方便），再加上 Evernote 上年新推出的 Revamp，令我至今還未轉到新的平台。

## 直到 Obsidian 的出現

![Obsidian 擷圖](/media/obsidian-screenshot.png)

Obsidian 是 2021 年初的新嘗試，Obsidian 是一個十分 Indie 的筆記應用，與 Evernote 相比之下，有很多自訂選項和彈性。社區主導的關係，它很多功能也是由第三方開發者開源製作。幾個最吸引的特點如下：

### 1. Markdown 支援

Obsidian 的所有筆記以 Markdown 格式儲存，Markdown 是近年來大熱的標記語言，以易讀的符號標示文章的不同格式，如 Bold、Italic、大小標題、引文等等。Notion 、Bear 等也使用 Markdown 語法。另外，Obsidian 也用雙引號`[[Example]]`標示內部的互文。使用 Markdown 也方便我上載相關檔案到 [Gatsby 網誌](https://notes.desktopofsamuel.com/posts/%E8%AB%87%E5%86%8D%E6%95%B4%E7%90%86%E8%87%AA%E5%B7%B1%E7%9A%84%E6%96%87%E7%AB%A0%E4%B8%8B-%E7%94%A8Gatsby%E5%92%8CNetlify%E5%BB%BA%E7%AB%8B%E5%85%8D%E8%B2%BB%E7%B6%B2%E8%AA%8C)。

### 2. 自訂主題、UI 、Plugin 以及 CSS

![Obsidian 可自訂顏色，還可支援 Dark Mode](/media/obsidian-theme.png)

Obsidian 安裝 Plugin ，可以簡單增加方便功能。設定當中，亦可選不同的社區製作的顏色主題，配色想自己動手來的話，甚至可以自行寫 CSS 來修改，自訂度滿分。此外，視窗介面（如 Sidebar、Editor、Graph View、Tags 等等）亦可以自行 Drag & Drop，可以自己介面自己砌。

### 3. 自訂雲端同步

Obsidian 的筆記全部以 .md 格式儲存於用戶指定的資料夾（名為 Vault ），並非封閉，所以可以自行用其他程式修改。換言之，用戶可以自由選擇檔案夾的位置，簡單放在 Google Drive 或 Dropbox 就可以進行最簡單的備份和同步。下文再簡介較安全以 Git 的同步方法。

### 4. 免費

開放及社區主導的特質，讓 Obsidian 可以免費下載。功能最相近的軟件是 Roam Research，設定比較簡單，不過需付月費 USD$15。相比之下，Obsidian 略為複雜，但卻是免費，只有使用 Publish 和 Sync 兩個增值服務才需付費。

### 5. Zettelkasten 卡片盒筆記法

![一篇筆記非獨立成文，而要建立一個知識網，可以互相連結](/media/graph-view.png)

最重要未提到的，是 Obsdian 背後的重要理念 — Zettelkasten 卡片盒筆記法。卡片盒筆記法是以索引 Index 串連卡片般大的筆記，不同關鍵字互相連結成一個網狀的結構。以往 Evernote 只能用列表形式瀏覽屬於同一標籤的筆記。Obsidian 卻有 Graph View 網型關係圖，顯示不同筆記之間的關係。標籤不再是單向的連結，而是透過網型關係建立雙向的知識庫。

## 兩個月後：新 Workflow 的簡介和用後感

考慮到 Obsidian 的 Zettelkasten 哲學，直接由 Evernote 轉移所有筆記過來未必是最有效的做法，暫時我的做法是多一層過濾，只把最重要的學習、思考和寫作放在 Obsidian 。另一重點是拆散原本很長的筆記，加入關鍵字、主題和人物，便可集結成知識系統。

現時使用 Obsidian 仍然是過渡期，Evernote 還是乖乖的付費，稍後再決定是否轉用。於我而言，Evernote 收集和瀏覽功能仍較出色和方便。Evernote Clipper 支援大部分瀏覽器，還可以自訂收藏網頁的格式，例如整頁網頁、節錄或簡約文章等等，非 Obsidian 可直接比較。

再者，使用 Google Drive 或 Dropbox 同步 Vault 所在的資料夾，不是 100%安全，我亦曾試過於 iCloud Drive 修改一篇筆記，結果被另一平台的舊版本覆蓋而失去一整篇文章，所以我只能推介以下的做法，示範用 Git 同步 Obsidian。

## 如何使用 Git 為 Obsidian 跨平台同步筆記

Obsidian 本身有額外的付費服務 [Obsidian Sync](https://obsidian.md/sync)（現時收費每月 USD\$ 4)，可以輕鬆設定同步。不過，現時 Obsidian 只有桌面版本（Windows, macOS, Linux），手機版本仍在開發中，Sync 未能於手機上使用，月費並不划算。不過，這不代表手機上無法讀寫 Obsidian 的筆記。

先前所言，由於 Obsidian 可自訂 Vault 的位置，加上本身使用 Markdown 檔案格式，只要用雲端服務（如 Dropbox, Google Drive 或 iCloud Drive）同步整個資料夾，就可以配上 Markdown 編輯器，如 [iA Writer](https://ia.net/writer), [Ulysses](https://ulysses.app/), [Pretext](https://apps.apple.com/us/app/pretext/id1347707000) （需支援 iCloud Drive 的直接修改 Edit In) 功能） 來讀寫筆記。不過 Obsidian 的互文 Link 和 Tag 功能就暫時不能使用。

不過！雲端服務雖然簡單易用，不過這些服務非專為筆記及文章同步而設，一旦遇到重覆、版本問題，很容易會失去資料，所以今次向大家推薦使用 Git。要留意，如有安全考慮，最好就不要使用此方法。Obsidian 的筆記檔案其實沒有任何加密，才可以開放予不同平台讀取和修改。

### 甚麼是 Git?

![](/media/git-branches-merge.png)

Git 是軟件工程師用作同步及版本控制程式碼的軟件。正因為它可以比較版本和不同文字檔，讓我們可以追蹤所有變化，不用擔心有任何閃失，而且大多 Git 的桌面平台都是免費的（手機版本則大多需要一次性付費），不用擔心這個做法會失效。

注：本教學頭 3 步驟均是為 Vault 建立 Github Repository，本教學將避免使用 Command Line，讓一般用家也可以簡單設定。對 Git 已有一定認識的朋友，為 Vault 初始 Git 後，可直接跳到第 4 步繼續。

### 1. 註冊及下載 Github for Desktop

先到 [Github.com](https://github.com/) 註冊帳戶，我們將會透過 Github 同步所有筆記。記得設定 Two Factor Authentication 讓帳戶更加安全。然後，下載及安裝 [Github for Desktop](https://desktop.github.com/)，這是 Github 的介面應用，讓我們可以不需 Command Line 進行大部分步驟。

### 2. Github for Desktop 為 Vault 增加 Git 設定

假設你已有建立 Obsidian Vault，我們需為 Vault 添加 Git 的設定，讓稍後的 Plug-in 直接開始上載 。打開 Github for Desktop，選 "Add an Existing Repository from your Hard Drive"。

![Github for Desktop 的初始畫面](/media/obsidian-github-desktop.png)

然後選擇你 Vault 所在的位置，Git 將以 .dotfile 的形式存於 Vault Folder 當中主目錄中（在 Mac 可以按 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd> 去顯示，或於 Windows Settings 顯示隱藏的檔案），這時候會有警告說明 Folder 尚未成為 Git Repo，按 "Create A Repository"繼續。

![留意 Git 需要儲存於 Vault 的主目錄，而不是子目錄當中。](/media/obsidian-github-create-repo.png)

簡單填下 Name 和 Description 等資料。Local Path 已經自動填上，Git Ignore 和 License 都不用理會，就可以 Create Repository。

![只有 Name 一欄是必填](/media/obsidian-github-config.png)

（你亦可以一開頭直接按 Create a New Repository，不過 Github 會自動以 Name 建立 subfolder 為 Git Repo，不是我們想要於同一 folder 當中建立，所以要選上一層 Folder 而 Name 要跟 Vault Folder 同名）。

### 3. 登入及上傳 Vault 到 Github

這時候我們只是在電腦上完成建立 Git 的設定，加上 Commit Message （如 Initial Commit）後，然後按 Publish Repository 才會上傳到 Github。這時候，我們其實還未登入第 1 步註冊的帳戶，就按 Github.com 返回瀏覽器登入。

![記得選 "Keep this code private"](/media/obsidian-github-login.png)

登入後再按一次 Publish，這次便會提示要輸入 Github 的 Repo 名（跟第 2 步一樣）和選擇 Repo 是否私人（預設是公開）。最後按 Publish Repository。當 Publish Repo 變成 Fetch Origin ，表示你已經成功上傳 Vault 到 Github 了！

![成功上載到 Github](/media/obsidian-github-website.png)

### 4. 安裝 Obsidian Git

![打開 Obsidian 左下方的 Preference，選Community Plugins](/media/obsidian-preference-plugin.png)

打開 Obsidian 左下方的 Preference，在 Community Plugins 一頁先關掉 Safe Mode，就容許你安裝 Plugin。由於 Plugin 有能力修改 Vault 的內容，試玩不同 Plugin 前可預先備份。 Browse 中搜尋 Obsidian Git，就可以直接安裝。安裝後需要同一頁啟用，這個 Plugin 就能將你的 Vault，定時備份到 Github 上。

![Obsidian Git 的設定頁](/media/obsidian-git-config.png)

安裝及啟用後，左方將出現 Obsidian Git 的設定，我有以下的建議：

- 將 Vault 備份時間改為 5 分鐘 (Backup Interval: 5)
- 每次打開軟件也從 Github Pull 所有的變更 (Pull updates on startup: ON)
- Commit Message 增加電腦名稱以便識別 (Commit message: 開首加電腦名稱）
- 以及最重要的關掉 Disable Push（Disable Push: OFF)，才會自動把所有 Commit 推送到 Github 上，讓其他裝置可以同步。

![Hotkeys 搜尋 Git 可為 Plugin 增加快捷鍵](/media/obsidian-plugin.png)

同時，我亦於 Hotkey 增加 Obsidian Git 的快捷鍵，方便轉換電腦上載更新。 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>+</kbd>直接 Commit，<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>-</kbd>從 Remote Pull 所有變更。

然後，嘗試增加新的一頁筆記，等候一會或直接用快捷鍵就會直接 Commit，在 Github 上查看，就會見到新檔案更新的日期。同步就大功告成了！

![Github 上就可見 Obsidian Git 推送的更新](/media/obsidian-github-updated.png)

### 5. 於電腦或電話同步使用 Obsidian

只要在另一部電腦，同樣下載及安裝 [Github for Desktop](https://desktop.github.com/)，然後登入， Clone 自己剛上載的 Repo ，然後做回第四步一樣的 Obsidian 設定，電腦就有同步的資料庫。

手機方面，我們需借助第三方支援 Git 的 App 才可以讀寫筆記：

- 如只需閱讀，[Github 官方應用](https://github.com/mobile)已可以直接瀏覽所有 Repo
- 讀寫的話，[Working Copy](https://workingcopyapp.com/) 可以 Pull 整個 Repo 下來，付費版（一次性 HKD\$158）可推送任何修改到 Github 上，使用 Pretext 或 iAWriter 等更可完美支援 Markdown 語法。

## 遇到同步問題，要如何解決？

即使設定了更頻繁的同步，仍有機會因不同裝置的版本不一樣，而發生同步的問題，如下圖。這時我們便需要打開 [Github for Desktop](https://desktop.github.com/) 解決問題。

![Obsidian Git 錯誤的指示不太清晰，不過打開 Github for Desktop 就會顯示問題在哪](/media/obsidian-sync-error.png)

大多情況，Github 也是會建議暫時藏起（Stash）本機有衝突的檔案，待與 Github 同步後，再 Apply 原有的更改。見下圖，先 Stash & Continue，然後按 Pull Origin，同步後再中間按 View Stashed，就可以按 Restore 回復原先收起的變更，最後手動 Commit 和 Push 一次就完成。如同步問題出現於同一句子，可能要手動於 Obsidian 刪去不需要的版本。

![Stash Changes 可將有同步問題的更改藏起，同步後再回復](/media/obsidian-github-stash.png)

## 結語：

現時我使用 Obsidian 還是初哥，很多功能還未有好好的善用。現時還是將一整篇文章放在 Obsidian 時，也未有好好建立卡片筆記。另外，Plugin 也引入了很多 Productivity 的貼心功能，如 [Day Planner](https://github.com/lynchjames/obsidian-day-planner)，可以結合時間日程成為個人的 Task Manager 和筆記本，這些功能亦十分值得探索。

![Day Planner 示範以時間表格式的筆記](https://raw.githubusercontent.com/lynchjames/obsidian-day-planner/main/images/day-planner-note-preview.png)

不過，Obsidian 的設定、自訂也是有一定的 Learning Curve ，未必適合務求方便、快捷的朋友。如果大家有任何設定的問題，我也十分樂意解答，再有更多得著會跟大家分享！

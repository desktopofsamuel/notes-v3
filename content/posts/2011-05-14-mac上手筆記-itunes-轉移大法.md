---
title: '【Mac上手筆記】iTunes 轉移大法'
slug: 'mac上手筆記-itunes-轉移大法'
date: '2011-05-14'
template: post
draft: false
category: '桌面'
tags:
  - Mac上手筆記
  - iTunes
socialImage: '/media/mac-itunes-transfer.jpg'
---

最近一星期有點兒忙，無法及時分享我遇到的趣事和難題。其實轉用 Mac 對我來說還是一大工程，首先，我並非由 Windows 轉至 Mac，而是兩者共用，所以我既要兼顧 Windows 和 Mac 兩方面。

![](/media/mac-itunes-transfer.jpg)

當務之急要轉移的是 iTunes，Windows 的 iTunes 數月來不時會自動關閉，令到同步 iPhone, iPad 時並不順利，再者，iTunes 內音樂、影片等都是我重要數據，透過轉移 iTunes，我七成的資料已經轉到 Macbook Pro 裡。

以往我重裝電腦，往往我都是直接 Copy iTunes Music Folder，再於新作業系統開啟舊的 iTunes 資料庫[前提是有 Consolidate 所有檔案]，所以比較簡單。但是，當你由 Windows 轉 Mac 時，主要面對的問題是

1. 所有檔案的 Path 不同 [Windows 有 C, D Drives 出現於每個 iTunes Library 的 xml 裡，而 Mac 則沒有，若以我上述方法 Copy and Paste，所有歌曲將不能找到]

2. 中文歌曲亂碼

我 Google 了好幾個方法，卻部分成功

## 方法 1

1. 於 File – Library – Organize Library 中點選 Consolidate Files 和 Reorganize Files
2. Copy 整個 iTunes Folder [應在我的音樂裡的 iTunes]
3. 使用 TextWrangler 等 Text 修改軟件，使用 Find & Replace 功能，將所有檔案的路徑更改 (Eg. 由 file://localhost/D:/Music/iTunes/Music/ 改為 file://localhost/Users/你的名字/Music/iTunes)
4. 於 iTunes 載入時長按 Option 鍵，新視窗將要求你選擇資料庫，按你新的 iTunes Folder 中唯一可按的檔案。

我第一次嘗試時，只載入了很少部分的歌曲，只有 5GB [原本有 30GB]，第二次嘗試時也是不齊，再者我又發現中文歌曲全部亂碼，所以我找了第二個方法。

## 方法 2

其實網上是有軟件作轉移 iTunes 的用途，我用了 Copytrans Tuneswift，使用方法很簡單，各自在 Windows 和 Mac 中安裝其軟件[下載：Windows] [下載：Mac]，其網頁有點複雜，特意提供直接下載網址。介面十分簡單，在 Windows 上有三個按鍵，Transfer, Backup, Restore。按 Transfer，然後軟件會提示你關閉開啟中的 iTunes，然後讓你選擇資料庫轉移至的地方[我選 External Hardisk]。複製後，於 Mac 的 Tuneswift 中按下 Restore，全部檔案成功回復。

唯一我不明白的是亂碼問題，不知是首次轉移遺漏下來，還是 CopyTrans 的問題，我的中文歌還是亂碼的，雖然網站標明它支援繁簡中文，所以我另外下載了 ID3MOd2 的軟件，已經找不到當時下載的 link 了，想要的 email 我吧。將 MP3 內的 id3tag 改回 Unicode。

雖然有些檔案不知是否錯手按了兩下，未能轉回繁體中文，但只屬少數，只有數十首不常聽的歌曲。
現在我的 iTunes Library 又重新回來了！

ps. 若你還有 iPhone, iPad 等 Apple Devices，請記得於轉移前先同步一次，於轉移再同步[有機會 iTunes 全說 iPhone 只能同步一個資料庫，按 Erase & Sync，沒有甚麼會不見的，因為你剛做了 Backup 嘛]

ps2. iTunes Store 的 Acoount 只能 Authorize 5 個 Account，若你舊的電腦不再用，記得於 Store – De-authorize Account 中將.你的資料庫與 iTunes Account 脫勾。

其實，以上都是一些心得，也是每位新手使用 Mac 和 iTunes 時必定遇到的難題，希望可以解決各位的疑惑，但以上方法還是有機會令 iPhone 內資料全失，造成任何數據損失，本人恕不負責。

---
template: post
title: 如何在電腦上看 4K Netflix？
slug: 如何在電腦上看-4K-netflix
draft: false
date: 2021-05-28T07:19:51.690Z
category: 桌面
socialImage: /media/thibault-penin-AWOl7qqsffM-unsplash.jpg
tags:
  - 4K
  - Netflix
---

![Netflix 4K插圖](/media/thibault-penin-AWOl7qqsffM-unsplash.jpg)

如何可以看 4K 的 Netflix ？如果在電視，只要購買 4K 電視，用內置 Netflix App 或接駁至 Console 或 Apple TV 就可以。但原來「如何在電腦上看 4K Netflix？」這個問題比想像中「買一個 4K 螢幕」其實複雜很多。

## Netflix 帳戶設定

不論觀看裝置，Netflix 先要作以下設定，才可以串流播放 4K 影片。

1. Netflix 所選計劃需要支援 Ultra HD （現時為最貴 HKD\$ 93 的 Premium Plan）
2. 觀看用戶的 Playback Settings 中，Data Usage per screen 需要預先選擇 Auto 或 High

![Netflix 帳戶設定裡的Playback Settings，Data Usage 要選 Auto 或 High](/media/4k-netflix-1.png)

## 網速限制

![網速需要達到25Mbps 或以上](/media/4k-netflix-2.png)

Netflix 對網速也有限制，需要最少 25Mbps 或以上。

3.  使用 Netflix 旗下的 [FAST 測速](https://www.fast.com/)，結果需高於 25 Mbps。

## 使用 macOS

如果使用 macOS 的話，要判斷是否支援 4K 就簡單得多。Netflix 的要求是：

- 只要更新至 macOS 11.0 (Big Sur) 或以後的作業系統
- 內置 Apple T2 晶片的電腦，據[分析](https://www.theverge.com/2020/10/1/21497093/netflix-4k-apple-macos-big-sur-t2-security-chip) T2 安全晶片同時具備解碼 Codec 之用，簡單來說就是 2018 年後推出的所有 Mac 電腦，詳細可看[蘋果官方列表](https://support.apple.com/en-us/HT208862)，留意新 M1 晶片已內置 T2 功能，所以也同時支援。
- 若非 iMac，使用 USB-C 轉插 （需支援 4k60Hz）輸出到螢幕 4K 60Hz
- 使用 Safari （非 Chrome 或 Firefox 等其他瀏覽器）上 Netflix 網頁就可以觀看

## 使用 Windows

Windows 砌機的話，需要排除顯示卡、線材、螢幕、軟件導致出問題就更加複雜，不過首先打開 Windows 的顯示設定，或顯示卡的設定軟件，確認輸出畫面合乎要求。

![我使用的 GTX1070，原本設定只可選 30Hz，要轉用 HDMI 2.0 的線才出現 60Hz](/media/4k-netflix-3.png)

4.  螢幕輸出需要支援 4K (3840 x 2160, 60Hz)
5.  HDMI 線應是 2.0 或以上（HDMI 1.4 只支援 4k 30Hz）
6.  如有需要，安裝 [HEVC 影像解碼器](https://www.microsoft.com/en-us/p/hevc-video-extensions-from-device-manufacturer/9n4wgh0z6vhq)
7.  解碼方面，Netflix 支援處理器解碼或顯示卡解碼，所以二選一，CPU 需要 Kaby Lake 或以後的型號或 Nvidia 1050 或以上的顯示卡。
8.  使用 Microsoft Edges 上 [Netflix](https://netflix.com) 網頁播放，或於 Microsoft Store 下載 [Netflix App](https://www.microsoft.com/en-us/p/netflix/9wzdncrfj3tj?activetab=pivot:overviewtab) 播放

## 播放 4K 影片

![現時少於一半 Netflix 影片支援 4K，先於 Netflix App 搜尋 4K 類別影片，否則選錯了成功轉成 4K 也不知道](/media/4k-netflix-4.png)

由於 Netflix 本身可自動偵測支援的最高解像度，即使已輸出到 4K 螢幕，先前提及的八個步驟未做足也有機會顯示 HD 而非 Ultra HD。所以先搜尋 4K，然後右方 Suggestions 中點選支援 4K 格式的影片，便知道該類影片直到見到由 HD 轉為 Ultra HD 才是成功。

![Netflix 本身可自動偵測支援的最高解像度，未支援前會顯示 HD，成功的時候會轉為 Ultra HD](/media/4k-netflix-5.png)

你亦可以開始播放後以 Ctrl + Shift + Alt + Q 打開 Debug 模式，Playing Bitrate 一行將顯示現時串流的畫質。
![或透過 Debug 資訊查看串流的解像度](/media/4k-netflix-6.png)

## 我仍未能播放 4K，怎麼辦？

如果你以上八個步驟都已經做齊，我也是到了這一步，試了幾條 HDMI 線，出街買多一條新線，差一點就要放棄的時候，發現 Netflix 的另一隱藏要求是支援 HDCP 2.2。

HDCP 是保護版權的一個制式，全名為 High-Bandwidth Digital Content Protection，防止有人以影像輸出的形式擷取或複製內容，而這機制是要**播放**及**接收**兩邊均需支援 2.2 版本才可以支援 4K 播放，否則訊號會降至 1080p。

![Nvidia Control Panel 其中一個選項是 HDCP 偵測，不過未有版本資訊，導致我兩個螢幕也支援也未能看到 4K。](/media/4k-netflix-7.png)

如果你的螢幕有多於一個 HDMI 插頭，機背可能有標示哪一個才支援 HDCP。可是，我的 Nvidia Control Panel 均顯示兩個螢幕也支援 HDCP，但未有顯示支援版本。不過，這時候我發現如果沒有接駁第二螢幕的話，4K 就出現了！這可能是第二螢幕較舊， HDCP 版本未支援到 2.2 版本，所以就不支援 HDCP ，訊號直接降回到 HD。

所以大家不妨試試只使用單螢幕，看看 Netflix 會否提升至 4K ，你亦可以下載這個 [Cyberlink](https://www.cyberlink.com/prog/bd-support/diagnosis.do) 的檢測軟件，同樣可以檢查 HDCP 是否支援。

搞了那麼久，終於可以在 Netflix 享受到 4K，雖則現時方案並不完美，要手動關掉另一螢幕，但起碼知道問題出在哪裡。也趁這機會寫下一篇文章教學和心得，希望幫到大家！

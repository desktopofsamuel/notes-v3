---
template: post
title: Gatsby 個人狀況自動更新，整合Spotify 音樂、Letterboxd電影、書本紀錄！
slug: gatsby-個人狀況自動更新-整合spotify音樂-letterboxd電影-書本紀錄
draft: false
date: 2021-08-21T07:19:51.690Z
category: 桌面
socialImage: /media/auto-update-cover.jpg
tags:
  - Gatsby
  - React
  - Spotify
  - Letterboxd
  - 個人網站
---

網頁小更新！幾個月前重新寫過整個[網站](/posts/二零二一-夏/)（雖然看起來完全一樣，不過內裡是從頭寫過的！），今個月終於加了新內容於主頁上。這次整合了幾個我常用的媒體服務，讓我不用再手動在 [About](/pages/now)更新最近在看的書、電影和音樂。

網上不少 creator 的個人網頁也有更加先進的整合，如 [Fabrizio Rinaldi](https://www.fabrizio.so/) 整合了自己網頁的即時使用數據和個人 Project 的每月收入；[Nev Flynn](https://nevflynn.com/)，也在網頁會即時顯示自己正在聽的歌和現在位置。這次也向他們偷師，顯示我最近的音樂、電影和書本資訊。

![網誌主頁現在更新顯示最近聽的歌、最近讀的書和最近看的電影，全部主動整合到不同媒體平台。](/media/auto-update-dashboard.png)

簡介一下製成品，這次我用了 `gatsby-source-spotify`取得 Spotify 的音樂資料，電影和書本則用`gatsby-source-rss-feed`將各自 [Letterboxd](https://letterboxd.com/samuelisme/) 和[Oku](https://oku.club/user/desktopofsamuel) 的 RSS Feed 轉成我網站主頁的資訊卡，全部也是每次 Build 網頁時擷取各平台的最新資料。如果未用過 Gatsby，可以參考我先前寫過的[兩篇免費建立網誌教學](/tag/gatsby/)。

## Spotify 整合最常聽的歌手和大碟

我們使用 `gatsby-source-spotify`的插件，將可以獲得自己 Spotify Profile 的資訊。這個插件內裡也是 Spotify 自家官方的 API，所以資訊比較多，Personalisation API 中，可以取得用戶不同時限（一個月、六個月、長期）的數據。

- Top Artist：最常聽的歌手
- Top Tracks：最常聽的歌曲
- Recent Track ：最近聽的歌曲

用 Source 插件的好處是所有數據已經以 GraphQL 顯示，不用再自己處理，直接引用即可。加上支援 Gatsby Image，要顯示該歌手的圖片、單曲所屬大碟的資訊也是十分容易處理。

首先安裝插件：

```
yarn add gatsby-source-spotify
```

再於 `gatsby-config.js`加入

```
{
 resolve: `gatsby-source-spotify`,
 options: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET, // Don't add to public repository
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
    fetchPlaylists: false, // optional. Set to false to disable fetching of your playlists
    fetchRecent: true, // optional. Set to false to disable fetching of your recently played tracks
    timeRanges: ['short_term', 'medium_term', 'long_term'], optional. Set time ranges to be fetched
 },
},
```

記得我們需要在 env 檔案中加入 `SPOTIFY_CLIENT_ID`、`SPOTIFY_CLIENT_SECRET`、`SPOTIFY_REFRESH_TOKEN`。Client ID 和 Client Secret 均可在 [Spotify Developer Dashboard ](https://developer.spotify.com/dashboard/applications)中建立一個 App 後可以使用。至於 Refresh Token，參考 [Github 的指示](https://github.com/leolabs/gatsby-source-spotify)，就需要再 Edit Settings 中加入 `http://localhost:5071/spotify`到 Redirect URIs 然後再於 command line 輸入指令，就可以登入 Spotify 授權獲取資訊。

```
 npx gatsby-source-spotify token <clientId> <clientToken>
```

三個 token 都成功取得以後，再次行 `gatsby develop` 後到 `http://localhost:8000/___graphql`就應該會見到 AllSpotifyTopArtist 等 Query。如我想要最常聽的歌手及他們的相片。我便可以 Query 如下。Name 就是 Artist 的名稱，image 用 Gatsby v3 的方法就可以顯示，`external_urls.spotify`就可以用 Link Component 直接打開 Spotify 聆聽。

```
query SpotifyQuery {
  allSpotifyTopArtist(filter: {time_range: {eq: "short_term"}}, limit: 10) {
    edges {
      node {
        name
        image {
          localFile {
            childrenImageSharp {
              gatsbyImageData
            }
          }
        }
        external_urls {
          spotify
        }
      }
    }
  }
}
```

然後建立一個新的 Music component，再用 Static Query 將 Spotify 的資料顯示（因不會變更及 Build 的時候只使用一次）。這裡我 render 了歌手的相片和名字。同樣道理也適用於單曲和大碟上。最後在顯示的頁面 Import `<MusicCard/>` 就大功告成。

```
const MusicCard = () => {
  const data = useStaticQuery(graphql`
  query MusicCardQuery {
     allSpotifyTopArtist(sort: { fields: order }, limit: 10) {
         edges {
          node {
            id
            name
            image {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 160, height: 160)
                  }
                }
              }
            external_urls {
              spotify
            }
          }
        }
      }
    }
  `);

  return (
    <>
      {data.allSpotifyTopArtist.edges && (
        <div>
          <h3>🎧 最近在聽</h3>

          <div>
            {data.allSpotifyTopArtist.edges.map((artist, index) => (
              <div>
                <Link
                  to={artist.node.external_urls.spotify}
                  target="_blank"
                  key={artist.node.id}
                >
                  <div>
                    <GatsbyImage
                      image={
                        artist.node.image.localFile.childImageSharp
                          .gatsbyImageData
                      }
                      alt={artist.node.name}
                    />
                  </div>
                </Link>

                <p>{artist.node.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MusicCard;
```

## Letterboxd 整合我的電影觀看紀錄

Letterboxd 是我很愛使用的電影平台，資料齊全，社群也十分活躍。雖然未有正式 API 開放，但本來它們為用戶提供的 RSS 也足夠使用。每個用戶本身也附有 RSS 的鏈結，網址是`https://letterboxd.com/{username}/rss/`。如果用 Feedly 等 RSS Reader 可閱讀，本身 RSS Feed 已經有齊電影名、評分、海報、觀看日期等資訊。不過我們需要手動調整需要的資訊。

![用 Feedly或其他 RSS Reader已經可以預覽 Letterboxd 提供的 RSS Feed ](/media/auto-update-rss-feedly.png)

`gatsby-source-rss-feed` 這插件就是為 RSS Feed 而設，每次 Build 網頁的時候都會讀取 Feed 的內容。

```
yarn add gatsby-source-rss-feed
```

安裝後，我們在 `gatsby-config.js` 中加入：

```
 {
    resolve: `gatsby-source-rss-feed`,
    options: {
    url: `https://letterboxd.com/samuelisme/rss/`,
    name: `Letterboxd`,
    parserOption: {
        customFields: {
            item: [
            'letterboxd:watchedDate',
            'letterboxd:memberRating',
            'letterboxd:filmTitle',
            'letterboxd:filmYear',
            'description',
            { includeSnippet: true },
            ],
        },
    },
    },
 }

```

這 Source 插件同樣地也會轉化成 GraphQL 的 Query。當中也支援 Custom Fields 自訂欄位，參考 RSS Feed 源碼的欄位，可以加入自訂欄位。我也命名了 RSS Feed 的名稱為 "Letterboxd"，重啟 `gatsby-develop`後，`http://localhost:8000/___graphql`就會見到 AllFeedLetterboxd。

![讀取成功的話，GraphiQL就可以見到該 Feed 轉成 GraphQL 的欄位，可以簡單地建立所需的 Query。](/media/auto-update-graphql.png)

同樣地選擇所需的欄位，就可以自行加入到 Static Query。

> Static Query 與一般的 Page Query 不同（如每篇 blog 的 template），靜態的意思是不接受 variable，由於我們從不同 Source Plugin 取得的資訊也是恆定不變，與正常網誌的 Blog post / Blog list 範本不同，所以可以使用更快更有效的 Static Query。

```
query MovieCardPage {
	allFeedLetterboxd(limit: 5) {
		edges {
			node {
				id
				title
				letterboxd {
					watchedDate
					memberRating
				}
				content
				link
			}
		}
	}
}
```

### 如何顯示海報？

由於海報是以 HTML 的形式放在 RSS Feed 的 content 裡，這裡需要少許功夫才刪淨相片的鏈結。

```
"content": " <p><img src=\"https://a.ltrbxd.com/resized/film-poster/3/6/9/8/3/5/369835-the-suicide-squad-0-500-0-750-crop.jpg?k=86bb8db581\"/></p> <p>Watched on Friday August 13, 2021.</p> "
```

我寫了個簡單的 function，將自動搜尋`<p>` close tag 的位置，然後刪淨相片的鏈結，另外將相片的大細修改（由 500px x 700px 改為 200px x 300px），提高載入速度。

```
function rssParser(htmlString) {
 let imgLink = null;
 const searchTerm = `\"/></p>`;
 const imgTagPosition = htmlString.indexOf(searchTerm);
 const elements = htmlString.slice(14, imgTagPosition); // Delete string after the img tag
 imgLink = elements.replace('0-500-0-750', '0-200-0-300'); // Load a smaller image
 console.log(imgLink);
 return imgLink;
 }
```

最後的版本是這樣的

```
const MovieCard = () => {
	const data = useStaticQuery(graphql`
		query MovieCardPage {
			allFeedLetterboxd(limit: 5) {
				edges {
					node {
						id
						title
						letterboxd {
							watchedDate
							memberRating
						}
						content
						link
					}
				}
			}
		}
	`);

	return (
		<>
			{data.allFeedLetterboxd.edges && (
				<div>
					<h3>🎬 最近在看</h3>

					<div>
						{data.allFeedLetterboxd.edges.map((movie, index) => (
							<div key={movie.node.id}>
								<Link to={movie.node.link} target="_blank">
									<img
										src={rssParser(movie.node.content)}
										alt={movie.node.title}
									/>
									{/* <Text>{movie.node.title}</Text> */}
								</Link>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default MovieCard;
```

最後在顯示的頁面 Import `< MovieCard/ >`就大功告成。

## Oku 整合我的閱讀紀錄

Oku 是新的閱讀分享平台，跟 Goodread 差不多，不過使用 Oku 的好處是，它不同閱讀狀態都有獨立的 RSS Feed，所以比較容易處理，可直接使用 Reading 的 RSS Feed 就可以。

我們同樣也是用`gatsby-source-rss-feed`引用 Oku 的閱讀紀錄。可惜的是 Oku 暫未支援於 RSS 顯示封面。Oku 的 RSS 鏈結少許 tricky，感謝網友分享，在 Reading Collection 一頁，原來 View Source 就會看到自己的 RSS 鏈結。而我的是`https://oku.club/rss/collection/UfVaj`。

![](/media/auto-update-oku-source.png)

然後做的事跟 Letterboxd 一樣，於 `gatsby-config.js`複雜多一個 option，然後修改 URL 成自己的 RSS Feed。重啟 `gatsby-develop`後，`http://localhost:8000/___graphql`就會見到 AllFeedOku。

```
 {
    resolve: `gatsby-source-rss-feed`,
    options: {
        url: `https://oku.club/rss/collection/UfVaj`,
        name: `Oku`,
    },
 },
```

同樣用 Static Query 就可以引用書名、簡介、以及書的鏈結。

```
 query BookCardPage {
	allFeedOku {
		edges {
			node {
				id
				title
				contentSnippet
				creator
				guid
			}
		}
	}
}

```

最後在顯示的頁面 Import `<BookCard/>`就大功告成。

```
const BookCard = () => {
	const data = useStaticQuery(graphql`
		query BookCardPage {
			allFeedOku {
				edges {
					node {
						id
						title
						contentSnippet
						creator
						guid
					}
				}
			}
		}
	`);

	return (
		<>
			{data.allFeedOku.edges && (
				<div>
					<h3>📚 最近在讀</h3>

					{data.allFeedOku.edges.map((book) => (
						<div key={book.node.id}>
							<Link to={book.node.guid} target="_blank">
								{book.node.title}
							</Link>

							<p>by {book.node.creator}</p>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default BookCard;
```

## 後話

用 RSS Feed 雖然簡單，不過其中一個缺點是非即時。往往 RSS Feed 更新也有至少幾分鐘的延遲，不過對我這用法沒有太大影響。

Gatsby 先前 2021 年 7 月其實推出了 Functions ，讓 Gatsby 這種靜態網頁也可以經 API 即時獲取最新資訊，不過至今未有太多教學，下一步值得一試是改用 Gatsby Functions 直接與 Spotify API 對話，擷取即時資訊（如我正在聽甚麼歌）。現在用 Gatsby 的 Source 插件，只有在 Build 網站時才更新一次資訊。（個人來說來也是一件好事，鼓勵自己不斷寫作才會更新網誌，當然你也可以自行設定 Webhook 自動定時 Build 網站）。

如 Demo Code 裡有任何問題和建議也可以[向我提出](https://twitter.com/desktopofsamuel)，以上的 code 簡化關係，我也刪走所有 style，但想參考我用 Chakra UI 的話可以到 [Github](https://github.com/desktopofsamuel/notes-v2)。

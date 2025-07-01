import Layout from "@/components/Layout";
import { UnorderedList, ListItem, Heading, Wrap, Text } from "@chakra-ui/react";
import Entry from "@/components/Entry";

const Changelog = () => {
  return (
    <Layout title="更新日誌 Changelog">
      <Heading as="h1">更新日誌 Changelog</Heading>
      <UnorderedList>
        <Entry
          title="更新到 Next 14"
          description="支援 Next v14，以及修正了codeblock pre的style "
          date="2023-11-29"
          commit="15517d5b1c4dd6598ebd53818ea3260e02197b57"
        />
        <Entry
          title="Skeleton loading"
          description="為 Now 載入的資料加入 Skeleton Loading"
          date="2022-07-02"
          commit="15517d5b1c4dd6598ebd53818ea3260e02197b57"
        />
        <Entry
          title="v3.0"
          description="繼續活學活用的旅程，Notes 已來到v3的更新，改用了 NextJS，還是在用 Chakra UI。自訂 API 和 SWR 讓 Now 一頁自動更新，不用再等網誌更新才再 Build。訂閱表格轉回新的 RSS Newsletter。"
          date="2022-01-31"
          commit="15517d5b1c4dd6598ebd53818ea3260e02197b57"
        />
        <Entry
          title="新增近期 Now"
          description='<p>主頁加了最近聽的音樂、看的電影和書籍，最方便的是自動從 Spotify 、Letterboxd 等平台更新，毋須自動。有興趣的話可看<a href="http://notes.desktopofsamuel.com/posts/gatsby-%E5%80%8B%E4%BA%BA%E7%8B%80%E6%B3%81%E8%87%AA%E5%8B%95%E6%9B%B4%E6%96%B0-%E6%95%B4%E5%90%88spotify%E9%9F%B3%E6%A8%82-letterboxd%E9%9B%BB%E5%BD%B1-%E6%9B%B8%E6%9C%AC%E7%B4%80%E9%8C%84/">教學↗</a></p>'
          date="2021-08-13"
          commit="15517d5b1c4dd6598ebd53818ea3260e02197b57"
        />
        <Entry
          title="訂閱網誌"
          description="新增表格"
          date="2021-07-17"
          commit="8aee3c82c082b0d8d49d69bbd027d73ca4afafee"
        />
        <Entry
          title="科技頁"
          description="側欄的 Navigation 新增了科技頁，集合所有關於製作這網站、科技等的文章。"
          date="2021-07-17"
          commit="4a5170d0c58fcb6492a246a0d69b4cf8e3b76fa9"
        />
        <Entry
          title="v2.0"
          description="Gatsby版本的第一代網誌差不多已用了一年，這次設計改動很小，基本上沿用原來設計再作修改。現在支援 Dark Mode 來了，左方 Sidebar 可自由轉換 Light Mode 和 Dark Mode。另外，因 Chakra UI 支援不同 button 的 state 變得更易辨認，UX 和 Accessibility 也有改善。最後，更新到 Gatsby v3，圖片和網站的載入速度增加了"
          date="2021-07-03"
          commit="03ce8480332109f5d2f663c5e770f03b48664ec0"
        />
        <Entry
          title="Habit Page"
          description=""
          date="2021-07-03"
          commit="03ce8480332109f5d2f663c5e770f03b48664ec0"
        />
        <Entry
          title="v1.0"
          description="使用 Gatsby Starter Lumen 的 Gatsby Blog，匯入過去 Medium 和 Wordpress 的文章"
          date="2021-07-03"
          commit="03ce8480332109f5d2f663c5e770f03b48664ec0"
        />
      </UnorderedList>
    </Layout>
  );
};

export default Changelog;

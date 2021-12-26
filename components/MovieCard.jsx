import { useEffect, useState } from "react";
import Parser from "rss-parser";

const RssFeed = () => {
  const [feed, setFeed] = useState({ title: "", items: [] });

  const rssData = async () => {
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    let parser = new Parser();

    try {
      const feed = await parser.parseURL(
        `${CORS_PROXY}https://letterboxd.com/samuelisme/rss`
      );

      function imageParser(htmlString) {
        let imgLink = null;
        const searchTerm = `\"/></p>`;
        const imgTagPosition = htmlString.indexOf(searchTerm);
        const elements = htmlString.slice(14, imgTagPosition); // Delete string after the img tag
        imgLink = elements.replace("0-500-0-750", "0-200-0-300"); // Load a smaller image
        return imgLink;
      }

      setFeed(feed);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    rssData();
  }, []);

  return (
    <div>
      {console.log(feed)}
      <p>{feed.title}</p>
      {feed.items.slice(0, 3).map((item, i) => (
        <div key={i}>
          <h1>{item.title}</h1>
          <p>{item.content}</p>
          <p>{item.pubDate}</p>
        </div>
      ))}
    </div>
  );
};

export default RssFeed;

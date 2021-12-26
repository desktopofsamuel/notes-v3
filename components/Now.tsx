import Parser from "rss-parser";

type CustomFeed = { foo: string };
type CustomItem = { bar: number };

const parser: Parser<CustomFeed, CustomItem> = new Parser({
  customFields: {
    feed: ["foo"],
    //            ^ will error because `baz` is not a key of CustomFeed
    item: [
      "letterboxd:watchedDate",
      "letterboxd:memberRating",
      "letterboxd:filmTitle",
      "letterboxd:filmYear",
      "description",
    ],
  },
});

function rssParser(htmlString: string) {
  let imgLink = null;
  const searchTerm = `\"/></p>`;
  const imgTagPosition = htmlString.indexOf(searchTerm);
  const elements = htmlString.slice(14, imgTagPosition); // Delete string after the img tag
  imgLink = elements.replace("0-500-0-750", "0-200-0-300"); // Load a smaller image
  // console.log(imgLink);
  return imgLink;
}

async function LetterBox() {
  const feed = await parser.parseURL("https://letterboxd.com/samuelisme/rss/");
  console.log(feed.title); // feed will have a `foo` property, type as a string

  feed.items.forEach((item) => {
    console.log(item.title + ":" + item.link); // item will have a `bar` property type as a number
  });

  return feed;
}

export default function Now() {
  return (
    <div>
      <LetterBox />
    </div>
  );
}

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

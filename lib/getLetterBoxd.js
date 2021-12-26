// import Parser from "rss-parser";

// // type CustomFeed = { foo: string };
// // type CustomItem = { bar: number };

// // const parser: Parser<CustomFeed, CustomItem> = new Parser({

// function imageParser(htmlString) {
//   let imgLink = null;
//   const searchTerm = `\"/></p>`;
//   const imgTagPosition = htmlString.indexOf(searchTerm);
//   const elements = htmlString.slice(14, imgTagPosition); // Delete string after the img tag
//   imgLink = elements.replace("0-500-0-750", "0-200-0-300"); // Load a smaller image
//   // console.log(imgLink);
//   return imgLink;
// }

// export const getLetterBoxd = async () => {
//   try {
//     const parser = new Parser({
//       customFields: {
//         feed: ["foo"],
//         //            ^ will error because `baz` is not a key of CustomFeed
//         item: [
//           "letterboxd:watchedDate",
//           "letterboxd:memberRating",
//           "letterboxd:filmTitle",
//           "letterboxd:filmYear",
//           "description",
//         ],
//       },
//     });
//     const response = await parser.parseURL(
//       "https://cors-anywhere.herokuapp.com/https://letterboxd.com/samuelisme/rss/"
//     );
// const filteredFeed = response.items.slice(0, 5);
// filteredFeed.forEach((item) => {
//   const image = imageParser(item.content);
//   const text = item.title;
//   const link = item.link;

//   return { image, text, link };
// });
// return filteredFeed;

//     if (undefined) {
//       return console.log("Repsonse not defined");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

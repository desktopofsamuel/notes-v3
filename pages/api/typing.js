const cheerio = require('cheerio') // 1

export default async function Typing (_, res) {
  // const $ = await fetchCheerioObject('https://www.keybr.com/profile/q404slv');
  // $('.e8ehu8WCg_WXK9MpD0KO').text(); //=> 'Example Domain'

  const response = await fetch(`https://www.keybr.com/profile/q404slv`)
  const htmlString = await response.text()
  const $ = cheerio.load(htmlString)
  const txt = $('span:contains("Average") + span')
  const searchContext = `span.e8ehu8WCg_WXK9MpD0KO`
  // const followerCountString = $(searchContext)
  //   .text()
    // .match(/[0-9]/gi)
    // .join('')

  const search = $('<span class="dMYAsD9T5irKLIhoPMCA">Average Speed (wpm):</span>')

  const result = search.text()

  console.log(txt)

  return res.status(200).json({  txt  });
};
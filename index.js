const cheerio = require("cheerio");
const fs = require("fs");


// URL of the page we want to scrape
const url = "https://www.mangazure.com/2021/12/the-charm-of-soul-pets-bolum-31.html";
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2',
  });
 
    try {
      const data = await page.content();
    const $ = cheerio.load(data);
      const listItems = $("#root > div.full-page > div.main > div > div.chapter-view > img");
      const chapterTitle = $('#root > div.full-page > div.main > div > div:nth-child(1) > div.chapter-top > div.chapter-head > h1');
      const images = [];
      // Use .each method to loop through the li we selected
      listItems.each((idx, el) => {
        image= $(el).attr('src');
        images.push(image);
      });
     
      var shablon = '<div class="separator" style="clear: both;"><a style="display: block; padding: 1em 0; text-align: center; "><img alt="" border="0" data-original-height="1200" data-original-width="900" src="+images+"/></a></div>';
     var lImage = [];
     var i = 0
     while (images.length > i) {
      var im = shablon.replace('+images+',images[i]);
      var lim = im.replace("'","")
      lImage.push(lim);
      i++
     }


      fs.writeFile("urls.json", JSON.stringify(images,null,1), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Successfully written data to file");
      });
    } catch (err) {
      console.error(err);
    
  }
  
  await browser.close();
})();
// Async function which scrapes the data

// Invoke the above function
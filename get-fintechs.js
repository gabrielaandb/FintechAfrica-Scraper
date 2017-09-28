
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');


fs.readFile('./index.html', (err,data) => {
  if (err) throw err;
  $ = cheerio.load(data.toString());
  var links = $('a');

  var res = {};

  $(links).each(function(i,link) {
    var text = $(link).text().trim();
    var url = $(link).attr('href');
    if (url && url.startsWith('/companies/')) {
      res[text] = `https://2017.fintech-africa.com${url}`;
    }
  })

  console.log(JSON.stringify(res, null, 2))
  fs.writeFile('names.json', JSON.stringify(res, null, 2), err => {
    if (err) throw err;
  })

})

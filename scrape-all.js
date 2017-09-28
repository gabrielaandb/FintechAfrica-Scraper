
const fs = require('fs');
const scrapePage = require('./scrape-fintech-page');


fs.readFile('names.json', async (err,data) => {
  data = JSON.parse(data.toString());
  var res = [];
  for (var company in data) {
    res.push(await scrapePage(data[company], company));
  }

  fs.writeFile('result.json', JSON.stringify(res, null, 2), err => {
    if (err) throw err;
  })

})

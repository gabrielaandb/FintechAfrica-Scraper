
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');


var fintechPage = 'https://2017.fintech-africa.com/companies/easyequities-satrixnow'

var scrapePage = (url, name) => {
  console.log(`scraping ${url}`);
  return new Promise((resolve,reject) => {
    request(url, (err,res,body) => {
      $ = cheerio.load(body);
      $ = cheerio.load($('.company-show-container').html());

      var res = {
        'Name': name
      }

      var data = $('p').text();
      var shortDescription = $('h1').text();
      var extendedDescription = data.split('Name CEO')[0];
      var description = `${shortDescription} \n ${extendedDescription}`;

      res['description'] = description.split('\n').splice(1).join('\n').trim();


      data = data.split('\n').map(i => { return i.trim(); });
      data.map(d => {
        if (!d) return;
        if (d.startsWith('Name CEO')) {
          res['CEO'] = d.replace('Name CEO:', '');
        }
        else if (d.startsWith('Country:')) {
          res['Country'] = d.replace('Country:', '');
        }
        else if (d.startsWith('Website:')) {
          res['Website'] = d.replace('Website:', '');
        }
        else if (d.startsWith('Twitter:')) {
          res['Twitter'] = d.replace('Twitter:', '');
        }
        else if (d.startsWith('Category:')) {
          res['Category'] = d.replace('Category:', '');
        }
      })

      var links = $('a');


      var linkedIn = '';
      $(links).each(function(i,link) {
        var url = $(link).attr('href');
        if (url && (url.startsWith('https://www.linkedin.com') || url.startsWith('https://linkedin.com')))
          linkedIn = url;
      })

      res['LinkedIn'] = linkedIn;

      resolve(res);
    })
  })
}


module.exports = scrapePage;


const fs = require('fs');
const json2csv = require('json2csv');

var fields = ['Name', 'Country', 'Category', 'Website', 'CEO', 'LinkedIn', 'Twitter', 'description'];

fs.readFile('result2.json', (err,data) => {
  data = JSON.parse(data.toString());

  var result = json2csv({data: data, fields: fields})
  console.log(result);

})

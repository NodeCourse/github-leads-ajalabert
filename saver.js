const stringify = require('csv-stringify');
const fs = require('fs');
var path = require("path");

function saveToFile(items){
    let data = [];
    let columns = {
    id: 'id',
    name: 'Name'
    };

    for (var i = 0; i < 10; i++) {
    data.push([i, 'Name ' + items[i].name]);
    }

    stringify(data, { header: true, columns: columns }, (err, output) => {
        if (err) throw err;
        fs.writeFile('results.csv', output, (err) => {
            if (err) throw err;
            console.log('file saved at ' + path.resolve('results.csv'));
        });
    });
}

module.exports.saveToFile = saveToFile;
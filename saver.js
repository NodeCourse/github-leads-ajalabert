const stringify = require('csv-stringify');
const fs = require('fs');
var path = require("path");
var flatten = require('array-flatten')

function saveToFile(results){

    let data = [];
    let columns = {
    id: 'Id',
    name: 'Name',
    url: 'Url'
    };

    flattenResults = flatten(results);

    flattenResults.forEach(result => {
        var users = result.data;
        for(var i = 0; i < users.length; i++){
            data.push([users[i].user.id, users[i].user.login, users[i].user.url]);
        }
    });

    stringify(data, { header: true, columns: columns }, (err, output) => {
        if (err) throw err;
        const filename = 'result.csv';
        fs.writeFile(filename, output, (err) => {
            if (err) throw err;
            console.log('file saved at ' + path.resolve(filename));
        });
    });
}

module.exports.saveToFile = saveToFile;
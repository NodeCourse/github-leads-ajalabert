const stringify = require('csv-stringify');
const fs = require('fs');
var path = require("path");
var flatten = require('array-flatten')

function saveToFile(flattenResults){

    let data = [];
    let columns = {
    id: 'id',
    name: 'Name',
    url: 'Url'
    };

    flattenResults.forEach(result => {
        var users = result.data;

        for(var i = 0; i < users.length; i++){
            console.log(users[i].user);
            data.push([users[i].user.id, users[i].user.login, users[i].user.url]);
        }
    });

    

    // users.array.forEach(user => {
    //     data.push([i, 'Name ' + user.login, 'URL ' + user.url]);
    // });

    stringify(data, { header: true, columns: columns }, (err, output) => {
        if (err) throw err;
        fs.writeFile('results.csv', output, (err) => {
            if (err) throw err;
            console.log('file saved at ' + path.resolve('results.csv'));
        });
    });
}

module.exports.saveToFile = saveToFile;
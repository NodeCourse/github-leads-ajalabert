const program = require('commander');
const octokit = require('@octokit/rest')();
const stringify = require('csv-stringify');
const fs = require('fs');

program
  .version('0.1.0')
  .option('-t, --token [token]', 'Specify your github [token]')
  .parse(process.argv);

if (program.token){
    octokit.authenticate({
        type: 'token',
        token: program.token
    });

    octokit.search.repos({
        q: 'language:c#'
    })
    .then(result => {
        return result.data.items;
    }).then(items =>{
        saveToFile(items);
        console.log(items[0].name);
    })

    // octokit.repos.getForOrg({
    //     org: 'octokit',
    //     type: 'public'
    //   }).then(({data, headers, status}) => {
    //     console.log("data= " + data);
    //   })
    .catch((error => {
        console.log(error);
    }));
}

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
        fs.writeFile('my.csv', output, (err) => {
            if (err) throw err;
            console.log('my.csv saved.');
        });
    });
}



// if(process.token){
//     octokit.authenticate({
//         token: 'token',
//         token: program.token
//     });
// }
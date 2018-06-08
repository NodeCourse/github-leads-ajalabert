const program = require('commander');
const octokit = require('@octokit/rest');

program
  .version('0.1.0')
  .option('-p, --peppers', 'Add peppers')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);


if (program.peppers){
    console.log('peppers');
}
    

if (program.cheese){
    console.log('cheese');
}

if(process.token){
    octokit.authenticate({
        token: 'token',
        token: program.token
    });
}
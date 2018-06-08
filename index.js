const program = require('commander');
const octokit = require('./client.js');
const saver = require('./saver.js');
const query = require('./query.js');

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
        q: query.getQuery('javascript'),
        order: 'desc',
        sort: 'stars',
        per_page: 100
    })
    .then(result => {
        return result.data.items;
    }).then(repositories =>{

        return Promise.all(
            repositories.map(repository => {
                return octokit.activity.getStargazersForRepo({
                    owner: repository.owner.login,
                    repo: repository.name
                });
            })
        );
    })
    .then(results => {
        saver.saveToFile(results);
    })
    .catch((error => {
        console.log(error);
    }));
}
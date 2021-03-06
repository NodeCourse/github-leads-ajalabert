const program = require('commander');
const octokit = require('./client.js');
const saver = require('./saver.js');
const query = require('./query.js');

program
  .version('0.1.0')
  .option('-t, --token [token]', '(Needed) Specify your github token.')
  .option('-l, --language [language]', '(Optional) Specify the coding language or repositories.', 'javascript')
  .option('-d, --age [age]', '(Optional) Specify the age (in day) of the repositories to search. For example, if you put 1, you will get all repositories created yesterday.', 2)
  .parse(process.argv);

if (program.token){
    octokit.authenticate({
        type: 'token',
        token: program.token
    });

    octokit.search.repos({
        q: query.getQuery(program.language, program.age),
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
                    repo: repository.name,
                    per_page: 100
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
else {
    console.log('Your github token is needed! Please, read the documentation by typing --help.');
}
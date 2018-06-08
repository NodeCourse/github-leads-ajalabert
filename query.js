const moment = require('moment');

function getStringDateTwoDayAgo(){
    const today = new Date();
    today.setDate(today.getDate() - 2);

    return moment(today).format('YYYY-MM-DD');
}

function getQuery(language){
    return 'language:'+ language + ' created:>' + getStringDateTwoDayAgo();
}

module.exports.getQuery = getQuery;
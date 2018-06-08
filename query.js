const moment = require('moment');

function getStringDateTwoDayAgo(ageInDay){
    const today = new Date();
    today.setDate(today.getDate() - ageInDay);

    return moment(today).format('YYYY-MM-DD');
}

function getQuery(language, ageInDay){
    return 'language:'+ language + ' created:>' + getStringDateTwoDayAgo(ageInDay);
}

module.exports.getQuery = getQuery;
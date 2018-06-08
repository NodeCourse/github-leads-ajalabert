const moment = require('moment');

function getStringDateDayAgo(ageInDay){
    const today = new Date();
    today.setDate(today.getDate() - ageInDay);

    return moment(today).format('YYYY-MM-DD');
}

function getQuery(language, ageInDay){
    return 'language:'+ language + ' created:>' + getStringDateDayAgo(ageInDay);
}

module.exports.getQuery = getQuery;
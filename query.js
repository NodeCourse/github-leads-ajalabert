const moment = require('moment');

function getStringDateTwoDayAgo(){
    const today = new Date();
    today.setDate(today.getDate()-2);

    console.log(moment(today).format('YYYY-MM-DD'));
    return moment(today).format('YYYY-MM-DD');
}

module.exports.getStringDateTwoDayAgo = getStringDateTwoDayAgo;
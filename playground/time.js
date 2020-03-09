const moment = require('moment');
const persianDate = require('persian-date');
/*
var date = new Date();
console.log(date.getMonth());*/

/*
var date = moment();
console.log(date.format('MMM YYYY DD'));
*/
persianDate.toLocale('en');
let date = new persianDate();
console.log(date.format('YY MM hh:mm a'));

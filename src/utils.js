const pad = (str, length = 2) => `${Array(Math.max(0,length-str.toString().length)).fill(0).join('')}${str}`;
const humanDateFormat = (date) => `${date.split('-')[2]}.${date.split('-')[1]}.${date.split('-')[0]}`;


export { pad, humanDateFormat }
const pad = (str, length = 2) =>
  `${Array(Math.max(0, length - str.toString().length))
    .fill(0)
    .join("")}${str}`;
const humanDateFormat = (date) =>
  `${date.split("-")[2]}.${date.split("-")[1]}.${date.split("-")[0]}`;
const localStorageGet = (key, standard = []) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return standard;
  }
};
const localStorageSet = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
const toDisplayDate = (date) =>
  `${
    [
      "Sonntag",
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
    ][date.getDay()]
  }, ${pad(date.getDate())}.${pad(date.getMonth() + 1)}`;

export {
  pad,
  humanDateFormat,
  localStorageGet,
  localStorageSet,
  toDisplayDate,
};

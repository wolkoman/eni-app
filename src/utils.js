const pad = (str, length = 2) => `${Array(Math.max(0,length-str.toString().length)).fill(0).join('')}${str}`

export { pad }
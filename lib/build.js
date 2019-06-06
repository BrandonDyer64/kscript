const fs = require('fs')
const { compile } = require('../tlib/index')

const data = fs.readFileSync('./src/index.ks', 'utf8')
const data2 = fs.readFileSync('./src/build.ks', 'utf8')
const compiled = compile(data)
const compiled2 = compile(data2)

fs.writeFileSync('./tlib/index.js', compiled)
fs.writeFileSync('./tlib/build.js', compiled2)

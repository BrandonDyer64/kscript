let _;
let fs = require('fs')
 let { compile } = require('../tlib/index')

const CompFile = (filename) => _ => (_=>{
  _=fs.readFileSync(`./src/${filename}.ks`, 'utf8')
 _= compile(_)
  fs.writeFileSync(`./tlib/${filename}.js`, _)
return _;})(_)

_=CompFile('build')(_)

_=CompFile('index')(_)
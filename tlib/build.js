//-kcompiled-
const Obj = () => ({})
const U = f => (_ => {f(_);return _;})
const Y = f => (_ => {_[f]();return _;})
//-kcompiled-
let _;
let fs = require('fs')
 let { compile, wrap } = require('../tlib/index')

const CompFile = (filename) => _ => (_=>{
  _=fs.readFileSync(`./src/${filename}.ks`, 'utf8')
 _= compile(_)
 _= wrap(_)
  fs.writeFileSync(`./tlib/${filename}.js`, _)
return _;})(_)

_=CompFile('build')(_)

_=CompFile('index')(_)
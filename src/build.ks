; # let fs = require('fs')
; # let { compile } = require('../tlib/index')

; let CompFile = (filename) => {
  | fs.readFileSync(`./src/${filename}.ks`, 'utf8')
  compile
  ; fs.writeFileSync(`./tlib/${filename}.js`, _)
}

CompFile('build')

CompFile('index')

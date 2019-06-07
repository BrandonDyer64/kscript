; let pegjs = require('pegjs')
; let fs = require('fs')

< fs.readFileSync('./src/grammar.peg', 'utf8')
< pegjs.generate(_, obj{ output: 'source' })
; fs.writeFileSync('./lib/index.js', _)

; let compile = reqiure('../lib/index.js')

; let CompFile = (name) => {
  < fs.readFileSync('./src/' + name + '.ks', 'utf8')
  compile
  ; fs.writeFileSync('./lib/' + name + '.js', _)
}

; CompFile('build')

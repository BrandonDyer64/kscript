
; let replace = (a, b) => {
  | _.replace(a, b)
}

; let print = {
  ; console.log(_)
}

// Set our stack to be an empty object
| Obj

// A compile function
| { .compile
  ; let escapes = Obj()
  | '\n\n' + _ + '\n\n'
  | replace(/\/\*js\*\/(?:.)*\/\*\/js\*\/|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\(\/(?:[^\/\\]|\\.)*\/|#(?:[^\n])*/g,
    ; # (str, char) => {escapes[`${char}`] = str;return `%STR[${char}]%`;}
  : )
  replace(/\/\/[^\n]*/g, '')

  replace(/; let /g, "; const ")
  replace(/; var /g, "; let ")

  replace(/=> *?{/g, "=> _ => {")
  replace(/= *?{/g, "= _ => {")
  replace(/= *?\({/g, "= (_ => {")
  replace(/\n( *?)\| *?\({/g, "\n|$1(_ => {")
  replace(/\n( *?)\| *?{/g, "\n|$1 _ => {")

  replace(/if \((.*?)\) +([^\n\{]+)(?=\n)/g, "| ($1) && { \n $2 \n } else _\n")
  replace(/if \((.*?)\) {/g, "| ($1) && {")
  replace(/} else /g, "} || ")

  replace(/\{/g, "(_=>{")
  replace(/\}/g, "; return _;})(_)")

  replace(/\n( *?)\| ([^\n]*) \.(\S*?)(?=\n)/g, '\n;$1_.$3=$2')
  replace(/\n( *?)\| ([^\n]*)/g, "\n|$1_=$2")
  replace(/\n( *?)([\+\-\*\/\%]) ([^\n]*)/g, "\n|$1_=_$2$3")
  replace(/\n( *?)\; ([^\n]*)/g, "\n;$1$2")
  replace(/\n( *?)\: ([^\n]*)/g, "\n:$1$2(_)")
  replace(/\n([^\|\;\:\n])( *)([^\n]*) \.(\S*?)(?=\n)/g, "\n;$2_.$4=$1$3(_.$4)")
  replace(/\n([^\|\;\:\n])( *)([^\n]*)/g, "\n;$2_=$1$3(_)")

  replace(/\n[\|\;\:]/g, "\n")
  replace(/\n *\(/g, '\n;(')

  | replace(/%STR\[(\d+?)\]%/g,
    ; # (m, num) => escapes[num]
  : )
  replace(/\n *#/g,'\n')

  | _.trim()
  "\/\/-kcompiled-\nlet _;\n" +
}

| { .wrap
  | ({
    + "//-kcompiled-\n"
    + "const Obj = () => ({})\n"
    + "const U = f => (_ => {f(_);return _;})\n"
    + "const Y = f => (_ => {_[f]();return _;})\n"
  : })("") +
}

; module.exports = _

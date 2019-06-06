//-kcompiled-
const Obj = () => ({})
const U = f => (_ => {f(_);return _;})
const Y = f => (_ => {_[f]();return _;})
//-kcompiled-
let _;
const replace = (a, b) => _ => (_=>{
  _=_.replace(a, b)
return _;})(_)

const print = _ => (_=>{
  console.log(_)
return _;})(_)


_=Obj


_.compile=_ => (_=>{
  const escapes = Obj()
  _='\n\n' + _ + '\n\n'
  _=replace(/\/\*js\*\/(?:.)*\/\*\/js\*\/|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\(\/(?:[^\/\\]|\\.)*\/|#(?:[^\n])*/g,
 (str, char) => {escapes[`${char}`] = str;return `%STR[${char}]%`;}
  )(_)
 _= replace(/\/\/[^\n]*/g, '')(_)

 _= replace(/; let /g, "; const ")(_)
 _= replace(/; var /g, "; let ")(_)

 _= replace(/=> *?{/g, "=> _ => {")(_)
 _= replace(/= *?{/g, "= _ => {")(_)
 _= replace(/= *?\({/g, "= (_ => {")(_)
 _= replace(/\n( *?)\| *?\({/g, "\n|$1(_ => {")(_)
 _= replace(/\n( *?)\| *?{/g, "\n|$1 _ => {")(_)

 _= replace(/if \((.*?)\) +([^\n\{]+)(?=\n)/g, "| ($1) && { \n $2 \n } else _\n")(_)
 _= replace(/if \((.*?)\) {/g, "| ($1) && {")(_)
 _= replace(/} else /g, "} || ")(_)

 _= replace(/\{/g, "(_=>{")(_)
 _= replace(/\}/g, "; return _;})(_)")(_)

 _= replace(/\n( *?)\| ([^\n]*) \.(\S*?)(?=\n)/g, '\n;$1_.$3=$2')(_)
 _= replace(/\n( *?)\| ([^\n]*)/g, "\n|$1_=$2")(_)
 _= replace(/\n( *?)([\+\-\*\/\%]) ([^\n]*)/g, "\n|$1_=_$2$3")(_)
 _= replace(/\n( *?)\; ([^\n]*)/g, "\n;$1$2")(_)
 _= replace(/\n( *?)\: ([^\n]*)/g, "\n:$1$2(_)")(_)
 _= replace(/\n([^\|\;\:\n])( *)([^\n]*) \.(\S*?)(?=\n)/g, "\n;$2_.$4=$1$3(_.$4)")(_)
 _= replace(/\n([^\|\;\:\n])( *)([^\n]*)/g, "\n;$2_=$1$3(_)")(_)

 _= replace(/\n[\|\;\:]/g, "\n")(_)
 _= replace(/\n *\(/g, '\n;(')(_)

  _=replace(/%STR\[(\d+?)\]%/g,
 (m, num) => escapes[num]
  )(_)
 _= replace(/\n *#/g,'\n')(_)

  _=_.trim()
 _= "\/\/-kcompiled-\nlet _;\n" +(_)
return _;})(_)

_.wrap=_ => (_=>{
_= (_ => (_=>{
    _=_+"//-kcompiled-\n"
    _=_+"const Obj = () => ({})\n"
    _=_+"const U = f => (_ => {f(_);return _;})\n"
    _=_+"const Y = f => (_ => {_[f]();return _;})\n"
  ; return _;})(_))("") +(_)
return _;})(_)

module.exports = _
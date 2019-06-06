let _;




const replace = (a, b) => _ => (_=>{
  _=_.replace(a, b)
return _;})(_)

const print = _ => (_=>{
  console.log(_)
return _;})(_)

const compile = _ => (_=>{
 let escapes = {}
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
 _= replace(/if \((.*?)\) +([^\n\{]+)(?=\n)/g, "| ($1) && { \n $2 \n } else _\n")(_)
 _= replace(/if \((.*?)\) {/g, "| ($1) && {")(_)
 _= replace(/} else /g, "} || ")(_)
 _= replace(/\{/g, "(_=>{")(_)
 _= replace(/\}/g, "; return _;})(_)")(_)
 _= replace(/\n( *?)\| ([^\n]*) \.(\S*?)(?=\n)/g, '\n;$1_.$3=$2')(_)
 _= replace(/\n( *?)\| ([^\n]*)/g, "\n|$1_=$2")(_)
 _= replace(/\n( *?)\; ([^\n]*)/g, "\n;$1$2")(_)
 _= replace(/\n( *?)\: ([^\n]*)/g, "\n:$1$2(_)")(_)
 _= replace(/\n([^\|\;\:\n])( *)([^\n]*) \.(\S*?)(?=\n)/g, "\n;$2_.$4=$1$3(_.$4)")(_)
 _= replace(/\n([^\|\;\:\n])( *)([^\n]*)/g, "\n;$2_=$1$3(_)")(_)
 _= replace(/\n[\|\;\:]/g, "\n")(_)
  _=replace(/%STR\[(\d+?)\]%/g,
 (m, num) => escapes[num]
  )(_)
 _= replace(/\n *#/g,'\n')(_)
 _= "let _;\n" +(_)
return _;})(_)

_=`
; let FizzBuzz = (i) => {
  if (i > 0) {
    ; let out = ({
      if (i % 3 == 0) | _ + "Fizz"
      if (i % 5 == 0) | _ + "Buzz"
      if (!_) | i
    })("")
    out + '\\n' +
    FizzBuzz(i - 1)
  } else _
}

| ""
FizzBuzz(100)
console.log
`

_=compile(_)
_=print(_)
 try {
_=eval(_)
 } catch(e) {console.log(e)}

 module.exports = { compile }



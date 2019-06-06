

; let replace = (a, b) => {
  | _.replace(a, b)
}

; let print = {
  ; console.log(_)
}

; let compile = {
  ; let escapes = {}
  replace(
    /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\(\/(?:[^\/\\]|\\.)*\//g,
    (str, char) => {
      escapes[`${char}`] = str;
      return `%STR[${char}]%`;
    }
  )
  replace(/=> *?{/g, "=> _ => {")
  replace(/= *?{/g, "= _ => {")
  replace(/if \((.*?)\) {/g, "| (_$1) && {")
  replace(/} else /g, "} || ")
  replace(/\{/g, "(_=>{")
  replace(/\}/g, "; return _;})(_)")
  replace(/\n( *?)\| ([^\n]*)/g, "\n|$1_=$2")
  replace(/\n( *?)\; ([^\n]*)/g, "\n;$1$2")
  replace(/\n([^\|\;\n])( *)([^\n]*)/g, "\n$2_=$1$3(_)")
  replace(/\n[\|\;]/g, "\n")
  replace(/%STR\[(\d+?)\]%/g, (m, num) => {
    | escapes[num]
  }(_))
  "let _;\n" +
}

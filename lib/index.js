function compile(s) {
  String.prototype.r = String.prototype.replace;
  let escapes = {};
  s = s.r(
    /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\(\/(?:[^\/\\]|\\.)*\//g,
    (str, char) => {
      escapes[`${char}`] = str;
      return `%STR[${char}]%`;
    }
  );
  s = s.r(/; let /g, "; const ");
  s = s.r(/; var /g, "; let ");
  s = s.r(/=> *?{/g, "=> _ => {");
  s = s.r(/= *?{/g, "= _ => {");
  s = s.r(/if \((.*?)\) {/g, "| (_$1) && {");
  s = s.r(/} else /g, "} || ");
  s = s.r(/\{/g, "(_=>{");
  s = s.r(/\}/g, "; return _;})(_)");
  s = s.r(/\n( *?)\| ([^\n]*)/g, "\n|$1_=$2");
  s = s.r(/\n( *?)\; ([^\n]*)/g, "\n;$1$2");
  s = s.r(/\n([^\|\;\n])( *)([^\n]*)/g, "\n$2_=$1$3(_)");
  s = s.r(/\n[\|\;]/g, "\n");
  s = "let _;\n" + s;
  s = s.r(/%STR\[(\d+?)\]%/g, (m, num) => {
    return escapes[num];
  });
  return s;
}

const source = `
; let replace = (a, b) => {
  | _.replace(a, b)
}

; let print = {
  ; console.log(_)
}

; let compile = {
  replace(/if \\((.*?)\\) {/g, "| (_$1) ? {")
  replace(/} else /g, "} : ")
  replace(/\\{/g, "(_=>{")
  replace(/\\}/g, "; return _;})(_)")
  replace(/\\n( *?)\\| ([^\\n]*)/g, "\\n|$1_=$2")
  replace(/\\n( *?)\\; ([^\\n]*)/g, "\\n;$1$2")
  replace(/\\n([^\\|\\;\\n])( *)([^\\n]*)/g, "\\n$2_=$1$3(_)")
  replace(/\\n[\\|\\;]/g, "\\n")
}

; let sum = (total = 0) => {
  if (.length > 0) {
    sum(total + _.pop())
  } else {
    | total
  }
}

| [ 1, 2, 3, 4, 5 ]
sum()
print
`;

console.log(source);

const jsSource = compile(source);
console.log(compile(source));
eval(jsSource);

module.exports = {
  compile
};

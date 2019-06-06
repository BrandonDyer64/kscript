function compile(s) {
  String.prototype.r = String.prototype.replace;
  let escapes = {};
  s = s.r(
    /\/\*js\*\/(?:.)*\/\*\/js\*\/|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\(\/(?:[^\/\\]|\\.)*\/|#(?:[^\n])*/g,
    (str, char) => {
      escapes[`${char}`] = str;
      return `%STR[${char}]%`;
    }
  );
  console.log(s)
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
  s = s.r(/\n( *?)\: ([^\n]*)/g, "\n:$1$2(_)");
  s = s.r(/\n([^\|\;\:\n])( *)([^\n]*)/g, "\n$2_=$1$3(_)");
  s = s.r(/\n[\|\;\:]/g, "\n");
  s = "let _;\n" + s;
  s = s.r(/%STR\[(\d+?)\]%/g, (m, num) => {
    return escapes[num];
  });
  s = s.r(/\n *#/g,'\n')
  return s;
}

module.exports = { compile };

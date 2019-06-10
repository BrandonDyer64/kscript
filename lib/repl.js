let _={};
const readline = require ('readline');
const parse = require ('../lib/index') .parse;
const rl = readline.createInterface ({input:process.stdin,output:process.stdout});
const start = (_=>{
rl.question ('> ' , (answer)=>{let _={};_=answer + '\n';
_=_.split ('\n');
_.shift ();
_=_.join ('\n');
_=parse(_);
_=eval(_);
console.log(_);
_=start(_);});
;return _;});
_=start(_);
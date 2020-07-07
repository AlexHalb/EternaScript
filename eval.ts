import { RNA, RNAElement, RNAException, Library} from './Lib';
import { ScriptResult } from './Types';
export class Script{
  evaluate(code: string, input: {[key: string]: string}) {
    return new Promise<ScriptResult>(resolve => { // Lib loading is async, so I'm forced to use PRomises
      const Lib = new Library(() => { // Once the library is loaded, run the script
        const {VM} = require('vm2');
        const vm = new VM({
          sandbox: { // Allows user code access to classes
            Lib,
            RNAElement,
            RNAException,
            RNA,
            startTime: (new Date().getTime()),
          }
        });
        // Inserts input variables
        Object.keys(input).forEach(k => {
          code = `var ${k} = "${input[k]}";\n${code}`;
        });
        // Adds timeouts to loops
        code = this.insertTimeout(code, parseFloat(input.timeout || '10'), new Date());
        // Wraps code in a function so return values can be retrieved
        code = `function runCode() { ${code} }; runCode();`;
        // Escapes ` characters (twice) so they don't cause an error (see below)
        code = code.replace(/\`/g, '\\`');
        // Run the formatted code in a new, secure context
        let result = vm.run(`
          function run() {
            var scriptResult = '';
            function out(str) { // Pervasives
              scriptResult = \`\$\{str\}\$\{scriptResult\}\`;
            }
            function outln(str) {
              scriptResult = \`\$\{str\}\n\$\{scriptResult\}\`;
            }
            return {
              result: eval(\`${code}\`), // If code had \` characters, it would end the string early. They are escaped
              // Order is important - code must be run first, otherwise the console and time are returned before they have the right values
              console: scriptResult,
              time: (new Date().getTime()) - startTime,
            }
          }
          run();
        `);
        resolve(result);
      })
    });
  }
  // Copied directly from the existing script with a few modifications
  insertTimeout(source: string, timeout: number, start: Date) {
    var inserted_code = "if((new Date()).getTime() - " + start.getTime() + " > " + timeout * 1000 + ") {outln(\""+timeout+"sec timeout\"); return 'Timeout';};";
    var regexp = /while\s*\([^\)]*\)\s*\{?|for\s*\([^\)]*\)\s*\{?/;
    var code = "";
    while(source.search(regexp) != -1){
      var chunk = source.match(regexp)[0]
      var index = source.indexOf(chunk) + chunk.length

      // if while or for with no {}
      if((chunk.charAt(chunk.length-1)) != "{"){
        //var nextRegexp = /.*[\(.*\)|[^;]]*;/;
        var nextRegexp = /.*[\(.*\)|[^;]|\n]*;{0,1}/;
        //get nextline(until find ;)
        var nextline = source.substring(index);
        nextline = nextline.match(nextRegexp)[0];
        code += source.substring(0, index) + "{" + inserted_code + nextline + "}";
        index += nextline.length;
      } else 
        // if while or for with bracket 
        code += source.substring(0, index) + inserted_code;
      if(source.length > index) source = source.substring(index);
      else {
        source = "";
        break;
      }
    }
    code += source;
    return code;
  }
}
(new Script).evaluate(`
["Vienna", "Vienna2", "Nupack", "Contrafold", "LinearFoldC", "LinearFoldV"].forEach(e => {
  outln(Lib.energyOfStruct(sequence, Lib.fold(sequence, e), e));
  out(': ');
  out(e);
});
`, {
  timeout: "20",
  sequence: "gcaugcuaguagucagcgCGGCGCGGCGCGCGCGCGGCGCGCGCGcgcgcauagcuagcugacuag",
}).then(e => {
  console.log(e);
})
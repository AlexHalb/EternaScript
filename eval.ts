import { RNA, RNAElement, RNAException, Library} from './Lib';
import { ScriptResult } from './Types';
export class EternaScript {
  evaluate(code: string, input: {[key: string]: string}) {
    return new Promise<ScriptResult>(resolve => { // Lib loading is async, so I'm forced to use PRomises
      const Lib = new Library(() => { // Once the library is loaded, run the script
        let consoleString = '';
        // Inserts input variables
        Object.keys(input).forEach(k => {
          code = `var ${k} = "${input[k]}";\n${code}`;
        });
        const timer = new Date();
        // Adds timeouts to loops
        code = this.insertTimeout(code, parseFloat(input.timeout || '10'), timer);
        // Wraps code in a function so return values can be retrieved
        function out(str) {
          consoleString = `${str}${consoleString};`
        }
        function outln(str) {
          consoleString = `${str}\n${consoleString};`
        }
        code = `function runCode() { ${code} }; runCode();`;
        // Escapes ` characters (twice) so they don't cause an error (see below)
        let result = eval(code);
        resolve({
          result,
          console: consoleString,
          time: new Date().getTime() - timer.getTime(),
        });
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
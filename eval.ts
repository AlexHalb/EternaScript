import { RNA, RNAElement, RNAException, Library} from './Lib';
import { ScriptResult } from './Types';
import { Promise } from 'es6-promise';
export class EternaScript {
  source: string;
  input: {
    [key: string]: string,
  }
  constructor(source: string = '', input: {[name: string]: string} = {
    'timeout': '10'
  }) {
    this.source = source;
    this.input = input;
  }
  evaluate() {
    const promise = new Promise<ScriptResult>(resolve => { // Lib loading is async, so I'm forced to use Promises
      const Lib = new Library(() => { // Once the library is loaded, run the script
        let code = this.source;
        let input = this.input || {
          'timeout': '10'
        };
        let { onConsole, onClear } = this;
        // Inserts input variables
        Object.keys(input).forEach(k => {
          code = `var ${k} = "${input[k]}";\n${code}`;
        });
        const timer = new Date();
        // Adds timeouts to loops
        code = this.insertTimeout(code, parseFloat(input.timeout || '10'), timer);
        // Wraps code in a function so return values can be retrieved
        function out(str) {
          if (onConsole) onConsole(str);
        }
        function outln(str) {
          if (onConsole) onConsole(`\n${str}`);
        }
        function clear() {
          if (onClear) onClear();
        }
        let _RNA = RNA;
        let _RNAException = RNAException;
        let _RNAElement = RNAElement;
        code = `let RNA = _RNA; let RNAException = _RNAException; let  RNAElement = _RNAElement; function runCode() { ${code} }; runCode();`;
        // Escapes ` characters (twice) so they don't cause an error (see below)
        let result = eval(code);
        resolve({
          result,
          time: new Date().getTime() - timer.getTime(),
        });
      })
    });
    return promise;
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

  onConsole : (e: string) => void;
  onClear : () => void;
}
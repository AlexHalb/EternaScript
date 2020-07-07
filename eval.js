"use strict";
exports.__esModule = true;
exports.Script = void 0;
var Lib_1 = require("./Lib");
var Script = /** @class */ (function () {
    function Script() {
    }
    Script.prototype.evaluate = function (code, input) {
        var _this = this;
        return new Promise(function (resolve) {
            var Lib = new Lib_1.Library(function () {
                var VM = require('vm2').VM;
                var vm = new VM({
                    sandbox: {
                        Lib: Lib,
                        RNAElement: Lib_1.RNAElement,
                        RNAException: Lib_1.RNAException,
                        RNA: Lib_1.RNA,
                        startTime: (new Date().getTime())
                    }
                });
                // Inserts input variables
                Object.keys(input).forEach(function (k) {
                    code = "var " + k + " = \"" + input[k] + "\";\n" + code;
                });
                // Adds timeouts to loops
                code = _this.insertTimeout(code, parseFloat(input.timeout || '10'), new Date());
                // Wraps code in a function so return values can be retrieved
                code = "function runCode() { " + code + " }; runCode();";
                // Escapes ` characters (twice) so they don't cause an error (see below)
                code = code.replace(/\`/g, '\\`');
                // Run the formatted code in a new, secure context
                var result = vm.run("\n          function run() {\n            var scriptResult = '';\n            function out(str) { // Pervasives\n              scriptResult = `${str}${scriptResult}`;\n            }\n            function outln(str) {\n              scriptResult = `${str}\n${scriptResult}`;\n            }\n            return {\n              result: eval(`" + code + "`), // If code had ` characters, it would end the string early. They are escaped\n              // Order is important - code must be run first, otherwise the console and time are returned before they have the right values\n              console: scriptResult,\n              time: (new Date().getTime()) - startTime,\n            }\n          }\n          run();\n        ");
                resolve(result);
            });
        });
    };
    // Copied directly from the existing script with a few modifications
    Script.prototype.insertTimeout = function (source, timeout, start) {
        var inserted_code = "if((new Date()).getTime() - " + start.getTime() + " > " + timeout * 1000 + ") {outln(\"" + timeout + "sec timeout\"); return 'Timeout';};";
        var regexp = /while\s*\([^\)]*\)\s*\{?|for\s*\([^\)]*\)\s*\{?/;
        var code = "";
        while (source.search(regexp) != -1) {
            var chunk = source.match(regexp)[0];
            var index = source.indexOf(chunk) + chunk.length;
            // if while or for with no {}
            if ((chunk.charAt(chunk.length - 1)) != "{") {
                //var nextRegexp = /.*[\(.*\)|[^;]]*;/;
                var nextRegexp = /.*[\(.*\)|[^;]|\n]*;{0,1}/;
                //get nextline(until find ;)
                var nextline = source.substring(index);
                nextline = nextline.match(nextRegexp)[0];
                code += source.substring(0, index) + "{" + inserted_code + nextline + "}";
                index += nextline.length;
            }
            else
                // if while or for with bracket 
                code += source.substring(0, index) + inserted_code;
            if (source.length > index)
                source = source.substring(index);
            else {
                source = "";
                break;
            }
        }
        code += source;
        return code;
    };
    return Script;
}());
exports.Script = Script;
(new Script).evaluate("\n[\"Vienna\", \"Vienna2\", \"Nupack\", \"Contrafold\", \"LinearFoldC\", \"LinearFoldV\"].forEach(e => {\n  outln(Lib.energyOfStruct(sequence, Lib.fold(sequence, e), e));\n  out(': ');\n  out(e);\n});\n", {
    timeout: "20",
    sequence: "gcaugcuaguagucagcgCGGCGCGGCGCGCGCGCGGCGCGCGCGcgcgcauagcuagcugacuag"
}).then(function (e) {
    console.log(e);
});

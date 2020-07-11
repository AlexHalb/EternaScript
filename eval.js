"use strict";
exports.__esModule = true;
exports.EternaScript = void 0;
var Lib_1 = require("./Lib");
var es6_promise_1 = require("es6-promise");
var EternaScript = /** @class */ (function () {
    function EternaScript(source, input) {
        if (source === void 0) { source = ''; }
        if (input === void 0) { input = {
            'timeout': '10'
        }; }
        this.source = source;
        this.input = input;
    }
    EternaScript.prototype.evaluate = function (onOut) {
        var _this = this;
        if (onOut === void 0) { onOut = function () { }; }
        var promise = new es6_promise_1.Promise(function (resolve) {
            var Lib = new Lib_1.Library(function () {
                var code = _this.source;
                var input = _this.input || {
                    'timeout': '10'
                };
                var _a = _this, onConsole = _a.onConsole, onClear = _a.onClear;
                // Inserts input variables
                Object.keys(input).forEach(function (k) {
                    code = "var " + k + " = \"" + input[k] + "\";\n" + code;
                });
                var timer = new Date();
                // Adds timeouts to loops
                code = _this.insertTimeout(code, parseFloat(input.timeout || '10'), timer);
                // Wraps code in a function so return values can be retrieved
                function out(str) {
                    if (onOut)
                        onOut(str);
                    if (onConsole)
                        onConsole(str);
                }
                function outln(str) {
                    if (onOut)
                        onOut(str + '\n');
                }
                var _RNA = Lib_1.RNA;
                var _RNAException = Lib_1.RNAException;
                var _RNAElement = Lib_1.RNAElement;
                code = "let RNA = _RNA; let RNAException = _RNAException; let  RNAElement = _RNAElement; function runCode() { " + code + " }; runCode();";
                // Escapes ` characters (twice) so they don't cause an error (see below)
                var result = eval(code);
                resolve({
                    result: result,
                    time: new Date().getTime() - timer.getTime()
                });
            });
        });
        return promise;
    };
    // Copied directly from the existing script with a few modifications
    EternaScript.prototype.insertTimeout = function (source, timeout, start) {
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
    return EternaScript;
}());
exports.EternaScript = EternaScript;
var script = new EternaScript("\n  out(new RNA('((...))'));\n");
script.onConsole = function () { return console.log('AHHKSADHLASKDHASD'); };
script.evaluate(function (e) {
    console.log(e);
}).then(function (e) {
    console.log(e);
});

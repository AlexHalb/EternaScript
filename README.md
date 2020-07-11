# Eterna Scripting
Evaluates user scripts from [Eterna](eternagame.org).

To use, first build the folding engines. Follow the instructions over at the [EternaJS](https://github.com/eternagame/EternaJS) repository. This produces several JS files corresponding to the engines. Drag the JS files into the main directory. By the end, there should be 6 files:
- contrafold.js
- LinearFoldC.js
- LinearFoldV.js
- nupack.js
- vienna.js
- vienna2.js

To evaluate code, import the `EternaScript` class from `eval.ts`. Then, use
```
let script = new EternaScript('code here', {
  'input1': 'input 1 value',
});
```
This creates a script. To evalutate, the code, run
```
script.evaluate();
```
`EternaScript.evaluate()` returns a promise. When the promise is resolved, it returns an object of the form
```
{
  result: string | undefined,
  time: number,
}
```
`time` is how long (in milliseconds) the script took to run. `result` is a value given by a `return` statement in the script.

If you want to use the output of the console (in the scripts, `out`, `outln`, and `clear`), set the `onConsole` and/or `onClear` properties of scripts. `onConsole` takes on argument, the string printed to the console. `onClear` takes no arguments.

## Notes for use in production
Slight modifications need to be made to use this in production or with other HTML.

* In each of the folding engines, comment out any lines that have `prompt()`
* In [Lib.ts](Lib.ts), 
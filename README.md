# Eterna Scripting
Evaluates user scripts from [Eterna](eternagame.org).

To use, first follow the instructions for [building the folding engines](Engines/README.md)

To evaluate code, import the `Script` class from `eval.ts`. Then, use
```
(new Script).evaluate(code, input)
```
`code` is a string of code to evaluate. It has access to the scripting library and classes. `input` contains inputs for the script. Inputs vary between scripts; however `timeout` works for all scripts. An example is:
```
const code = "return Lib.fold(sequence, engine);"
const input = {
  sequence: "GCGGAAACGC",
  engine: "Vienna",
  timeout: "10"
}
const script = new Script;
script.evaluate(code, input).then(e => console.log(e))
```
`Script.evaluate()` returns a promise. When the promise is resolved, it returns an object of the form
```
{
  result: string | undefined,
  console: string | undefined,
  time: number,
}
```
`time` is how long (in milliseconds) the script took to run. `result` is a value given by a `return` statement in the script. `console` is a (possibly) multiline string made up of the results of `out` and `outln` statements in the script.
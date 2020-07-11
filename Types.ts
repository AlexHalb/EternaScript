declare class Vienna {
  FullFoldTemperature(temperature: number, sequence: string, structure: string): FullFoldResultDefault;
  FullEval(temp: number, seq: string, struct: string): FullEvalResult;
}

declare class Vienna2 extends Vienna {}
declare class Nupack extends Vienna{}

declare class Contrafold {
  FullFoldTemperature(temperature: number, sequence: string, structure: number): FullFoldResultDefault;
  FullEval(temp: number, seq: string, struct: string): FullEvalResult;
}

declare class LinearFold {
  FullFoldDefault(sequence: string): FullFoldResultLinearFold;
  FullEval(seq: string, struct: string): FullEvalResult;
}

declare class LinearFoldV extends LinearFold {}
declare class LinearFoldC extends LinearFold {}

interface FullFoldResultDefault {
  structure: string;
  mfe: number;
}

interface FullFoldResultLinearFold {
  structure: string;
}

interface FullEvalResult {
  energy: number;
}

interface ScriptResult {
  result: string | undefined;
  time: number;
}

export { Vienna, Vienna2, Nupack, Contrafold, LinearFold, LinearFoldC, LinearFoldV, FullFoldResultDefault, FullFoldResultLinearFold, FullEvalResult, ScriptResult };
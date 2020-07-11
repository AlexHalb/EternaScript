
var contrafold = (function() {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return (
function(contrafold) {
  contrafold = contrafold || {};

var Module = typeof contrafold !== "undefined" ? contrafold : {};

var readyPromiseResolve, readyPromiseReject;

Module["ready"] = new Promise(function(resolve, reject) {
 readyPromiseResolve = resolve;
 readyPromiseReject = reject;
});

var moduleOverrides = {};

var key;

for (key in Module) {
 if (Module.hasOwnProperty(key)) {
  moduleOverrides[key] = Module[key];
 }
}

var arguments_ = [];

var thisProgram = "./this.program";

var quit_ = function(status, toThrow) {
 throw toThrow;
};

var ENVIRONMENT_IS_WEB = false;

var ENVIRONMENT_IS_WORKER = false;

var ENVIRONMENT_IS_NODE = false;

var ENVIRONMENT_IS_SHELL = false;

ENVIRONMENT_IS_WEB = typeof window === "object";

ENVIRONMENT_IS_WORKER = typeof importScripts === "function";

ENVIRONMENT_IS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";

ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

var scriptDirectory = "";

function locateFile(path) {
 if (Module["locateFile"]) {
  return Module["locateFile"](path, scriptDirectory);
 }
 return scriptDirectory + path;
}

var read_, readAsync, readBinary, setWindowTitle;

var nodeFS;

var nodePath;

if (ENVIRONMENT_IS_NODE) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = require("path").dirname(scriptDirectory) + "/";
 } else {
  scriptDirectory = __dirname + "/";
 }
 read_ = function shell_read(filename, binary) {
  var ret = tryParseAsDataURI(filename);
  if (ret) {
   return binary ? ret : ret.toString();
  }
  if (!nodeFS) nodeFS = require("fs");
  if (!nodePath) nodePath = require("path");
  filename = nodePath["normalize"](filename);
  return nodeFS["readFileSync"](filename, binary ? null : "utf8");
 };
 readBinary = function readBinary(filename) {
  var ret = read_(filename, true);
  if (!ret.buffer) {
   ret = new Uint8Array(ret);
  }
  assert(ret.buffer);
  return ret;
 };
 if (process["argv"].length > 1) {
  thisProgram = process["argv"][1].replace(/\\/g, "/");
 }
 arguments_ = process["argv"].slice(2);
 process["on"]("uncaughtException", function(ex) {
  if (!(ex instanceof ExitStatus)) {
   throw ex;
  }
 });
 process["on"]("unhandledRejection", abort);
 quit_ = function(status) {
  process["exit"](status);
 };
 Module["inspect"] = function() {
  return "[Emscripten Module object]";
 };
} else if (ENVIRONMENT_IS_SHELL) {
 if (typeof read != "undefined") {
  read_ = function shell_read(f) {
   var data = tryParseAsDataURI(f);
   if (data) {
    return intArrayToString(data);
   }
   return read(f);
  };
 }
 readBinary = function readBinary(f) {
  var data;
  data = tryParseAsDataURI(f);
  if (data) {
   return data;
  }
  if (typeof readbuffer === "function") {
   return new Uint8Array(readbuffer(f));
  }
  data = read(f, "binary");
  assert(typeof data === "object");
  return data;
 };
 if (typeof scriptArgs != "undefined") {
  arguments_ = scriptArgs;
 } else if (typeof arguments != "undefined") {
  arguments_ = arguments;
 }
 if (typeof quit === "function") {
  quit_ = function(status) {
   quit(status);
  };
 }
 if (typeof print !== "undefined") {
  if (typeof console === "undefined") console = {};
  console.log = print;
  console.warn = console.error = typeof printErr !== "undefined" ? printErr : print;
 }
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = self.location.href;
 } else if (document.currentScript) {
  scriptDirectory = document.currentScript.src;
 }
 if (_scriptDir) {
  scriptDirectory = _scriptDir;
 }
 if (scriptDirectory.indexOf("blob:") !== 0) {
  scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
 } else {
  scriptDirectory = "";
 }
 {
  read_ = function shell_read(url) {
   try {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return xhr.responseText;
   } catch (err) {
    var data = tryParseAsDataURI(url);
    if (data) {
     return intArrayToString(data);
    }
    throw err;
   }
  };
  if (ENVIRONMENT_IS_WORKER) {
   readBinary = function readBinary(url) {
    try {
     var xhr = new XMLHttpRequest();
     xhr.open("GET", url, false);
     xhr.responseType = "arraybuffer";
     xhr.send(null);
     return new Uint8Array(xhr.response);
    } catch (err) {
     var data = tryParseAsDataURI(url);
     if (data) {
      return data;
     }
     throw err;
    }
   };
  }
  readAsync = function readAsync(url, onload, onerror) {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url, true);
   xhr.responseType = "arraybuffer";
   xhr.onload = function xhr_onload() {
    if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
     onload(xhr.response);
     return;
    }
    var data = tryParseAsDataURI(url);
    if (data) {
     onload(data.buffer);
     return;
    }
    onerror();
   };
   xhr.onerror = onerror;
   xhr.send(null);
  };
 }
 setWindowTitle = function(title) {
  document.title = title;
 };
} else {}

var out = Module["print"] || console.log.bind(console);

var err = Module["printErr"] || console.warn.bind(console);

for (key in moduleOverrides) {
 if (moduleOverrides.hasOwnProperty(key)) {
  Module[key] = moduleOverrides[key];
 }
}

moduleOverrides = null;

if (Module["arguments"]) arguments_ = Module["arguments"];

if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

if (Module["quit"]) quit_ = Module["quit"];

var tempRet0 = 0;

var setTempRet0 = function(value) {
 tempRet0 = value;
};

var wasmBinary;

if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];

var noExitRuntime;

if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];

if (typeof WebAssembly !== "object") {
 err("no native wasm support detected");
}

var wasmMemory;

var wasmTable = new WebAssembly.Table({
 "initial": 414,
 "maximum": 414 + 0,
 "element": "anyfunc"
});

var ABORT = false;

var EXITSTATUS = 0;

function assert(condition, text) {
 if (!condition) {
  abort("Assertion failed: " + text);
 }
}

var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;

function UTF8ArrayToString(heap, idx, maxBytesToRead) {
 var endIdx = idx + maxBytesToRead;
 var endPtr = idx;
 while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;
 if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
  return UTF8Decoder.decode(heap.subarray(idx, endPtr));
 } else {
  var str = "";
  while (idx < endPtr) {
   var u0 = heap[idx++];
   if (!(u0 & 128)) {
    str += String.fromCharCode(u0);
    continue;
   }
   var u1 = heap[idx++] & 63;
   if ((u0 & 224) == 192) {
    str += String.fromCharCode((u0 & 31) << 6 | u1);
    continue;
   }
   var u2 = heap[idx++] & 63;
   if ((u0 & 240) == 224) {
    u0 = (u0 & 15) << 12 | u1 << 6 | u2;
   } else {
    u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heap[idx++] & 63;
   }
   if (u0 < 65536) {
    str += String.fromCharCode(u0);
   } else {
    var ch = u0 - 65536;
    str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
   }
  }
 }
 return str;
}

function UTF8ToString(ptr, maxBytesToRead) {
 return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
}

function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
 if (!(maxBytesToWrite > 0)) return 0;
 var startIdx = outIdx;
 var endIdx = outIdx + maxBytesToWrite - 1;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) {
   var u1 = str.charCodeAt(++i);
   u = 65536 + ((u & 1023) << 10) | u1 & 1023;
  }
  if (u <= 127) {
   if (outIdx >= endIdx) break;
   heap[outIdx++] = u;
  } else if (u <= 2047) {
   if (outIdx + 1 >= endIdx) break;
   heap[outIdx++] = 192 | u >> 6;
   heap[outIdx++] = 128 | u & 63;
  } else if (u <= 65535) {
   if (outIdx + 2 >= endIdx) break;
   heap[outIdx++] = 224 | u >> 12;
   heap[outIdx++] = 128 | u >> 6 & 63;
   heap[outIdx++] = 128 | u & 63;
  } else {
   if (outIdx + 3 >= endIdx) break;
   heap[outIdx++] = 240 | u >> 18;
   heap[outIdx++] = 128 | u >> 12 & 63;
   heap[outIdx++] = 128 | u >> 6 & 63;
   heap[outIdx++] = 128 | u & 63;
  }
 }
 heap[outIdx] = 0;
 return outIdx - startIdx;
}

function stringToUTF8(str, outPtr, maxBytesToWrite) {
 return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
}

function lengthBytesUTF8(str) {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
  if (u <= 127) ++len; else if (u <= 2047) len += 2; else if (u <= 65535) len += 3; else len += 4;
 }
 return len;
}

var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;

function UTF16ToString(ptr, maxBytesToRead) {
 var endPtr = ptr;
 var idx = endPtr >> 1;
 var maxIdx = idx + maxBytesToRead / 2;
 while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
 endPtr = idx << 1;
 if (endPtr - ptr > 32 && UTF16Decoder) {
  return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
 } else {
  var i = 0;
  var str = "";
  while (1) {
   var codeUnit = HEAP16[ptr + i * 2 >> 1];
   if (codeUnit == 0 || i == maxBytesToRead / 2) return str;
   ++i;
   str += String.fromCharCode(codeUnit);
  }
 }
}

function stringToUTF16(str, outPtr, maxBytesToWrite) {
 if (maxBytesToWrite === undefined) {
  maxBytesToWrite = 2147483647;
 }
 if (maxBytesToWrite < 2) return 0;
 maxBytesToWrite -= 2;
 var startPtr = outPtr;
 var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
 for (var i = 0; i < numCharsToWrite; ++i) {
  var codeUnit = str.charCodeAt(i);
  HEAP16[outPtr >> 1] = codeUnit;
  outPtr += 2;
 }
 HEAP16[outPtr >> 1] = 0;
 return outPtr - startPtr;
}

function lengthBytesUTF16(str) {
 return str.length * 2;
}

function UTF32ToString(ptr, maxBytesToRead) {
 var i = 0;
 var str = "";
 while (!(i >= maxBytesToRead / 4)) {
  var utf32 = HEAP32[ptr + i * 4 >> 2];
  if (utf32 == 0) break;
  ++i;
  if (utf32 >= 65536) {
   var ch = utf32 - 65536;
   str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
  } else {
   str += String.fromCharCode(utf32);
  }
 }
 return str;
}

function stringToUTF32(str, outPtr, maxBytesToWrite) {
 if (maxBytesToWrite === undefined) {
  maxBytesToWrite = 2147483647;
 }
 if (maxBytesToWrite < 4) return 0;
 var startPtr = outPtr;
 var endPtr = startPtr + maxBytesToWrite - 4;
 for (var i = 0; i < str.length; ++i) {
  var codeUnit = str.charCodeAt(i);
  if (codeUnit >= 55296 && codeUnit <= 57343) {
   var trailSurrogate = str.charCodeAt(++i);
   codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023;
  }
  HEAP32[outPtr >> 2] = codeUnit;
  outPtr += 4;
  if (outPtr + 4 > endPtr) break;
 }
 HEAP32[outPtr >> 2] = 0;
 return outPtr - startPtr;
}

function lengthBytesUTF32(str) {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var codeUnit = str.charCodeAt(i);
  if (codeUnit >= 55296 && codeUnit <= 57343) ++i;
  len += 4;
 }
 return len;
}

function writeArrayToMemory(array, buffer) {
 HEAP8.set(array, buffer);
}

function writeAsciiToMemory(str, buffer, dontAddNull) {
 for (var i = 0; i < str.length; ++i) {
  HEAP8[buffer++ >> 0] = str.charCodeAt(i);
 }
 if (!dontAddNull) HEAP8[buffer >> 0] = 0;
}

var WASM_PAGE_SIZE = 65536;

function alignUp(x, multiple) {
 if (x % multiple > 0) {
  x += multiple - x % multiple;
 }
 return x;
}

var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

function updateGlobalBufferAndViews(buf) {
 buffer = buf;
 Module["HEAP8"] = HEAP8 = new Int8Array(buf);
 Module["HEAP16"] = HEAP16 = new Int16Array(buf);
 Module["HEAP32"] = HEAP32 = new Int32Array(buf);
 Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
 Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
 Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
 Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
 Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
}

var DYNAMIC_BASE = 5296352, DYNAMICTOP_PTR = 53312;

var INITIAL_INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;

if (Module["wasmMemory"]) {
 wasmMemory = Module["wasmMemory"];
} else {
 wasmMemory = new WebAssembly.Memory({
  "initial": INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE,
  "maximum": 2147483648 / WASM_PAGE_SIZE
 });
}

if (wasmMemory) {
 buffer = wasmMemory.buffer;
}

INITIAL_INITIAL_MEMORY = buffer.byteLength;

updateGlobalBufferAndViews(buffer);

HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;

function callRuntimeCallbacks(callbacks) {
 while (callbacks.length > 0) {
  var callback = callbacks.shift();
  if (typeof callback == "function") {
   callback(Module);
   continue;
  }
  var func = callback.func;
  if (typeof func === "number") {
   if (callback.arg === undefined) {
    Module["dynCall_v"](func);
   } else {
    Module["dynCall_vi"](func, callback.arg);
   }
  } else {
   func(callback.arg === undefined ? null : callback.arg);
  }
 }
}

var __ATPRERUN__ = [];

var __ATINIT__ = [];

var __ATMAIN__ = [];

var __ATPOSTRUN__ = [];

var runtimeInitialized = false;

var runtimeExited = false;

function preRun() {
 if (Module["preRun"]) {
  if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
  while (Module["preRun"].length) {
   addOnPreRun(Module["preRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
 runtimeInitialized = true;
 if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
 TTY.init();
 callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
 FS.ignorePermissions = false;
 callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
 runtimeExited = true;
}

function postRun() {
 if (Module["postRun"]) {
  if (typeof Module["postRun"] == "function") Module["postRun"] = [ Module["postRun"] ];
  while (Module["postRun"].length) {
   addOnPostRun(Module["postRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
 __ATPRERUN__.unshift(cb);
}

function addOnPostRun(cb) {
 __ATPOSTRUN__.unshift(cb);
}

var Math_abs = Math.abs;

var Math_ceil = Math.ceil;

var Math_floor = Math.floor;

var Math_min = Math.min;

var runDependencies = 0;

var runDependencyWatcher = null;

var dependenciesFulfilled = null;

function getUniqueRunDependency(id) {
 return id;
}

function addRunDependency(id) {
 runDependencies++;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
}

function removeRunDependency(id) {
 runDependencies--;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (runDependencies == 0) {
  if (runDependencyWatcher !== null) {
   clearInterval(runDependencyWatcher);
   runDependencyWatcher = null;
  }
  if (dependenciesFulfilled) {
   var callback = dependenciesFulfilled;
   dependenciesFulfilled = null;
   callback();
  }
 }
}

Module["preloadedImages"] = {};

Module["preloadedAudios"] = {};

function abort(what) {
 if (Module["onAbort"]) {
  Module["onAbort"](what);
 }
 what += "";
 out(what);
 err(what);
 ABORT = true;
 EXITSTATUS = 1;
 what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
 throw new WebAssembly.RuntimeError(what);
}

function hasPrefix(str, prefix) {
 return String.prototype.startsWith ? str.startsWith(prefix) : str.indexOf(prefix) === 0;
}

var dataURIPrefix = "data:application/octet-stream;base64,";

function isDataURI(filename) {
 return hasPrefix(filename, dataURIPrefix);
}

var fileURIPrefix = "file://";

function isFileURI(filename) {
 return hasPrefix(filename, fileURIPrefix);
}

var wasmBinaryFile = "data:application/octet-stream;base64,AGFzbQEAAAABpgREYAF/AX9gAX8AYAJ/fwBgAn9/AX9gA39/fwF/YAN/f38AYAV/f39/fwF/YAZ/f39/f38Bf2AAAGAEf39/fwF/YAV/f39/fwBgBH9/f38AYAZ/f39/f38AYAh/f39/f39/fwF/YAd/f39/f39/AX9gAAF/YAd/f39/f39/AGAFf35+fn4AYAp/f39/f39/f39/AGAFf39/f34Bf2AFf39/f3wBf2AEf39/fwF+YAN/fn8BfmACf38BfWAIf39/f39/f38AYAR/f398AGADf398AGAEf35+fwBgCn9/f39/f39/f38Bf2AHf39/f39+fgF/YAZ/f39/fn4Bf2AEf39/fAF/YAN/f3wBf2ACf3wBf2AGf3x/f39/AX9gBH98f3wBf2ADfH98AX9gAn9/AXxgD39/f39/f39/f39/f39/fwBgBX9/fn9/AGADf399AGAJf39/f39/f39/AX9gC39/f39/f39/f39/AX9gDH9/f39/f39/f39/fwF/YAJ+fwF/YAJ+fgF/YAR/f39+AX5gA39/fwF9YAN/f38BfGANf39/f39/f39/f39/fwBgBX9/f398AGAEf39/fQBgA39/fgBgAn9+AGADf35+AGACf30AYAJ/fABgBn9/f39/fAF/YAd/f3x/f39/AX9gBX9/fH98AX9gA35/fwF/YAR+fn5+AX9gAn9/AX5gAn5+AX1gAX0BfWABfwF8YAJ+fgF8YAJ8fwF8AuQBIwFhAWEABQFhAWIAGAFhAWMACgFhAWQAEgFhAWUAMQFhAWYACAFhAWcABQFhAWgADAFhAWkADAFhAWoAAwFhAWsAAgFhAWwABQFhAW0ACQFhAW4ABQFhAW8AAAFhAXAABgFhAXEAAQFhAXIABgFhAXMAAQFhAXQAAAFhAXUABAFhAXYAAQFhAXcAAQFhAXgAAgFhAXkAAgFhAXoACgFhAUEACQFhAUIAAAFhAUMAAwFhAUQAAwFhAUUAAwFhAUYAAwFhAUcACwFhBm1lbW9yeQIBgAKAgAIBYQV0YWJsZQFwAJ4DA58GnQYBAAAEAgABAAICAA8FEQEFAAEEAgAACAEAAAAIBAQDAwUCBgsDAxsACAoAEQIAAwAEAgECNQNAAgM2AwUCAAkGBgk4DQ0HBwUFAAMFAgAACwMCAgA9BQUCAAACHBwsGwIAAAAFAwUJ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////P4MiC0IgiCERIA5CEYghEiAEQjCIp0H//wFxIQcCQAJ/IAJCMIinQf//AXEiCUF/akH9/wFNBEBBACAHQX9qQf7/AUkNARoLIAFQIAJC////////////AIMiDEKAgICAgIDA//8AVCAMQoCAgICAgMD//wBRG0UEQCACQoCAgICAgCCEIQoMAgsgA1AgBEL///////////8AgyICQoCAgICAgMD//wBUIAJCgICAgICAwP//AFEbRQRAIARCgICAgICAIIQhCiADIQEMAgsgASAMQoCAgICAgMD//wCFhFAEQCACIAOEUARAQoCAgICAgOD//wAhCkIAIQEMAwsgCkKAgICAgIDA//8AhCEKQgAhAQwCCyADIAJCgICAgICAwP//AIWEUARAIAEgDIQhAkIAIQEgAlAEQEKAgICAgIDg//8AIQoMAwsgCkKAgICAgIDA//8AhCEKDAILIAEgDIRQBEBCACEBDAILIAIgA4RQBEBCACEBDAILIAxC////////P1gEQCAFQdAAaiABIAsgASALIAtQIgYbeSAGQQZ0rXynIgZBcWoQRyAFKQNYIgtCIIYgBSkDUCIBQiCIhCEPIAtCIIghEUEQIAZrIQYLIAYgAkL///////8/Vg0AGiAFQUBrIAMgDiADIA4gDlAiCBt5IAhBBnStfKciCEFxahBHIAUpA0giAkIPhiAFKQNAIgNCMYiEIRAgAkIvhiADQhGIhCENIAJCEYghEiAGIAhrQRBqCyEGIA1C/////w+DIgIgAUL/////D4MiAX4iEyADQg+GQoCA/v8PgyIDIA9C/////w+DIgx+fCIEQiCGIg4gASADfnwiDSAOVK0gAiAMfiIVIAMgC0L/////D4MiC358IhQgEEL/////D4MiDiABfnwiECAEIBNUrUIghiAEQiCIhHwiEyACIAt+IhYgAyARQoCABIQiD358IgMgDCAOfnwiESABIBJC/////weDQoCAgIAIhCIBfnwiEkIghnwiF3whBCAHIAlqIAZqQYGAf2ohBgJAIAsgDn4iGCACIA9+fCICIBhUrSACIAEgDH58IgwgAlStfCAMIBQgFVStIBAgFFStfHwiAiAMVK18IAEgD358IAEgC34iCyAOIA9+fCIBIAtUrUIghiABQiCIhHwgAiABQiCGfCIBIAJUrXwgASASIBFUrSADIBZUrSARIANUrXx8QiCGIBJCIIiEfCIDIAFUrXwgAyATIBBUrSAXIBNUrXx8IgIgA1StfCIBQoCAgICAgMAAg1BFBEAgBkEBaiEGDAELIA1CP4ghAyABQgGGIAJCP4iEIQEgAkIBhiAEQj+IhCECIA1CAYYhDSADIARCAYaEIQQLIAZB//8BTgRAIApCgICAgICAwP//AIQhCkIAIQEMAQsCfiAGQQBMBEBBASAGayIHQf8ATQRAIAVBMGogDSAEIAZB/wBqIgYQRyAFQSBqIAIgASAGEEcgBUEQaiANIAQgBxB/IAUgAiABIAcQfyAFKQMwIAUpAziEQgBSrSAFKQMgIAUpAxCEhCENIAUpAyggBSkDGIQhBCAFKQMAIQIgBSkDCAwCC0IAIQEMAgsgAUL///////8/gyAGrUIwhoQLIAqEIQogDVAgBEJ/VSAEQoCAgICAgICAgH9RG0UEQCAKIAJCAXwiASACVK18IQoMAQsgDSAEQoCAgICAgICAgH+FhFBFBEAgAiEBDAELIAogAiACQgGDfCIBIAJUrXwhCgsgACABNwMAIAAgCjcDCCAFQeAAaiQACwYAIAAQIQskAQF/IwBBEGsiAyQAIAMgAjYCDCAAIAEgAhDvAiADQRBqJAALWQECfyMAQSBrIgEkACABQQA2AgwgAUGMATYCCCABIAEpAwg3AwAgAAJ/IAFBEGoiAiABKQIANwIEIAIgADYCACACCxDzAiAAKAIEIQAgAUEgaiQAIABBf2oLPAEDf0EIEA4iAiIDIgFB1LsBNgIAIAFBgLwBNgIAIAFBBGogABCpBSADQbC8ATYCACACQdC8AUECEA0ACzQBAX8jAEEQayIDJAAgAyABNgIMIAAgA0EMaigCADYCACAAIAIoAgA2AgQgA0EQaiQAIAALjwIBA38jAEEQayIDJAAgACAAKAIEQQFqNgIEIwBBEGsiAiQAIAIgADYCDCADQQhqIgAgAigCDDYCACACQRBqJAAgACECQcSaAygCAEHAmgMoAgBrQQJ1IAFNBEAgAUEBahCdAwtBwJoDKAIAIAFBAnRqKAIABEACf0HAmgMoAgAgAUECdGooAgAiACAAKAIEQX9qIgQ2AgQgBEF/RgsEQCAAIAAoAgAoAggRAQALCyACKAIAIQAgAkEANgIAQcCaAygCACABQQJ0aiAANgIAIAIoAgAhACACQQA2AgAgAARAAn8gACAAKAIEQX9qIgE2AgQgAUF/RgsEQCAAIAAoAgAoAggRAQALCyADQRBqJAALzS4BC38jAEEQayILJAACQAJAAkACQAJAAkACQAJAAkACQAJAIABB9AFNBEBBwJwDKAIAIgZBECAAQQtqQXhxIABBC0kbIgVBA3YiAHYiAUEDcQRAIAFBf3NBAXEgAGoiAkEDdCIEQfCcA2ooAgAiAUEIaiEAAkAgASgCCCIDIARB6JwDaiIERgRAQcCcAyAGQX4gAndxNgIADAELQdCcAygCABogAyAENgIMIAQgAzYCCAsgASACQQN0IgJBA3I2AgQgASACaiIBIAEoAgRBAXI2AgQMDAsgBUHInAMoAgAiCE0NASABBEACQEECIAB0IgJBACACa3IgASAAdHEiAEEAIABrcUF/aiIAIABBDHZBEHEiAHYiAUEFdkEIcSICIAByIAEgAnYiAEECdkEEcSIBciAAIAF2IgBBAXZBAnEiAXIgACABdiIAQQF2QQFxIgFyIAAgAXZqIgJBA3QiA0HwnANqKAIAIgEoAggiACADQeicA2oiA0YEQEHAnAMgBkF+IAJ3cSIGNgIADAELQdCcAygCABogACADNgIMIAMgADYCCAsgAUEIaiEAIAEgBUEDcjYCBCABIAVqIgcgAkEDdCICIAVrIgNBAXI2AgQgASACaiADNgIAIAgEQCAIQQN2IgRBA3RB6JwDaiEBQdScAygCACECAn8gBkEBIAR0IgRxRQRAQcCcAyAEIAZyNgIAIAEMAQsgASgCCAshBCABIAI2AgggBCACNgIMIAIgATYCDCACIAQ2AggLQdScAyAHNgIAQcicAyADNgIADAwLQcScAygCACIKRQ0BIApBACAKa3FBf2oiACAAQQx2QRBxIgB2IgFBBXZBCHEiAiAAciABIAJ2IgBBAnZBBHEiAXIgACABdiIAQQF2QQJxIgFyIAAgAXYiAEEBdkEBcSIBciAAIAF2akECdEHwngNqKAIAIgEoAgRBeHEgBWshAyABIQIDQAJAIAIoAhAiAEUEQCACKAIUIgBFDQELIAAoAgRBeHEgBWsiAiADIAIgA0kiAhshAyAAIAEgAhshASAAIQIMAQsLIAEoAhghCSABIAEoAgwiBEcEQEHQnAMoAgAgASgCCCIATQRAIAAoAgwaCyAAIAQ2AgwgBCAANgIIDAsLIAFBFGoiAigCACIARQRAIAEoAhAiAEUNAyABQRBqIQILA0AgAiEHIAAiBEEUaiICKAIAIgANACAEQRBqIQIgBCgCECIADQALIAdBADYCAAwKC0F/IQUgAEG/f0sNACAAQQtqIgBBeHEhBUHEnAMoAgAiB0UNAEEAIAVrIQICQAJAAkACf0EAIABBCHYiAEUNABpBHyAFQf///wdLDQAaIAAgAEGA/j9qQRB2QQhxIgB0IgEgAUGA4B9qQRB2QQRxIgF0IgMgA0GAgA9qQRB2QQJxIgN0QQ92IAAgAXIgA3JrIgBBAXQgBSAAQRVqdkEBcXJBHGoLIghBAnRB8J4DaigCACIDRQRAQQAhAAwBCyAFQQBBGSAIQQF2ayAIQR9GG3QhAUEAIQADQAJAIAMoAgRBeHEgBWsiBiACTw0AIAMhBCAGIgINAEEAIQIgAyEADAMLIAAgAygCFCIGIAYgAyABQR12QQRxaigCECIDRhsgACAGGyEAIAEgA0EAR3QhASADDQALCyAAIARyRQRAQQIgCHQiAEEAIABrciAHcSIARQ0DIABBACAAa3FBf2oiACAAQQx2QRBxIgB2IgFBBXZBCHEiAyAAciABIAN2IgBBAnZBBHEiAXIgACABdiIAQQF2QQJxIgFyIAAgAXYiAEEBdkEBcSIBciAAIAF2akECdEHwngNqKAIAIQALIABFDQELA0AgACgCBEF4cSAFayIDIAJJIQEgAyACIAEbIQIgACAEIAEbIQQgACgCECIBBH8gAQUgACgCFAsiAA0ACwsgBEUNACACQcicAygCACAFa08NACAEKAIYIQggBCAEKAIMIgFHBEBB0JwDKAIAIAQoAggiAE0EQCAAKAIMGgsgACABNgIMIAEgADYCCAwJCyAEQRRqIgMoAgAiAEUEQCAEKAIQIgBFDQMgBEEQaiEDCwNAIAMhBiAAIgFBFGoiAygCACIADQAgAUEQaiEDIAEoAhAiAA0ACyAGQQA2AgAMCAtByJwDKAIAIgEgBU8EQEHUnAMoAgAhAAJAIAEgBWsiAkEQTwRAQcicAyACNgIAQdScAyAAIAVqIgM2AgAgAyACQQFyNgIEIAAgAWogAjYCACAAIAVBA3I2AgQMAQtB1JwDQQA2AgBByJwDQQA2AgAgACABQQNyNgIEIAAgAWoiASABKAIEQQFyNgIECyAAQQhqIQAMCgtBzJwDKAIAIgEgBUsEQEHMnAMgASAFayIBNgIAQdicA0HYnAMoAgAiACAFaiICNgIAIAIgAUEBcjYCBCAAIAVBA3I2AgQgAEEIaiEADAoLQQAhACAFQS9qIgQCf0GYoAMoAgAEQEGgoAMoAgAMAQtBpKADQn83AgBBnKADQoCggICAgAQ3AgBBmKADIAtBDGpBcHFB2KrVqgVzNgIAQaygA0EANgIAQfyfA0EANgIAQYAgCyICaiIGQQAgAmsiB3EiAiAFTQ0JQfifAygCACIDBEBB8J8DKAIAIgggAmoiCSAITQ0KIAkgA0sNCgtB/J8DLQAAQQRxDQQCQAJAQdicAygCACIDBEBBgKADIQADQCAAKAIAIgggA00EQCAIIAAoAgRqIANLDQMLIAAoAggiAA0ACwtBABB0IgFBf0YNBSACIQZBnKADKAIAIgBBf2oiAyABcQRAIAIgAWsgASADakEAIABrcWohBgsgBiAFTQ0FIAZB/v///wdLDQVB+J8DKAIAIgAEQEHwnwMoAgAiAyAGaiIHIANNDQYgByAASw0GCyAGEHQiACABRw0BDAcLIAYgAWsgB3EiBkH+////B0sNBCAGEHQiASAAKAIAIAAoAgRqRg0DIAEhAAsCQCAFQTBqIAZNDQAgAEF/Rg0AQaCgAygCACIBIAQgBmtqQQAgAWtxIgFB/v///wdLBEAgACEBDAcLIAEQdEF/RwRAIAEgBmohBiAAIQEMBwtBACAGaxB0GgwECyAAIgFBf0cNBQwDC0EAIQQMBwtBACEBDAULIAFBf0cNAgtB/J8DQfyfAygCAEEEcjYCAAsgAkH+////B0sNASACEHQiAUEAEHQiAE8NASABQX9GDQEgAEF/Rg0BIAAgAWsiBiAFQShqTQ0BC0HwnwNB8J8DKAIAIAZqIgA2AgAgAEH0nwMoAgBLBEBB9J8DIAA2AgALAkACQAJAQdicAygCACIDBEBBgKADIQADQCABIAAoAgAiAiAAKAIEIgRqRg0CIAAoAggiAA0ACwwCC0HQnAMoAgAiAEEAIAEgAE8bRQRAQdCcAyABNgIAC0EAIQBBhKADIAY2AgBBgKADIAE2AgBB4JwDQX82AgBB5JwDQZigAygCADYCAEGMoANBADYCAANAIABBA3QiAkHwnANqIAJB6JwDaiIDNgIAIAJB9JwDaiADNgIAIABBAWoiAEEgRw0AC0HMnAMgBkFYaiIAQXggAWtBB3FBACABQQhqQQdxGyICayIDNgIAQdicAyABIAJqIgI2AgAgAiADQQFyNgIEIAAgAWpBKDYCBEHcnANBqKADKAIANgIADAILIAAtAAxBCHENACABIANNDQAgAiADSw0AIAAgBCAGajYCBEHYnAMgA0F4IANrQQdxQQAgA0EIakEHcRsiAGoiATYCAEHMnANBzJwDKAIAIAZqIgIgAGsiADYCACABIABBAXI2AgQgAiADakEoNgIEQdycA0GooAMoAgA2AgAMAQsgAUHQnAMoAgAiBEkEQEHQnAMgATYCACABIQQLIAEgBmohAkGAoAMhAAJAAkACQAJAAkACQANAIAIgACgCAEcEQCAAKAIIIgANAQwCCwsgAC0ADEEIcUUNAQtBgKADIQADQCAAKAIAIgIgA00EQCACIAAoAgRqIgQgA0sNAwsgACgCCCEADAAACwALIAAgATYCACAAIAAoAgQgBmo2AgQgAUF4IAFrQQdxQQAgAUEIakEHcRtqIgkgBUEDcjYCBCACQXggAmtBB3FBACACQQhqQQdxG2oiASAJayAFayEAIAUgCWohByABIANGBEBB2JwDIAc2AgBBzJwDQcycAygCACAAaiIANgIAIAcgAEEBcjYCBAwDCyABQdScAygCAEYEQEHUnAMgBzYCAEHInANByJwDKAIAIABqIgA2AgAgByAAQQFyNgIEIAAgB2ogADYCAAwDCyABKAIEIgJBA3FBAUYEQCACQXhxIQoCQCACQf8BTQRAIAEoAggiAyACQQN2IgRBA3RB6JwDakcaIAMgASgCDCICRgRAQcCcA0HAnAMoAgBBfiAEd3E2AgAMAgsgAyACNgIMIAIgAzYCCAwBCyABKAIYIQgCQCABIAEoAgwiBkcEQCAEIAEoAggiAk0EQCACKAIMGgsgAiAGNgIMIAYgAjYCCAwBCwJAIAFBFGoiAygCACIFDQAgAUEQaiIDKAIAIgUNAEEAIQYMAQsDQCADIQIgBSIGQRRqIgMoAgAiBQ0AIAZBEGohAyAGKAIQIgUNAAsgAkEANgIACyAIRQ0AAkAgASABKAIcIgJBAnRB8J4DaiIDKAIARgRAIAMgBjYCACAGDQFBxJwDQcScAygCAEF+IAJ3cTYCAAwCCyAIQRBBFCAIKAIQIAFGG2ogBjYCACAGRQ0BCyAGIAg2AhggASgCECICBEAgBiACNgIQIAIgBjYCGAsgASgCFCICRQ0AIAYgAjYCFCACIAY2AhgLIAEgCmohASAAIApqIQALIAEgASgCBEF+cTYCBCAHIABBAXI2AgQgACAHaiAANgIAIABB/wFNBEAgAEEDdiIBQQN0QeicA2ohAAJ/QcCcAygCACICQQEgAXQiAXFFBEBBwJwDIAEgAnI2AgAgAAwBCyAAKAIICyEBIAAgBzYCCCABIAc2AgwgByAANgIMIAcgATYCCAwDCyAHAn9BACAAQQh2IgFFDQAaQR8gAEH///8HSw0AGiABIAFBgP4/akEQdkEIcSIBdCICIAJBgOAfakEQdkEEcSICdCIDIANBgIAPakEQdkECcSIDdEEPdiABIAJyIANyayIBQQF0IAAgAUEVanZBAXFyQRxqCyIBNgIcIAdCADcCECABQQJ0QfCeA2ohAgJAQcScAygCACIDQQEgAXQiBHFFBEBBxJwDIAMgBHI2AgAgAiAHNgIADAELIABBAEEZIAFBAXZrIAFBH0YbdCEDIAIoAgAhAQNAIAEiAigCBEF4cSAARg0DIANBHXYhASADQQF0IQMgAiABQQRxaiIEKAIQIgENAAsgBCAHNgIQCyAHIAI2AhggByAHNgIMIAcgBzYCCAwCC0HMnAMgBkFYaiIAQXggAWtBB3FBACABQQhqQQdxGyICayIHNgIAQdicAyABIAJqIgI2AgAgAiAHQQFyNgIEIAAgAWpBKDYCBEHcnANBqKADKAIANgIAIAMgBEEnIARrQQdxQQAgBEFZakEHcRtqQVFqIgAgACADQRBqSRsiAkEbNgIEIAJBiKADKQIANwIQIAJBgKADKQIANwIIQYigAyACQQhqNgIAQYSgAyAGNgIAQYCgAyABNgIAQYygA0EANgIAIAJBGGohAANAIABBBzYCBCAAQQhqIQEgAEEEaiEAIAQgAUsNAAsgAiADRg0DIAIgAigCBEF+cTYCBCADIAIgA2siBEEBcjYCBCACIAQ2AgAgBEH/AU0EQCAEQQN2IgFBA3RB6JwDaiEAAn9BwJwDKAIAIgJBASABdCIBcUUEQEHAnAMgASACcjYCACAADAELIAAoAggLIQEgACADNgIIIAEgAzYCDCADIAA2AgwgAyABNgIIDAQLIANCADcCECADAn9BACAEQQh2IgBFDQAaQR8gBEH///8HSw0AGiAAIABBgP4/akEQdkEIcSIAdCIBIAFBgOAfakEQdkEEcSIBdCICIAJBgIAPakEQdkECcSICdEEPdiAAIAFyIAJyayIAQQF0IAQgAEEVanZBAXFyQRxqCyIANgIcIABBAnRB8J4DaiEBAkBBxJwDKAIAIgJBASAAdCIGcUUEQEHEnAMgAiAGcjYCACABIAM2AgAgAyABNgIYDAELIARBAEEZIABBAXZrIABBH0YbdCEAIAEoAgAhAQNAIAEiAigCBEF4cSAERg0EIABBHXYhASAAQQF0IQAgAiABQQRxaiIGKAIQIgENAAsgBiADNgIQIAMgAjYCGAsgAyADNgIMIAMgAzYCCAwDCyACKAIIIgAgBzYCDCACIAc2AgggB0EANgIYIAcgAjYCDCAHIAA2AggLIAlBCGohAAwFCyACKAIIIgAgAzYCDCACIAM2AgggA0EANgIYIAMgAjYCDCADIAA2AggLQcycAygCACIAIAVNDQBBzJwDIAAgBWsiATYCAEHYnANB2JwDKAIAIgAgBWoiAjYCACACIAFBAXI2AgQgACAFQQNyNgIEIABBCGohAAwDC0GU8wJBMDYCAEEAIQAMAgsCQCAIRQ0AAkAgBCgCHCIAQQJ0QfCeA2oiAygCACAERgRAIAMgATYCACABDQFBxJwDIAdBfiAAd3EiBzYCAAwCCyAIQRBBFCAIKAIQIARGG2ogATYCACABRQ0BCyABIAg2AhggBCgCECIABEAgASAANgIQIAAgATYCGAsgBCgCFCIARQ0AIAEgADYCFCAAIAE2AhgLAkAgAkEPTQRAIAQgAiAFaiIAQQNyNgIEIAAgBGoiACAAKAIEQQFyNgIEDAELIAQgBUEDcjYCBCAEIAVqIgMgAkEBcjYCBCACIANqIAI2AgAgAkH/AU0EQCACQQN2IgFBA3RB6JwDaiEAAn9BwJwDKAIAIgJBASABdCIBcUUEQEHAnAMgASACcjYCACAADAELIAAoAggLIQEgACADNgIIIAEgAzYCDCADIAA2AgwgAyABNgIIDAELIAMCf0EAIAJBCHYiAEUNABpBHyACQf///wdLDQAaIAAgAEGA/j9qQRB2QQhxIgB0IgEgAUGA4B9qQRB2QQRxIgF0IgUgBUGAgA9qQRB2QQJxIgV0QQ92IAAgAXIgBXJrIgBBAXQgAiAAQRVqdkEBcXJBHGoLIgA2AhwgA0IANwIQIABBAnRB8J4DaiEBAkACQCAHQQEgAHQiBXFFBEBBxJwDIAUgB3I2AgAgASADNgIADAELIAJBAEEZIABBAXZrIABBH0YbdCEAIAEoAgAhBQNAIAUiASgCBEF4cSACRg0CIABBHXYhBSAAQQF0IQAgASAFQQRxaiIGKAIQIgUNAAsgBiADNgIQCyADIAE2AhggAyADNgIMIAMgAzYCCAwBCyABKAIIIgAgAzYCDCABIAM2AgggA0EANgIYIAMgATYCDCADIAA2AggLIARBCGohAAwBCwJAIAlFDQACQCABKAIcIgBBAnRB8J4DaiICKAIAIAFGBEAgAiAENgIAIAQNAUHEnAMgCkF+IAB3cTYCAAwCCyAJQRBBFCAJKAIQIAFGG2ogBDYCACAERQ0BCyAEIAk2AhggASgCECIABEAgBCAANgIQIAAgBDYCGAsgASgCFCIARQ0AIAQgADYCFCAAIAQ2AhgLAkAgA0EPTQRAIAEgAyAFaiIAQQNyNgIEIAAgAWoiACAAKAIEQQFyNgIEDAELIAEgBUEDcjYCBCABIAVqIgQgA0EBcjYCBCADIARqIAM2AgAgCARAIAhBA3YiBUEDdEHonANqIQBB1JwDKAIAIQICf0EBIAV0IgUgBnFFBEBBwJwDIAUgBnI2AgAgAAwBCyAAKAIICyEFIAAgAjYCCCAFIAI2AgwgAiAANgIMIAIgBTYCCAtB1JwDIAQ2AgBByJwDIAM2AgALIAFBCGohAAsgC0EQaiQAIAALNgEBfwJ/IAAoAgAiACgCDCIBIAAoAhBGBEAgACAAKAIAKAIkEQAADAELIAEtAAALQRh0QRh1CwkAQeG6ARAyAAs7AQF/IwBBEGsiASQAAn8gAUEANgIMIAEgADYCBCABIAA2AgAgASAAQQFqNgIIIAELEJYGIAFBEGokAAs/AQF/IwBBEGsiASQAAn8gAUEANgIMIAEgADYCBCABIAA2AgAgASAAQQFqNgIIIAELEJcGIQAgAUEQaiQAIAALDQAgACgCABCcAhogAAsNACAAKAIAEKICGiAACwUAEAUAC/MCAgJ/AX4CQCACRQ0AIAAgAmoiA0F/aiABOgAAIAAgAToAACACQQNJDQAgA0F+aiABOgAAIAAgAToAASADQX1qIAE6AAAgACABOgACIAJBB0kNACADQXxqIAE6AAAgACABOgADIAJBCUkNACAAQQAgAGtBA3EiBGoiAyABQf8BcUGBgoQIbCIBNgIAIAMgAiAEa0F8cSIEaiICQXxqIAE2AgAgBEEJSQ0AIAMgATYCCCADIAE2AgQgAkF4aiABNgIAIAJBdGogATYCACAEQRlJDQAgAyABNgIYIAMgATYCFCADIAE2AhAgAyABNgIMIAJBcGogATYCACACQWxqIAE2AgAgAkFoaiABNgIAIAJBZGogATYCACAEIANBBHFBGHIiBGsiAkEgSQ0AIAGtIgVCIIYgBYQhBSADIARqIQEDQCABIAU3AxggASAFNwMQIAEgBTcDCCABIAU3AwAgAUEgaiEBIAJBYGoiAkEfSw0ACwsgAAtkACACRQRAIAAoAgQgASgCBEYPCyAAIAFGBEBBAQ8LAn8jAEEQayICIAA2AgggAiACKAIIKAIENgIMIAIoAgwLAn8jAEEQayIAIAE2AgggACAAKAIIKAIENgIMIAAoAgwLEGtFCwkAIAAgARCIAgsJACAAIAEQiwILGAAgAC0AAEEgcUUEQCABIAIgABDMARoLCwkAIAAgARDqBAtpAQF/IwBBEGsiBSQAIAUgAjYCDCAFIAQ2AgggBSAFQQxqEFkhAiAAIAEgAyAFKAIIEIcBIQEgAigCACIABEBB+LMCKAIAGiAABEBB+LMCQdTzAiAAIABBf0YbNgIACwsgBUEQaiQAIAEL7gEBAn8CQAJ/IAAsAAtBAEgEQCAAKAIEDAELIAAtAAsLRQ0AIAIgAWtBBUgNACABIAIQiAEgAkF8aiEEAn8gACwAC0EASARAIAAoAgQMAQsgAC0ACwsCfyAALAALQQBIBEAgACgCAAwBCyAACyICaiEFA0ACQCACLAAAIQAgASAETw0AAkAgAEEBSA0AIABB/wBODQAgASgCACACLAAARg0AIANBBDYCAA8LIAJBAWogAiAFIAJrQQFKGyECIAFBBGohAQwBCwsgAEEBSA0AIABB/wBODQAgBCgCAEF/aiACLAAASQ0AIANBBDYCAAsLDAAgACABEIgCQQFzCwwAIAAgARCLAkEBcwtQAQF+AkAgA0HAAHEEQCABIANBQGqthiECQgAhAQwBCyADRQ0AIAIgA60iBIYgAUHAACADa62IhCECIAEgBIYhAQsgACABNwMAIAAgAjcDCAsKACAAQfiNAxBbCwkAQdS6ARAyAAtrAQF/IwBBgAJrIgUkAAJAIAIgA0wNACAEQYDABHENACAFIAEgAiADayICQYACIAJBgAJJIgEbED0aIAFFBEADQCAAIAVBgAIQQSACQYB+aiICQf8BSw0ACwsgACAFIAIQQQsgBUGAAmokAAsKACAAQYCOAxBbC8EJAgR/BH4jAEHwAGsiBSQAIARC////////////AIMhCgJAAkAgAUJ/fCILQn9RIAJC////////////AIMiCSALIAFUrXxCf3wiC0L///////+///8AViALQv///////7///wBRG0UEQCADQn98IgtCf1IgCiALIANUrXxCf3wiC0L///////+///8AVCALQv///////7///wBRGw0BCyABUCAJQoCAgICAgMD//wBUIAlCgICAgICAwP//AFEbRQRAIAJCgICAgICAIIQhBCABIQMMAgsgA1AgCkKAgICAgIDA//8AVCAKQoCAgICAgMD//wBRG0UEQCAEQoCAgICAgCCEIQQMAgsgASAJQoCAgICAgMD//wCFhFAEQEKAgICAgIDg//8AIAIgASADhSACIASFQoCAgICAgICAgH+FhFAiBhshBEIAIAEgBhshAwwCCyADIApCgICAgICAwP//AIWEUA0BIAEgCYRQBEAgAyAKhEIAUg0CIAEgA4MhAyACIASDIQQMAgsgAyAKhFBFDQAgASEDIAIhBAwBCyADIAEgAyABViAKIAlWIAkgClEbIgcbIQogBCACIAcbIgtC////////P4MhCSACIAQgBxsiAkIwiKdB//8BcSEIIAtCMIinQf//AXEiBkUEQCAFQeAAaiAKIAkgCiAJIAlQIgYbeSAGQQZ0rXynIgZBcWoQRyAFKQNoIQkgBSkDYCEKQRAgBmshBgsgASADIAcbIQMgAkL///////8/gyEBIAgEfiABBSAFQdAAaiADIAEgAyABIAFQIgcbeSAHQQZ0rXynIgdBcWoQR0EQIAdrIQggBSkDUCEDIAUpA1gLQgOGIANCPYiEQoCAgICAgIAEhCEEIAlCA4YgCkI9iIQhASACIAuFIQwCfiADQgOGIgMgBiAIayIHRQ0AGiAHQf8ASwRAQgAhBEIBDAELIAVBQGsgAyAEQYABIAdrEEcgBUEwaiADIAQgBxB/IAUpAzghBCAFKQMwIAUpA0AgBSkDSIRCAFKthAshAyABQoCAgICAgIAEhCEJIApCA4YhAgJAIAxCf1cEQCACIAN9IgEgCSAEfSACIANUrX0iA4RQBEBCACEDQgAhBAwDCyADQv////////8DVg0BIAVBIGogASADIAEgAyADUCIHG3kgB0EGdK18p0F0aiIHEEcgBiAHayEGIAUpAyghAyAFKQMgIQEMAQsgAiADfCIBIANUrSAEIAl8fCIDQoCAgICAgIAIg1ANACABQgGDIANCP4YgAUIBiISEIQEgBkEBaiEGIANCAYghAwsgC0KAgICAgICAgIB/gyECIAZB//8BTgRAIAJCgICAgICAwP//AIQhBEIAIQMMAQtBACEHAkAgBkEASgRAIAYhBwwBCyAFQRBqIAEgAyAGQf8AahBHIAUgASADQQEgBmsQfyAFKQMAIAUpAxAgBSkDGIRCAFKthCEBIAUpAwghAwsgA0I9hiABQgOIhCIEIAGnQQdxIgZBBEutfCIBIARUrSADQgOIQv///////z+DIAKEIAetQjCGhHwgASABQgGDQgAgBkEERhsiAXwiAyABVK18IQQLIAAgAzcDACAAIAQ3AwggBUHwAGokAAutAQEEfyMAQSBrIgIkACAAKAIIIQMgACgCBCEEIAJBCGogARBPIQUgAiADIARrQQxtIgE2AhggAiABNgIUAkAgACgCFCIBIAAoAhhJBEAgASAFEE8aIAEgAigCFCIDNgIMIAEgAigCGCIENgIQIAMgBEoEQEGGGxAnCyAAIAFBFGo2AhQMAQsgAEEQaiACQQhqEPICCyACLAATQX9MBEAgAigCCBAhCyACQSBqJAALOQEBfyMAQRBrIgEkACABAn8gACwAC0EASARAIAAoAgAMAQsgAAs2AgggASgCCCEAIAFBEGokACAAC0kBAX8jAEEQayICJAACQCABLAALQQBOBEAgACABKAIINgIIIAAgASkCADcCAAwBCyAAIAEoAgAgASgCBBC3AQsgAkEQaiQAIAALBABBAAtkACACKAIEQbABcSICQSBGBEAgAQ8LAkAgAkEQRw0AAkACQCAALQAAIgJBVWoOAwABAAELIABBAWoPCyABIABrQQJIDQAgAkEwRw0AIAAtAAFBIHJB+ABHDQAgAEEC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CDYCACAHIAY2AgQgByEBDAELIAcgBjoACyAHIgEhCAsgCCAFIAYQPSAGakEAOgAAIAAgBygCACAHIAEsAAtBAEgbIAYgACgCACgCMBEEACEFIAEsAAtBf0wEQCAHKAIAECELIAUgBkcNAQsgAyACayIBQQFOBEAgACACIAEgACgCACgCMBEEACABRw0BCyAEQQA2AgwgACEJCyAHQRBqJAAgCQsUACACBH8gACABIAIQ6wIFIAALGgvWAgEBfwJAIAAgAUYNACABIABrIAJrQQAgAkEBdGtNBEAgACABIAIQJBoPCyAAIAFzQQNxIQMCQAJAIAAgAUkEQCADDQIgAEEDcUUNAQNAIAJFDQQgACABLQAAOgAAIAFBAWohASACQX9qIQIgAEEBaiIAQQNxDQALDAELAkAgAw0AIAAgAmpBA3EEQANAIAJFDQUgACACQX9qIgJqIgMgASACai0AADoAACADQQNxDQALCyACQQNNDQADQCAAIAJBfGoiAmogASACaigCADYCACACQQNLDQALCyACRQ0CA0AgACACQX9qIgJqIAEgAmotAAA6AAAgAg0ACwwCCyACQQNNDQADQCAAIAEoAgA2AgAgAUEEaiEBIABBBGohACACQXxqIgJBA0sNAAsLIAJFDQADQCAAIAEtAAA6AAAgAEEBaiEAIAFBAWohASACQX9qIgINAAsLCwQAIAALTQECfyABLQAAIQICQCAALQAAIgNFDQAgAiADRw0AA0AgAS0AASECIAAtAAEiA0UNASABQQFqIQEgAEEBaiEAIAIgA0YNAAsLIAMgAmsLpgIBBn8gACgCCCIEIAAoAgQiA2tBAnUgAU8EQCABRQRAIAAgAzYCBA8LIAMgAUECdGohAQNAIAMgAigCADYCACABIANBBGoiA0cNAAsgACABNgIEDwsCQCADIAAoAgAiBmsiB0ECdSIIIAFqIgNBgICAgARJBEACf0EAIAMgBCAGayIEQQF1IgUgBSADSRtB/////wMgBEECdUH/////AUkbIgRFDQAaIARBgICAgARPDQIgBEECdBAiCyIFIAhBAnRqIgMgAUECdGohAQNAIAMgAigCADYCACABIANBBGoiA0cNAAsgB0EBTgRAIAUgBiAHECQaCyAAIAUgBEECdGo2AgggACABNgIEIAAgBTYCACAGBEAgBhAhCw8LEDcAC0GjHBAyAAsMACAAQYKGgCA2AAALVwEBfyMAQRBrIgEkACABAn8gACwAC0EASARAIAAoAgAMAQsgAAsCfyAALAALQQBIBEAgACgCBAwBCyAALQALC0ECdGo2AgggASgCCCEAIAFBEGokACAAC1QBAX8jAEEQayIBJAAgAQJ/IAAsAAtBAEgEQCAAKAIADAELIAALAn8gACwAC0EASARAIAAoAgQMAQsgAC0ACwtqNgIIIAEoAgghACABQRBqJAAgAAuPAQEBfyADQYAQcQRAIABBKzoAACAAQQFqIQALIANBgARxBEAgAEEjOgAAIABBAWohAAsDQCABLQAAIgQEQCAAIAQ6AAAgAEEBaiEAIAFBAWohAQwBCwsgAAJ/Qe8AIANBygBxIgFBwABGDQAaQdgAQfgAIANBgIABcRsgAUEIRg0AGkHkAEH1ACACGws6AAALiwIAAkAgAAR/IAFB/wBNDQECQEH4swIoAgAoAgBFBEAgAUGAf3FBgL8DRg0DDAELIAFB/w9NBEAgACABQT9xQYABcjoAASAAIAFBBnZBwAFyOgAAQQIPCyABQYCwA09BACABQYBAcUGAwANHG0UEQCAAIAFBP3FBgAFyOgACIAAgAUEMdkHgAXI6AAAgACABQQZ2QT9xQYABcjoAAUEDDwsgAUGAgHxqQf//P00EQCAAIAFBP3FBgAFyOgADIAAgAUESdkHwAXI6AAAgACABQQZ2QT9xQYABcjoAAiAAIAFBDHZBP3FBgAFyOgABQQQPCwtBlPMCQRk2AgBBfwVBAQsPCyAAIAE6AABBAQsJACAAIAEQ9QILHwEBfyMAQRBrIgIkACAAIAEgARAoELcBIAJBEGokAAtVAQJ/QcCgAygCACIBIABBA2pBfHEiAmohAAJAIAJBAU5BACAAIAFNGw0AIAA/AEEQdEsEQCAAEBNFDQELQcCgAyAANgIAIAEPC0GU8wJBMDYCAEF/C9sBAgF/An5BASEEAkAgAEIAUiABQv///////////wCDIgVCgICAgICAwP//AFYgBUKAgICAgIDA//8AURsNACACQgBSIANC////////////AIMiBkKAgICAgIDA//8AViAGQoCAgICAgMD//wBRGw0AIAAgAoQgBSAGhIRQBEBBAA8LIAEgA4NCAFkEQEF/IQQgACACVCABIANTIAEgA1EbDQEg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QYABRg0ACwsgBUEANgIAQZTzAkEZNgIAQX8hBAwBCyAFIAM2AgALIAdBEGokACAEC6gBAQV/IAAQKCEEAkACQEGgjAMoAgBFDQAgAC0AAEUNACAAQT0Q2wIiAUEAIAEtAABBPUYbDQBBoIwDKAIAKAIAIgFFDQADQAJAIAAgASAEEJcDIQNBoIwDKAIAIQEgA0UEQCABIAJBAnRqKAIAIgMgBGoiBS0AAEE9Rg0BCyABIAJBAWoiAkECdGooAgAiAQ0BDAMLCyADRQ0BIAVBAWohAgsgAg8LQQALXgEBfyAAKAJMQQBIBEAgACgCBCIBIAAoAghJBEAgACABQQFqNgIEIAEtAAAPCyAAEMkBDwsCfyAAKAIEIgEgACgCCEkEQCAAIAFBAWo2AgQgAS0AAAwBCyAAEMkBCwsHACAAEQ8AC4IBAQJ/IABFBEAgARA1DwsgAUFATwRAQZTzAkEwNgIAQQAPCyAAQXhqQRAgAUELakF4cSABQQtJGxCSAyICBEAgAkEIag8LIAEQNSICRQRAQQAPCyACIABBfEF4IABBfGooAgAiA0EDcRsgA0F4cWoiAyABIAMgAUkbECQaIAAQISACC14BAX8jAEEQayIDJAAgAyAANgIIIAMoAgghACADQRBqJAAgACEDAn8jAEEQayIAJAAgACABNgIIIAAoAgghASAAQRBqJAAgASADayIACwRAIAIgAyAAEGkLIAAgAmoL1wMCAn8CfiMAQSBrIgIkAAJAIAFC////////////AIMiBUKAgICAgIDA/0N8IAVCgICAgICAwIC8f3xUBEAgAUIEhiAAQjyIhCEEIABC//////////8PgyIAQoGAgICAgICACFoEQCAEQoGAgICAgICAwAB8IQQMAgsgBEKAgICAgICAgEB9IQQgAEKAgICAgICAgAiFQgBSDQEgBEIBgyAEfCEEDAELIABQIAVCgICAgICAwP//AFQgBUKAgICAgIDA//8AURtFBEAgAUIEhiAAQjyIhEL/////////A4NCgICAgICAgPz/AIQhBAwBC0KAgICAgICA+P8AIQQgBUL///////+//8MAVg0AQgAhBCAFQjCIpyIDQZH3AEkNACACQRBqIAAgAUL///////8/g0KAgICAgIDAAIQiBCADQf+If2oQRyACIAAgBEGB+AAgA2sQfyACKQMIQgSG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IAEQIQsgAAsRACAARQRAQQAPCyAAIAEQcQsjAQJ/IAAhAQNAIAEiAkEEaiEBIAIoAgANAAsgAiAAa0ECdQtJAQF/IwBBkAFrIgMkACADQQBBkAEQPSIDQX82AkwgAyAANgIsIANBiQE2AiAgAyAANgJUIAMgASACEJADIQAgA0GQAWokACAAC9wCAQV/An8CQAJAIAAoAgQgACgCACIDa0EMbSIFQQFqIgRB1qrVqgFJBEAgBCAAKAIIIANrQQxtIgNBAXQiBiAGIARJG0HVqtWqASADQarVqtUASRsiAwRAIANB1qrVqgFPDQIgA0EMbBAiIQILIAVBDGwgAmoiBCABKQIANwIAIAQgASgCCDYCCCABQgA3AgAgAUEANgIIIAIgA0EMbGohAyAEQQxqIQUgACgCBCIBIAAoAgAiAkYNAgNAIARBdGoiBCABQXRqIgEpAgA3AgAgBCABKAIINgIIIAFCADcCACABQQA2AgggASACRw0ACyAAKAIEIQIgACgCAAwDCxA3AAtBuwwQMgALIAILIQEgACADNgIIIAAgBTYCBCAAIAQ2AgAgASACRwRAA0AgAkF0aiEAIAJBf2osAABBf0wEQCAAKAIAECELIAAiAiABRw0ACwsgAQRAIAEQIQsLlAQBA38gASAAIAFGIgM6AAwCQCADDQADQCABKAIIIgMtAAwNAQJAIAMgAygCCCICKAIAIgRGBEACQCACKAIEIgRFDQAgBC0ADA0ADAILAkAgASADKAIARgRAIAMhAQwBCyADIAMoAgQiASgCACIANgIEIAEgAAR/IAAgAzYCCCADKAIIBSACCzYCCCADKAIIIgAgACgCACADR0ECdGogATYCACABIAM2AgAgAyABNgIIIAEoAgghAgsgAUEBOgAMIAJBADoADCACIAIoAgAiACgCBCIBNgIAIAEEQCABIAI2AggLIAAgAigCCDYCCCACKAIIIgEgASgCACACR0ECdGogADYCACAAIAI2AgQgAiAANgIIDwsCQCAERQ0AIAQtAAwNAAwBCwJAIAEgAygCAEcEQCADIQEMAQsgAyABKAIEIgA2AgAgASAABH8gACADNgIIIAMoAggFIAILNgIIIAMoAggiACAAKAIAIANHQQJ0aiABNgIAIAEgAzYCBCADIAE2AgggASgCCCECCyABQQE6AAwgAkEAOgAMIAIgAigCBCIAKAIAIgE2AgQgAQRAIAEgAjYCCAsgACACKAIINgIIIAIoAggiASABKAIAIAJHQQJ0aiAANgIAIAAgAjYCACACIAA2AggMAgsgBEEMaiEBIANBAToADCACIAAgAkY6AAwgAUEBOgAAIAIiASAARw0ACwsL4QEBBn8jAEEQayIFJAAgACgCBCEDAn8gAigCACAAKAIAayIEQf////8HSQRAIARBAXQMAQtBfwsiBEEBIAQbIQQgASgCACEHIAAoAgAhCCADQYsBRgR/QQAFIAAoAgALIAQQowEiBgRAIANBiwFHBEAgACgCABogAEEANgIACyAFQYoBNgIEIAAgBUEIaiAGIAVBBGoQMyIDEO4BIAMoAgAhBiADQQA2AgAgBgRAIAYgAygCBBEBAAsgASAAKAIAIAcgCGtqNgIAIAIgBCAAKAIAajYCACAFQRBqJAAPCxA8AAsoAQF/IwBBEGsiASQAIAEgADYCDEHw0gBBAyABKAIMEAAgAUEQaiQACygBAX8jAEEQayIBJAAgASAANgIMQcDTAEEFIAEoAgwQACABQRBqJAALKAEBfyMAQRBrIgEkACABIAA2AgxBoNIAQQEgASgCDBAAIAFBEGokAAsoAQF/IwBBEGsiASQAIAEgADYCDEH40QBBACABKAIMEAAgAUEQaiQACygBAX8jAEEQayIBJAAgASAANgIMQcjSAEECIAEoAgwQACABQRBqJAALKAEBfyMAQRBrIgEkACABIAA2AgxBmNMAQQQgASgCDBAAIAFBEGokAAsTACAAIAAoAgBBdGooAgBqEL0BCxMAIAAgACgCAEF0aigCAGoQlAELEwAgACAAKAIAQXRqKAIAahDAAQsTACAAIAAoAgBBdGooAgBqEJUBC9wBAgN/AX4jAEEQayIEJAACfwJAAkACQCAAIAFHBEACQAJAIAAtAAAiBUEtRw0AIABBAWoiACABRw0ADAELQZTzAigCACEGQZTzAkEANgIAIAAgBEEMaiADECwQqwEhBwJAQZTzAigCACIABEAgBCgCDCABRw0BIABBxABGDQUMBAtBlPMCIAY2AgAgBCgCDCABRg0DCwsLIAJBBDYCAEEADAMLIAdC//8DWA0BCyACQQQ2AgBB//8DDAELQQAgB6ciAGsgACAFQS1GGwshACAEQRBqJAAgAEH//wNxC9ABAgN/AX4jAEEQayIEJAACfgJAAkACQCAAIAFHBEACQAJAIAAtAAAiBUEtRw0AIABBAWoiACABRw0ADAELQZTzAigCACEGQZTzAkEANgIAIAAgBEEMaiADECwQqwEhBwJAQZTzAigCACIABEAgBCgCDCABRw0BIABBxABGDQUMBAtBlPMCIAY2AgAgBCgCDCABRg0DCwsLIAJBBDYCAEIADAMLQn8gB1oNAQsgAkEENgIAQn8MAQtCACAHfSAHIAVBLUYbCyEHIARBEGokACAHC9cBAgN/AX4jAEEQayIEJAACfwJAAkACQCAAIAFHBEACQAJAIAAtAAAiBUEtRw0AIABBAWoiACABRw0ADAELQZTzAigCACEGQZTzAkEANgIAIAAgBEEMaiADECwQqwEhBwJAQZTzAigCACIABEAgBCgCDCABRw0BIABBxABGDQUMBAtBlPMCIAY2AgAgBCgCDCABRg0DCwsLIAJBBDYCAEEADAMLIAdC/////w9YDQELIAJBBDYCAEF/DAELQQAgB6ciAGsgACAFQS1GGwshACAEQRBqJAAgAAt7AQF/IwBBkAFrIgQkACAEIAA2AiwgBCAANgIEIARBADYCACAEQX82AkwgBEF/IABB/////wdqIABBAEgbNgIIIARCABBVIAQgAkEBIAMQ3QIhAyABBEAgASAAIAQoAgQgBCgCeGogBCgCCGtqNgIACyAEQZABaiQAIAMLFgAgACABIAJCgICAgICAgICAfxDlAQtDAAJAIABFDQACQAJAAkACQCABQQJqDgYAAQICBAMECyAAIAI8AAAPCyAAIAI9AQAPCyAAIAI+AgAPCyAAIAI3AwALC18BBX8jAEEQayIAJAAgAEH/////AzYCDCAAQf////8HNgIIIwBBEGsiASQAIABBCGoiAigCACAAQQxqIgMoAgBJIQQgAUEQaiQAIAIgAyAEGygCACEBIABBEGokACABC3UBAn8jAEEQayIBJAAgAUHAmgM2AgAgAUHEmgMoAgAiAjYCBCABIAIgAEECdGo2AgggASgCBCEAA0AgASgCCCAARwRAIAEoAgRBADYCACABIAEoAgRBBGoiADYCBAwBCwsgASgCACABKAIENgIEIAFBEGokAAs+ACAAKAIAGiAAKAIAIAAoAhAgACgCAGtBAnVBAnRqGiAAKAIAGiAAKAIAIAAoAgQg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AiAEaiAGaiAEIAlqIAVqIAcQXAsgAUEKRwRAIAkQIQsgACACNgIAIAAgCkGAgICAeHI2AgggACADIAZqIgA2AgQgCEEAOgAHIAAgAmogCC0ABzoAACAIQRBqJAAPCxBJAAsxAQF/IAAoAgwiASAAKAIQRgRAIAAgACgCACgCKBEAAA8LIAAgAUEEajYCDCABKAIACyoAIABB0N0ANgIAIABBBGoQrwEgAEIANwIYIABCADcCECAAQgA3AgggAAsEAEF/CwQAIAALEAAgAEJ/NwMIIABCADcDAAsQACAAQn83AwggAEIANwMACzEBAX8gACgCDCIBIAAoAhBGBEAgACAAKAIAKAIoEQAADwsgACABQQFqNgIMIAEtAAALKgAgAEGQ3QA2AgAgAEEEahCvASAAQgA3AhggAEIANwIQIABCADcCCCAAC5QBAQF/AkAgACgCBCIBIAEoAgBBdGooAgBqKAIYRQ0AIAAoAgQiASABKAIAQXRqKAIAaigCEA0AIAAoAgQiASABKAIAQXRqKAIAaigCBEGAwABxRQ0AIAAoAgQiASABKAIAQXRqKAIAaigCGCIBIAEoAgAoAhgRAABBf0cNACAAKAIEIgAgACgCAEF0aigCAGoQsQELCwkAIAAQgQEQIQs/AQF/IwBBEGsiAyQAIAMgADYCCANAIAEgAkkEQCADQQhqIAEQpwIgAUEBaiEBDAELCyADKAIIGiADQRBqJAALDwAgACgCACABLAAAEJABCxoAAkAgACABRgRAIABBADoAcAwBCyABECELCwkAIAAgARCgBQs3AQF/IwBBEGsiAiQAIAIgACgCADYCCCACIAIoAgggAUECdGo2AgggAigCCCEAIAJBEGokACAACzQBAX8jAEEQayICJAAgAiAAKAIANgIIIAIgAigCCCABajYCCCACKAIIIQAgAkEQaiQAIAALDAAgACAAKAIAEK0CCyYBAX8gACgCBCECA0AgASACRwRAIAJBfGohAgwBCwsgACABNgIECwkAIAAQLDYCAAtiAQF/IwBBEGsiBiQAIAZBADoADyAGIAU6AA4gBiAEOgANIAZBJToADCAFBEAgBkENaiAGQQ5qEI8CCyACIAEgAigCACABayAGQQxqIAMgACgCABAPIAFqNgIAIAZBEGokAAuaAQEDfyMAQRBrIgQkACAAEJ0CIQMgACAB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IAZBAWohBgsgBgsgAiAFKAIAIAkoAgAoAiARCQAaIAUgBSgCACACIAZraiIFNgIAIAQgBSADIAEgAGtqIAEgAkYbNgIAIAgQIxogCEEQaiQADwsgCSAHQRh0QRh1IAkoAgAoAhwRAwAhByAFIAUoAgAiC0EBajYCACALIAc6AAAgBkEBaiEGDAAACwALxQMBAX8jAEEQayIKJAAgCQJ/IAAEQCACEP0BIQACQCABBEAgCiAAIAAoAgAoAiwRAgAgAyAKKAIANgAAIAogACAAKAIAKAIgEQIADAELIAogACAAKAIAKAIoEQIAIAMgCigCADYAACAKIAAgACgCACgCHBECAAsgCCAKEF0gChAjGiAEIAAgACgCACgCDBEAADYCACAFIAAgACgCACgCEBEAADYCACAKIAAgACgCACgCFBECACAGIAoQQiAKECMaIAogACAAKAIAKAIYEQIAIAcgChBdIAoQIxogACAAKAIAKAIkEQAADAELIAIQ/gEhAAJAIAEEQCAKIAAgACgCACgCLBECACADIAooAgA2AAAgCiAAIAAoAgAoAiARAgAMAQsgCiAAIAAoAgAoAigRAgAgAyAKKAIANgAAIAogACAAKAIAKAIcEQIACyAIIAoQXSAKECMaIAQgACAAKAIAKAIMEQAANgIAIAUgACAAKAIAKAIQEQAANgIAIAogACAAKAIAKAIUEQIAIAYgChBCIAoQIxogCiAAIAAoAgAoAhgRAgAgByAKEF0gChAjGiAAIAAoAgAoAiQRAAALNgIAIApBEGokAAvZBwEKfyMAQRBrIhQkACACIAA2AgAgA0GABHEhFgJAA0ACQCAVQQRGBEACfyANLAALQQBIBEAgDSgCBAwBCyANLQALC0EBSwRAIBQgDRBONgIIIAIgFEEIakEBEKoCIA0QbiACKAIAEKQBNgIACyADQbABcSIDQRBGDQMgA0EgRw0BIAEgAigCADYCAAwDCwJAAkACQAJAAkACQCAIIBVqLAAADgUAAQMCBAULIAEgAigCADYCAAwECyABIAIoAgA2AgAgBkEgIAYoAgAoAiwRAwAhDyACIAIoAgAiEEEEajYCACAQIA82AgAMAwsCfyANLAALQQBIBEAgDSgCBAwBCyANLQALC0UNAgJ/IA0sAAtBAEgEQCANKAIADAELIA0LKAIAIQ8gAiACKAIAIhBB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IQMgAEEANgIUIAFBfyADGwshASAAIAAoAgAiACAHcjYCAEF/IAEgAEEgcRshASACRQ0ACyAFQdABaiQAIAELtAMCA38BfiMAQSBrIgMkAAJAIAFC////////////AIMiBUKAgICAgIDAv0B8IAVCgICAgICAwMC/f3xUBEAgAUIZiKchAiAAUCABQv///w+DIgVCgICACFQgBUKAgIAIURtFBEAgAkGBgICABGohAgwCCyACQYCAgIAEaiECIAAgBUKAgIAIhYRCAFINASACQQFxIAJqIQIMAQsgAFAgBUKAgICAgIDA//8AVCAFQoCAgICAgMD//wBRG0UEQCABQhmIp0H///8BcUGAgID+B3IhAgwBC0GAgID8ByECIAVC////////v7/AAFYNAEEAIQIgBUIwiKciBEGR/gBJDQAgA0EQaiAAIAFC////////P4NCgICAgICAwACEIgUgBEH/gX9qEEcgAyAAIAVBgf8AIARrEH8gAykDCCIAQhmIpyECIAMpAwAgAykDECADKQMYhEIAUq2EIgVQIABC////D4MiAEKAgIAIVCAAQoCAgAhRG0UEQCACQQFqIQIMAQsgBSAAQoCAgAiFhEIAUg0AIAJBAXEgAmohAgsgA0EgaiQAIAIgAUIgiKdBgICAgHhxcr4LWQEBfyAAIAAtAEoiAUF/aiABcjoASiAAKAIAIgFBCHEEQCAAIAFBIHI2AgBBfw8LIABCADcCBCAAIAAoAiwiATYCHCAAIAE2AhQgACABIAAoAjBqNgIQQQALfAECfyAAIAAtAEoiAUF/aiABcjoASiAAKAIUIAAoAhxLBEAgAEEAQQAgACgCJBEEABoLIABBADYCHCAAQgA3AxAgACgCACIBQQRxBEAgACABQSByNgIAQX8PCyAAIAAoAiwgACgCMGoiAjYCCCAAIAI2AgQgAUEbdEEfdQvaAQECfwJAIAFB/wFxIgMEQCAAQQNxBEADQCAALQAAIgJFDQMgAiABQf8BcUYNAyAAQQFqIgBBA3ENAAsLAkAgACgCACICQX9zIAJB//37d2pxQYCBgoR4cQ0AIANBgYKECGwhAwNAIAIgA3MiAkF/cyACQf/9+3dqcUGAgYKEeHENASAAKAIEIQIgAEEEaiEAIAJB//37d2ogAkF/c3FBgIGChHhxRQ0ACwsDQCAAIgItAAAiAwRAIAJBAWohACADIAFB/wFxRw0BCwsgAg8LIAAQKCAAag8LIAALfwEDfyMAQRBrIgEkACABQQo6AA8CQCAAKAIQIgJFBEAgABDZAg0BIAAoAhAhAgsCQCAAKAIUIgMgAk8NACAALABLQQpGDQAgACADQQFqNgIUIANBCjoAAAwBCyAAIAFBD2pBASAAKAIkEQQAQQFHDQAgAS0ADxoLIAFBEGokAAvfCgIFfwR+IwBBEGsiCCQAAkACQAJAAkACQAJAIAFBJE0EQANAAn8gACgCBCIEIAAoAmhJBEAgACAEQQFqNgIEIAQtAAAMAQsgABArCyIEIgZBIEYgBkF3akEFSXINAAsCQAJAIARBVWoOAwABAAELQX9BACAEQS1GGyEHIAAoAgQiBCAAKAJoSQRAIAAgBEEBajYCBCAELQAAIQQMAQsgABArIQQLAkACQCABQW9xDQAgBEEwRw0AAn8gACgCBCIEIAAoAmhJBEAgACAEQQFqNgIEIAQtAAAMAQsgABArCyIEQV9xQdgARgRAAn8gACgCBCIBIAAoAmhJBEAgACABQQFqNgIEIAEtAAAMAQsgABArCyEEQRAhASAEQaHaAGotAABBEEkNBSAAKAJoRQRAQgAhAyACDQoMCQsgACAAKAIEIgFBf2o2AgQgAkUNCCAAIAFBfmo2AgRCACEDDAkLIAENAUEIIQEMBAsgAUEKIAEbIgEgBEGh2gBqLQAASw0AIAAoAmgEQCAAIAAoAgRBf2o2AgQLQgAhAyAAQgAQVUGU8wJBHDYCAAwHCyABQQpHDQIgBEFQaiICQQlNBEBBACEBA0AgAUEKbCEFAn8gACgCBCIBIAAoAmhJBEAgACABQQFqNgIEIAEtAAAMAQsgABArCyEEIAIgBWohASAEQVBqIgJBCU1BACABQZmz5swBSRsNAAsgAa0hCQsgAkEJSw0BIAlCCn4hCiACrSELA0ACfyAAKAIEIgEgACgCaEkEQCAAIAFBAWo2AgQgAS0AAAwBCyAAECsLIQQgCiALfCEJIARBUGoiAkEJSw0CIAlCmrPmzJmz5swZWg0CIAlCCn4iCiACrSILQn+FWA0AC0EKIQEMAwtBlPMCQRw2AgBCACEDDAULQQohASACQQlNDQEMAgsgASABQX9qcQRAIAEgBEGh2gBqLQAAIgJLBEADQCACIAEgBWxqIgVBxuPxOE1BACABAn8gACgCBCICIAAoAmhJBEAgACACQQFqNgIEIAItAAAMAQsgABArCyIEQaHaAGotAAAiAksbDQALIAWtIQkLIAEgAk0NASABrSEKA0AgCSAKfiILIAKtQv8BgyIMQn+FVg0CAn8gACgCBCICIAAoAmhJBEAgACACQQFqNgIEIAItAAAMAQsgABArCyEEIAsgDHwhCSABIARBodoAai0AACICTQ0CIAggCiAJEFogCCkDCFANAAsMAQsgAUEXbEEFdkEHcUGh3ABqLAAAIQYgASAEQaHaAGotAAAiAksEQANAIAIgBSAGdHIiBUH///8/TUEAIAECfyAAKAIEIgIgACgCaEkEQCAAIAJBAWo2AgQgAi0AAAwBCyAAECsLIgRBodoAai0AACICSxsNAAsgBa0hCQtCfyAGrSIKiCILIAlUDQAgASACTQ0AA0AgAq1C/wGDIAkgCoaEIQkCfyAAKAIEIgIgACgCaEkEQCAAIAJBAWo2AgQgAi0AAAwBCyAAECsLIQQgCSALVg0BIAEgBEGh2gBqLQAAIgJLDQALCyABIARBodoAai0AAE0NAANAIAECfyAAKAIEIgIgACgCaEkEQCAAIAJBAWo2AgQgAi0AAAwBCyAAECsLQaHaAGotAABLDQALQZTzAkHEADYCACAHQQAgA0IBg1AbIQcgAyEJCyAAKAJoBEAgACAAKAIEQX9qNgIECwJAIAkgA1QNAAJAIAOnQQFxDQAgBw0AQZTzAkHEADYCACADQn98IQMMAwsgCSADWA0AQZTzAkHEADYCAAwCCyAJIAesIgOFIAN9IQMMAQtCACEDIABCABBVCyAIQRBqJAAgAwuDCAIFfwJ+IwBBMGsiBSQAAkAgAkECTQRAIAJBAnQiAkH83ABqKAIAIQcgAkHw3ABqKAIAIQgDQAJ/IAEoAgQiAiABKAJoSQRAIAEgAkEBajYCBCACLQAADAELIAEQKwsiAiIGQSBGIAZBd2pBBUlyDQALQQEhBgJAAkAgAkFVag4DAAEAAQtBf0EBIAJBLUYbIQYgASgCBCICIAEoAmhJBEAgASACQQFqNgIEIAItAAAhAgwBCyABECshAgsCQAJAA0AgBEGq3ABqLAAAIAJBIHJGBEACQCAEQQZLDQAgASgCBCICIAEoAmhJBEAgASACQQFqNgIEIAItAAAhAgwBCyABECshAgsgBEEBaiIEQQhHDQEMAgsLIARBA0cEQCAEQQhGDQEgA0UNAiAEQQRJDQIgBEEIRg0BCyABKAJoIgIEQCABIAEoAgRBf2o2AgQLIANFDQAgBEEESQ0AA0AgAgRAIAEgASgCBEF/ajYCBAsgBEF/aiIEQQNLDQALCyAFIAayQwAAgH+UEIMGIAUpAwghCSAFKQMAIQoMAgsCQAJAAkAgBA0AQQAhBANAIARBs9wAaiwAACACQSByRw0BAkAgBEEBSw0AIAEoAgQiAiABKAJoSQRAIAEgAkEBajYCBCACLQAAIQIMAQsgARArIQILIARBAWoiBEEDRw0ACwwBCwJAAkAgBA4EAAEBAgELAkAgAkEwRw0AAn8gASgCBCIEIAEoAmhJBEAgASAEQQFqNgIEIAQtAAAMAQsgARArC0FfcUHYAEYEQCAFQRBqIAEgCCAHIAYgAxC9BSAFKQMYIQkgBSkDECEKDAYLIAEoAmhFDQAgASABKAIEQX9qNgIECyAFQSBqIAEgAiAIIAcgBiADEPEFIAUpAyghCSAFKQMgIQoMBAsgASgCaARAIAEgASgCBEF/ajYCBAsMAQsCQAJ/IAEoAgQiAiABKAJoSQRAIAEgAkEBajYCBCACLQAADAELIAEQKwtBKEYEQEEBIQQMAQtCgICAgICA4P//ACEJIAEoAmhFDQMgASABKAIEQX9qNgIEDAMLA0ACfyABKAIEIgIgASgCaEkEQCABIAJBAWo2AgQgAi0AAAwBCyABECsLIgJBv39qIQYCQAJAIAJBUGpBCkkNACAGQRpJDQAgAkHfAEYNACACQZ9/akEaTw0BCyAEQQFqIQQMAQsLQoCAgICAgOD//wAhCSACQSlGDQIgASgCaCICBEAgASABKAIEQX9qNgIECyADBEAgBEUNAwNAIARBf2ohBCACBEAgASABKAIEQX9qNgIECyAEDQALDAMLC0GU8wJBHDYCACABQgAQVQtCACEJCyAAIAo3AwAgACAJNwMIIAVBMGokAAvgAQBBsMABQbHIABAXQcjAAUG2yABBAUEBQQAQGRCNAxCJAxCIAxCKAxCFAxCMAxCHAxCLAxCGAxCOAxCPA0HQGUGgyQAQCkGIzwBBrMkAEApB4M8AQQRBzckAEAZBvNAAQQJB2skAEAZBmNEAQQRB6ckAEAZB1BRB+MkAEBgQhANBpsoAENsBQcvKABDaAUHyygAQ3AFBkcsAENgBQbnLABDdAUHWywAQ2QEQgQMQgANBwcwAENsBQeHMABDaAUGCzQAQ3AFBo80AENgBQcXNABDdAUHmzQAQ2QEQggMQgwMLghECBX8MfiMAQcABayIFJAAgBEL///////8/gyESIAJC////////P4MhDCACIASFQoCAgICAgICAgH+DIREgBEIwiKdB//8BcSEHAkACQAJAIAJCMIinQf//AXEiCUF/akH9/wFNBEAgB0F/akH+/wFJDQELIAFQIAJC////////////AIMiCkKAgICAgIDA//8AVCAKQoCAgICAgMD//wBRG0UEQCACQoCAgICAgCCEIREMAgsgA1AgBEL///////////8AgyICQoCAgICAgMD//wBUIAJCgICAgICAwP//AFEbRQRAIARCgICAgICAIIQhESADIQEMAgsgASAKQoCAgICAgMD//wCFhFAEQCADIAJCgICAgICAwP//AIWEUARAQgAhAUKAgICAgIDg//8AIREMAwsgEUKAgICAgIDA//8AhCERQgAhAQwCCyADIAJCgICAgICAwP//AIWEUARAQgAhAQwCCyABIAqEUA0CIAIgA4RQBEAgEUKAgICAgIDA//8AhCERQgAhAQwCCyAKQv///////z9YBEAgBUGwAWogASAMIAEgDCAMUCIGG3kgBkEGdK18pyIGQXFqEEdBECAGayEGIAUpA7gBIQwgBSkDsAEhAQsgAkL///////8/Vg0AIAVBoAFqIAMgEiADIBIgElAiCBt5IAhBBnStfKciCEFxahBHIAYgCGpBcGohBiAFKQOoASESIAUpA6ABIQMLIAVBkAFqIBJCgICAgICAwACEIhRCD4YgA0IxiIQiAkKEyfnOv+a8gvUAIAJ9IgQQWiAFQYABakIAIAUpA5gBfSAEEFogBUHwAGogBSkDiAFCAYYgBSkDgAFCP4iEIgQgAhBaIAVB4ABqIARCACAFKQN4fRBaIAVB0ABqIAUpA2hCAYYgBSkDYEI/iIQiBCACEFogBUFAayAEQgAgBSkDWH0QWiAFQTBqIAUpA0hCAYYgBSkDQEI/iIQiBCACEFogBUEgaiAEQgAgBSkDOH0QWiAFQRBqIAUpAyhCAYYgBSkDIEI/iIQiBCACEFogBSAEQgAgBSkDGH0QWiAGIAkgB2tqIQYCfkIAIAUpAwhCAYYgBSkDAEI/iIRCf3wiCkL/////D4MiBCACQiCIIg5+IhAgCkIgiCIKIAJC/////w+DIgt+fCICQiCGIg0gBCALfnwiCyANVK0gCiAOfiACIBBUrUIghiACQiCIhHx8IAsgBCADQhGIQv////8PgyIOfiIQIAogA0IPhkKAgP7/D4MiDX58IgJCIIYiDyAEIA1+fCAPVK0gCiAOfiACIBBUrUIghiACQiCIhHx8fCICIAtUrXwgAkIAUq18fSILQv////8PgyIOIAR+IhAgCiAOfiINIAQgC0IgiCIPfnwiC0IghnwiDiAQVK0gCiAPfiALIA1UrUIghiALQiCIhHx8IA5CACACfSICQiCIIgsgBH4iECACQv////8PgyINIAp+fCICQiCGIg8gBCANfnwgD1StIAogC34gAiAQVK1CIIYgAkIgiIR8fHwiAiAOVK18IAJCfnwiECACVK18Qn98IgtC/////w+DIgIgDEIChiABQj6IhEL/////D4MiBH4iDiABQh6IQv////8PgyIKIAtCIIgiC358Ig0gDlStIA0gEEIgiCIOIAxCHohC///v/w+DQoCAEIQiDH58Ig8gDVStfCALIAx+fCACIAx+IhMgBCALfnwiDSATVK1CIIYgDUIgiIR8IA8gDUIghnwiDSAPVK18IA0gCiAOfiITIBBC/////w+DIhAgBH58Ig8gE1StIA8gAiABQgKGQvz///8PgyITfnwiFSAPVK18fCIPIA1UrXwgDyALIBN+IgsgDCAQfnwiDCAEIA5+fCIEIAIgCn58IgJCIIggAiAEVK0gDCALVK0gBCAMVK18fEIghoR8IgwgD1StfCAMIBUgDiATfiIEIAogEH58IgpCIIggCiAEVK1CIIaEfCIEIBVUrSAEIAJCIIZ8IARUrXx8IgQgDFStfCICQv////////8AWARAIAFCMYYgBEL/////D4MiASADQv////8PgyIKfiIMQgBSrX1CACAMfSIQIARCIIgiDCAKfiINIAEgA0IgiCILfnwiDkIghiIPVK19IAJC/////w+DIAp+IAEgEkL/////D4N+fCALIAx+fCAOIA1UrUIghiAOQiCIhHwgBCAUQiCIfiADIAJCIIh+fCACIAt+fCAMIBJ+fEIghnx9IRIgBkF/aiEGIBAgD30MAQsgBEIhiCELIAFCMIYgAkI/hiAEQgGIhCIEQv////8PgyIBIANC/////w+DIgp+IgxCAFKtfUIAIAx9Ig4gASADQiCIIgx+IhAgCyACQh+GhCINQv////8PgyIPIAp+fCILQiCGIhNUrX0gDCAPfiAKIAJCAYgiCkL/////D4N+fCABIBJC/////w+DfnwgCyAQVK1CIIYgC0IgiIR8IAQgFEIgiH4gAyACQiGIfnwgCiAMfnwgDSASfnxCIIZ8fSESIAohAiAOIBN9CyEBIAZBgIABTgRAIBFCgICAgICAwP//AIQhEUIAIQEMAQsgBkH//wBqIQcgBkGBgH9MBEACQCAHDQAgBCABQgGGIANWIBJCAYYgAUI/iIQiASAUViABIBRRG618IgEgBFStIAJC////////P4N8IgJCgICAgICAwACDUA0AIAIgEYQhEQwCC0IAIQEMAQsgBCABQgGGIANaIBJCAYYgAUI/iIQiASAUWiABIBRRG618IgEgBFStIAJC////////P4MgB61CMIaEfCARhCERCyAAIAE3AwAgACARNwMIIAVBwAFqJAAPCyAAQgA3AwAgACARQoCAgICAgOD//wAgAiADhEIAUhs3AwggBUHAAWokAAtMAQF/AkAgAUUNACABQdC/ARBWIgFFDQAgASgCCCAAKAIIQX9zcQ0AIAAoAgwgASgCDEEAED5FDQAgACgCECABKAIQQQAQPiECCyACC1IBAX8gACgCBCEEIAAoAgAiACABAn9BACACRQ0AGiAEQQh1IgEgBEEBcUUNABogAigCACABaigCAAsgAmogA0ECIARBAnEbIAAoAgAoAhwRCwALxQEBA38gACgCGCIBBEAgACABNgIcIAEQIQsgACgCDCICBEACfyACIAIgACgCECIBRg0AGgNAIAFBdGohAyABQX9qLAAAQX9MBEAgAygCABAhCyADIgEgAkcNAAsgACgCDAshASAAIAI2AhAgARAhCyAAKAIAIgIEQAJ/IAIgAiAAKAIEIgFGDQAaA0AgAUF0aiEDIAFBf2osAABBf0wEQCADKAIAECELIAMiASACRw0ACyAAKAIACyEBIAAgAjYCBCABECELC5oCAQZ/IwBBMGsiAyQAAkAgACgCBCIBIAAoAgAiAkcEQCACKAIAQX9GDQELQbcKQQAQWCAAKAIAIQIgACgCBCEB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AAAADAELQwAAAAAhK0MAAAAAIScCfyAGIApBAUcNABogBiAODQAaIAAgACgC+AIgD2ooAgBBA3RqQaw6aioCACEnQQELIQFDAAAAACAOQQFHDQAaQwAAAAAgAUUNABogACAAKAL4AiIBIA9qKAIAQShsaiABIA1qKAIAQQN0akHUOmoqAgALISkgLCAnICuSICmSkgsiJ7wgCSAnIAm+IileIgEbIQkgKSAnIAEbIitD7Hit4F5BAXMNACAnICkgARsgK5MiJ0O3zD1BXUEBcw0AICsgJxBXkrwhCQsgB0F/aiEBIAcgIUoNAAsLIAUgH0gNAAsLAkACQCAAKALwAiICIANMDQAgA0EASA0AIAIgBE4NAQtB3MMAECcgACgC8AIhAgtDAAAAACEnQwAAAAAhKSAAKgLsZCAAKgL8ZCAoIAAgACgC+AIiASALaigCACIGQShsaiABIBpqKAIAIgdBA3RqQaTjAGoqAgBDAAAAAJIgAiAESgR9IAAgBkHIAWxqIAdBKGxqIAEgD2ooAgBBA3RqQYTlAGoqAgAFQwAAAAALkiADQQFOBH0gACAGQcgBbGogB0EobGogASANaigCAEEDdGpB7OwAaioCAAVDAAAAAAuSkpKSIie8IAkgJyAJviIpXiIBGyEFAkAgKSAnIAEbIipD7Hit4F5BAXMNACAnICkgARsgKpMiJ0O3zD1BXUEBcw0AICogJxBXkrwhBQsgACgCuAQgACgChAMgC2ooAgAgA2pBAnRqIAU2AgALIBkNACADIAMgACgC8AIiAkgEf0Hs8bWJfiEFAkAgCEECdCIBIAAoAoQDaigCACADakECdCIGIAAoAqgDaigCAEUNACAGIBYoAgBqQXxqKgIAISkCQAJAIANBAUgiCg0AIAIgBEwNACACIANODQELQdzDABAnIAAoAvACIQILQwAAAAAhJyAAKgL8ZCApIAAgACgC+AIiByADQQJ0IgtqIg0oAgAiCUEobGogASAHaigCACIGQQN0akGk4wBqKgIAQwAAAACSIAIgA0oEfSAAIAlByAFsaiAGQShsaiANKAIEQQN0akGE5QBqKgIABUMAAAAAC5IgACAJQcgBbGogBkEobGogByAEQQJ0aigCAEEDdGpB7OwAaioCAJKSkiEnAkACQCADIAhGDQAgAiADSA0AIAoNACACIARKDQELQYk/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DQAaIARBgICAgARPDQIgBEECdBAiCyIDIAVBAnRqIgUgASgCADYCACAGQQFOBEAgAyACIAYQJBoLIAAgAyAEQQJ0ajYCCCAAIAVBBGo2AgQgACADNgIAIAIEQCACECELDwsQNwALQYwREDIAC4cBAQN/IAAoAgAhAkEMECIiAEEANgIIIABCADcCAAJAIAEgAmoiASgCBCABKAIAIgNrIgEEQCABQQJ1IgRBgICAgARPDQEgACABECIiAjYCACAAIAI2AgQgACACIARBAnRqNgIIIAAgAUEBTgR/IAIgAyABECQgAWoFIAILNgIECyAADwsQNwALEAAgACgCBCAAKAIAa0EDdQs+AQJ/IAAoAgQgACgCACIEa0EDdSIDIAFJBEAgACABIANrIAIQqQMPCyADIAFLBEAgACAEIAFBA3RqNgIECwvmAQEGfyAAKAIEIgIgACgCCCIDRwRAIAIgASkDADcDACAAIAJBCGo2AgQPCwJAIAIgACgCACICayIGQQN1IgVBAWoiBEGAgICAAkkEQAJ/QQAgBCADIAJrIgNBAnUiByAHIARJG0H/////ASADQQN1Qf////8ASRsiBEUNABogBEGAgICAAk8NAiAEQQN0ECILIgMgBUEDdGoiBSABKQMANwMAIAZBAU4EQCADIAIgBhAkGgsgACADIARBA3RqNgIIIAAgBUEIajYCBCAAIAM2AgAgAgRAIAIQIQsPCxA3AAtBjBEQMgALpgIBBn8gACgCCCIEIAAoAgQiA2tBA3UgAU8EQCABRQRAIAAgAzYCBA8LIAMgAUEDdGohAQNAIAMgAikDADcDACABIANBCGoiA0cNAAsgACABNgIEDwsCQCADIAAoAgAiBmsiB0EDdSIIIAFqIgNBgICAgAJJBEACf0EAIAMgBCAGayIEQQJ1IgUgBSADSRtB/////wEgBEEDdUH/////AEkbIgRFDQAaIARBgICAgAJPDQIgBEEDdBAiCyIFIAhBA3RqIgMgAUEDdGohAQNAIAMgAikDADcDACABIANBCGoiA0cNAAsgB0EBTgRAIAUgBiAHECQaCyAAIAUgBEEDdGo2AgggACABNgIEIAAgBTYCACAGBEAgBhAhCw8LEDcAC0GMERAyAAv1AwEGfyAAIQMDQAJAIAYgAk8NACADIAFPDQAgAy0AACIEQf//wwBLDQACfyAD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AgAoAiQRAAAMAQsgBSgCAAsgAygCACgCDBEEAEUNACAAEDoaDAELCyAAIARBCGoQPwRAIAIgAigCAEECcjYCAAsgBEEQaiQACzoAIAEgAiADIARBARBgIQEgAygCACECAkAgAUEGSg0AIAJBBHENACAAIAE2AgAPCyADIAJBBHI2AgALOgAgASACIAMgBEECEGAhASADKAIAIQICQCABQTxKDQAgAkEEcQ0AIAAgATYCAA8LIAMgAkEEcjYCAAuTAQEDfyMAQRBrIgQkACAEIAE2AghBBiEBAkACQCAAIARBCGoQPw0AQQQhASADAn8gACgCACIFKAIMIgYgBSgCEEYEQCAFIAUoAgAoAiQRAAAMAQsgBigCAAtBACADKAIAKAI0EQQAQSVHDQBBAiEBIAAQOiAEQQhqED9FDQELIAIgAigCACABcjYCAAsgBEEQaiQACz0AIAEgAiADIARBAhBgIQEgAygCACECAkAgAUEMSg0AIAJBBHENACAAIAFBf2o2AgAPCyADIAJBBHI2AgALOgAgASACIAMgBEECEGAhASADKAIAIQICQCABQTtKDQAgAkEEcQ0AIAAgATYCAA8LIAMgAkEEcjYCAAs6ACABIAIgAyAEQQIQYCEBIAMoAgAhAgJAIAFBF0oNACACQQRxDQAgACABNgIADwsgAyACQQRyNgIACzsAIAEgAiADIARBAxBgIQEgAygCACECAkAgAUHtAkoNACACQQRxDQAgACABNgIADwsgAyACQQRyNgIACz0AIAEgAiADIARBAhBgIQEgAygCACECAkAgAUF/akEeSw0AIAJBBHENACAAIAE2AgAPCyADIAJBBHI2AgALrgEBAX8CfyAAQQhqIAAoAggoAggRAAAiACIGLAALQQBIBEAgBigCBAwBCyAGLQALC0EAAn8gACwAF0EASARAIAAoAhAMAQsgAC0AFwtrRgRAIAQgBCgCAEEEcjYCAA8LIAIgAyAAIABBGGogBSAEQQAQjQEgAGshAAJAIAEoAgAiAkEMRw0AIAANACABQQA2AgAPCwJAIAJBC0oNACAAQQxHDQAgASACQQxqNgIACws9ACABIAIgAyAEQQIQYCEBIAMoAgAhAgJAIAFBf2pBC0sNACACQQRxDQAgACABNgIADwsgAyACQQRyNgIAC4IBAQF/IwBBEGsiACQAIAAgATYC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IAIoAgBBAnI2AgALIARBEGokAAs6ACABIAIgAyAEQQEQYSEBIAMoAgAhAgJAIAFBBkoNACACQQRxDQAgACABNgIADwsgAyACQQRyNgIACzoAIAEgAiADIARBAhBhIQEgAygCACECAkAgAUE8Sg0AIAJBBHENACAAIAE2AgAPCyADIAJBBHI2AgALawEBfyMAQRBrIgQkACAEIAE2AghBBiEBAkACQCAAIARBCGoQQA0AQQQhASADIAAQNkEAIAMoAgAoAiQRBABBJUcNAEECIQEgABA7IARBCGoQQEUNAQsgAiACKAIAIAFyNgIACyAEQRBqJAALPQAgASACIAMgBEECEGEhASADKAIAIQICQCABQQxKDQAgAkEEcQ0AIAAgAUF/ajYCAA8LIAMgAkEEcjYCAAs6ACABIAIgAyAEQQIQYSEBIAMoAgAhAgJAIAFBO0oNACACQQRxDQAgACABNgIADwsgAyACQQRyNgIACzoAIAEgAiADIARBAhBhIQEgAygCACECAkAgAUEXSg0AIAJBBHENACAAIAE2AgAPCyADIAJBBHI2AgALOwAgASACIAMgBEEDEGEhASADKAIAIQICQCABQe0CSg0AIAJBBHENACAAIAE2AgAPCyADIAJBBHI2AgALPQAgASACIAMgBEECEGEhASADKAIAIQICQCABQX9qQR5LDQAgAkEEcQ0AIAAgATYCAA8LIAMgAkEEcjYCAAuuAQEBfwJ/IABBCGogACgCCCgCCBEAACIAIgYsAAtBAEgEQCAGKAIEDAELIAYtAAsLQQACfyAALAAXQQBIBEAgACgCEAwBCyAALQAXC2tGBEAgBCAEKAIAQQRyNgIADwsgAiADIAAgAEEYaiAFIARBABCPASAAayEAAkAgASgCACICQQxHDQAgAA0AIAFBADYCAA8LAkAgAkELSg0AIABBDEcNACABIAJBDGo2AgALCz0AIAEgAiADIARBAhBhIQEgAygCACECAkAgAUF/akELSw0AIAJBBHENACAAIAE2AgAPCyADIAJBBHI2AgALqwMBCH8CQAJAIAEoAgQiBARAIAIoAgAgAiACLQALIgZBGHRBGHVBAEgiBRshCSACKAIEIAYgBRshAiABQQRqIQYDQAJAAkACQAJAAkACQCAEKAIUIAQtABsiBSAFQRh0QRh1QQBIIgcbIgUgAiAFIAJJIgsbIgoEQCAJIARBEGoiCCgCACAIIAcbIgcgChCeASIIRQRAIAIgBUkNAgwDCyAIQX9KDQIMAQsgAiAFTw0CCyAEKAIAIgUNBAwHCyAHIAkgChCeASIFDQELIAsNAQwGCyAFQX9KDQULIARBBGohBiAEKAIEIgVFDQQgBiEECyAEIQYgBSEEDAAACwALIAFBBGohBAsgBCEGC0EAIQUgACAGKAIAIgIEf0EABUEgECIiAiADKAIINgIYIAIgAykCADcCECADQQA2AgggA0IANwIAIAMoAgwhAyACQgA3AgAgAiAENgIIIAIgAzYCHCAGIAI2AgACfyACIAEoAgAoAgAiA0UNABogASADNgIAIAYoAgALIQQgASgCBCAEENYBIAEgASgCCEEBajYCCEEBCzoABCAAIAI2AgALRQEBfyMAQRBrIgMkACADIAI2AggDQCAAIAFHBEAgA0EIaiAAKAIAEPcBIABBBGohAAwBCwsgAygCCCEAIANBEGokACAAC0UBAX8jAEEQayIDJAAgAyACNgIIA0AgACABRwRAIANBCGogACwAABD4ASAAQQFqIQAMAQsLIAMoAgghACADQRBqJAAgAAsJACAAEPkBECELCgAgAEG4jQEQewsMACAAIAFBEGoQTxoLCgAgAEHUjQEQewsJACAAEPoBECELCgAgAEGwjQEQcwsHACAALAAJCwwAIAAgAUEMahBPGgsKACAAQcyNARBzCwcAIAAsAAgLhAIBBX8jAEHQAWsiACQAIABBhooBLwAAOwHMASAAQYKKASgAADYCyAEQLCEFIAAgBDYCACAAQbABaiAAQbABakEUIAUgAEHIAWogABBDIgggAEGwAWpqIgUgAhBRIQYgACACKAIcIgQ2AhAgBCAEKAIEQQFqNgIEIABBEGoQSCEHAn8gACgCECIEIAQoAgRBf2oiCTYCBCAJQX9GCwRAIAQgBCgCACgCCBEBAAsgByAAQbABaiAFIABBEGogBygCACgCMBEJABogASAAQRBqIABBEGogCEECdGoiASAGIABrQQJ0IABqQdB6aiAFIAZGGyABIAIgAxBmIQEgAEHQAWokACABC4QCAQR/IwBBIGsiACQAIABBgIoBLwAAOwEcIABB/IkBKAAANgIYIABBGGpBAXJB9IkBQQAgAigCBBBwIAIoAgQhBiAAQXBqIgciCCQA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DAELIAYgAygCHCIANgIAIAAgACgCBEEBajYCBCAGEEghBwJ/IAYoAgAiACAAKAIEQX9qIgE2AgQgAUF/RgsEQCAAIAAoAgAoAggRAQALIAYgAygCHCIANgIAIAAgACgCBEEBajYCBCAGEHkhAAJ/IAYoAgAiASABKAIEQX9qIgM2AgQgA0F/RgsEQCABIAEoAgAoAggRAQALIAYgACAAKAIAKAIYEQIAIAZBDHIgACAAKAIAKAIcEQIAIAUgBkEYaiACIAYgBkEYaiIDIAcgBEEBEI0BIAZGOgAAIAYoAhghAQNAIANBdGoQIyIDIAZHDQALCyAGQSBqJAAgAQvkBAEBfyMAQZACayIAJAAgACACNgKAAiAAIAE2AogCIABB0AFqECYhBiAAIAMoAhwiATYCECABIAEoAgRBAWo2AgQgAEEQahBLIgFB0IkBQeqJASAAQeABaiABKAIAKAIgEQkAGgJ/IAAoAhAiASABKAIEQX9qIgI2AgQgAkF/RgsEQCABIAEoAgAoAggRAQALIABBwAFqECYiAiACLAALQQBIBH8gAigCCEH/////B3FBf2oFQQoLECUgAAJ/IAIsAAtBAEgEQCACKAIADAELIAILIgE2ArwBIAAgAEEQajYCDCAAQQA2AggDQAJAIABBiAJqIABBgAJqEEZFDQAgACgCvAECfyACLAALQQBIBEAgAigCBAwBCyACLQALCyABakYEQAJ/IAIiASwAC0EASARAIAEoAgQMAQsgAS0ACwshAyABAn8gASwAC0EASARAIAEoAgQMAQsgAS0ACwtBAXQQJSABIAEsAAtBAEgEfyABKAIIQf////8HcUF/agVBCgsQJSAAIAMCfyABLAALQQBIBEAgAigCAAwBCyACCyIBajYCvAELIABBiAJqEDZBECABIABBvAFqIABBCGpBACAGIABBEGogAEEMaiAAQeABahB9DQAgAEGIAmoQOxoMAQsLIAIgACgCvAEgAWsQJQJ/IAIsAAtBAEgEQCACKAIADAELIAILIQEQLCEDIAAgBTYCACABIAMgABC/AkEBRwRAIARBBDYCAAsgAEGIAmogAEGAAmoQQARAIAQgBCgCAEECcjYCAAsgACgCiAIhASACECMaIAYQIxogAEGQAmokACABCw8AIAEgAiADIAQgBRCeBAsPACABIAIgAyAEIAUQnwQL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KAIMNgIAIAcgACgCCDYCACAAQRBqJAAgAQtbAQJ/IwBBEGsiASQAAkAgACwAC0EASARAIAAoAgAhAiABQQA2AgwgAiABKAIMNgIAIABBADYCBAwBCyABQQA2AgggACABKAIINgIAIABBADoACwsgAUEQaiQAC9ABAQN/IwBBEGsiBCQAAkAgACwAC0EASAR/IAAoAghB/////wdxQX9qBUEBCyIDIAJPBEACfyAALAALQQBIBEAgACgCAAwBCyAACyIFIQMgAgR/IAMgASACEOoCBSADCxogBEEANgIMIAUgAkECdGogBCgCDDYCAAJAIAAsAAtBAEgEQCAAIAI2AgQMAQsgACACOgALCwwBCyAAIAMgAiADawJ/IAAsAAtBAEgEQCAAKAIEDAELIAAtAAsLIgBBACAAIAIgARCYAgsgBEEQaiQAC9wBAQN/IwBBEGsiBSQAAkAgACwAC0EASAR/IAAoAghB/////wdxQX9qBUEBCyIEAn8gACwAC0EASARAIAAoAgQMAQsgAC0ACwsiA2sgAk8EQCACRQ0BAn8gACwAC0EASARAIAAoAgAMAQsgAAsiBCADQQJ0aiABIAIQaCACIANqIgIhAQJAIAAsAAtBAEgEQCAAIAE2AgQMAQsgACABOgALCyAFQQA2AgwgBCACQQJ0aiAFKAIMNgIADAELIAAgBCACIANqIARrIAMgA0EAIAIgARCYAgsgBUEQaiQAC1gBAX8jAEEQayICJAAgACwAC0EASARAIAAoAggaIAAoAgAQIQsgACABKAIINgIIIAAgASkCADcCACABQQA6AAsgAkEANgIMIAEgAigCDDYCACACQRBqJAALoQEBA38jAEEQayIEJABB7////wMgAk8EQAJAIAJBAU0EQCAAIAI6AAsgACEDDAELIAAgAkECTwR/IAJBBGpBfHEiAyADQX9qIgMgA0ECRhsFQQELQQFqIgUQggEiAzYCACAAIAVBgICAgHhyNgIIIAAgAjYCBAsgAyABIAIQaCAEQQA2AgwgAyACQQJ0aiAEKAIMNgIAIARBEGokAA8LEEkAC6sBAQN/IwBBEGsiBCQAQe////8DIAFPBEACQCABQQFNBEAgACABOgALIAAhAwwBCyAAIAFBAk8EfyABQQRqQXxxIgMgA0F/aiIDIANBAkYbBUEBC0EBaiIFEIIBIgM2AgAgACAFQYCAgIB4cjYCCCAAIAE2AgQLIAEEfyADIAIgARDpAgUgAwsaIARBADYCDCADIAFBAnRqIAQoAgw2AgAgBEEQaiQADwsQSQALsQMBBX8jAEEQayIFJAACfyAALAALQQBIBEAgACgCBAwBCyAALQALCyEEIAAsAAtBAEgEfyAAKAIIQf////8HcUF/agVBAQshAwJAIAIgAWtBAnUiBkUNAAJ/An8gACwAC0EASARAIAAoAgAMAQsgAAshByABAn8gACwAC0EASARAIAAoAgAMAQsgAAsCfyAALAALQQBIBEAgACgCBAwBCyAALQALC0ECdGpJIAcgAU1xCwRAIAACfwJ/IwBBEGsiACQAIAUgASACEI0CIABBEGokACAFIgAiASwAC0EASAsEQCABKAIADAELIAELAn8gACwAC0EASARAIAAoAgQMAQsgAC0ACwsQ3wQgABAjGgwBCyADIARrIAZJBEAgACADIAQgBmogA2sgBCAEEJkCCwJ/IAAsAAtBAEgEQCAAKAIADAELIAALIARBAnRqIQMDQCABIAJHBEAgAyABKAIANgIAIAFBBGohASADQQRqIQMMAQsLIAVBADYCACADIAUoAgA2AgAgBCAGaiEBAkAgACwAC0EASARAIAAgATYCBAwBCyAAIAE6AAsLCyAFQRBqJAALdQEDfyMAQRBrIgMkAAJ/IwBBEGsiAiQAIAAQmgIgAkEQaiQAIAALQZAIECgiAiACAn8gASwAC0EASARAIAEoAgQMAQsgAS0ACwsiBGoQ7AQgAAJ/IAEsAAtBAEgEQCABKAIADAELIAELIAQQtgEgA0EQaiQACzgBAX8CfyAALAALQQBIBEAgACgCBAwBCyAALQALCyICIAFJBEAgACABIAJrEOkEDwsgACABEO0EC1sBAn8jAEEQayIBJAACQCAALAALQQBIBEAgACgCACECIAFBADoADyACIAEtAA86AAAgAEEANgIEDAELIAFBADoADiAAIAEtAA46AAAgAEEAOgALCyABQRBqJAALowEBA38jAEEQayICJAAgAkF/NgIMAn8gASwAC0EASARAIAEoAgQMAQsgAS0ACwsiA0EBSQRAEDwACwJ/IAEsAAtBAEgEQCABKAIADAELIAELIQEgAiADQQFrNgIEIAAgAUEBagJ/IwBBEGsiASQAIAJBBGoiAygCACAC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ARCpAiEECyAAIAQ2AgAgACAEIAJBAnRqIgI2AgggACACNgIEIABBDGogBCABQQJ0ajYCACAFQRBqJAAgAAslAANAIAEgACgCCEcEQCAAKAIQGiAAIAAoAghBfGo2AggMAQsLC38BAn8jAEEQayICJAAgAiAAKAIINgIAIAAoAgghAyACIABBCGo2AgggAiADIAFBAnRqNgIEIAIoAgAhAQNAIAIoAgQgAUcEQCAAKAIQGiACKAIAQQA2AgAgAiACKAIAQQRqIgE2AgAMAQsLIAIoAgggAigCADYCACACQRBqJAALAwAAC5UDAQF/IwBBEGsiCiQAIAkCfyAABEAgCiABEP0BIgAiASABKAIAKAIsEQIAIAIgCigCADYAACAKIAAgACgCACgCIBECACAIIAoQXSAKECMaIAogACAAKAIAKAIcEQIAIAcgChBdIAoQIxogAyAAIAAoAgAoAgwRAAA2AgAgBCAAIAAoAgAoAhARAAA2AgAgCiAAIAAoAgAoAhQRAgAgBSAKEEIgChAjGiAKIAAgACgCACgCGBECACAGIAoQXSAKECMaIAAgACgCACgCJBEAAAwBCyAKIAEQ/gEiACIBIAEoAgAoAiwRAgAgAiAKKAIANgAAIAogACAAKAIAKAIgEQIAIAggChBdIAoQIxogCiAAIAAoAgAoAhwRAgAgByAKEF0gChAjGiADIAAgACgCACgCDBEAADYCACAEIAAgACgCACgCEBEAADYCACAKIAAgACgCACgCFBECACAFIAoQQiAKECMaIAogACAAKAIAKAIYEQIAIAYgChBdIAoQIxogACAAKAIAKAIkEQAACzYCACAKQRBqJAALlQMBAX8jAEEQayIKJAAgCQJ/IAAEQCAKIAEQgAIiACIBIAEoAgAoAiwRAgAgAiAKKAIANgAAIAogACAAKAIAKAIgEQIAIAggChBCIAoQIxogCiAAIAAoAgAoAhwRAgAgByAKEEIgChAjGiADIAAgACgCACgCDBEAADoAACAEIAAgACgCACgCEBEAADoAACAKIAAgACgCACgCFBECACAFIAoQQiAKECMaIAogACAAKAIAKAIYEQIAIAYgChBCIAoQIxogACAAKAIAKAIkEQAADAELIAogARCBAiIAIgEgASgCACgCLBECACACIAooAgA2AAAgCiAAIAAoAgAoAiARAgAgCCAK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QQJ2QX9zQQJ0ajYCsAELIAIoAqgBIgAEQCAAECELIAIoAsABIgAEQCACIAA2AsQBIAAQIQsgAkHQAWokACAhIB+SjA8LQYcNQZQNQcwAQdoNECAACxcAIAAoAgAgAUECdGogAigCADYCAEEBC1EBAn8jAEEQayIDJABBASEEIAAgASgCBCABKAIAIgFrQQJ1IAJLBH8gAyABIAJBAnRqKAIANgIIQZDBASADQQhqEAkFQQELNgIAIANBEGokAAsXACAAKAIAIAFBA3RqIAIpAwA3AwBBAQtRAQJ/IwBBEGsiAyQAQQEhBCAAIAEoAgQgASgCACIBa0EDdSACSwR/IAMgASACQQN0aikDADcDCEHMwQEgA0EIahAJBUEBCzYCACADQRBqJAALVAECfyMAQRBrIgQkACABIAAoAgQiBUEBdWohASAAKAIAIQAgBUEBcQRAIAEoAgAgAGooAgAhAAsgBCADNgIMIAEgAiAEQQxqIAARBQAgBEEQaiQAC1IBAn8jAEEQayIDJAAgASAAKAIEIgRBAXVqIQEgACgCACEAIARBAXEEQCABKAIAIABqKAIAIQALIAMgAjYCDCABIANBDGogABECACADQRBqJAALVAECfyMAQRBrIgQkACABIAAoAgQiBUEBdWohASAAKAIAIQAgBUEBcQRAIAEoAgAgAGooAgAhAAsgBCADOQMIIAEgAiAEQQhqIAARBQAgBEEQaiQAC1IBAn8jAEEQayIDJAAgASAAKAIEIgRBAXVqIQEgACgCACEAIARBAXEEQCABKAIAIABqKAIAIQALIAMgAjkDCCABIANBCGogABECACADQRBqJAALqgEBBH8jAEEQayIDJAAgASgCACIEQXBJBEACQAJAIARBC08EQCAEQRBqQXBxIgUQIiEGIAMgBUGAgICAeHI2AgggAyAGNgIAIAMgBDYCBCADIQUMAQsgAyAEOgALIAMiBSEGIARFDQELIAYgAUEEaiAEECQaCyAEIAZqQQA6AAAgAyACIAARIQAhACAFLAALQX9MBEAgAygCABAhCyADQRBqJAAgAA8LEEkAC6wBAQR/IwBBEGsiBCQAIAIoAgAiBUFwSQRAAkACQCAFQQtPBEAgBUEQakFwcSIGECIhByAEIAZBgICAgHhyNgIIIAQgBzYCACAEIAU2AgQgBCEGDAELIAQgBToACyAEIgYhByAFRQ0BCyAHIAJBBGogBRAkGgsgBSAHakEAOgAAIAEgBCADIAARJAAhACAGLAALQX9MBEAgBCgCABAhCyAEQRBqJAAgAA8LEEkAC7YCAQR/IwBBIGsiBCQAAkAgAigCACIFQXBJBEACQAJAIAVBC08EQCAFQRBqQXBxIgcQIiEGIAQgB0GAgICAeHI2AhggBCAGNgIQIAQgBTYCFAwBCyAEIAU6ABsgBEEQaiEGIAVFDQELIAYgAkEEaiAFECQaCyAFIAZqQQA6AAAgAygCACIFQXBPDQECQAJAIAVBC08EQCAFQRBqQXBxIgIQIiEGIAQgAkGAgICAeHI2AgggBCAGNgIAIAQgBTYCBCAEIQIMAQsgBCAFOgALIAQiAiEGIAVFDQELIAYgA0EEaiAFECQaCyAFIAZqQQA6AAAgASAEQRBqIAQgABEEACEAIAIsAAtBf0wEQCAEKAIAECELIAQsABtBf0wEQCAEKAIQECELIARBIGokACAADwsQSQALEEkACzQBAX8jAEEQayIEJAAgACgCACEAIAQgAzYCDCABIAIgBEEMaiAAEQQAIQAgBEEQaiQAIAALNAEBfyMAQRBrIgQkACAAKAIAIQAgBCADOQMIIAEgAiAEQQhqIAARBAAhACAEQRBqJAAgAAtaAQF/AkAgASAAKAIAaiIBLAALIgBBf0wEQCABKAIEIgBBBGoQNSICIAA2AgAgASgCACEBDAELIABB/wFxIgBBBGoQNSICIAA2AgALIAJBBGogASAAECQaIAIL3gEBAX9B6BJBqBNB4BNBAEHwE0EYQfMTQQBB8xNBAEHxD0H1E0EZEARB6BJBAUH4E0HwE0EaQRsQCEEIECIiAEIcNwMAQegSQe4QQQNB/BNBiBRBHSAAQQAQAUEIECIiAEIeNwMAQegSQfgQQQRBkBRBoBRBHyAAQQAQAUEIECIiAEIgNwMAQegSQf8QQQJBqBRBsBRBISAAQQAQAUEEECIiAEEiNgIAQegSQYQRQQNBtBRB3BRBIyAAQQAQAUEEECIiAEEkNgIAQegSQYgRQQRB8BRBgBVBJSAAQQAQAQveAQEBf0HwFUGwFkHoFkEAQfATQSZB8xNBAEHzE0EAQfsPQfUTQScQBEHwFUEBQfgWQfATQShBKRAIQQgQIiIAQio3AwBB8BVB7hBBA0H8FkGIF0ErIABBABABQQgQIiIAQiw3AwBB8BVB+BBBBEGQF0GgF0EtIABBABABQQgQIiIAQi43AwBB8BVB/xBBAkGoF0GwFEEvIABBABABQQQQIiIAQTA2AgBB8BVBhBFBA0GwF0HcFEExIABBABABQQQQIiIAQTI2AgBB8BVBiBFBBEHAF0HQF0EzIABBABABCxMAIAEgAiADIAQgBSAGIAARDAALEQAgASACIAMgBCAFIAARCgALDwAgASACIAMgBCAAEQsACw8AIAEgAiADIAQgABEZAAsNACABIAIgAyAAEQUACw0AIAEgAiADIAARKAALDQAgASACIAMgABEaAAsLACABIAIgABECAAsJACABIAARAQALBwAgABEIAAsXACABIAIgAyAEIAUgBiAHIAggABENAAsVACABIAIgAyAEIAUgBiAHIAARDgALEwAgASACIAMgBCAFIAYgABEHAAsRACABIAIgAyAEIAUgABEGAAsRACABIAIgAyAEIAUgABEUAAsPACABIAIgAyAEIAARCQALDwAgASACIAMgBCAAER8ACw0AIAEgAiADIAARBAALDQAgASACIAMgABEgAAsLACABIAIgABEDAAsTACABIAIgAyAEIAUgBiAAESIACw8AIAEgAiADIAQgABEjAAsLACABIAIgABEhAAsJACABIAARAAALDQAgASACIAMgABEkAAsLACABIAIgABEXAAsLACABIAIgABElAAsNACABIAAoAgBqKwMACwsAIAAgASACEPcFC7cbAwx/Bn4BfCMAQYDGAGsiByQAQQAgAyAEaiIRayESAkACfwNAAkAgAkEwRwRAIAJBLkcNBCABKAIEIgIgASgCaE8NASABIAJBAWo2AgQgAi0AAAwDCyABKAIEIgIgASgCaEkEQEEBIQogASACQQFqNgIEIAItAAAhAgwCC0EBIQogARArIQIMAQsLIAEQKwshAkEBIQkgAkEwRw0AA0ACfyABKAIEIgIgASgCaEkEQCABIAJBAWo2AgQgAi0AAAwBCyABECsLIQIgE0J/fCETIAJBMEYNAAtBASEKCyAHQQA2AoAGIAJBUGohDgJ+AkACQAJAAkACQAJAIAJBLkYiCw0AIA5BCU0NAAwBCwNAAkAgC0EBcQRAIAlFBEAgFCETQQEhCQwCCyAKQQBHIQoMBAsgFEIBfCEUIAhB/A9MBEAgFKcg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C0GUDEEAEFgLIAJFDQAgBSACNgIEIAIQIQsgBUEQaiQAIAQPCxA3AAtBuwwQMgALCQAgABDRARAhC4gCAQR/IAAoAggiASAAKAIEIgJHBEADQCABQXRqIQMgAUF/aiwAAEF/TARAIAMoAgAQIQsgAyIBIAJHDQALCyAAIAI2AgggACgCFCIBIAAoAhAiAkcEQANAIAFBbGohAyABQXdqLAAAQX9MBEAgAygCABAhCyADIgEgAkcNAAsLIAAgAjYCFCAAQRxqIABBIGoiASgCABCXASAAIAE2AhwgAEIANwIgIAAoAiwiASAAKAIoIgJHBEADQCABQXRqIgMoAgAiBARAIAFBeGogBDYCACAEECELIAMiASACRw0ACwsgACACNgIsIABBNGogAEE4aiIBKAIAEJgBIAAgATYCNCAAQgA3AjgL3wQBAX8gACgC7LABIgEEQCAAQfCwAWogATYCACABECELIAAoApgFIgEEQCAAIAE2ApwFIAEQIQsgACgCjAUiAQRAIAAgATYCkAUgARAhCyAAKAKABSIBBEAgACABNgKEBSABECELIAAoAvQEIgEEQCAAIAE2AvgEIAEQIQsgACgC6AQiAQRAIAAgATYC7AQgARAhCyAAKALcBCIBBEAgACABNgLgBCABECELIAAoAtAEIgEEQCAAIAE2AtQEIAEQIQsgACgCxAQiAQRAIAAgATYCyAQgARAhCyAAKAK4BCIBBEAgACABNgK8BCABECELIAAoAqwEIgEEQCAAIAE2ArAEIAEQIQsgACgCoAQiAQRAIAAgATYCpAQgARAhCyAAKAKUBCIBBEAgACABNgKYBCABECELIAAoAogEIgEEQCAAIAE2AowEIAEQIQsgACgC/AMiAQRAIAAgATYCgAQgARAhCyAAKALwAyIBBEAgACABNgL0AyABECELIAAoAuQDIgEEQCAAIAE2AugDIAEQIQsgACgC2AMiAQRAIAAgATYC3AMgARAhCyAAKALMAyIBBEAgACABNgLQAyABECELIAAoAsADIgEEQCAAIAE2AsQDIAEQIQsgACgCtAMiAQRAIAAgATYCuAMgARAhCyAAKAKoAyIBBEAgACABNgKsAyABECELIAAoApwDIgEEQCAAIAE2AqADIAEQIQsgACgCkAMiAQRAIAAgATYClAMgARAhCyAAKAKEAyIBBEAgACABNgKIAyABECELIAAoAvgCIgEEQCAAIAE2AvwCIAEQIQsLhQYBCn8gACgC8AIiA0EBaiABKAIEIAEoAgBrQQJ1RwRAQZHHABAnIAAoAvACIQMLIABBADoA6AIgA0EBTgRAIAAoApADIQhBgAgoAgAhBkGECCgCACEEIAEoAgAhCUEBIQIDQCAIIAJBAnQiA2ogAyAJaigCACIDIARGIAMgBkZyNgIAIAIgACgC8AIiA0ghBSACQQFqIQIgBQ0ACwsgA0EATgRAIAAoAqgDIQkgACgChAMhA0GECCgCACELQQAhCANAIAAoApwDIgUgAyAIIgZBAnQiB2oiCCgCACAGakECdGpBATYCACAJIAgoAgAgBmpBAnRqQQA2AgAgBkEBaiEIAkAgBiAAKALwAiIETg0AIAYEQCAIIQIDQEEAIQpBACEEIAMgB2ooAgAgAmpBAnQgBWoiBUF8aigCAARAIAAoApADIAJBAnRqKAIAQQBHIQQLIAUgBDYCAAJAIAIgASgCACIEIAdqKAIAIgVHQQAgBSALRxsNACALIAQgAkECdCIFaigCACIER0EAIAQgBkcbDQBBASEKIAAtAAANACAAKALwAiIDIAZIBH9B8yMQJyAAKALwAgUgAwsgAkgEQEGBJRAnCyAAIAAoAvgCIgMgB2ooAgBBFGxqIAMgBWooAgBBAnRqKAKEAkEARyEKIAAoAqgDIQkgACgChAMhAwsgCSADIAdqKAIAIAJqQQJ0aiAKNgIAIAIgACgC8AIiBE4NAiACQQFqIQIgACgCnAMhBQwAAAsACyADKAIAIgJBAWohBwJ/QQAgBSACQQJ0aigCAEUNABogACgCkAMoAgRBAEcLIQRBAiECIAUgB0ECdGogBDYCACADKAIAQQJ0IAlqQQA2AgQgACgC8AIiBEECSA0AA0ACf0EAIAMoAgAgAmpBAnQgBWoiB0F8aigCAEUNABogACgCkAMgAkECdGooAgBBAEcLIQQgByAENgIAIAkgAygCACACakECdGpBADYCACACIAAoAvACIgRIIQcgAkEBaiECIAcNAAsLIAYgBEgNAAsLC4JUAQt/IwBB8BNrIgIkACAAIAE2AuwCIABBADoA6AIgARCxBiACQYgMakGgHS0AADoAACACQQk6AIsMIAJBmB0pAAA3A4AMIAJBADoAiQwgASACQYAMahBNIAIsAIsMQX9MBEAgAigCgAwQIQsCQAJAA0BBACEHAkADQAJAIAVBBEdBACAHQQRHG0UEQCAAIAVBKGxqIAdBA3RqQgA3AqQFDAELQYDzAigCAEGA8wJBi/MCLAAAQQBIGyIDIAdqLAAAIQQgAiADIAVqLAAANgLwAyACIAQ2AvQDIAJBgAxqQaIdIAJB8ANqEDBBgPMCKAIAQYDzAkGL8wIsAABBAEgbIgMgBWosAAAhBCACIAMgB2osAAA2AuADIAIgBDYC5AMgAkGQBGpBoh0gAkHgA2oQMCACQYAMaiACQZAEahBrQX9MBEAgAkGADGoQKCIEQXBPDQMCQAJAIARBC08EQCAEQRBqQXBxIgYQIiEDIAIgBkGAgICAeHI2AogEIAIgAzYCgAQgAiAENgKEBAwBCyACIAQ6AIsEIAJBgARqIQMgBEUNAQsgAyACQYAMaiAEECQaCyADIARqQQA6AAAgASACQYAEaiAAIAVBKGxqIAdBA3RqQaQFahAtIAIsAIsEQX9KDQEgAigCgAQQIQwBCyACQZAEahAoIgRBcE8NBQJAAkAgBEELTwRAIARBEGpBcHEiBhAiIQMgAiAGQYCAgIB4cjYCiAQgAiADNgKABCACIAQ2AoQEDAELIAIgBDoAiwQgAkGABGohAyAERQ0BCyADIAJBkARqIAQQJBoLIAMgBGpBADoAACABIAJBgARqIAAgBUEobGogB0EDdGpBpAVqEC0gAiwAiwRBf0oNACACKAKABBAhCyAHQQFqIgdBBUcNAAsgBUEBaiIFQQVGDQIMAQsLDAELIAJBIBAiIgM2AoAEIAJCkYCAgICEgICAfzcChAQgA0EAOgARIANBwR0tAAA6ABAgA0G5HSkAADcACCADQbEdKQAANwAAIAEgAkGABGoQTSACLACLBEF/TARAIAIoAoAEECELQQAhBANAQQAhBQNAIARBBEYgBUEERnIhC0EAIQcCQANAAkACQCALQX9zIAdBBEdxRQRAIAAgBEHoB2xqIAVByAFsaiAHQShsaiIDQgA3AowHIANCADcChAcgA0IANwL8BiADQgA3AvQGIANCADcC7AYMAQtBgPMCKAIAQYDzAkGL8wIsAABBAEgbIgMsAAAhBiADIAdqLAAAIQggAyAFaiwAACEJIAIgAyAEaiwAADYC0AMgAiAJNgLUAyACIAg2AtgDIAIgBjYC3AMgAkGADGpBwx0gAkHQA2oQMCACQYAMahAoIgZBcE8NAQJAAkAgBkELTwRAIAZBEGpBcHEiCBAiIQMgAiAIQYCAgIB4cjYCiAQgAiADNgKABCACIAY2AoQEDAELIAIgBjoAiwQgAkGABGohAyAGRQ0BCyADIAJBgAxqIAYQJBoLIAMgBmpBADoAACABIAJBgARqIAAgBEHoB2xqIAVByAFsaiAHQShsaiIIQewGahAtIAIsAIsEQX9MBEAgAigCgAQQIQtBgPMCKAIAQYDzAkGL8wIsAABBAEgbIgMsAAEhBiADIAdqLAAAIQkgAyAFaiwAACEKIAIgAyAEaiwAADYCwAMgAiAKNgLEAyACIAk2AsgDIAIgBjYCzAMgAkGADGpBwx0gAkHAA2oQMCACQYAMahAoIgZBb0sNAQJAAkAgBkELTwRAIAZBEGpBcHEiCRAiIQMgAiAJQYCAgIB4cjYCiAQgAiADNgKABCACIAY2AoQEDAELIAIgBjoAiwQgAkGABGohAyAGRQ0BCyADIAJBgAxqIAYQJBoLIAMgBmpBADoAACABIAJBgARqIAhB9AZqEC0gAiwAiwRBf0wEQCACKAKABBAhC0GA8wIoAgBBgPMCQYvzAiwAAEEASBsiAywAAiEGIAMgB2osAAAhCSADIAVqLAAAIQogAiADIARqLAAANgKwAyACIAo2ArQDIAIgCTYCuAMgAiAGNgK8AyACQYAMakHDHSACQbADahAwIAJBgAxqECgiBkFvSw0BAkACQCAGQQtPBEAgBkEQakFwcSIJECIhAyACIAlBgICAgHhyNgKIBCACIAM2AoAEIAIgBjYChAQMAQsgAiAGOgCLBCACQYAEaiEDIAZFDQELIAMgAkGADGogBhAkGgsgAyAGakEAOgAAIAEgAkGABGogCEH8BmoQLSACLACLBEF/TARAIAIoAoAEECELQYDzAigCAEGA8wJBi/MCLAAAQQBIGyIDLAADIQYgAyAHaiwAACEJIAMgBWosAAAhCiACIAMgBGosAAA2AqADIAIgCjYCpAMgAiAJNgKoAyACIAY2AqwDIAJBgAxqQcMdIAJBoANqEDAgAkGADGoQKCIGQW9LDQECQAJAIAZBC08EQCAGQRBqQXBxIgkQIiEDIAIgCUGAgICAeHI2AogEIAIgAzYCgAQgAiAGNgKEBAwBCyACIAY6AIsEIAJBgARqIQMgBkUNAQsgAyACQYAMaiAGECQaCyADIAZqQQA6AAAgASACQYAEaiAIQYQHahAtIAIsAIsEQX9MBEAgAigCgAQQIQsgCEIANwKMBwsgB0EBaiIHQQVHDQEMAgsLDAMLIAVBAWoiBUEFRw0ACyAEQQFqIgRBBUcNAAsgAkEgECIiAzYCgAQgAkKXgICAgISAgIB/NwKEBCADQQA6ABcgA0HtHSkAADcADyADQeYdKQAANwAIIANB3h0pAAA3AAAgASACQYAEahBNIAIsAIsEQX9MBEAgAigCgAQQIQtBACEFAkADQAJAIAIgBTYCkAMgAkGADGpB9h0gAkGQA2oQMCACQYAMahAoIgNBcE8NAAJAAkAgA0ELTwRAIANBEGpBcHEiBxAiIQQgAiAHQYCAgIB4cjYCiAQgAiAENgKABCACIAM2AoQEDAELIAIgAzoAiwQgAkGABGohBCADRQ0BCyAEIAJBgAxqIAMQJBoLIAMgBGpBADoAACABIAJBgARqIAAgBUEDdGpB9C1qEC0gAiwAiwRBf0wEQCACKAKABBAhCyAFQQFqIgVBH0cNAQwCCwsMAQsgAkEgECIiAzYCgAQgAkKRgICAgISAgIB/NwKEBCADQQA6ABEgA0GhHi0AADoAECADQZkeKQAANwAIIANBkR4pAAA3AAAgASACQYAEahBNIAIsAIsEQX9MBEAgAigCgAQQIQtBACEHAkADQAJAIAAgB0EobGoiBEHkMWohAwJAIAdFBEAgA0IANwIAIANCADcCICADQgA3AhggA0IANwIQIANCADcCCAwBCyADQQA2AgAgBEHoMWpBADYCACACIAc2AoQDIAJBATYCgAMgAkGADGpBox4gAkGAA2oQMCACQYAMahAoIgVBb0sNAQJAAkAgBUELTwRAIAVBEGpBcHEiBhAiIQMgAiAGQYCAgIB4cjYCiAQgAiADNgKABCACIAU2AoQEDAELIAIgBToAiwQgAkGABGohAyAFRQ0BCyADIAJBgAxqIAUQJBoLIAMgBWpBADoAACABIAJBgARqIARB7DFqEC0gAiwAiwRBf0wEQCACKAKABBAhCyACIAdBAiAHQQJJGzYC8AIgAiAHQQIgB0ECSxs2AvQCIAJBgAxqQaMeIAJB8AJqEDAgAkGADGoQKCIFQW9LDQECQAJAIAVBC08EQCAFQRBqQXBxIgYQIiEDIAIgBkGAgICAeHI2AogEIAIgAzYCgAQgAiAFNgKEBAwBCyACIAU6AIsEIAJBgARqIQMgBUUNAQsgAyACQYAMaiAFECQaCyADIAVqQQA6AAAgASACQYAEaiAEQfQxahAtIAIsAIsEQX9MBEAgAigCgAQQIQsgAiAHQQMgB0EDSRs2AuACIAIgB0EDIAdBA0sbNgLkAiACQYAMakGjHiACQeACahAwIAJBgAxqECgiBUFvSw0BAkACQCAFQQtPBEAgBUEQakFwcSIGECIhAyACIAZBgICAgHhyNgKIBCACIAM2AoAEIAIgBTYChAQMAQsgAiAFOgCLBCACQYAEaiEDIAVFDQELIAMgAkGADGogBRAkGgsgAyAFakEAOgAAIAEgAkGABGogBEH8MWoQLSACLACLBEF/TARAIAIoAoAEECELIAIgBzYC0AIgAkEENgLUAiACQYAMakGjHiACQdACahAwIAJBgAxqECgiBUFvSw0BAkACQCAFQQtPBEAgBUEQakFwcSIGECIhAyACIAZBgICAgHhyNgKIBCACIAM2AoAEIAIgBTYChAQMAQsgAiAFOgCLBCACQYAEaiEDIAVFDQELIAMgAkGADGogBRAkGgsgAyAFakEAOgAAIAEgAkGABGogBEGEMmoQLSACLACLBEF/Sg0AIAIoAoAEECELIAdBAWoiB0EFRw0BDAILCwwBCyACQSAQIiIDNgKABCACQpWAgICAhICAgH83AoQEIANBADoAFSADQcgeKQAANwANIANBwx4pAAA3AAggA0G7HikAADcAACABIAJBgARqEE0gAiwAiwRBf0wEQCACKAKABBAhC0EAIQcCQANAAkACQCAHRQRAIABCADcCrDMMAQsgAiAHNgLAAiACQYAMakHRHiACQcACahAwIAJBgAxqECgiA0FwTw0BAkACQCADQQtPBEAgA0EQakFwcSIFECIhBCACIAVBgICAgHhyNgKIBCACIAQ2AoAEIAIgAzYChAQMAQsgAiADOgCLBCACQYAEaiEEIANFDQELIAQgAkGADGogAxAkGgsgAyAEakEAOgAAIAEgAkGABGogACAHQQN0akGsM2oQLSACLACLBEF/Sg0AIAIoAoAEECELIAdBAWoiB0EfRw0BDAILCwwBCyACQSAQIiIDNgKABCACQpiAgICAhICAgH83AoQEIANBADoAGCADQfoeKQAANwAQIANB8h4pAAA3AAggA0HqHikAADcAACABIAJBgARqEE0gAiwAiwRBf0wEQCACKAKABBAhC0EAIQcCQANAAkACQCAHQQFNBEAgACAHQQN0akGkNWpCADcCAAwBCyACIAc2ArACIAJBgAxqQYMfIAJBsAJqEDAgAkGADGoQKCIDQXBPDQECQAJAIANBC08EQCADQRBqQXBxIgUQIiEEIAIgBUGAgICAeHI2AogEIAIgBDYCgAQgAiADNgKEBAwBCyACIAM6AIsEIAJBgARqIQQgA0UNAQsgBCACQYAMaiADECQaCyADIARqQQA6AAAgASACQYAEaiAAIAdBA3RqQaQ1ahAtIAIsAIsEQX9KDQAgAigCgAQQIQsgB0EBaiIHQR9HDQEMAgsLDAELIAJBMBAiIgM2AoAEIAJCooCAgICGgICAfzcChAQgA0EAOgAiIANBvx8vAAA7ACAgA0G3HykAADcAGCADQa8fKQAANwAQIANBpx8pAAA3AAggA0GfHykAADcAACABIAJBgARqEE0gAiwAiwRBf0wEQCACKAKABBAhC0EAIQcCQANAAkACQCAHRQRAIABCADcCnDcMAQsgAiAHNgKgAiACQYAMakHCHyACQaACahAwIAJBgAxqECgiA0FwTw0BAkACQCADQQtPBEAgA0EQakFwcSIFECIhBCACIAVBgICAgHhyNgKIBCACIAQ2AoAEIAIgAzYChAQMAQsgAiADOgCLBCACQYAEaiEEIANFDQELIAQgAkGADGogAxAkGgsgAyAEakEAOgAAIAEgAkGABGogACAHQQN0akGcN2oQLSACLACLBEF/Sg0AIAIoAoAEECELIAdBAWoiB0EQRw0BDAILCwwBCyACQSAQIiIDNgKABCACQpuAgICAhICAgH83AoQEIANBADoAGyADQf8fKAAANgAXIANB+B8pAAA3ABAgA0HwHykAADcACCADQegfKQAANwAAIAEgAkGABGoQTSACLACLBEF/TARAIAIoAoAEECELQQAhBwJAA0ACQAJAIAdFBEAgAEIANwKcOAwBCyACIAc2ApACIAJBgAxqQYQgIAJBkAJqEDAgAkGADGoQKCIDQXBPDQECQAJAIANBC08EQCADQRBqQXBxIgUQIiEEIAIgBUGAgICAeHI2AogEIAIgBDYCgAQgAiADNgKEBAwBCyACIAM6AIsEIAJBgARqIQQgA0UNAQsgBCACQYAMaiADECQaCyADIARqQQA6AAAgASACQYAEaiAAIAdBA3RqQZw4ahAtIAIsAIsEQX9KDQAgAigCgAQQIQsgB0EBaiIHQR1HDQEMAgsLDAELIAJBIBAiIgM2AoAEIAJClYCAgICEgICAfzcChAQgA0EAOgAVIANBsCApAAA3AA0gA0GrICkAADcACCADQaMgKQAANwAAIAEgAkGABGoQTSACLACLBEF/TARAIAIoAoAEECELQQAhBQJAA0ACQCACQYDzAigCAEGA8wJBi/MCLAAAQQBIGyAFaiwAADYCgAIgAkGADGpBuSAgAkGAAmoQMCACQYAMahAoIgNBcE8NAAJAAkAgA0ELTwRAIANBEGpBcHEiBxAiIQQgAiAHQYCAgIB4cjYCiAQgAiAENgKABCACIAM2AoQEDAELIAIgAzoAiwQgAkGABGohBCADRQ0BCyAEIAJBgAxqIAMQJBoLIAMgBGpBADoAACABIAJBgARqIAAgBUEDdGoiB0GEOmoQLSACLACLBEF/TARAIAIoAoAEECELIAJBgAxqECgiA0FwTw0DAkACQCADQQtPBEAgA0EQakFwcSIGECIhBCACIAZBgICAgHhyNgKIBCACIAQ2AoAEIAIgAzYChAQMAQsgAiADOgCLBCACQYAEaiEEIANFDQELIAQgAkGADGogAxAkGgsgAyAEakEAOgAAIAEgAkGABGogB0GsOmoQLSACLACLBEF/TARAIAIoAoAEECELIAVBAWoiBUEERw0BDAILCwwBCyAAQgA3Asw6IABCADcCpDogAkEgECIiAzYCgAQgAkKYgICAgISAgIB/NwKEBCADQQA6ABggA0HiICkAADcAECADQdogKQAANwAIIANB0iApAAA3AAAgASACQYAEahBNIAIsAIsEQX9MBEAgAigCgAQQIQtBACEFAkADQEEAIQcCQANAAkAgBUEER0EAIAdBBEcbRQRAIAAgBUEobGogB0EDdGpB1DpqQgA3AgAMAQtBgPMCKAIAQYDzAkGL8wIsAABBAEgbIgMgB2osAAAhBCACIAMgBWosAAA2AvABIAIgBDYC9AEgAkGADGpB6yAgAkHwAWoQMEGA8wIoAgBBgPMCQYvzAiwAAEEASBsiAyAFaiwAACEEIAIgAyAHaiwAADYC4AEgAiAENgLkASACQZAEakHrICACQeABahAwIAJBgAxqIAJBkARqEGtBf0wEQCACQYAMahAoIgRBcE8NAwJAAkAgBEELTwRAIARBEGpBcHEiBhAiIQMgAiAGQYCAgIB4cjYCiAQgAiADNgKABCACIAQ2AoQEDAELIAIgBDoAiwQgAkGABGohAyAERQ0BCyADIAJBgAxqIAQQJBoLIAMgBGpBADoAACABIAJBgARqIAAgBUEobGogB0EDdGpB1DpqEC0gAiwAiwRBf0oNASACKAKABBAhDAELIAJBkARqECgiBEFwTw0FAkACQCAEQQtPBEAgBEEQakFwcSIGECIhAyACIAZBgICAgHhyNgKIBCACIAM2AoAEIAIgBDYChAQMAQsgAiAEOgCLBCACQYAEaiEDIARFDQELIAMgAkGQBGogBBAkGgsgAyAEakEAOgAAIAEgAkGABGogACAFQShsaiAHQQN0akHUOmoQLSACLACLBEF/Sg0AIAIoAoAEECELIAdBAWoiB0EFRw0ACyAFQQFqIgVBBUYNAgwBCwsMAQsgAkEQECIiAzYCgAQgAkKOgICAgIKAgIB/NwKEBCADQQA6AA4gA0GPISkAADcABiADQYkhKQAANwAAIAEgAkGABGoQTSACLACLBEF/TARAIAIoAoAEECELQQAhAwNAQQAhBANAIANBBEYgBEEERnIhC0EAIQUCQANAIAsgBUEERnIhCUEAIQcCQANAAkAgCUF/cyAHQQRHcUUEQCAAIANB6AdsaiAEQcgBbGogBUEobGogB0EDdGpBnDxqQgA3AgAMAQtBgPMCKAIAQYDzAkGL8wIsAABBAEgbIgYgB2osAAAhCCAFIAZqLAAAIQogBCAGaiwAACEMIAIgAyAGaiwAADYC0AEgAiAMNgLUASACIAo2AtgBIAIgCDYC3AEgAkGADGpBmCEgAkHQAWoQMEGA8wIoAgBBgPMCQYvzAiwAAEEASBsiBiADaiwAACEIIAQgBmosAAAhCiAFIAZqLAAAIQwgAiAGIAdqLAAANgLAASACIAw2AsQBIAIgCjYCyAEgAiAINgLMASACQZAEakGYISACQcABahAwIAJBgAxqIAJBkARqEGtBf0wEQCACQYAMahAoIghBcE8NAwJAAkAgCEELTwRAIAhBEGpBcHEiChAiIQYgAiAKQYCAgIB4cjYCiAQgAiAGNgKABCACIAg2AoQEDAELIAIgCDoAiwQgAkGABGohBiAIRQ0BCyAGIAJBgAxqIAgQJBoLIAYgCGpBADoAACABIAJBgARqIAAgA0HoB2xqIARByAFsaiAFQShsaiAHQQN0akGcPGoQLSACLACLBEF/Sg0BIAIoAoAEECEMAQsgAkGQBGoQKCIIQXBPDQcCQAJAIAhBC08EQCAIQRBqQXBxIgoQIiEGIAIgCkGAgICAeHI2AogEIAIgBjYCgAQgAiAINgKEBAwBCyACIAg6AIsEIAJBgARqIQYgCEUNAQsgBiACQZAEaiAIECQaCyAGIAhqQQA6AAAgASACQYAEaiAAIANB6AdsaiAEQcgBbGogBUEobGogB0EDdGpBnDxqEC0gAiwAiwRBf0oNACACKAKABBAhCyAHQQFqIgdBBUcNAAsgBUEBaiIFQQVGDQIMAQsLDAMLIARBAWoiBEEFRw0ACyADQQFqIgNBBUcNAAsgAkEQECIiAzYCgAQgAkKNgICAgIKAgIB/NwKEBCADQQA6AA0gA0G1ISkAADcABSADQbAhKQAANwAAIAEgAkGABGoQTSACLACLBEF/TARAIAIoAoAEECELIABBpOMAaiEDQQAhBwJAA0ACQEGA8wIoAgBBgPMCQYvzAiwAAEEASBsiBSwAACEEIAIgBSAHaiwAADYCsAEgAiAENgK0ASACQYAMakG+ISACQbABahAwIAJBgAxqECgiBUFwTw0AAkACQCAFQQtPBEAgBUEQakFwcSIGECIhBCACIAZBgICAgHhyNgKIBCACIAQ2AoAEIAIgBTYChAQMAQsgAiAFOgCLBCACQYAEaiEEIAVFDQELIAQgAkGADGogBRAkGgsgBCAFakEAOgAAIAEgAkGABGogAxAtIAIsAIsEQX9MBEAgAigCgAQQIQtBgPMCKAIAQYDzAkGL8wIsAABBAEgbIgMsAAEhBSACIAMgB2osAAA2AqABIAIgBTYCpAEgAkGADGpBviEgAkGgAWoQMCACQYAMahAoIgNBb0sNAAJAAkAgA0ELTwRAIANBEGpBcHEiBRAiIQQgAiAFQYCAgIB4cjYCiAQgAiAENgKABCACIAM2AoQEDAELIAIgAzoAiwQgAkGABGohBCADRQ0BCyAEIAJBgAxqIAMQJBoLIAMgBGpBADoAACABIAJBgARqIAAgB0EobGoiBEGs4wBqEC0gAiwAiwRBf0wEQCACKAKABBAhC0GA8wIoAgBBgPMCQYvzAiwAAEEASBsiAywAAiEFIAIgAyAHaiwAADYCkAEgAiAFNgKUASACQYAMakG+ISACQZABahAwIAJBgAxqECgiBUFvSw0AAkACQCAFQQtPBEAgBUEQakFwcSIGECIhAyACIAZBgICAgHhyNgKIBCACIAM2AoAEIAIgBTYChAQMAQsgAiAFOgCLBCACQYAEaiEDIAVFDQELIAMgAkGADGogBRAkGgsgAyAFakEAOgAAIAEgAkGABGogBEG04wBqEC0gAiwAiwRBf0wEQCACKAKABBAhC0GA8wIoAgBBgPMCQYvzAiwAAEEASBsiAywAAyEFIAIgAyAHaiwAADYCgAEgAiAFNgKEASACQYAMakG+ISACQYABahAwIAJBgAxqECgiBUFvSw0AAkACQCAFQQtPBEAgBUEQakFwcSIGECIhAyACIAZBgICAgHhyNgKIBCACIAM2AoAEIAIgBTYChAQMAQsgAiAFOgCLBCACQYAEaiEDIAVFDQELIAMgAkGADGogBRAkGgsgAyAFakEAOgAAIAEgAkGABGogBEG84wBqEC0gAiwAiwRBf0wEQCACKAKABBAhCyAEQcTjAGpCADcCACAEQczjAGohAyAHQQFqIgdBBEcNAQwCCwsMAQsgA0IANwIAIANCADcCICADQgA3AhggA0IANwIQIANCADcCCCACQRAQIiIDNgKABCACQoyAgICAgoCAgH83AoQEIANBADoADCADQdkhKAAANgAIIANB0SEpAAA3AAAgASACQYAEahBNIAIsAIsEQX9MBEAgAigCgAQQIQsgAkHmIS8AADsBiAQgAkGAFDsBigQgAkHeISkAADcDgAQgASACQYAEaiAAQezkAGoQLSACLACLBEF/TARAIAIoAoAEECELIAJBEBAiIgM2AoAEIAJCjoCAgICCgICAfzcChAQgA0EAOgAOIANB7yEpAAA3AAYgA0HpISkAADcAACABIAJBgARqIABB9OQAahAtIAIsAIsEQX9MBEAgAigCgAQQIQsgAkEQECIiAzYCgAQgAkKMgICAgIKAgIB/NwKEBCADQQA6AAwgA0GAIigAADYACCADQfghKQAANwAAIAEgAkGABGogAEH85ABqEC0gAiwAiwRBf0wE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FCACIAQ2AhggAkGADGpBnyIgAkEQahAwIAJBgAxqECgiBEFvSw0AAkACQCAEQQtPBEAgBEEQakFwcSIGECIhAyACIAZBgICAgHhyNgKIBCACIAM2AoAEIAIgBDYChAQMAQsgAiAEOgCLBCACQYAEaiEDIARFDQELIAMgAkGADGogBBAkGgsgAyAEakEAOgAAIAEgAkGABGogCEH87ABqEC0gAiwAiwRBf0wEQCACKAKABBAhC0GA8wIoAgBBgPMCQYvzAiwAAEEASBsiAywAAyEEIAMgB2osAAAhBiACIAMgBWosAAA2AgAgAiAGNgIEIAIgBDYCCCACQYAMakGfIiACEDAgAkGADGoQKCIEQW9LDQACQAJAIARBC08EQCAEQRBqQXBxIgYQIiEDIAIgBkGAgICAeHI2AogEIAIgAzYCgAQgAiAENgKEBAwBCyACIAQ6AIsEIAJBgARqIQMgBEUNAQsgAyACQYAMaiAEECQaCyADIARqQQA6AAAgASACQYAEaiAIQYTtAGoQLSACLACLBEF/TARAIAIoAoAEECELIAhBjO0AakIANwIADAELDAMLIAdBAWoiB0EFRw0ACyAFQQFqIgVBBUcNAAsgAkEQECIiAzYCgAQgAkKPgICAgIKAgIB/NwKEBCADQQA6AA8gA0G6IikAADcAByADQbMiKQAANwAAIAEgAkGABGoQTSACLACLBEF/TARAIAIoAoAEECELIAJBIBAiIgM2AoAEIAJCkYCAgICEgICAfzcChAQgA0EAOgARIANB0yItAAA6ABAgA0HLIikAADcACCADQcMiKQAANwAAIAEgAkGABGogAEHU9ABqEC0gAiwAiwRBf0wEQCACKAKABBAhCyACQRAQIiIDNgKABCACQo+AgICAgoCAgH83AoQEIANBADoADyADQdwiKQAANwAHIANB1SIpAAA3AAAgASACQYAEaiAAQdz0AGoQLSACLACLBEF/TARAIAIoAoAEECELIAJB8BNqJAAPCxBJAAujFgELfyMAQSBrIgIkACABKALwAiEDIABBADYCCCAAQgA3AgAgA0EBaiIDQYCAgIAESQRAIAAgA0ECdCIDECIiBzYCACAAIAc2AgQgACADIAdqIgU2AghBgAgoAgAhBCAHIQMDQCADIAQ2AgAgBSADQQRqIgNHDQALIAAgBTYCBCABKALwAiEIIAdBhAgoAgA2AgAgAkIANwMYIAJCADcDECACQgA3AwggASgC5AMhCiACQQhqEFMgAigCHCIJQQFqIQQgAigCGCEFIAIoAhAiByACKAIMIgNHBEAgAyAFIAlqIgZB1QJuIglBAnRqKAIAIAYgCUHVAmxrQQxsaiEGCyAGIAg2AgggBkEANgIEIAYgCjYCACACIAQ2AhwgBARAA0AgAyAFQdUCbiIHQQJ0aigCACAFIAdB1QJsa0EMbGoiBigCCCEHIAYoAgQhCCAGKAIAIQYgAiAFQQFqIgU2AhggAiAEQX9qNgIcIAVBqgVPBEAgAygCABAhIAIgAigCDEEEaiIDNgIMIAIgAigCGEGrfWoiBTYCGAsCQAJAAkACQAJAAkACQAJAAkACQAJAAkAgBiABKALkAyIJIAZHBH8gASgChAMgCEECdGooAgAgB2oFIAcLQQJ0aigCACIEIARBC20iCkELbGsOCwoAAQIDBAUGCgcICQsgACgCACIGIAggBEHVAm1qQQFqIgRBAnRqIAcgCkEfb2siBzYCACAGIAdBAnRqIAQ2AgAgASgC2AMhCiACKAIcIgggBWoiBSACKAIQIgYgA2siCUECdUHVAmxBf2pBACAJG0YEQCACQQhqEFMgAigCHCIIIAIoAhhqIQUgAigCECEGIAIoAgwhAwsgB0F/aiEHIAMgBkYEf0EABSADIAVB1QJuIgZBAnRqKAIAIAUgBkHVAmxrQQxsagsiAyAHNgIIIAMgBDYCBCADIAo2AgAgAiAIQQFqIgQ2AhwMCgsgASgC/AMhDAJ/IAIoAhwiCSAFaiIGIAIoAhAiBCADayILQQJ1QdUCbEF/akEAIAsbRgRAIAJBCGoQUyACKAIYIgUgAigCHCIJaiEGIAIoAhAhBCACKAIMIQMLQQAgAyAERg0AGiADIAZB1QJuIgtBAnRqKAIAIAYgC0HVAmxrQQxsagsiBiAKNgIIIAYgCDYCBCAGIAw2AgAgAiAJQQFqIgg2AhwgASgC8AMhBgJ/IAUgCGoiBSAEIANrIglBAnVB1QJsQX9qQQAgCRtGBEAgAkEIahBTIAIoAhwiCCACKAIYaiEFIAIoAhAhBCACKAIMIQMLQQAgAyAERg0AGiADIAVB1QJuIgRBAnRqKAIAIAUgBEHVAmxrQQxsagsiAyAHNgIIIAMgCjYCBCADIAY2AgAgAiAIQQFqIgQ2AhwMCQsgACgCACIGIAhBAWoiBEECdGogBzYCACAGIAdBAnRqIAQ2AgAgASgC2AMhCiACKAIcIgggBWoiBSACKAIQIgYgA2siCUECdUHVAmxBf2pBACAJG0YEQCACQQhqEFMgAigCHCIIIAIoAhhqIQUgAigCECEGIAIoAgwhAwsgB0F/aiEHIAMgBkYEf0EABSADIAVB1QJuIgZBAnRqKAIAIAUgBkHVAmxrQQxsagsiAyAHNgIIIAMgBDYCBCADIAo2AgAgAiAIQQFqIgQ2AhwMCAsgASgC/AMhCiACKAIcIgYgBWoiBSACKAIQIgQgA2siCUECdUHVAmxBf2pBACAJG0YEQCACQQhqEFMgAigCHCIGIAIoAhhqIQUgAigCECEEIAIoAgwhAwsgCEEBaiEIIAMgBEYEf0EABSADIAVB1QJuIgRBAnRqKAIAIAUgBEHVAmxrQQxsagsiAyAHNgIIIAMgCDYCBCADIAo2AgAgAiAGQQFqIgQ2AhwMBwsgASgC/AMhDAJ/IAIoAhwiCSAFaiIGIAIoAhAiBCADayILQQJ1QdUCbEF/akEAIAsbRgRAIAJBCGoQUyACKAIYIgUgAigCHCIJaiEGIAIoAhAhBCACKAIMIQMLQQAgAyAERg0AGiADIAZB1QJuIgtBAnRqKAIAIAYgC0HVAmxrQQxsagsiBiAKNgIIIAYgCDYCBCAGIAw2AgAgAiAJQQFqIgg2AhwgASgC8AMhBgJ/IAUgCGoiBSAEIANrIglBAnVB1QJsQX9qQQAgCRtGBEAgAkEIahBTIAIoAhwiCCACKAIYaiEFIAIoAhAhBCACKAIMIQMLQQAgAyAERg0AGiADIAVB1QJuIgRBAnRqKAIAIAUgBEHVAmxrQQxsagsiAyAHNgIIIAMgCjYCBCADIAY2AgAgAiAIQQFqIgQ2AhwMBgsgASgC8AMhCiACKAIcIgYgBWoiBSACKAIQIgQgA2siCUECdUHVAmxBf2pBACAJG0YEQCACQQhqEFMgAigCHCIGIAIoAhhqIQUgAigCECEEIAIoAgwhAwsgB0F/aiEHIAMgBEYEf0EABSADIAVB1QJuIgRBAnRqKAIAIAUgBEHVAmxrQQxsagsiAyAHNgIIIAMgCDYCBCADIAo2AgAgAiAGQQFqIgQ2AhwMBQsgASgC/AMhCgJ/IAIoAhwiBiAFaiIFIAIoAhAiBCADayIJQQJ1QdUCbEF/akEAIAkbRgRAIAJBCGoQUyACKAIcIgYgAigCGGohBSACKAIQIQQgAigCDCEDC0EAIAMgBEYNABogAyAFQdUCbiIEQQJ0aigCACAFIARB1QJsa0EMbGoLIgMgBzYCCCADIAg2AgQgAyAKNgIAIAIgBkEBaiIENgIcDAQLIAIoAhwiBiAFaiIFIAIoAhAiBCADayIIQQJ1QdUCbEF/akEAIAgbRgRAIAJBCGoQUyACKAIcIgYgAigCGGohBSACKAIQIQQgAigCDCEDCyAHQX9qIQcgAyAERgR/QQAFIAMgBUHVAm4iBEECdGooAgAgBSAEQdUCbGtBDGxqCyIDIAc2AgggA0EANgIEIAMgCTYCACACIAZBAWoiBDYCHAwDCyAAKAIAIgQgCkEBaiIMQQJ0aiAHNgIAIAQgB0ECdGogDDYCAAJ/IAIoAhwiBiAFaiIIIAIoAhAiBCADayILQQJ1QdUCbEF/akEAIAsbRgRAIAJBCGoQUyACKAIYIgUgAigCHCIGaiEIIAIoAhAhBCACKAIMIQMLQQAgAyAERg0AGiADIAhB1QJuIgtBAnRqKAIAIAggC0HVAmxrQQxsagsiCCAKNgIIIAhBADYCBCAIIAk2AgAgAiAGQQFqIgY2AhwgASgC2AMhCCAFIAZqIgUgBCADayIKQQJ1QdUCbEF/akEAIAobRgRAIAJBCGoQUyACKAIcIgYgAigCGGohBSACKAIQIQQgAigCDCEDCyAHQX9qIQcgAyAERgR/QQAFIAMgBUHVAm4iBEECdGooAgAgBSAEQdUCbGtBDGxqCyIDIAc2AgggAyAMNgIEIAMgCDYCACACIAZBAWoiBDYCHAwCC0GIxgAQJwsgAigCHCEECyACKAIMIQMgBARAIAIoAhghBQwBCwsgAigCECEHCyACQQA2AhwgByADa0ECdSIFQQNPBEADQCADKAIAECEgAiACKAIMQQRqIgM2AgwgAigCECIHIANrQQJ1IgVBAksNAAsLQaoBIQQCQAJAAkAgBUF/ag4CAQACC0HVAiEECyACIAQ2AhgLAkAgAyAHRg0AA0AgAygCABAhIANBBGoiAyAHRw0ACyACKAIQIgAgAigCDCIBRg0AIAIgACAAIAFrQXxqQQJ2QX9zQQJ0ajYCEAsgAigCCCIABEAgABAhCyACQSBqJAAPCxA3AAukAwEHfyMAQSBrIgQkACAAKALsAiIDKAIsIAMoAihrQQxtIAEoAgQiAiABKAIAIgNrQQJ1RwRAQaA8QQAQWCABKAIEIQIgASgCACEDCyAAQQA6AOgCIAIgA0cEQEEAIQMDQCAAKALsAiECAkAgA0EATgRAIAIoAgggAigCBGtBDG0gA0oNAQsgBCADNgIAQbk8IAQQWAsgAigCKCECIARBADYCGCAEQgA3AxAgAiADQQxsaiICKAIEIAIoAgBrIgUEQAJAIAVBAnUiBkGAgICABEkEQCAEIAUQIiIFNgIQIAQgBTYCFCAEIAUgBkECdGo2AhggAigCBCACKAIAIgZrIgJBAEwEQCAEIAU2AhQMAgsgBCAFIAYgAhAkIgYgAmoiBzYCFCACRQ0BIAcgBmtBAnUiAkEBIAJBAUsbIQcgASgCACADQQJ0aiEIQQAhAgNAIAYgAkECdGooAgAgCCgCADYCACACQQFqIgIgB0cNAAsMAQsQNwALIAQgBTYCFCAFECELIANBAWoiAyABKAIEIAEoAgBrQQJ1SQ0ACwsgBEEgaiQAC4gDAQV/IABBADoA6AIgAEEAOgAAIABB7AJqQQBBjK4BED0aIABBAWpBhPMCKAIAQYvzAi0AACICIAJBGHRBGHUiAUEASBtBgAIQPSEDQQAhAgNAAkACQCABQX9MBEAgAkGE8wIoAgBPDQFBgPMCKAIAIQQMAgtBgPMCIQQgAiABQf8BcUkNAQsgAEGEAmpBAEHkABA9IgIgAC0ASCIBQRRsaiIDIAAtAEQiBEECdGpBATYCACABQQJ0IgEgAiAEQRRsampBATYCACABIAIgAC0AViIEQRRsaiIFakEBNgIAIAMgBEECdCIBakEBNgIAIAUgAC0AQiIDQQJ0akEBNgIAIAIgA0EUbGogAWpBATYCACAADwsgAyACIARqLAAAIgFB3wBxIAEgAUGff2pBGkkbQf8BcWogAjoAACADQYDzAigCAEGA8wJBi/MCLAAAQQBIGyACaiwAACIBQSByIAEgAUG/f2pBGkkbQf8BcWogAjoAACACQQFqIQJBi/MCLAAAIQEMAAALAAuGJQIpfwh9IwBBIGsiBiQAIAAQ5gIgBkEANgIYIAZCADcDEAJAAkAgACgC8AIiAUEBaiICIAFPBEAgAkGAgICABE8NASAGIAJBAnQiBRAiIgE2AhQgBiABNgIQIAYgASAFajYCGAsgACAAKALkAzYC6AMgBkF/NgIMIAIEQCAAQeQDaiACIAZBDGoQdwsgACAAKALYAzYC3AMgACgC9AIhBSAGQX82AgxBACEBQQAhAiAFBEAgAEHYA2ogBSAGQQxqEHcgACgC9AIhAgsgACAAKALwAzYC9AMgBkF/NgIMIABB8ANqIRggAgRAIBggAiAGQQxqEHcgACgC9AIhAQsgACAAKAL8AzYCgAQgBkF/NgIMIABB/ANqIRkgAQRAIBkgASAGQQxqEHcLIAAgACgClAQ2ApgEIAAoAvACIQIgBkHs8bWJfjYCDCACQQFqIgEgAk8EQCAAQZQEaiABIAZBDGoQbAsgACAAKAKIBDYCjAQgACgC9AIhBSAGQezxtYl+NgIMIABBiARqIRpBACEBQQAhAiAFBEAgGiAFIAZBDGoQbCAAKAL0AiECCyAAIAAoAqAENgKkBCAGQezxtYl+NgIMIABBoARqIRsgAgRAIBsgAiAGQQxqEGwgACgC9AIhAQsgACAAKAKsBDYCsAQgBkHs8bWJfjYCDCAAQawEaiETIAEEQCATIAEgBkEMahBsCyAAKALwAiIDQQBIDQEgAyEFA0AgBiAGKAIQIgQ2AhQCQCAFIANKDQAgBUEBSCEcIAVBHmohHSAFQQJqIRQgBUEBaiEMIAVBA2ohISAEIQEgBSECAkADQAJAIAEgBGsiAUUEQEPseC3hISxBfyEKDAELIAFBAnUiAUEBIAFBAUsbIQggACgChAMiCSAFQQJ0aigCACELIAAoAqAEIQ0gACgCrAQhDkEAIQFBfyEKQ+x4LeEhLANAIA4gCyAEIAFBAnRqKAIAIgdqQQJ0aioCACANIAkgB0ECdGooAgAgAmpBAnRqKgIAkiIqICwgKiAsXiIPGyEsIAcgCiAPGyEKIAFBAWoiASAIRw0ACwsCQCAFQQBMDQACQCACIANODQAgBUECdCILIAAoAoQDaigCACACakECdCIBIAAoAqgDaigCBEUNAEPseC3hISpBfyEPAkAgACgCnAMgAWooAgBFDQAgAiAFayIBQQNIDQAgISACSgRAQfM9ECcgACgC8AIhAwsCQAJAIAMgAkwNACACQQFIDQAgAyAFSg0BC0GVwAAQJwsgACABQR4gAUEeSBtBA3RqQewvaioCACAAIAAoAvgCIgEgC2ooAgAiBEEobGogASACQQJ0aiIDKAIEIgdBA3RqQaTjAGoqAgBDAAAAAJIgACAEQegHbGogB0HIAWxqIAEgDEECdGooAgBBKGxqIAMoAgBBA3RqKgLsBpJDAAAAAJKSIitD7Hgt4V5BAXMNAEEAIQ8gKyEqC0MAAAAAIS4gFCACTARAAkACQCACIAxGDQAgACgC8AIiASACSA0AIAJBAUgNACABIAVKDQELQYk/ECcLIAAgACgC+AIiASAMQQJ0aigCAEEobCIEaiABIAJBAnRqIgMoAgBBA3QiB2oqAqQFQwAAAACSIAAgASALaigCAEHoB2xqIAMoAgRByAFsaiAEaiAHakGcPGoqAgCSIS4LAkACQCAAKALwAiIBIAJMDQAgAkEBSA0AIAEgBUoNAQtBlcAAECcLIAJBAWpBAnQhHiAMQQJ0IREgAkECdCENAkAgBSACIB0gAiAdSBsiIkoNACAAIAAoAvgCIgEgC2ooAgAiBEEobGogASAeaigCACIDQQN0akGk4wBqKgIAQwAAAACSIAAgBEHoB2xqIANByAFsaiABIBFqKAIAQShsaiABIA1qKAIAQQN0aioC7AaSITEgAkFiaiEjQX8hEEF/IRIgBSEEA0ACQCAEIgcgBUoEQCAAKAKQAyAHQQJ0aigCAEUNAQsgB0EBaiEEAkAgAiAjIAcgBWsiCGoiASAHQQJqIh8gHyABSBsiJEgNACAcIAcgBUhyISUgCEEBRiEgIAhBf2ohJiAAKAKIBCAEQQJ0IhUgACgChANqKAIAQQJ0akF8aiInIA1qISggAiEBA0AgAiABSgRAIAAoApADIAFBAnRqKAIERQ0CCyAAKAKoAyAAKAKEAyAVaigCACABakECdGooAgAEQAJ9AkAgBSAHRw0AIAEgAkcNACAuICgqAgCSDAELIAAgCEH4AWxqIAIgAWsiDkEDdGpB5PQAaioCACErICcgAUECdCIWaioCACEtAkACQCAHQQBIDQAgASAERg0AIAAoAvACIgMgAUgNACABQQFIDQAgAyAHSg0BC0GJPxAnCyAxICuSISsgACAAKAL4AiIJIBVqKAIAIgNBKGxqIAkgFmooAgAiF0EDdGoqAqQFIS8CQAJAIAFBAUgNACAAKALwAiIpIAdMDQAgB0EBSA0AICkgAUoNAQtBlcAAECcgACgC+AIiCSAVaigCACEDIAkgFmooAgAhFwsgKyAtkiErIC9DAAAAAJIhLSAAIBdBKGxqIANBA3RqQaTjAGoqAgBDAAAAAJIhLyAAIBdB6AdsaiADQcgBbGogCSAWaigCBEEobGogCSAHQQJ0aigCAEEDdGoqAuwGITACQAJAIAIgAUgNACAlIB8gAUpyDQAgACgC8AIgAkoNAQtBoMEAECcLIA4gJmpBHU1BACAIIA5yQX9KG0UEQEHBwgAQJwsgKyAtkiAvIDCSkiEvAn0CQCAIDQAgDkEBRw0AQwAAAAAhKyAAIAAoAvgCIA1qKAIAQQN0akGEOmoqAgBDAAAAAJIhLUMAAAAADAELQwAAAAAhLUMAAAAAISsCfyAgIAhBAUcNABogICAODQAaIAAgACgC+AIgEWooAgBBA3RqQaw6aioCACErQQELIQNDAAAAACAOQQFHDQAaQwAAAAAgA0UNABogACAAKAL4AiIDIBFqKAIAQShsaiADIA1qKAIAQQN0akHUOmoqAgALITAgLyArIC2SIDCSkgsiKyAqICsgKl4iAxshKiABIBIgAxshEiAHIBAgAxshEAsgASAkSiEDIAFBf2ohASADDQALCyAHICJIDQELCyASQX9GDQAgEEF/Rg0AIAIgEmsgECAFa0EfbGoiAUF/TARAQefEABAnCyABQQtsQQFqIQ8LAkACQCAAKALwAiIBIAJMDQAgAkEASA0AIAEgBU4NAQtB3MMAECcgACgC8AIhAQsgACoC7GQgACoC/GQgLCAAIAAoAvgCIgQgC2ooAgAiA0EobGogBCAeaigCACIHQQN0akGk4wBqKgIAQwAAAACSIAEgBUoEfSAAIANByAFsaiAHQShsaiAEIBFqKAIAQQN0akGE5QBqKgIABUMAAAAAC5IgAkEBTgR9IAAgA0HIAWxqIAdBKGxqIAQgDWooAgBBA3RqQezsAGoqAgAFQwAAAAALkpKSkiIrICpeQQFzRQRAIApBf0wEQEHnxAAQJwsgCkELbEECaiEPICshKgsgACgChAMgC2ooAgAgAmpBAnQiASAAKAKIBGogKjgCACAAKALYAyABaiAPNgIACyAUIAJKDQAgAiAAKALwAiIBTg0AQX8hCQJ9Q+x4LeEgDEECdCIHIAAoAoQDaigCACACakECdCIEIAAoAqgDaigCAEUNABogBCAaKAIAakF8aioCACEqAkACQCACQQFIIgsNACABIAVMDQAgASACTg0BC0HcwwAQJyAAKALwAiEBCyAAKgL8ZCAqIAAgACgC+AIiCCACQQJ0Ig1qIg4oAgAiBEEobGogByAIaigCACIDQQN0akGk4wBqKgIAQwAAAACSIAEgAkoEfSAAIARByAFsaiADQShsaiAOKAIEQQN0akGE5QBqKgIABUMAAAAAC5IgACAEQcgBbGogA0EobGogCCAFQQJ0aigCAEEDdGpB7OwAaioCAJKSkiEqAkACQCACIAxGDQAgASACSA0AIAsNACABIAVKDQELQYk/ECcgACgC+AIiASANaigCACEEIAEgB2ooAgAhAwtD7Hgt4SAqIAAgA0EobGogBEEDdGoqAqQFQwAAAACSkiIqQ+x4LeFeQQFzDQAaQQMhCSAqCyEqIAAoAoQDIQECQCAAKAKQAyAHaigCAEUEQCATKAIAIQQMAQsgACgCrAQiBCABIAdqKAIAIAJqQQJ0aioCACAAKgL0ZEMAAAAAkpIiKyAqXkEBcw0AQQQhCSArISoLIAQgASAFQQJ0aigCACACakECdCIBaiAqOAIAIBkoAgAgAWogCTYCAAsCQAJAIAAoAqwEIAVBAnQiCCAAKAKEA2ooAgAgAmpBAnRqKgIAICxeQQFzDQAgBigCFCIBIAYoAhgiA0cEQCABIAI2AgAgBiABQQRqNgIUDAELIAEgBigCECIBayIHQQJ1IglBAWoiBEGAgICABE8NAQJ/QQAgBCADIAFrIgNBAXUiCyALIARJG0H/////AyADQQJ1Qf////8BSRsiBEUNABogBEGAgICABE8NBCAEQQJ0ECILIgMgCUECdGoiCSACNgIAIAdBAU4EQCADIAEgBxAkGgsgBiADIARBAnRqNgIYIAYgCUEEajYCFCAGIAM2AhAgAUUNACABECELAkAgFCACSiAccg0AIAIgACgC8AJODQBD7Hgt4SEqQX8hCSAsQ+x4LeFeQQFzRQRAIApBf0wEQEHnxAAQJwsgCkELbEEFaiEJICwhKgsgACgChAMgCGooAgAhAQJAIAAoApADIAJBAnRqKAIARQRAIBsoAgAhCAwBCyAAKAKgBCIIIAEgAmpBAnRqQXxqKgIAIAAqAvRkQwAAAACSkiIsICpeQQFzDQBBBiEJICwhKgsgCCABIAJqQQJ0IgFqIBMoAgAgAWoqAgAiLCAqICwgKl4iBBs4AgAgGCgCACABakEHIAkgBBs2AgALIAIgACgC8AIiA04NAyACQQFqIQIgBigCECEEIAYoAhQhAQwBCwsQNwALQaMcEDIACyAFQQBKIQIgBUF/aiEFIAINAAsMAQtBoxwQMgALIAAoApQEQQA2AgAgACgC5ANBCDYCACAAKALwAiIIQQFOBEBDAAAAACEqQQEhAQNAQX8hCwJ9Q+x4LeEgAUECdCIMIAAoApADaigCAEUNABpD7Hgt4SAqIAAqAtR0QwAAAACSkiIqQ+x4LeFeQQFzDQAaQQkhCyAqCyEsIAFBAWohBwJAIAAoAoQDKAIEIAFqQQJ0IgIgACgCqANqKAIARQRAICwhKgwBCyAAKAKUBCoCACACIAAoAogEakF8aioCAJIhKiAAKgLcdCErAkACQCABQQFGDQAgCCABSA0AIAhBAEoNAQtBiT8QJyAAKALwAiEICyAAIAAoAvgCIgIoAgQiCUEobGogAiAMaigCACIKQQN0aioCpAVDAAAAAJIhLiAIQQFOQQAgCCABThtFBEBB3MMAECcgACgC+AIiAiAMaigCACEKIAIoAgQhCSAAKALwAiEICyAqICuSIC6SIAAgCkEobGogCUEDdGpBpOMAaioCAEMAAAAAkiAIIAFKBH0gACAKQcgBbGogCUEobGogAiAHQQJ0aigCAEEDdGpBhOUAaioCAAVDAAAAAAuSQwAAAACSkiIqICxeQQFzBEAgLCEqDAELQQohCwtBASECIAFBAUcEQANAAkAgAiIFQQFqIgJBAnQiCSAAKAKEA2ooAgAgAWpBAnQiBCAAKAKoA2ooAgBFDQAgBUECdCINIAAoApQEaioCACAEIAAoAogEakF8aioCAJIhLCAAKgLcdCErAkACQCABIAJGDQAgCCABSA0AIAggBUoNAQtBiT8QJyAAKALwAiEICyAsICuSIAAgACgC+AIiCiAJaigCACIEQShsaiAKIAxqKAIAIgNBA3RqKgKkBUMAAAAAkpICfSAIIAVKQQAgCCABThtFBEBB3MMAECcgACgC+AIiCiAJaigCACEEIAAoAvACIQggCiAMaigCACEDCyAAIANBKGxqIARBA3RqQaTjAGoqAgBDAAAAAJIgCCABSgR9IAAgA0HIAWxqIARBKGxqIAogB0ECdGooAgBBA3RqQYTlAGoqAgAFQwAAAAALkiAAIANByAFsaiAEQShsaiAKIA1qKAIAQQN0akHs7ABqKgIAkguSIiwgKl5BAXMNACAFQQtsQQpqIQsgLCEqCyABIAJHDQALCyAAKAKUBCAMaiAqOAIAIAAoAuQDIAxqIAs2AgAgASAAKALwAiIISCECIAchASACDQALCyAGKAIQIgAEQCAGIAA2AhQgABAhCyAGQSBqJAALEAAgAUQAAAAAAAAAABDoAguXAQIBfwF9IwBBIGsiAyQAQRAQIiIAQgA3AgAgAEIANwIIQfjyAkE0NgIAQYzzAiAANgIAIANBEGogARBPIgEgAyACEE8iAhDDBSEEIAIsAAtBf0wEQCACKAIAECELIAEsAAtBf0wEQCABKAIAECELQYzzAkEANgIAQfjyAkEANgIAIAAgBEMAAMjClTgCDCADQSBqJAAgAAsYAQF/QRAQIiIAQgA3AgAgAEIANwIIIAALJwEBfyMAQRBrIgEkACABIAA2AgwgASgCDCEAEN8CIAFBEGokACAAC+ICAQJ/ENIFENMFQegXQYQYQagYQQBB8BNBBEHzE0EAQfMTQQBBiBBB9RNBBRAEQegXQQFBuBhB8BNBBkEHEAhBBBAiIgBBADYCAEEEECIiAUEANgIAQegXQZcQQegSQbAUQQggAEHoEkGIFEEJIAEQA0EEECIiAEEMNgIAQQQQIiIBQQw2AgBB6BdBnRBBwMEBQbwYQQogAEHAwQFBwBhBCyABEANBpBBBBEHQGEGAFUEMQQ0QB0H8GUGYGkG8GkEAQfATQQ5B8xNBAEHzE0EAQa0QQfUTQQ8QBEEEECIiAEEANgIAQQQQIiIBQQA2AgBB/BlBvBBBzMEBQcwaQRAgAEHMwQFBiBdBESABEANBBBAiIgBBCDYCAEEEECIiAUEINgIAQfwZQcAQQdAZQbAUQRIgAEHQGUGIFEETIAEQA0HKEEEDQdAaQdwaQRRBFRAHQdoQQQRB8BpBgBtBFkEXEAcLC824AYIBAEGECAvcDP////9ub19maWxlAEAAWmVyby1sZW5ndGggc2VxdWVuY2UgcmVhZC4ASW1wcm9wZXJseSBmb3JtYXR0ZWQgc2VxdWVuY2UuAFVuZXhwZWN0ZWQgY2hhcmFjdGVyICclYycgaW4gc2VxdWVuY2UuAEFzc2VydGlvbiBmYWlsZWQgaW4gZmlsZSAiL1VzZXJzL0FsZXhIL0V0ZXJuYVNjcmlwdC9lbmdpbmVzL2NvbnRyYWZvbGQvY29udHJhZm9sZC9zcmMvU1N0cnVjdC5jcHAiLCBsaW5lIDY0MzogU2hvdWxkIG5vdCBhdHRlbXB0IHRvIGNvbnZlcnQgYSBtYXBwaW5nIHdpdGggcHNldWRva25vdHMuCgA/AC4AKAApAEludmFsaWQgc3RydWN0dXJlLgBJbnZhbGlkIG1hcHBpbmcuAFBvc2l0aW9uICVkIG9mIHNlcXVlbmNlIG1hcHMgdG8gaW52YWxpZCBwb3NpdGlvbi4AUG9zaXRpb25zICVkIGFuZCAlZCBvZiBzZXF1ZW5jZSBkbyBub3QgbWFwIHRvIGVhY2ggb3RoZXIuAFBvc2l0aW9uICVkIG9mIHNlcXVlbmNlIG1hcHMgdG8gaXRzZWxmLgBJbnZhbGlkIHN0cnVjdHVyZTogcG9zaXRpb25zIG1heSBub3QgbWFwIHRvIHRoZW1zZWx2ZXMuAEludmFsaWQgc3RydWN0dXJlOiBiYWQgcGFpcmluZ3MgZm91bmQuAGFsbG9jYXRvcjxUPjo6YWxsb2NhdGUoc2l6ZV90IG4pICduJyBleGNlZWRzIG1heGltdW0gc3VwcG9ydGVkIHNpemUARVJST1I6IAAhc3RrLmVtcHR5KCkAL1VzZXJzL0FsZXhIL0V0ZXJuYVNjcmlwdC9lbmdpbmVzL2NvbnRyYWZvbGQvZW1zY3JpcHRlbi9ubmZlX2V2YWwuY3BwAGV2YWwASGFpcnBpbiBsb29wICggJWQsICVkKSAlYyVjIDogJS4yZgoASW50ZXJpb3IgbG9vcCAoICVkLCAlZCkgJWMlYzsgKCAlZCwgJWQpICVjJWMgOiAlLjJmCgBNdWx0aSBsb29wICggJWQsICVkKSAlYyVjIDogJS4yZgoAQWRkaW5nIGV4dGVybmFsX3BhaXJlZCAoICVkLCAlZCkgJWMgJWMgJWMgJWMgJWQgOiAlLjJmICUuMmYKAEV4dGVybmFsIGxvb3AgOiAlLjJmCgBhbGxvY2F0b3I8VD46OmFsbG9jYXRlKHNpemVfdCBuKSAnbicgZXhjZWVkcyBtYXhpbXVtIHN1cHBvcnRlZCBzaXplAFZlY3RvckludABWZWN0b3JEb3VibGUARnVsbEV2YWxSZXN1bHQAbm9kZXMAZW5lcmd5AEZ1bGxFdmFsAEZ1bGxGb2xkUmVzdWx0AG1mZQBzdHJ1Y3R1cmUARnVsbEZvbGREZWZhdWx0AEZ1bGxGb2xkVGVtcGVyYXR1cmUAcHVzaF9iYWNrAHJlc2l6ZQBzaXplAGdldABzZXQAYWxsb2NhdG9yPFQ+OjphbGxvY2F0ZShzaXplX3QgbikgJ24nIGV4Y2VlZHMgbWF4aW11bSBzdXBwb3J0ZWQgc2l6ZQBOU3QzX18yNnZlY3RvcklpTlNfOWFsbG9jYXRvcklpRUVFRQBOU3QzX18yMTNfX3ZlY3Rvcl9iYXNlSWlOU185YWxsb2NhdG9ySWlFRUVFAE5TdDNfXzIyMF9fdmVjdG9yX2Jhc2VfY29tbW9uSUxiMUVFRQAAAADcYAAAIAkAAGBhAAD0CAAAAAAAAAEAAABICQAAAAAAAGBhAADQCAAAAAAAAAEAAABQCQAAAAAAAFBOU3QzX18yNnZlY3RvcklpTlNfOWFsbG9jYXRvcklpRUVFRQAAAAC8YQAAgAkAAAAAAABoCQAAUEtOU3QzX18yNnZlY3RvcklpTlNfOWFsbG9jYXRvcklpRUVFRQAAALxhAAC4CQAAAQAAAGgJAABpaQB2AHZpAKgJAAAwYAAAqAkAAJBgAAB2aWlpAAAAADBgAACoCQAAtGAAAJBgAAB2aWlpaQAAALRgAADgCQAAaWlpAFQKAABoCQAAtGAAAE4xMGVtc2NyaXB0ZW4zdmFsRQAA3GAAAEAKAABpaWlpAEHwFAvUA0hgAABoCQAAtGAAAJBgAABpaWlpaQBOU3QzX18yNnZlY3RvcklkTlNfOWFsbG9jYXRvcklkRUVFRQBOU3QzX18yMTNfX3ZlY3Rvcl9iYXNlSWROU185YWxsb2NhdG9ySWRFRUVFAAAAYGEAAKoKAAAAAAAAAQAAAEgJAAAAAAAAYGEAAIYKAAAAAAAAAQAAANgKAAAAAAAAUE5TdDNfXzI2dmVjdG9ySWROU185YWxsb2NhdG9ySWRFRUVFAAAAALxhAAAICwAAAAAAAPAKAABQS05TdDNfXzI2dmVjdG9ySWROU185YWxsb2NhdG9ySWRFRUVFAAAAvGEAAEALAAABAAAA8AoAADALAAAwYAAAMAsAAMxgAAB2aWlkAAAAADBgAAAwCwAAtGAAAMxgAAB2aWlpZAAAALRgAABoCwAAVAoAAPAKAAC0YAAAAAAAAEhgAADwCgAAtGAAAMxgAABpaWlpZAAxNEZ1bGxFdmFsUmVzdWx0AADcYAAA1gsAAFAxNEZ1bGxFdmFsUmVzdWx0AAAAvGEAAPALAAAAAAAA6AsAAFBLMTRGdWxsRXZhbFJlc3VsdAAAvGEAABQMAAABAAAA6AsAAAQMAABmaWkAdmlpZgBB0BgLkAIEDAAAkGAAANAMAADQDAAATlN0M19fMjEyYmFzaWNfc3RyaW5nSWNOU18xMWNoYXJfdHJhaXRzSWNFRU5TXzlhbGxvY2F0b3JJY0VFRUUATlN0M19fMjIxX19iYXNpY19zdHJpbmdfY29tbW9uSUxiMUVFRQAAAADcYAAAnwwAAGBhAABgDAAAAAAAAAEAAADIDAAAAAAAADE0RnVsbEZvbGRSZXN1bHQAAAAA3GAAAOgMAABQMTRGdWxsRm9sZFJlc3VsdAAAALxhAAAEDQAAAAAAAPwMAABQSzE0RnVsbEZvbGRSZXN1bHQAALxhAAAoDQAAAQAAAPwMAABkaWkAGA0AANAMAADMYAAAaWlpZABB8BoLngsYDQAAzGAAANAMAADMYAAAaWlkaWQAQXNzZXJ0aW9uIGZhaWxlZCBpbiBmaWxlICIvVXNlcnMvQWxleEgvRXRlcm5hU2NyaXB0L2VuZ2luZXMvY29udHJhZm9sZC8uL2NvbnRyYWZvbGQvc3JjL1BhcmFtZXRlck1hbmFnZXIuaXBwIiwgbGluZSAzNDogSW5jb25zaXN0ZW50IGJlZ2luIGFuZCBlbmQgaW5kaWNlcy4KAGFsbG9jYXRvcjxUPjo6YWxsb2NhdGUoc2l6ZV90IG4pICduJyBleGNlZWRzIG1heGltdW0gc3VwcG9ydGVkIHNpemUAAAAAAACQDgAANgAAADcAAAAxNlBhcmFtZXRlck1hbmFnZXJJZkUAAADcYAAAeA4AAGJhc2VfcGFpcgBiYXNlX3BhaXJfJWMlYwB0ZXJtaW5hbF9taXNtYXRjaAB0ZXJtaW5hbF9taXNtYXRjaF8lYyVjJWMlYwBoYWlycGluX2xlbmd0aF9hdF9sZWFzdABoYWlycGluX2xlbmd0aF9hdF9sZWFzdF8lZABpbnRlcm5hbF9leHBsaWNpdABpbnRlcm5hbF9leHBsaWNpdF8lZF8lZABidWxnZV9sZW5ndGhfYXRfbGVhc3QAYnVsZ2VfbGVuZ3RoX2F0X2xlYXN0XyVkAGludGVybmFsX2xlbmd0aF9hdF9sZWFzdABpbnRlcm5hbF9sZW5ndGhfYXRfbGVhc3RfJWQAaW50ZXJuYWxfc3ltbWV0cmljX2xlbmd0aF9hdF9sZWFzdABpbnRlcm5hbF9zeW1tZXRyaWNfbGVuZ3RoX2F0X2xlYXN0XyVkAGludGVybmFsX2FzeW1tZXRyeV9hdF9sZWFzdABpbnRlcm5hbF9hc3ltbWV0cnlfYXRfbGVhc3RfJWQAYnVsZ2VfMHgxX251Y2xlb3RpZGVzAGJ1bGdlXzB4MV9udWNsZW90aWRlc18lYwBpbnRlcm5hbF8xeDFfbnVjbGVvdGlkZXMAaW50ZXJuYWxfMXgxX251Y2xlb3RpZGVzXyVjJWMAaGVsaXhfc3RhY2tpbmcAaGVsaXhfc3RhY2tpbmdfJWMlYyVjJWMAaGVsaXhfY2xvc2luZwBoZWxpeF9jbG9zaW5nXyVjJWMAbXVsdGlfbGVuZ3RoAG11bHRpX2Jhc2UAbXVsdGlfdW5wYWlyZWQAbXVsdGlfcGFpcmVkAGRhbmdsZQBkYW5nbGVfbGVmdF8lYyVjJWMAZGFuZ2xlX3JpZ2h0XyVjJWMlYwBleHRlcm5hbF9sZW5ndGgAZXh0ZXJuYWxfdW5wYWlyZWQAZXh0ZXJuYWxfcGFpcmVkAEFzc2VydGlvbiBmYWlsZWQgaW4gZmlsZSAiL1VzZXJzL0FsZXhIL0V0ZXJuYVNjcmlwdC9lbmdpbmVzL2NvbnRyYWZvbGQvLi9jb250cmFmb2xkL3NyYy9JbmZlcmVuY2VFbmdpbmUuaXBwIiwgbGluZSAxNzE6IEluZGV4IG91dC1vZi1ib3VuZHMuCgBBc3NlcnRpb24gZmFpbGVkIGluIGZpbGUgIi9Vc2Vycy9BbGV4SC9FdGVybmFTY3JpcHQvZW5naW5lcy9jb250cmFmb2xkLy4vY29udHJhZm9sZC9zcmMvSW5mZXJlbmNlRW5naW5lLmlwcCIsIGxpbmUgMTg3OiBJbmRleCBvdXQtb2YtYm91bmRzLgoAQXNzZXJ0aW9uIGZhaWxlZCBpbiBmaWxlICIvVXNlcnMv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L0V0ZXJuYVNjcmlwdC9lbmdpbmVzL2NvbnRyYWZvbGQvLi9jb250cmFmb2xkL3NyYy9Mb2dTcGFjZS5ocHAiLCBsaW5lIDg2OiBBcmd1bWVudCBvdXQtb2YtcmFuZ2UuCgBBc3NlcnRpb24gZmFpbGVkIGluIGZpbGUgIi9Vc2Vycy9BbGV4SC9FdGVybmFTY3JpcHQvZW5naW5lcy9jb250cmFmb2xkLy4vY29udHJhZm9sZC9zcmMvSW5mZXJlbmNlRW5naW5lLmlwcCIsIGxpbmUgMTk2MjogSGFpcnBpbiBib3VuZGFyaWVzIGludmFsaWQuCgBBc3NlcnRpb24gZmFpbGVkIGluIGZpbGUgIi9Vc2Vycy9BbGV4SC9FdGVybmFTY3JpcHQvZW5naW5lcy9jb250cmFmb2xkLy4vY29udHJhZm9sZC9zcmMvSW5mZXJlbmNlRW5naW5lLmlwcCIsIGxpbmUgMTg5OTogSW52YWxpZCBiYXNlLXBhaXIKAEFzc2VydGlvbiBmYWlsZWQgaW4gZmlsZSAiL1VzZXJzL0FsZXhIL0V0ZXJuYVNjcmlwdC9lbmdpbmVzL2NvbnRyYWZvbGQvLi9jb250cmFmb2xkL3NyYy9JbmZlcmVuY2VFbmdpbmUuaXBwIiwgbGluZSAxODQ0OiBJbnZhbGlkIGluZGljZXMuCgBBc3NlcnRpb24gZmFpbGVkIGluIGZpbGUgIi9Vc2Vycy9BbGV4SC9FdGVybmFTY3JpcHQvZW5naW5lcy9jb250cmFmb2xkLy4vY29udHJhZm9sZC9zcmMvSW5mZXJlbmNlRW5naW5lLmlwcCIsIGxpbmUgMjEzMDogU2luZ2xlLWJyYW5jaCBsb29wIGJvdW5kYXJpZXMgaW52YWxpZC4KAEFzc2VydGlvbiBmYWlsZWQgaW4gZmlsZSAiL1VzZXJzL0FsZXhIL0V0ZXJuYVNjcmlwdC9lbmdpbmVzL2NvbnRyYWZvbGQvLi9jb250cmFmb2xkL3NyYy9JbmZlcmVuY2VFbmdpbmUuaXBwIiwgbGluZSAyMTM2OiBJbnZhbGlkIHNpbmdsZS1icmFuY2ggbG9vcCBzaXplLgoAQXNzZXJ0aW9uIGZhaWxlZCBpbiBmaWxlICIvVXNlcnMvQWxleEgvRXRlcm5hU2NyaXB0L2VuZ2luZXMvY29udHJhZm9sZC8uL2NvbnRyYWZvbGQvc3JjL0luZmVyZW5jZUVuZ2luZS5pcHAiLCBsaW5lIDE3Njg6IEludmFsaWQgaW5kaWNlcy4KAEFzc2VydGlvbiBmYWlsZWQgaW4gZmlsZSAiL1VzZXJzL0FsZXhIL0V0ZXJuYVNjcmlwdC9lbmdpbmVzL2NvbnRyYWZvbGQvLi9jb250cmFmb2xkL3NyYy9JbmZlcmVuY2VFbmdpbmUuaXBwIiwgbGluZSAyMzM1OiBJbnZhbGlkIHZhbHVlcyB0byBlbmNvZGUgYXMgdHJhY2ViYWNrLgoAQXNzZXJ0aW9uIGZhaWxlZCBpbiBmaWxlICIvVXNlcnMvQWxleEgvRXRlcm5hU2NyaXB0L2VuZ2luZXMvY29udHJhZm9sZC8uL2NvbnRyYWZvbGQvc3JjL0luZmVyZW5jZUVuZ2luZS5pcHAiLCBsaW5lIDI5OTU6IEJhZCB0cmFjZWJhY2suCgBBc3NlcnRpb24gZmFpbGVkIGluIGZpbGUgIi9Vc2Vycy9BbGV4SC9FdGVybmFTY3JpcHQvZW5naW5lcy9jb250cmFmb2xkLy4vY29udHJhZm9sZC9zcmMvSW5mZXJlbmNlRW5naW5lLmlwcCIsIGxpbmUgMTcwNjogU3VwcGxpZWQgbWFwcGluZyBvZiBpbmNvcnJlY3QgbGVuZ3RoIQoAdm9pZABib29sAGNoYXIAc2lnbmVkIGNoYXIAdW5zaWduZWQgY2hhcgBzaG9ydAB1bnNpZ25lZCBzaG9ydABpbnQAdW5zaWduZWQgaW50AGxvbmcAdW5zaWduZWQgbG9uZwBmbG9hdABkb3VibGUAc3RkOjpzdHJpbmcAc3RkOjpiYXNpY19zdHJpbmc8dW5zaWduZWQgY2hhcj4Ac3RkOjp3c3RyaW5nAHN0ZDo6dTE2c3RyaW5nAHN0ZDo6dTMyc3RyaW5nAGVtc2NyaXB0ZW46OnZhbABlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxzaWduZWQgY2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgY2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8c2hvcnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIHNob3J0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIGludD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8bG9uZz4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgbG9uZz4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50MTZfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50MzJfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDMyX3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGZsb2F0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxkb3VibGU+AE5TdDNfXzIxMmJhc2ljX3N0cmluZ0loTlNfMTFjaGFyX3RyYWl0c0loRUVOU185YWxsb2NhdG9ySWhFRUVFAAAAYGEAAEcnAAAAAAAAAQAAAMgMAAAAAAAATlN0M19fMjEyYmFzaWNfc3RyaW5nSXdOU18xMWNoYXJfdHJhaXRzSXdFRU5TXzlhbGxvY2F0b3JJd0VFRUUAAGBhAACgJwAAAAAAAAEAAADIDAAAAAAAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0lEc05TXzExY2hhcl90cmFpdHNJRHNFRU5TXzlhbGxvY2F0b3JJRHNFRUVFAAAAYGEAAPgnAAAAAAAAAQAAAMgMAAAAAAAATlN0M19fMjEyYmFzaWNfc3RyaW5nSURpTlNfMTFjaGFyX3RyYWl0c0lEaUVFTlNfOWFsbG9jYXRvcklEaUVFRUUAAABgYQAAVCgAAAAAAAABAAAAyAwAAAAAAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0ljRUUAANxgAACwKAAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJYUVFAADcYAAA2CgAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWhFRQAA3GAAAAApAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lzRUUAANxgAAAoKQAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJdEVFAADcYAAAUCkAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWlFRQAA3GAAAHgpAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lqRUUAANxgAACgKQAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJbEVFAADcYAAAyCkAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SW1FRQAA3GAAAPApAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lmRUUAANxgAAAYKgAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJZEVFAADcYAAAQCoAALiYAAAtKyAgIDBYMHgAKG51bGwpAAAAABEACgAREREAAAAABQAAAAAAAAkAAAAACwAAAAAAAAAAEQAPChEREQMKBwABAAkLCwAACQYLAAALAAYRAAAAERERAEHR1QALIQsAAAAAAAAAABEACgoREREACgAAAgAJCwAAAAkACwAACwBBi9YACwEMAEGX1gALFQwAAAAADAAAAAAJDAAAAAAADAAADABBxdYACwEOAEHR1gALFQ0AAAAEDQAAAAAJDgAAAAAADgAADgBB/9YACwEQAEGL1wALHg8AAAAADwAAAAAJEAAAAAAAEAAAEAAAEgAAABISEgBBwtcACw4SAAAAEhISAAAAAAAACQBB89cACwELAEH/1wALFQoAAAAACgAAAAAJCwAAAAAACwAACwBBrdgACwEMAEG52AALSwwAAAAADAAAAAAJDAAAAAAADAAADAAAMDEyMzQ1Njc4OUFCQ0RFRi0wWCswWCAwWC0weCsweCAweABpbmYASU5GAG5hbgBOQU4ALgBBrNkACwE+AEHT2QALBf//////AEGg2gALlgL/////////////////////////////////////////////////////////////////AAECAwQFBgcICf////////8KCwwNDg8QERITFBUWFxgZGhscHR4fICEiI////////woLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIj/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wABAgQHAwYFAGluZmluaXR5AG5hbgBBwNwAC7IL0XSeAFedvSqAcFIP//8+JwoAAABkAAAA6AMAABAnAACghgEAQEIPAICWmAAA4fUFGAAAADUAAABxAAAAa////877//+Sv///AAAAAMgwAAA/AAAAQAAAAEEAAABCAAAAQwAAAEQAAABFAAAARgAAAEcAAABIAAAASQAAAEoAAABLAAAATAAAAAAAAAAEMQAATQAAAE4AAABPAAAAUAAAAFEAAABSAAAAUwAAAFQAAABVAAAAVgAAAFcAAABYAAAAWQAAAFoAAAAIAAAAAAAAADwxAABbAAAAXAAAAPj////4////PDEAAF0AAABeAAAAFC8AACgvAAAIAAAAAAAAAIQxAABfAAAAYAAAAPj////4////hDEAAGEAAABiAAAARC8AAFgvAAAEAAAAAAAAAMwxAABjAAAAZAAAAPz////8////zDEAAGUAAABmAAAAdC8AAIgvAAAEAAAAAAAAABQyAABnAAAAaAAAAPz////8////FDIAAGkAAABqAAAApC8AALgvAAAAAAAA/C8AAGsAAABsAAAAaW9zX2Jhc2U6OmNsZWFyAE5TdDNfXzI4aW9zX2Jhc2VFAAAA3GAAAOgvAAAAAAAAQDAAAG0AAABuAAAATlN0M19fMjliYXNpY19pb3NJY05TXzExY2hhcl90cmFpdHNJY0VFRUUAAAAEYQAAFDAAAPwvAAAAAAAAiDAAAG8AAABwAAAATlN0M19fMjliYXNpY19pb3NJd05TXzExY2hhcl90cmFpdHNJd0VFRUUAAAAEYQAAXDAAAPwvAABOU3QzX18yMTViYXNpY19zdHJlYW1idWZJY05TXzExY2hhcl90cmFpdHNJY0VFRUUAAAAA3GAAAJQwAABOU3QzX18yMTViYXNpY19zdHJlYW1idWZJd05TXzExY2hhcl90cmFpdHNJd0VFRUUAAAAA3GAAANAwAABOU3QzX18yMTNiYXNpY19pc3RyZWFtSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFAABgYQAADDEAAAAAAAABAAAAQDAAAAP0//9OU3QzX18yMTNiYXNpY19pc3RyZWFtSXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFAABgYQAAVDEAAAAAAAABAAAAiDAAAAP0//9OU3QzX18yMTNiYXNpY19vc3RyZWFtSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFAABgYQAAnDEAAAAAAAABAAAAQDAAAAP0//9OU3QzX18yMTNiYXNpY19vc3RyZWFtSXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFAABgYQAA5DEAAAAAAAABAAAAiDAAAAP0//8wmgAAwJoAAAAAAACMMgAAPwAAAHUAAAB2AAAAQgAAAEMAAABEAAAARQAAAEYAAABHAAAAdwAAAHgAAAB5AAAASwAAAEwAAABOU3QzX18yMTBfX3N0ZGluYnVmSWNFRQAEYQAAdDIAAMgwAAB1bnN1cHBvcnRlZCBsb2NhbGUgZm9yIHN0YW5kYXJkIGlucHV0AAAAAAAAABgzAABNAAAAegAAAHsAAABQAAAAUQAAAFIAAABTAAAAVAAAAFUAAAB8AAAAfQAAAH4AAABZAAAAWgAAAE5TdDNfXzIxMF9fc3RkaW5idWZJd0VFAARhAAAAMwAABDEAAAAAAACAMwAAPwAAAH8AAACAAAAAQgAAAEMAAABEAAAAgQAAAEYAAABHAAAASAAAAEkAAABKAAAAggAAAIMAAABOU3QzX18yMTFfX3N0ZG91dGJ1ZkljRUUAAAAABGEAAGQzAADIMAAAAAAAAOgzAABNAAAAhAAAAIUAAABQAAAAUQAAAFIAAACGAAAAVAAAAFUAAABWAAAAVwAAAFgAAACHAAAAiAAAAE5TdDNfXzIxMV9fc3Rkb3V0YnVmSXdFRQAAAAAEYQAAzDMAAAQxAEGA6AAL8wECAADAAwAAwAQAAMAFAADABgAAwAcAAMAIAADACQAAwAoAAMALAADADAAAwA0AAMAOAADADwAAwBAAAMARAADAEgAAwBMAAMAUAADAFQAAwBYAAMAXAADAGAAAwBkAAMAaAADAGwAAwBwAAMAdAADAHgAAwB8AAMAAAACzAQAAwwIAAMMDAADDBAAAwwUAAMMGAADDBwAAwwgAAMMJAADDCgAAwwsAAMMMAADDDQAA0w4AAMMPAADDAAAMuwEADMMCAAzDAwAMwwQADNMAAAAA3hIElQAAAAD////////////////QNAAAFAAAAEMuVVRGLTgAQZjqAAsC5DQAQbDqAAsGTENfQUxMAEHA6gALbkxDX0NUWVBFAAAAAExDX05VTUVSSUMAAExDX1RJTUUAAAAAAExDX0NPTExBVEUAAExDX01PTkVUQVJZAExDX01FU1NBR0VTAExBTkcAQy5VVEYtOABQT1NJWABNVVNMX0xPQ1BBVEgAAAAAALA2AEGw7QAL/wECAAIAAgACAAIAAgACAAIAAgADIAIgAiACIAIgAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAWAEwATABMAEwATABMAEwATABMAEwATABMAEwATABMAI2AjYCNgI2AjYCNgI2AjYCNgI2ATABMAEwATABMAEwATACNUI1QjVCNUI1QjVCMUIxQjFCMUIxQjFCMUIxQjFCMUIxQjFCMUIxQjFCMUIxQjFCMUIxQTABMAEwATABMAEwAjWCNYI1gjWCNYI1gjGCMYIxgjGCMYIxgjGCMYIxgjGCMYIxgjGCMYIxgjGCMYIxgjGCMYEwATABMAEwAIAQbDxAAsCwDoAQcT1AAv5AwEAAAACAAAAAwAAAAQAAAAFAAAABgAAAAcAAAAIAAAACQAAAAoAAAALAAAADAAAAA0AAAAOAAAADwAAABAAAAARAAAAEgAAABMAAAAUAAAAFQAAABYAAAAXAAAAGAAAABkAAAAaAAAAGwAAABwAAAAdAAAAHgAAAB8AAAAgAAAAIQAAACIAAAAjAAAAJAAAACUAAAAmAAAAJwAAACgAAAApAAAAKgAAACsAAAAsAAAALQAAAC4AAAAvAAAAMAAAADEAAAAyAAAAMwAAADQAAAA1AAAANgAAADcAAAA4AAAAOQAAADoAAAA7AAAAPAAAAD0AAAA+AAAAPwAAAEAAAABBAAAAQgAAAEMAAABEAAAARQAAAEYAAABHAAAASAAAAEkAAABKAAAASwAAAEwAAABNAAAATgAAAE8AAABQAAAAUQAAAFIAAABTAAAAVAAAAFUAAABWAAAAVwAAAFgAAABZAAAAWgAAAFsAAABcAAAAXQAAAF4AAABfAAAAYAAAAEEAAABCAAAAQwAAAEQAAABFAAAARgAAAEcAAABIAAAASQAAAEoAAABLAAAATAAAAE0AAABOAAAATwAAAFAAAABRAAAAUgAAAFMAAABUAAAAVQAAAFYAAABXAAAAWAAAAFkAAABaAAAAewAAAHwAAAB9AAAAfgAAAH8AQcD9AAsC0EAAQdSBAQv5AwEAAAACAAAAAwAAAAQAAAAFAAAABgAAAAcAAAAIAAAACQAAAAoAAAALAAAADAAAAA0AAAAOAAAADwAAABAAAAARAAAAEgAAABMAAAAUAAAAFQAAABYAAAAXAAAAGAAAABkAAAAaAAAAGwAAABwAAAAdAAAAHgAAAB8AAAAgAAAAIQAAACIAAAAjAAAAJAAAACUAAAAmAAAAJwAAACgAAAApAAAAKgAAACsAAAAsAAAALQAAAC4AAAAvAAAAMAAAADEAAAAyAAAAMwAAADQAAAA1AAAANgAAADcAAAA4AAAAOQAAADoAAAA7AAAAPAAAAD0AAAA+AAAAPwAAAEAAAABhAAAAYgAAAGMAAABkAAAAZQAAAGYAAABnAAAAaAAAAGkAAABqAAAAawAAAGwAAABtAAAAbgAAAG8AAABwAAAAcQAAAHIAAABzAAAAdAAAAHUAAAB2AAAAdwAAAHgAAAB5AAAAegAAAFsAAABcAAAAXQAAAF4AAABfAAAAYAAAAGEAAABiAAAAYwAAAGQAAABlAAAAZgAAAGcAAABoAAAAaQAAAGoAAABrAAAAbAAAAG0AAABuAAAAbwAAAHAAAABxAAAAcgAAAHMAAAB0AAAAdQAAAHYAAAB3AAAAeAAAAHkAAAB6AAAAewAAAHwAAAB9AAAAfgAAAH8AQdCJAQvRATAxMjM0NTY3ODlhYmNkZWZBQkNERUZ4WCstcFBpSW5OACVwAGwAbGwAAEwAJQAAAAAAJXAAAAAAJUk6JU06JVMgJXAlSDolTQAAAAAAAAAAJQAAAG0AAAAvAAAAJQAAAGQAAAAvAAAAJQAAAHkAAAAlAAAAWQAAAC0AAAAlAAAAbQAAAC0AAAAlAAAAZAAAACUAAABJAAAAOgAAACUAAABNAAAAOgAAACUAAABTAAAAIAAAACUAAABwAAAAAAAAACUAAABIAAAAOgAAACUAAABNAEGwiwELvQQlAAAASAAAADoAAAAlAAAATQAAADoAAAAlAAAAUwAAACVMZgAwMTIzNDU2Nzg5ACUuMExmAEMAAAAAAABYSwAAnAAAAJ0AAACeAAAAAAAAALhLAACfAAAAoAAAAJ4AAAChAAAAogAAAKMAAACkAAAApQAAAKYAAACnAAAAqAAAAAAAAAAgSwAAqQAAAKoAAACeAAAAqwAAAKwAAACtAAAArgAAAK8AAACwAAAAsQAAAAAAAADwSwAAsgAAALMAAACeAAAAtAAAALUAAAC2AAAAtwAAALgAAAAAAAAAFEwAALkAAAC6AAAAngAAALsAAAC8AAAAvQAAAL4AAAC/AAAAdHJ1ZQAAAAB0AAAAcgAAAHUAAABlAAAAAAAAAGZhbHNlAAAAZgAAAGEAAABsAAAAcwAAAGUAAAAAAAAAJW0vJWQvJXkAAAAAJQAAAG0AAAAvAAAAJQAAAGQAAAAvAAAAJQAAAHkAAAAAAAAAJUg6JU06JVMAAAAAJQAAAEgAAAA6AAAAJQAAAE0AAAA6AAAAJQAAAFMAAAAAAAAAJWEgJWIgJWQgJUg6JU06JVMgJVkAAAAAJQAAAGEAAAAgAAAAJQAAAGIAAAAgAAAAJQAAAGQAAAAgAAAAJQAAAEgAAAA6AAAAJQAAAE0AAAA6AAAAJQAAAFMAAAAgAAAAJQAAAFkAAAAAAAAAJUk6JU06JVMgJXAAJQAAAEkAAAA6AAAAJQAAAE0AAAA6AAAAJQAAAFMAAAAgAAAAJQAAAHAAQfiPAQvWCiBIAADAAAAAwQAAAJ4AAABOU3QzX18yNmxvY2FsZTVmYWNldEUAAAAEYQAACEgAAExdAAAAAAAAoEgAAMAAAADCAAAAngAAAMMAAADEAAAAxQAAAMYAAADHAAAAyAAAAMkAAADKAAAAywAAAMwAAADNAAAAzgAAAE5TdDNfXzI1Y3R5cGVJd0VFAE5TdDNfXzIxMGN0eXBlX2Jhc2VFAADcYAAAgkgAAGBhAABwSAAAAAAAAAIAAAAgSAAAAgAAAJhIAAACAAAAAAAAADRJAADAAAAAzwAAAJ4AAADQAAAA0QAAANIAAADTAAAA1AAAANUAAADWAAAATlN0M19fMjdjb2RlY3Z0SWNjMTFfX21ic3RhdGVfdEVFAE5TdDNfXzIxMmNvZGVjdnRfYmFzZUUAAAAA3GAAABJJAABgYQAA8EgAAAAAAAACAAAAIEgAAAIAAAAsSQAAAgAAAAAAAACoSQAAwAAAANcAAACeAAAA2AAAANkAAADaAAAA2wAAANwAAADdAAAA3gAAAE5TdDNfXzI3Y29kZWN2dElEc2MxMV9fbWJzdGF0ZV90RUUAAGBhAACESQAAAAAAAAIAAAAgSAAAAgAAACxJAAACAAAAAAAAABxKAADAAAAA3wAAAJ4AAADgAAAA4QAAAOIAAADjAAAA5AAAAOUAAADmAAAATlN0M19fMjdjb2RlY3Z0SURpYzExX19tYnN0YXRlX3RFRQAAYGEAAPhJAAAAAAAAAgAAACBIAAACAAAALEkAAAIAAAAAAAAAkEoAAMAAAADnAAAAngAAAOAAAADhAAAA4gAAAOMAAADkAAAA5QAAAOYAAABOU3QzX18yMTZfX25hcnJvd190b191dGY4SUxtMzJFRUUAAAAEYQAAbEoAABxKAAAAAAAA8EoAAMAAAADoAAAAngAAAOAAAADhAAAA4gAAAOMAAADkAAAA5QAAAOYAAABOU3QzX18yMTdfX3dpZGVuX2Zyb21fdXRmOElMbTMyRUVFAAAEYQAAzEoAABxKAABOU3QzX18yN2NvZGVjdnRJd2MxMV9fbWJzdGF0ZV90RUUAAABgYQAA/EoAAAAAAAACAAAAIEgAAAIAAAAsSQAAAgAAAE5TdDNfXzI2bG9jYWxlNV9faW1wRQAAAARhAABASwAAIEgAAE5TdDNfXzI3Y29sbGF0ZUljRUUABGEAAGRLAAAgSAAATlN0M19fMjdjb2xsYXRlSXdFRQAEYQAAhEsAACBIAABOU3QzX18yNWN0eXBlSWNFRQAAAGBhAACkSwAAAAAAAAIAAAAgSAAAAgAAAJhIAAACAAAATlN0M19fMjhudW1wdW5jdEljRUUAAAAABGEAANhLAAAgSAAATlN0M19fMjhudW1wdW5jdEl3RUUAAAAABGEAAPxLAAAgSAAAAAAAAHhLAADpAAAA6gAAAJ4AAADrAAAA7AAAAO0AAAAAAAAAmEsAAO4AAADvAAAAngAAAPAAAADxAAAA8gAAAAAAAAA0TQAAwAAAAPMAAACeAAAA9AAAAPUAAAD2AAAA9wAAAPgAAAD5AAAA+gAAAPsAAAD8AAAA/QAAAP4AAABOU3QzX18yN251bV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUVFAE5TdDNfXzI5X19udW1fZ2V0SWNFRQBOU3QzX18yMTRfX251bV9nZXRfYmFzZUUAANxgAAD6TAAAYGEAAORMAAAAAAAAAQAAABRNAAAAAAAAYGEAAKBMAAAAAAAAAgAAACBIAAACAAAAHE0AQdiaAQvKAQhOAADAAAAA/wAAAJ4AAAAAAQAAAQEAAAIBAAADAQAABAEAAAUBAAAGAQAABwEAAAgBAAAJAQAACgEAAE5TdDNfXzI3bnVtX2dldEl3TlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRUUATlN0M19fMjlfX251bV9nZXRJd0VFAAAAYGEAANhNAAAAAAAAAQAAABRNAAAAAAAAYGEAAJRNAAAAAAAAAgAAACBIAAACAAAA8E0AQaycAQveAfBOAADAAAAACwEAAJ4AAAAMAQAADQEAAA4BAAAPAQAAEAEAABEBAAASAQAAEwEAAE5TdDNfXzI3bnVtX3B1dEljTlNfMTlvc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRUUATlN0M19fMjlfX251bV9wdXRJY0VFAE5TdDNfXzIxNF9fbnVtX3B1dF9iYXNlRQAA3GAAALZOAABgYQAAoE4AAAAAAAABAAAA0E4AAAAAAABgYQAAXE4AAAAAAAACAAAAIEgAAAIAAADYTgBBlJ4BC74BuE8AAMAAAAAUAQAAngAAABUBAAAWAQAAFwEAABgBAAAZAQAAGgEAABsBAAAcAQAATlN0M19fMjdudW1fcHV0SXdOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFRQBOU3QzX18yOV9fbnVtX3B1dEl3RUUAAABgYQAAiE8AAAAAAAABAAAA0E4AAAAAAABgYQAARE8AAAAAAAACAAAAIEgAAAIAAACgTwBB3J8BC5oLuFAAAB0BAAAeAQAAngAAAB8BAAAgAQAAIQEAACIBAAAjAQAAJAEAACUBAAD4////uFAAACYBAAAnAQAAKAEAACkBAAAqAQAAKwEAACwBAABOU3QzX18yOHRpbWVfZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFRQBOU3QzX18yOXRpbWVfYmFzZUUA3GAAAHFQAABOU3QzX18yMjBfX3RpbWVfZ2V0X2Nfc3RvcmFnZUljRUUAAADcYAAAjFAAAGBhAAAsUAAAAAAAAAMAAAAgSAAAAgAAAIRQAAACAAAAsFAAAAAIAAAAAAAApFEAAC0BAAAuAQAAngAAAC8BAAAwAQAAMQEAADIBAAAzAQAANAEAADUBAAD4////pFEAADYBAAA3AQAAOAEAADkBAAA6AQAAOwEAADwBAABOU3QzX18yOHRpbWVfZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFRQBOU3QzX18yMjBfX3RpbWVfZ2V0X2Nfc3RvcmFnZUl3RUUAANxgAAB5UQAAYGEAADRRAAAAAAAAAwAAACBIAAACAAAAhFAAAAIAAACcUQAAAAgAAAAAAABIUgAAPQEAAD4BAACeAAAAPwEAAE5TdDNfXzI4dGltZV9wdXRJY05TXzE5b3N0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUVFAE5TdDNfXzIxMF9fdGltZV9wdXRFAAAA3GAAAClSAABgYQAA5FEAAAAAAAACAAAAIEgAAAIAAABAUgAAAAgAAAAAAADIUgAAQAEAAEEBAACeAAAAQgEAAE5TdDNfXzI4dGltZV9wdXRJd05TXzE5b3N0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUVFAAAAAGBhAACAUgAAAAAAAAIAAAAgSAAAAgAAAEBSAAAACAAAAAAAAFxTAADAAAAAQwEAAJ4AAABEAQAARQEAAEYBAABHAQAASAEAAEkBAABKAQAASwEAAEwBAABOU3QzX18yMTBtb25leXB1bmN0SWNMYjBFRUUATlN0M19fMjEwbW9uZXlfYmFzZUUAAAAA3GAAADxTAABgYQAAIFMAAAAAAAACAAAAIEgAAAIAAABUUwAAAgAAAAAAAADQUwAAwAAAAE0BAACeAAAATgEAAE8BAABQAQAAUQEAAFIBAABTAQAAVAEAAFUBAABWAQAATlN0M19fMjEwbW9uZXlwdW5jdEljTGIxRUVFAGBhAAC0UwAAAAAAAAIAAAAgSAAAAgAAAFRTAAACAAAAAAAAAERUAADAAAAAVwEAAJ4AAABYAQAAWQEAAFoBAABbAQAAXAEAAF0BAABeAQAAXwEAAGABAABOU3QzX18yMTBtb25leXB1bmN0SXdMYjBFRUUAYGEAAChUAAAAAAAAAgAAACBIAAACAAAAVFMAAAIAAAAAAAAAuFQAAMAAAABhAQAAngAAAGIBAABjAQAAZAEAAGUBAABmAQAAZwEAAGgBAABpAQAAagEAAE5TdDNfXzIxMG1vbmV5cHVuY3RJd0xiMUVFRQBgYQAAnFQAAAAAAAACAAAAIEgAAAIAAABUUwAAAgAAAAAAAABcVQAAwAAAAGsBAACeAAAAbAEAAG0BAABOU3QzX18yOW1vbmV5X2dldEljTlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRUUATlN0M19fMjExX19tb25leV9nZXRJY0VFAADcYAAAOlUAAGBhAAD0VAAAAAAAAAIAAAAgSAAAAgAAAFRVAEGBqwELmQFWAADAAAAAbgEAAJ4AAABvAQAAcAEAAE5TdDNfXzI5bW9uZXlfZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFRQBOU3QzX18yMTFfX21vbmV5X2dldEl3RUUAANxgAADeVQAAYGEAAJhVAAAAAAAAAgAAACBIAAACAAAA+FUAQaSsAQuaAaRWAADAAAAAcQEAAJ4AAAByAQAAcwEAAE5TdDNfXzI5bW9uZXlfcHV0SWNOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFRQBOU3QzX18yMTFfX21vbmV5X3B1dEljRUUAANxgAACCVgAAYGEAADxWAAAAAAAAAgAAACBIAAACAAAAnFYAQcitAQuaAUhXAADAAAAAdAEAAJ4AAAB1AQAAdgEAAE5TdDNfXzI5bW9uZXlfcHV0SXdOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFRQBOU3QzX18yMTFfX21vbmV5X3B1dEl3RUUAANxgAAAmVwAAYGEAAOBWAAAAAAAAAgAAACBIAAACAAAAQFcAQeyuAQviFMBXAADAAAAAdwEAAJ4AAAB4AQAAeQEAAHoBAABOU3QzX18yOG1lc3NhZ2VzSWNFRQBOU3QzX18yMTNtZXNz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QdC0AgsScQAAAAAAAAA7AAAA+LkAAAAEAEH8tAILBP////8AQcC1AgsBBQBBzLUCCwFyAEHktQILDjoAAABzAAAACL4AAAAEAEH8tQILAQEAQYu2AgsFCv////8AQdC2AgsCwJoA+6QGBG5hbWUB8qQGvgYAHF9lbWJpbmRfcmVnaXN0ZXJfbWVtb3J5X3ZpZXcBH19lbWJpbmRfcmVnaXN0ZXJfY2xhc3NfZnVuY3Rpb24CGF9lbWJpbmRfcmVnaXN0ZXJfaW50ZWdlcgMfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19wcm9wZXJ0eQQWX2VtYmluZF9yZWdpc3Rlcl9jbGFzcwUFYWJvcnQGHF9lbWJpbmRfcmVnaXN0ZXJfc3RkX3dzdHJpbmcHGV9lbWJpbmRfcmVnaXN0ZXJfZnVuY3Rpb24IIl9lbWJpbmRfcmVnaXN0ZXJfY2xhc3NfY29uc3RydWN0b3IJEV9lbXZhbF90YWtlX3ZhbHVlChtfZW1iaW5kX3JlZ2lzdGVyX3N0ZF9zdHJpbmcLFl9lbWJpbmRfcmVnaXN0ZXJfZmxvYXQMD19fd2FzaV9mZF93cml0ZQ0LX19jeGFfdGhyb3cOGF9fY3hhX2FsbG9jYXRlX2V4Y2VwdGlvbg8Kc3RyZnRpbWVfbBALc2V0VGVtcFJldDARGmxlZ2FsaW1wb3J0JF9fd2FzaV9mZF9zZWVrEgRleGl0ExZlbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwFBVlbXNjcmlwdGVuX21lbWNweV9iaWcVDV9lbXZhbF9pbmNyZWYWDV9lbXZhbF9kZWNyZWYXFV9lbWJpbmRfcmVnaXN0ZXJfdm9pZBgWX2VtYmluZF9yZWdpc3Rlcl9lbXZhbBkVX2VtYmluZF9yZWdpc3Rlcl9ib29sGg5fX3dhc2lfZmRfcmVhZBsPX193YXNpX2ZkX2Nsb3NlHBhfX3dhc2lfZW52aXJvbl9zaXplc19nZXQdEl9fd2FzaV9lbnZpcm9uX2dldB4LX19zeXNjYWxsOTEfCl9fbWFwX2ZpbGUgDV9fYXNzZXJ0X2ZhaWwhBmRsZnJlZSIbb3BlcmF0b3IgbmV3KHVuc2lnbmVkIGxvbmcpI2ZzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+Ojp+YmFzaWNfc3RyaW5nKCkkBm1lbWNweSVsc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPjo6cmVzaXplKHVuc2lnbmVkIGxvbmcpJmVzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+OjpiYXNpY19zdHJpbmcoKScgX0FTU0VSVF9GQUlMRUQoY2hhciBjb25zdCosIC4uLikoBnN0cmxlbil5c3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4gPjo6b3BlcmF0b3I9KHdjaGFyX3QgY29uc3QqKSptc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPjo6b3BlcmF0b3I9KGNoYXIgY29uc3QqKSsIX19zaGdldGMsEnN0ZDo6X18yOjpfX2Nsb2MoKS2pAVBhcmFtZXRlck1hbmFnZXI8ZmxvYXQ+OjpBZGRQYXJhbWV0ZXJNYXBwaW5nKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gY29uc3QmLCBzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgZmxvYXQ+KikuCF9fbXVsdGYzLyVzdGQ6Ol9fMjo6Y29sbGF0ZTxjaGFyPjo6fmNvbGxhdGUoKS4xMAhzaXByaW50ZjEdc3RkOjpfXzI6OmxvY2FsZTo6aWQ6Ol9fZ2V0KCkyK3N0ZDo6X18yOjpfX3Rocm93X2xlbmd0aF9lcnJvcihjaGFyIGNvbnN0KikzzAFzdGQ6Ol9fMjo6dW5pcXVlX3B0cjx1bnNpZ25lZCBjaGFyLCB2b2lkICgqKSh2b2lkKik+Ojp1bmlxdWVfcHRyPHRydWUsIHZvaWQ+KHVuc2lnbmVkIGNoYXIqLCBzdGQ6Ol9fMjo6X19kZXBlbmRlbnRfdHlwZTxzdGQ6Ol9fMjo6X191bmlxdWVfcHRyX2RlbGV0ZXJfc2ZpbmFlPHZvaWQgKCopKHZvaWQqKT4sIHRydWU+OjpfX2dvb2RfcnZhbF9yZWZfdHlwZSk0QHN0ZDo6X18yOjpsb2NhbGU6Ol9faW1wOjppbnN0YWxsKHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgbG9uZyk1CGRsbWFsbG9jNlRzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPjo6b3BlcmF0b3IqKCkgY29uc3Q3QnN0ZDo6X18yOjpfX3ZlY3Rvcl9iYXNlX2NvbW1vbjx0cnVlPjo6X190aHJvd19sZW5ndGhfZXJyb3IoKSBjb25zdDgTX19jeGFfZ3VhcmRfcmVsZWFzZTkTX19jeGFfZ3VhcmRfYWNxdWlyZTpVc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID46Om9wZXJhdG9yKysoKTtPc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID46Om9wZXJhdG9yKysoKTwmc3RkOjpfXzI6Ol9fdGhyb3dfZmFpbHVyZShjaGFyIGNvbnN0Kik9Bm1lbXNldD48aXNfZXF1YWwoc3RkOjp0eXBlX2luZm8gY29uc3QqLCBzdGQ6OnR5cGVfaW5mbyBjb25zdCosIGJvb2wpP+MBYm9vbCBzdGQ6Ol9fMjo6b3BlcmF0b3I9PTx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPihzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiBjb25zdCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+IGNvbnN0JilA0QFib29sIHN0ZDo6X18yOjpvcGVyYXRvcj09PGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+IGNvbnN0Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gY29uc3QmKUEDb3V0QrkBc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPjo6b3BlcmF0b3I9KHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4mJilDV3N0ZDo6X18yOjpfX2xpYmNwcF9zbnByaW50Zl9sKGNoYXIqLCB1bnNpZ25lZCBsb25nLCBfX2xvY2FsZV9zdHJ1Y3QqLCBjaGFyIGNvbnN0KiwgLi4uKUSlAXN0ZDo6X18yOjpfX2NoZWNrX2dyb3VwaW5nKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gY29uc3QmLCB1bnNpZ25lZCBpbnQqLCB1bnNpZ25lZCBpbnQqLCB1bnNpZ25lZCBpbnQmKUXjAWJvb2wgc3RkOjpfXzI6Om9wZXJhdG9yIT08d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gY29uc3QmLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiBjb25zdCYpRtEBYm9vbCBzdGQ6Ol9fMjo6b3BlcmF0b3IhPTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPihzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiBjb25zdCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+IGNvbnN0JilHCV9fYXNobHRpM0hnc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+IGNvbnN0JiBzdGQ6Ol9fMjo6dXNlX2ZhY2V0PHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90PiA+KHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKUlDc3RkOjpfXzI6Ol9fYmFzaWNfc3RyaW5nX2NvbW1vbjx0cnVlPjo6X190aHJvd19sZW5ndGhfZXJyb3IoKSBjb25zdEoDcGFkS2FzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4gY29uc3QmIHN0ZDo6X18yOjp1c2VfZmFjZXQ8c3RkOjpfXzI6OmN0eXBlPGNoYXI+ID4oc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYpTAhfX2FkZHRmM02IAVBhcmFtZXRlck1hbmFnZXI8ZmxvYXQ+OjpBZGRQYXJhbWV0ZXJHcm91cChzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+IGNvbnN0JilOXnN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID46OmJlZ2luKClPwQFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+OjpiYXNpY19zdHJpbmcoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiBjb25zdCYpUEVzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+OjpzeW5jKClRVXN0ZDo6X18yOjpfX251bV9wdXRfYmFzZTo6X19pZGVudGlmeV9wYWRkaW5nKGNoYXIqLCBjaGFyKiwgc3RkOjpfXzI6Omlvc19iYXNlIGNvbnN0JilSC19fZmxvYXRzaXRmU3lzdGQ6Ol9fMjo6ZGVxdWU8dHJpcGxlPGludCBjb25zdCosIGludCwgaW50Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx0cmlwbGU8aW50IGNvbnN0KiwgaW50LCBpbnQ+ID4gPjo6X19hZGRfYmFja19jYXBhY2l0eSgpVDZzdGQ6Ol9fMjo6bW9uZXlwdW5jdDxjaGFyLCBmYWxzZT46OmRvX2dyb3VwaW5nKCkgY29uc3RVB19fc2hsaW1WDl9fZHluYW1pY19jYXN0VxlGYXN0X0xvZ0V4cFBsdXNPbmUoZmxvYXQpWBdFcnJvcihjaGFyIGNvbnN0KiwgLi4uKVlJc3RkOjpfXzI6Ol9fbGliY3BwX2xvY2FsZV9ndWFyZDo6X19saWJjcHBfbG9jYWxlX2d1YXJkKF9fbG9jYWxlX3N0cnVjdComKVoIX19tdWx0aTNbOHN0ZDo6X18yOjpsb2NhbGU6OnVzZV9mYWNldChzdGQ6Ol9fMjo6bG9jYWxlOjppZCYpIGNvbnN0XERzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj46OmNvcHkoY2hhciosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBsb25nKV3LAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+ID46Om9wZXJhdG9yPShzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90PiA+JiYpXjlzdGQ6Ol9fMjo6X19udW1fZ2V0X2Jhc2U6Ol9fZ2V0X2Jhc2Uoc3RkOjpfXzI6Omlvc19iYXNlJilfSXN0ZDo6X18yOjpfX2xpYmNwcF9hc3ByaW50Zl9sKGNoYXIqKiwgX19sb2NhbGVfc3RydWN0KiwgY2hhciBjb25zdCosIC4uLilgvQJpbnQgc3RkOjpfXzI6Ol9fZ2V0X3VwX3RvX25fZGlnaXRzPHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+ID4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+IGNvbnN0JiwgaW50KWGlAmludCBzdGQ6Ol9fMjo6X19nZXRfdXBfdG9fbl9kaWdpdHM8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPihzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4gY29uc3QmLCBpbnQpYgZmd3JpdGVjDV9fZXh0ZW5kZGZ0ZjJkywJzdGQ6Ol9fMjo6dGltZV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPjo6Z2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qLCB3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCopIGNvbnN0ZbACc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46OmdldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHRtKiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqKSBjb25zdGajAnN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+IHN0ZDo6X18yOjpfX3BhZF9hbmRfb3V0cHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCB3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqLCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB3Y2hhcl90KWeFAnN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+IHN0ZDo6X18yOjpfX3BhZF9hbmRfb3V0cHV0PGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyKWhNc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Ojpjb3B5KHdjaGFyX3QqLCB3Y2hhcl90IGNvbnN0KiwgdW5zaWduZWQgbG9uZylpB21lbW1vdmVqBWR1bW15awZzdHJjbXBsW3N0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+ID46Ol9fYXBwZW5kKHVuc2lnbmVkIGxvbmcsIGZsb2F0IGNvbnN0JiltOHN0ZDo6X18yOjptb25leXB1bmN0PGNoYXIsIGZhbHNlPjo6ZG9fcG9zX2Zvcm1hdCgpIGNvbnN0bmVzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90PiA+OjplbmQoKW9cc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPjo6ZW5kKClwTnN0ZDo6X18yOjpfX251bV9wdXRfYmFzZTo6X19mb3JtYXRfaW50KGNoYXIqLCBjaGFyIGNvbnN0KiwgYm9vbCwgdW5zaWduZWQgaW50KXEHd2NydG9tYnIrdm9pZCBzdGQ6Ol9fMjo6cmV2ZXJzZTxjaGFyKj4oY2hhciosIGNoYXIqKXOAAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID46OmJhc2ljX3N0cmluZzxzdGQ6Om51bGxwdHJfdD4oY2hhciBjb25zdCopdARzYnJrdQdfX2xldGYydoYBdm9pZCBzdGQ6Ol9fMjo6X19kb3VibGVfb3Jfbm90aGluZzx1bnNpZ25lZCBpbnQ+KHN0ZDo6X18yOjp1bmlxdWVfcHRyPHVuc2lnbmVkIGludCwgdm9pZCAoKikodm9pZCopPiYsIHVuc2lnbmVkIGludComLCB1bnNpZ25lZCBpbnQqJil3VXN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPjo6X19hcHBlbmQodW5zaWduZWQgbG9uZywgaW50IGNvbnN0Jil4SXN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPjo6X19hcHBlbmQodW5zaWduZWQgbG9uZyl5bXN0ZDo6X18yOjpudW1wdW5jdDx3Y2hhcl90PiBjb25zdCYgc3RkOjpfXzI6OnVzZV9mYWNldDxzdGQ6Ol9fMjo6bnVtcHVuY3Q8d2NoYXJfdD4gPihzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0Jil6Z3N0ZDo6X18yOjpudW1wdW5jdDxjaGFyPiBjb25zdCYgc3RkOjpfXzI6OnVzZV9mYWNldDxzdGQ6Ol9fMjo6bnVtcHVuY3Q8Y2hhcj4gPihzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0Jil7jAFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90PiA+OjpiYXNpY19zdHJpbmc8c3RkOjpudWxscHRyX3Q+KHdjaGFyX3QgY29uc3QqKXzxAXN0ZDo6X18yOjpfX251bV9nZXQ8d2NoYXJfdD46Ol9fc3RhZ2UyX2ludF9sb29wKHdjaGFyX3QsIGludCwgY2hhciosIGNoYXIqJiwgdW5zaWduZWQgaW50Jiwgd2NoYXJfdCwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiBjb25zdCYsIHVuc2lnbmVkIGludCosIHVuc2lnbmVkIGludComLCB3Y2hhcl90IGNvbnN0Kil95QFzdGQ6Ol9fMjo6X19udW1fZ2V0PGNoYXI+OjpfX3N0YWdlMl9pbnRfbG9vcChjaGFyLCBpbnQsIGNoYXIqLCBjaGFyKiYsIHVuc2lnbmVkIGludCYsIGNoYXIsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gY29uc3QmLCB1bnNpZ25lZCBpbnQqLCB1bnNpZ25lZCBpbnQqJiwgY2hhciBjb25zdCopfgVmbXRfdX8JX19sc2hydGkzgAENX19mbG9hdHVuc2l0ZoEBRXN0ZDo6X18yOjpiYXNpY19pb3M8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID46On5iYXNpY19pb3MoKYIBQnN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD46OmFsbG9jYXRlKHVuc2lnbmVkIGxvbmcsIHZvaWQgY29uc3QqKYMBP3N0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj46OmFsbG9jYXRlKHVuc2lnbmVkIGxvbmcsIHZvaWQgY29uc3QqKYQBTnN0ZDo6X18yOjpfX251bV9nZXQ8d2NoYXJfdD46Ol9fc3RhZ2UyX2ludF9wcmVwKHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QmKYUBTXN0ZDo6X18yOjpfX251bV9nZXQ8d2NoYXJfdD46Ol9fZG9fd2lkZW4oc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCopIGNvbnN0hgFIc3RkOjpfXzI6Ol9fbnVtX2dldDxjaGFyPjo6X19zdGFnZTJfaW50X3ByZXAoc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciYphwEJdnNucHJpbnRmiAE0dm9pZCBzdGQ6Ol9fMjo6cmV2ZXJzZTx3Y2hhcl90Kj4od2NoYXJfdCosIHdjaGFyX3QqKYkBBnVuZ2V0Y4oBPnN0ZDo6X18yOjptb25leXB1bmN0PHdjaGFyX3QsIGZhbHNlPjo6ZG9fZGVjaW1hbF9wb2ludCgpIGNvbnN0iwE7c3RkOjpfXzI6Om1vbmV5cHVuY3Q8Y2hhciwgZmFsc2U+Ojpkb19kZWNpbWFsX3BvaW50KCkgY29uc3SMAbUBc3RkOjpfXzI6OmVuYWJsZV9pZjwoaXNfbW92ZV9jb25zdHJ1Y3RpYmxlPHVuc2lnbmVkIGludD46OnZhbHVlKSAmJiAoaXNfbW92ZV9hc3NpZ25hYmxlPHVuc2lnbmVkIGludD46OnZhbHVlKSwgdm9pZD46OnR5cGUgc3RkOjpfXzI6OnN3YXA8dW5zaWduZWQgaW50Pih1bnNpZ25lZCBpbnQmLCB1bnNpZ25lZCBpbnQmKY0B4AVzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90PiA+IGNvbnN0KiBzdGQ6Ol9fMjo6X19zY2FuX2tleXdvcmQ8c3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+ID4gY29uc3QqLCBzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD4gPihzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90PiA+IGNvbnN0Kiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4gPiBjb25zdCosIHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90PiBjb25zdCYsIHVuc2lnbmVkIGludCYsIGJvb2wpjgFyc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4gPjo6cHVzaF9iYWNrKHdjaGFyX3QpjwGkBXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gY29uc3QqIHN0ZDo6X18yOjpfX3NjYW5fa2V5d29yZDxzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiBjb25zdCosIHN0ZDo6X18yOjpjdHlwZTxjaGFyPiA+KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gY29uc3QqLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+IGNvbnN0Kiwgc3RkOjpfXzI6OmN0eXBlPGNoYXI+IGNvbnN0JiwgdW5zaWduZWQgaW50JiwgYm9vbCmQAWZzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+OjpwdXNoX2JhY2soY2hhcimRAWpzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+OjphcHBlbmQoY2hhciBjb25zdCopkgFNc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPjo6cGJhY2tmYWlsKGludCmTAV1zdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+OjppbWJ1ZShzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JimUAU9zdGQ6Ol9fMjo6YmFzaWNfb3N0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPjo6fmJhc2ljX29zdHJlYW0oKS4xlQFPc3RkOjpfXzI6OmJhc2ljX2lzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID46On5iYXNpY19pc3RyZWFtKCkuMZYBfXN0ZDo6X18yOjpiYXNpY19pb3M8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID46OmluaXQoc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPioplwGyA3N0ZDo6X18yOjpfX3RyZWU8c3RkOjpfXzI6Ol9fdmFsdWVfdHlwZTxzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgZmxvYXQ+KiwgaW50Piwgc3RkOjpfXzI6Ol9fbWFwX3ZhbHVlX2NvbXBhcmU8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIGZsb2F0PiosIHN0ZDo6X18yOjpfX3ZhbHVlX3R5cGU8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIGZsb2F0PiosIGludD4sIHN0ZDo6X18yOjpsZXNzPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCBmbG9hdD4qPiwgdHJ1ZT4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6Ol9fdmFsdWVfdHlwZTxzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgZmxvYXQ+KiwgaW50PiA+ID46OmRlc3Ryb3koc3RkOjpfXzI6Ol9fdHJlZV9ub2RlPHN0ZDo6X18yOjpfX3ZhbHVlX3R5cGU8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIGZsb2F0PiosIGludD4sIHZvaWQqPiopmAGDBnN0ZDo6X18yOjpfX3RyZWU8c3RkOjpfXzI6Ol9fdmFsdWVfdHlwZTxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+LCBpbnQ+LCBzdGQ6Ol9fMjo6X19tYXBfdmFsdWVfY29tcGFyZTxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+LCBzdGQ6Ol9fMjo6X192YWx1ZV90eXBlPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4sIGludD4sIHN0ZDo6X18yOjpsZXNzPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gPiwgdHJ1ZT4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6Ol9fdmFsdWVfdHlwZTxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+LCBpbnQ+ID4gPjo6ZGVzdHJveShzdGQ6Ol9fMjo6X190cmVlX25vZGU8c3RkOjpfXzI6Ol9fdmFsdWVfdHlwZTxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+LCBpbnQ+LCB2b2lkKj4qKZkBnQFzdGQ6Ol9fMjo6X19zcGxpdF9idWZmZXI8dHJpcGxlPGludCBjb25zdCosIGludCwgaW50PiosIHN0ZDo6X18yOjphbGxvY2F0b3I8dHJpcGxlPGludCBjb25zdCosIGludCwgaW50Pio+ID46OnB1c2hfYmFjayh0cmlwbGU8aW50IGNvbnN0KiwgaW50LCBpbnQ+KiBjb25zdCYpmgGRAXN0ZDo6X18yOjpfX3NwbGl0X2J1ZmZlcjxzdGQ6Ol9fMjo6cGFpcjxpbnQsIGludD4qLCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjpwYWlyPGludCwgaW50Pio+ID46OnB1c2hfYmFjayhzdGQ6Ol9fMjo6cGFpcjxpbnQsIGludD4qIGNvbnN0JimbAUpzdGQ6Ol9fMjo6X19udW1fcHV0X2Jhc2U6Ol9fZm9ybWF0X2Zsb2F0KGNoYXIqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgaW50KZwBgQFzdGQ6Ol9fMjo6X19udW1fcHV0PHdjaGFyX3Q+OjpfX3dpZGVuX2FuZF9ncm91cF9pbnQoY2hhciosIGNoYXIqLCBjaGFyKiwgd2NoYXJfdCosIHdjaGFyX3QqJiwgd2NoYXJfdComLCBzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JimdAXVzdGQ6Ol9fMjo6X19udW1fcHV0PGNoYXI+OjpfX3dpZGVuX2FuZF9ncm91cF9pbnQoY2hhciosIGNoYXIqLCBjaGFyKiwgY2hhciosIGNoYXIqJiwgY2hhciomLCBzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JimeAQZtZW1jbXCfAQdtYnJ0b3djoAEGZ2V0ZW52oQEEZ2V0Y6IBTWVtc2NyaXB0ZW46OmludGVybmFsOjpJbnZva2VyPEZ1bGxFdmFsUmVzdWx0Kj46Omludm9rZShGdWxsRXZhbFJlc3VsdCogKCopKCkpowEJZGxyZWFsbG9jpAGOAWNoYXIqIHN0ZDo6X18yOjpjb3B5PHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyIGNvbnN0Kj4sIGNoYXIqPihzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8Y2hhciBjb25zdCo+LCBzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8Y2hhciBjb25zdCo+LCBjaGFyKimlAQxfX3RydW5jdGZkZjKmAXRfX2N4eGFiaXYxOjpfX2Jhc2VfY2xhc3NfdHlwZV9pbmZvOjpzZWFyY2hfYmVsb3dfZHN0KF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkIGNvbnN0KiwgaW50LCBib29sKSBjb25zdKcBZndjaGFyX3QgY29uc3QqIHN0ZDo6X18yOjpmaW5kPHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90Pih3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QmKagBSnZvaWQgZW1zY3JpcHRlbjo6aW50ZXJuYWw6OnJhd19kZXN0cnVjdG9yPEZ1bGxFdmFsUmVzdWx0PihGdWxsRXZhbFJlc3VsdCopqQEIdmZwcmludGaqAQhzdHJ0b3guMasBCnN0cnRvdWxsX2ysASBzdGQ6OmxvZ2ljX2Vycm9yOjp+bG9naWNfZXJyb3IoKa0BTXN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+ID46Ol9fYXBwZW5kKHVuc2lnbmVkIGxvbmcprgFrc3RkOjpfXzI6OnRpbWVfcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46On50aW1lX3B1dCgpLjGvARpzdGQ6Ol9fMjo6bG9jYWxlOjpsb2NhbGUoKbABH3N0ZDo6X18yOjppb3NfYmFzZTo6fmlvc19iYXNlKCmxASpzdGQ6Ol9fMjo6aW9zX2Jhc2U6OnNldHN0YXRlKHVuc2lnbmVkIGludCmyAZEBc3RkOjpfXzI6OmNvZGVjdnQ8d2NoYXJfdCwgY2hhciwgX19tYnN0YXRlX3Q+IGNvbnN0JiBzdGQ6Ol9fMjo6dXNlX2ZhY2V0PHN0ZDo6X18yOjpjb2RlY3Z0PHdjaGFyX3QsIGNoYXIsIF9fbWJzdGF0ZV90PiA+KHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKbMBiwFzdGQ6Ol9fMjo6Y29kZWN2dDxjaGFyLCBjaGFyLCBfX21ic3RhdGVfdD4gY29uc3QmIHN0ZDo6X18yOjp1c2VfZmFjZXQ8c3RkOjpfXzI6OmNvZGVjdnQ8Y2hhciwgY2hhciwgX19tYnN0YXRlX3Q+ID4oc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYptAFgc3RkOjpfXzI6OmNvZGVjdnQ8Y2hhciwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb191bnNoaWZ0KF9fbWJzdGF0ZV90JiwgY2hhciosIGNoYXIqLCBjaGFyKiYpIGNvbnN0tQE/c3RkOjpfXzI6OmNvZGVjdnQ8Y2hhciwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19lbmNvZGluZygpIGNvbnN0tgF5c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPjo6YXBwZW5kKGNoYXIgY29uc3QqLCB1bnNpZ25lZCBsb25nKbcBeXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID46Ol9faW5pdChjaGFyIGNvbnN0KiwgdW5zaWduZWQgbG9uZym4AboBc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPjo6X19ncm93X2J5KHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcpuQFXc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1Zjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPjo6fmJhc2ljX3N0cmVhbWJ1ZigpugFRc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPjo6fmJhc2ljX3N0cmVhbWJ1ZigpuwFKc3RkOjpfXzI6OmJhc2ljX29zdHJlYW08d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID46OmZsdXNoKCm8AZYBc3RkOjpfXzI6OmJhc2ljX29zdHJlYW08d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID46OmJhc2ljX29zdHJlYW0oc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1Zjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiopvQFPc3RkOjpfXzI6OmJhc2ljX29zdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID46On5iYXNpY19vc3RyZWFtKCkuMr4BRHN0ZDo6X18yOjpiYXNpY19vc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+OjpmbHVzaCgpvwGKAXN0ZDo6X18yOjpiYXNpY19vc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+OjpiYXNpY19vc3RyZWFtKHN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4qKcABT3N0ZDo6X18yOjpiYXNpY19pc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+Ojp+YmFzaWNfaXN0cmVhbSgpLjLBAWRzdGQ6Ol9fMjo6X19udW1fZ2V0PHdjaGFyX3Q+OjpfX3N0YWdlMl9mbG9hdF9wcmVwKHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QqLCB3Y2hhcl90Jiwgd2NoYXJfdCYpwgH/AXN0ZDo6X18yOjpfX251bV9nZXQ8d2NoYXJfdD46Ol9fc3RhZ2UyX2Zsb2F0X2xvb3Aod2NoYXJfdCwgYm9vbCYsIGNoYXImLCBjaGFyKiwgY2hhciomLCB3Y2hhcl90LCB3Y2hhcl90LCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+IGNvbnN0JiwgdW5zaWduZWQgaW50KiwgdW5zaWduZWQgaW50KiYsIHVuc2lnbmVkIGludCYsIHdjaGFyX3QqKcMBWHN0ZDo6X18yOjpfX251bV9nZXQ8Y2hhcj46Ol9fc3RhZ2UyX2Zsb2F0X3ByZXAoc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciosIGNoYXImLCBjaGFyJinEAfABc3RkOjpfXzI6Ol9fbnVtX2dldDxjaGFyPjo6X19zdGFnZTJfZmxvYXRfbG9vcChjaGFyLCBib29sJiwgY2hhciYsIGNoYXIqLCBjaGFyKiYsIGNoYXIsIGNoYXIsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gY29uc3QmLCB1bnNpZ25lZCBpbnQqLCB1bnNpZ25lZCBpbnQqJiwgdW5zaWduZWQgaW50JiwgY2hhciopxQFMc3RkOjpfXzI6Ol9fbGliY3BwX3djcnRvbWJfbChjaGFyKiwgd2NoYXJfdCwgX19tYnN0YXRlX3QqLCBfX2xvY2FsZV9zdHJ1Y3QqKcYBBnNjYWxibscBC3ByaW50Zl9jb3JlyAFUY2hhciBjb25zdCogc3RkOjpfXzI6OmZpbmQ8Y2hhciBjb25zdCosIGNoYXI+KGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdCYpyQEHX191Zmxvd8oBCF9fc3VidGYzywEGX19sb2NrzAEJX19md3JpdGV4zQERX19mZmx1c2hfdW5sb2NrZWTOAYMBX19jeHhhYml2MTo6X19jbGFzc190eXBlX2luZm86OnByb2Nlc3Nfc3RhdGljX3R5cGVfYWJvdmVfZHN0KF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkIGNvbnN0Kiwgdm9pZCBjb25zdCosIGludCkgY29uc3TPAWtfX2N4eGFiaXYxOjpfX2NsYXNzX3R5cGVfaW5mbzo6cHJvY2Vzc19mb3VuZF9iYXNlX2NsYXNzKF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkKiwgaW50KSBjb25zdNABgQFfX2N4eGFiaXYxOjpfX2Jhc2VfY2xhc3NfdHlwZV9pbmZvOjpzZWFyY2hfYWJvdmVfZHN0KF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkIGNvbnN0Kiwgdm9pZCBjb25zdCosIGludCwgYm9vbCkgY29uc3TRASxQYXJhbWV0ZXJNYW5hZ2VyPGZsb2F0Pjo6flBhcmFtZXRlck1hbmFnZXIoKdIBBndjdG9tYtMBBndjc2xlbtQBB3Zzc2NhbmbVAaIDdm9pZCBzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiA+ID46Ol9fcHVzaF9iYWNrX3Nsb3dfcGF0aDxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+ID4oc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiYmKdYBlgF2b2lkIHN0ZDo6X18yOjpfX3RyZWVfYmFsYW5jZV9hZnRlcl9pbnNlcnQ8c3RkOjpfXzI6Ol9fdHJlZV9ub2RlX2Jhc2U8dm9pZCo+Kj4oc3RkOjpfXzI6Ol9fdHJlZV9ub2RlX2Jhc2U8dm9pZCo+Kiwgc3RkOjpfXzI6Ol9fdHJlZV9ub2RlX2Jhc2U8dm9pZCo+KinXAWZ2b2lkIHN0ZDo6X18yOjpfX2RvdWJsZV9vcl9ub3RoaW5nPGNoYXI+KHN0ZDo6X18yOjp1bmlxdWVfcHRyPGNoYXIsIHZvaWQgKCopKHZvaWQqKT4mLCBjaGFyKiYsIGNoYXIqJinYAU12b2lkIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6cmVnaXN0ZXJfbWVtb3J5X3ZpZXc8dW5zaWduZWQgc2hvcnQ+KGNoYXIgY29uc3QqKdkBS3ZvaWQgKGFub255bW91cyBuYW1lc3BhY2UpOjpyZWdpc3Rlcl9tZW1vcnlfdmlldzx1bnNpZ25lZCBpbnQ+KGNoYXIgY29uc3QqKdoBTHZvaWQgKGFub255bW91cyBuYW1lc3BhY2UpOjpyZWdpc3Rlcl9tZW1vcnlfdmlldzx1bnNpZ25lZCBjaGFyPihjaGFyIGNvbnN0KinbAUp2b2lkIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6cmVnaXN0ZXJfbWVtb3J5X3ZpZXc8c2lnbmVkIGNoYXI+KGNoYXIgY29uc3QqKdwBRHZvaWQgKGFub255bW91cyBuYW1lc3BhY2UpOjpyZWdpc3Rlcl9tZW1vcnlfdmlldzxzaG9ydD4oY2hhciBjb25zdCop3QFCdm9pZCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OnJlZ2lzdGVyX21lbW9yeV92aWV3PGludD4oY2hhciBjb25zdCop3gFgdmlydHVhbCB0aHVuayB0byBzdGQ6Ol9fMjo6YmFzaWNfb3N0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPjo6fmJhc2ljX29zdHJlYW0oKS4x3wFedmlydHVhbCB0aHVuayB0byBzdGQ6Ol9fMjo6YmFzaWNfb3N0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPjo6fmJhc2ljX29zdHJlYW0oKeABYHZpcnR1YWwgdGh1bmsgdG8gc3RkOjpfXzI6OmJhc2ljX2lzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID46On5iYXNpY19pc3RyZWFtKCkuMeEBXnZpcnR1YWwgdGh1bmsgdG8gc3RkOjpfXzI6OmJhc2ljX2lzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID46On5iYXNpY19pc3RyZWFtKCniAXJ1bnNpZ25lZCBzaG9ydCBzdGQ6Ol9fMjo6X19udW1fZ2V0X3Vuc2lnbmVkX2ludGVncmFsPHVuc2lnbmVkIHNob3J0PihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGludCYsIGludCnjAXp1bnNpZ25lZCBsb25nIGxvbmcgc3RkOjpfXzI6Ol9fbnVtX2dldF91bnNpZ25lZF9pbnRlZ3JhbDx1bnNpZ25lZCBsb25nIGxvbmc+KGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgaW50JiwgaW50KeQBbnVuc2lnbmVkIGludCBzdGQ6Ol9fMjo6X19udW1fZ2V0X3Vuc2lnbmVkX2ludGVncmFsPHVuc2lnbmVkIGludD4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBpbnQmLCBpbnQp5QEGc3RydG945gEJc3RydG9sbF9s5wEJc3RvcmVfaW506AF4c3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAyOHVsPiA+OjptYXhfc2l6ZSgpIGNvbnN06QGJAXN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCBzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMjh1bD4gPjo6X19jb25zdHJ1Y3RfYXRfZW5kKHVuc2lnbmVkIGxvbmcp6gGOAXN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCBzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMjh1bD4gPjo6X19hbm5vdGF0ZV9zaHJpbmsodW5zaWduZWQgbG9uZykgY29uc3TrAYsBc3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAyOHVsPiA+OjpfX2Fubm90YXRlX25ldyh1bnNpZ25lZCBsb25nKSBjb25zdOwBgQFzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0Kiwgc3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDI4dWw+ID46Ol9fYW5ub3RhdGVfZGVsZXRlKCkgY29uc3TtAYkBc3RkOjpfXzI6OnZlY3RvcjxpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8aW50PiA+KiBlbXNjcmlwdGVuOjppbnRlcm5hbDo6b3BlcmF0b3JfbmV3PHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPiA+KCnuAWVzdGQ6Ol9fMjo6dW5pcXVlX3B0cjxjaGFyLCB2b2lkICgqKSh2b2lkKik+OjpvcGVyYXRvcj0oc3RkOjpfXzI6OnVuaXF1ZV9wdHI8Y2hhciwgdm9pZCAoKikodm9pZCopPiYmKe8BaXN0ZDo6X18yOjp0aW1lX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+Ojp+dGltZV9wdXQoKfABwAJzdGQ6Ol9fMjo6dGltZV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPjo6X19nZXRfeWVhcihpbnQmLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD4gY29uc3QmKSBjb25zdPEBxwJzdGQ6Ol9fMjo6dGltZV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPjo6X19nZXRfd2Vla2RheW5hbWUoaW50Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+IGNvbnN0JikgY29uc3TyAcUCc3RkOjpfXzI6OnRpbWVfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+ID46Ol9fZ2V0X21vbnRobmFtZShpbnQmLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD4gY29uc3QmKSBjb25zdPMBc3N0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+Ojpkb19kYXRlX29yZGVyKCkgY29uc3T0AagCc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46Ol9fZ2V0X3llYXIoaW50Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmN0eXBlPGNoYXI+IGNvbnN0JikgY29uc3T1Aa8Cc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46Ol9fZ2V0X3dlZWtkYXluYW1lKGludCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpjdHlwZTxjaGFyPiBjb25zdCYpIGNvbnN09gGtAnN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+OjpfX2dldF9tb250aG5hbWUoaW50Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmN0eXBlPGNoYXI+IGNvbnN0JikgY29uc3T3AVtzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPjo6b3BlcmF0b3I9KHdjaGFyX3Qp+AFSc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID46Om9wZXJhdG9yPShjaGFyKfkBKHN0ZDo6X18yOjpudW1wdW5jdDx3Y2hhcl90Pjo6fm51bXB1bmN0KCn6ASVzdGQ6Ol9fMjo6bnVtcHVuY3Q8Y2hhcj46On5udW1wdW5jdCgp+wG3AnN0ZDo6X18yOjpudW1fZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+ID46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHVuc2lnbmVkIGludCYpIGNvbnN0/AGiAnN0ZDo6X18yOjpudW1fZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHVuc2lnbmVkIGludCYpIGNvbnN0/QF9c3RkOjpfXzI6Om1vbmV5cHVuY3Q8d2NoYXJfdCwgdHJ1ZT4gY29uc3QmIHN0ZDo6X18yOjp1c2VfZmFjZXQ8c3RkOjpfXzI6Om1vbmV5cHVuY3Q8d2NoYXJfdCwgdHJ1ZT4gPihzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0Jin+AX9zdGQ6Ol9fMjo6bW9uZXlwdW5jdDx3Y2hhcl90LCBmYWxzZT4gY29uc3QmIHN0ZDo6X18yOjp1c2VfZmFjZXQ8c3RkOjpfXzI6Om1vbmV5cHVuY3Q8d2NoYXJfdCwgZmFsc2U+ID4oc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYp/wE+c3RkOjpfXzI6Om1vbmV5cHVuY3Q8d2NoYXJfdCwgZmFsc2U+Ojpkb19uZWdhdGl2ZV9zaWduKCkgY29uc3SAAndzdGQ6Ol9fMjo6bW9uZXlwdW5jdDxjaGFyLCB0cnVlPiBjb25zdCYgc3RkOjpfXzI6OnVzZV9mYWNldDxzdGQ6Ol9fMjo6bW9uZXlwdW5jdDxjaGFyLCB0cnVlPiA+KHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKYECeXN0ZDo6X18yOjptb25leXB1bmN0PGNoYXIsIGZhbHNlPiBjb25zdCYgc3RkOjpfXzI6OnVzZV9mYWNldDxzdGQ6Ol9fMjo6bW9uZXlwdW5jdDxjaGFyLCBmYWxzZT4gPihzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JimCAjtzdGQ6Ol9fMjo6bW9uZXlwdW5jdDxjaGFyLCBmYWxzZT46OmRvX25lZ2F0aXZlX3NpZ24oKSBjb25zdIMCrQNzdGQ6Ol9fMjo6bW9uZXlfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+ID46Ol9fZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIGJvb2wsIHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmLCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCYsIGJvb2wmLCBzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD4gY29uc3QmLCBzdGQ6Ol9fMjo6dW5pcXVlX3B0cjx3Y2hhcl90LCB2b2lkICgqKSh2b2lkKik+Jiwgd2NoYXJfdComLCB3Y2hhcl90KimEAowDc3RkOjpfXzI6Om1vbmV5X2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+OjpfX2RvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBib29sLCBzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JiwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQmLCBib29sJiwgc3RkOjpfXzI6OmN0eXBlPGNoYXI+IGNvbnN0Jiwgc3RkOjpfXzI6OnVuaXF1ZV9wdHI8Y2hhciwgdm9pZCAoKikodm9pZCopPiYsIGNoYXIqJiwgY2hhciophQKeAXN0ZDo6X18yOjptZXNzYWdlczxjaGFyPjo6ZG9fb3BlbihzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+IGNvbnN0Jiwgc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYpIGNvbnN0hgIhc3RkOjpfXzI6OmxvY2FsZTo6X19pbXA6On5fX2ltcCgphwJYc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID46Om9wZXJhdG9yKysoaW50KYgCpAFzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPjo6ZXF1YWwoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gY29uc3QmKSBjb25zdIkCX3N0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+OjpfX3Rlc3RfZm9yX2VvZigpIGNvbnN0igJSc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID46Om9wZXJhdG9yKysoaW50KYsCmAFzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPjo6ZXF1YWwoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gY29uc3QmKSBjb25zdIwCWXN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+OjpfX3Rlc3RfZm9yX2VvZigpIGNvbnN0jQLqAXN0ZDo6X18yOjplbmFibGVfaWY8X19pc19jcHAxN19mb3J3YXJkX2l0ZXJhdG9yPHdjaGFyX3QgY29uc3QqPjo6dmFsdWUsIHZvaWQ+Ojp0eXBlIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+ID46Ol9faW5pdDx3Y2hhcl90IGNvbnN0Kj4od2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqKY4C1QFzdGQ6Ol9fMjo6ZW5hYmxlX2lmPF9faXNfY3BwMTdfZm9yd2FyZF9pdGVyYXRvcjxjaGFyIGNvbnN0Kj46OnZhbHVlLCB2b2lkPjo6dHlwZSBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+OjpfX2luaXQ8Y2hhciBjb25zdCo+KGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KimPAo0Bc3RkOjpfXzI6OmVuYWJsZV9pZjwoaXNfbW92ZV9jb25zdHJ1Y3RpYmxlPGNoYXI+Ojp2YWx1ZSkgJiYgKGlzX21vdmVfYXNzaWduYWJsZTxjaGFyPjo6dmFsdWUpLCB2b2lkPjo6dHlwZSBzdGQ6Ol9fMjo6c3dhcDxjaGFyPihjaGFyJiwgY2hhciYpkALkAXN0ZDo6X18yOjplbmFibGVfaWY8KF9faXNfY3BwMTdfZm9yd2FyZF9pdGVyYXRvcjxpbnQqPjo6dmFsdWUpICYmIChpc19jb25zdHJ1Y3RpYmxlPGludCwgc3RkOjpfXzI6Oml0ZXJhdG9yX3RyYWl0czxpbnQqPjo6cmVmZXJlbmNlPjo6dmFsdWUpLCB2b2lkPjo6dHlwZSBzdGQ6Ol9fMjo6dmVjdG9yPGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxpbnQ+ID46OmFzc2lnbjxpbnQqPihpbnQqLCBpbnQqKZECLnN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90Pjo6ZG9fd2lkZW4oY2hhcikgY29uc3SSAh9zdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj46On5jdHlwZSgpkwI5c3RkOjpfXzI6OmNvZGVjdnQ8d2NoYXJfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojp+Y29kZWN2dCgplAKEAXN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9fb3V0KF9fbWJzdGF0ZV90JiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiYsIGNoYXIqLCBjaGFyKiwgY2hhciomKSBjb25zdJUCRXN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIxNl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX21heF9sZW5ndGgoKSBjb25zdJYCP3N0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPjo6YXNzaWduKGNoYXIqLCB1bnNpZ25lZCBsb25nLCBjaGFyKZcChAFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90PiA+OjpiYXNpY19zdHJpbmcodW5zaWduZWQgbG9uZywgd2NoYXJfdCmYAt8Bc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4gPjo6X19ncm93X2J5X2FuZF9yZXBsYWNlKHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHdjaGFyX3QgY29uc3QqKZkCwwFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90PiA+OjpfX2dyb3dfYnkodW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZymaAl9zdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+OjpfX3plcm8oKZsC0wFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+OjpfX2dyb3dfYnlfYW5kX3JlcGxhY2UodW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgY2hhciBjb25zdCopnAJNc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1Zjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPjo6c2J1bXBjKCmdAlZzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+OjpiYXNpY19zdHJlYW1idWYoKZ4CSnN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID46OnVuZGVyZmxvdygpnwJSc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPjo6c2V0YnVmKGNoYXIqLCBsb25nKaACcXN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID46OnNlZWtwb3Moc3RkOjpfXzI6OmZwb3M8X19tYnN0YXRlX3Q+LCB1bnNpZ25lZCBpbnQpoQJ8c3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPjo6c2Vla29mZihsb25nIGxvbmcsIHN0ZDo6X18yOjppb3NfYmFzZTo6c2Vla2RpciwgdW5zaWduZWQgaW50KaICR3N0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID46OnNidW1wYygpowJQc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPjo6YmFzaWNfc3RyZWFtYnVmKCmkAk5zdGQ6Ol9fMjo6YmFzaWNfb3N0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPjo6c2VudHJ5Ojp+c2VudHJ5KCmlAkdzdGQ6Ol9fMjo6YmFzaWNfaW9zPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+Ojp+YmFzaWNfaW9zKCkuMaYCuANzdGQ6Ol9fMjo6YmFja19pbnNlcnRfaXRlcmF0b3I8c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiA+IHN0ZDo6X18yOjpfX25hcnJvd190b191dGY4PDh1bD46Om9wZXJhdG9yKCk8c3RkOjpfXzI6OmJhY2tfaW5zZXJ0X2l0ZXJhdG9yPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gPiwgY2hhcj4oc3RkOjpfXzI6OmJhY2tfaW5zZXJ0X2l0ZXJhdG9yPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gPiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqKSBjb25zdKcCjgFzdGQ6Ol9fMjo6YmFja19pbnNlcnRfaXRlcmF0b3I8c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiA+OjpvcGVyYXRvcj0oY2hhciBjb25zdCYpqALIAXN0ZDo6X18yOjphbGxvY2F0b3JfdHJhaXRzPHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAyOHVsPiA+OjpkZWFsbG9jYXRlKHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAyOHVsPiYsIHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiosIHVuc2lnbmVkIGxvbmcpqQKrAXN0ZDo6X18yOjphbGxvY2F0b3JfdHJhaXRzPHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAyOHVsPiA+OjphbGxvY2F0ZShzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMjh1bD4mLCB1bnNpZ25lZCBsb25nKaoCNnN0ZDo6X18yOjpfX3dyYXBfaXRlcjx3Y2hhcl90Kj46Om9wZXJhdG9yKyhsb25nKSBjb25zdKsCM3N0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyKj46Om9wZXJhdG9yKyhsb25nKSBjb25zdKwCdnN0ZDo6X18yOjpfX3ZlY3Rvcl9iYXNlPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0Kiwgc3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDI4dWw+ID46OmNsZWFyKCmtApsBc3RkOjpfXzI6Ol9fdmVjdG9yX2Jhc2U8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCBzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMjh1bD4gPjo6X19kZXN0cnVjdF9hdF9lbmQoc3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqKimuAiJzdGQ6Ol9fMjo6X190aW1lX3B1dDo6X190aW1lX3B1dCgprwJKc3RkOjpfXzI6Ol9fdGltZV9wdXQ6Ol9fZG9fcHV0KGNoYXIqLCBjaGFyKiYsIHRtIGNvbnN0KiwgY2hhciwgY2hhcikgY29uc3SwAkRzdGQ6Ol9fMjo6X19zdGRvdXRidWY8d2NoYXJfdD46Ol9fc3Rkb3V0YnVmKF9JT19GSUxFKiwgX19tYnN0YXRlX3QqKbECI3N0ZDo6X18yOjpfX3N0ZG91dGJ1ZjxjaGFyPjo6c3luYygpsgJBc3RkOjpfXzI6Ol9fc3Rkb3V0YnVmPGNoYXI+OjpfX3N0ZG91dGJ1ZihfSU9fRklMRSosIF9fbWJzdGF0ZV90KimzAixzdGQ6Ol9fMjo6X19zdGRpbmJ1Zjx3Y2hhcl90Pjo6fl9fc3RkaW5idWYoKbQCLnN0ZDo6X18yOjpfX3N0ZGluYnVmPHdjaGFyX3Q+OjpfX2dldGNoYXIoYm9vbCm1AilzdGQ6Ol9fMjo6X19zdGRpbmJ1ZjxjaGFyPjo6fl9fc3RkaW5idWYoKbYCK3N0ZDo6X18yOjpfX3N0ZGluYnVmPGNoYXI+OjpfX2dldGNoYXIoYm9vbCm3Ap4Bc3RkOjpfXzI6Ol9fc3BsaXRfYnVmZmVyPHRyaXBsZTxpbnQgY29uc3QqLCBpbnQsIGludD4qLCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHRyaXBsZTxpbnQgY29uc3QqLCBpbnQsIGludD4qPiY+OjpwdXNoX2Zyb250KHRyaXBsZTxpbnQgY29uc3QqLCBpbnQsIGludD4qIGNvbnN0Jim4ApIBc3RkOjpfXzI6Ol9fc3BsaXRfYnVmZmVyPHN0ZDo6X18yOjpwYWlyPGludCwgaW50PiosIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnBhaXI8aW50LCBpbnQ+Kj4mPjo6cHVzaF9mcm9udChzdGQ6Ol9fMjo6cGFpcjxpbnQsIGludD4qIGNvbnN0Jim5AoMBc3RkOjpfXzI6Ol9fbnVtX3B1dDx3Y2hhcl90Pjo6X193aWRlbl9hbmRfZ3JvdXBfZmxvYXQoY2hhciosIGNoYXIqLCBjaGFyKiwgd2NoYXJfdCosIHdjaGFyX3QqJiwgd2NoYXJfdComLCBzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0Jim6AndzdGQ6Ol9fMjo6X19udW1fcHV0PGNoYXI+OjpfX3dpZGVuX2FuZF9ncm91cF9mbG9hdChjaGFyKiwgY2hhciosIGNoYXIqLCBjaGFyKiwgY2hhciomLCBjaGFyKiYsIHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKbsCpgNzdGQ6Ol9fMjo6X19tb25leV9wdXQ8d2NoYXJfdD46Ol9fZ2F0aGVyX2luZm8oYm9vbCwgYm9vbCwgc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYsIHN0ZDo6X18yOjptb25leV9iYXNlOjpwYXR0ZXJuJiwgd2NoYXJfdCYsIHdjaGFyX3QmLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+Jiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4gPiYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+ID4mLCBpbnQmKbwChgRzdGQ6Ol9fMjo6X19tb25leV9wdXQ8d2NoYXJfdD46Ol9fZm9ybWF0KHdjaGFyX3QqLCB3Y2hhcl90KiYsIHdjaGFyX3QqJiwgdW5zaWduZWQgaW50LCB3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCosIHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90PiBjb25zdCYsIGJvb2wsIHN0ZDo6X18yOjptb25leV9iYXNlOjpwYXR0ZXJuIGNvbnN0Jiwgd2NoYXJfdCwgd2NoYXJfdCwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiBjb25zdCYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+ID4gY29uc3QmLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90PiA+IGNvbnN0JiwgaW50Kb0CiwNzdGQ6Ol9fMjo6X19tb25leV9wdXQ8Y2hhcj46Ol9fZ2F0aGVyX2luZm8oYm9vbCwgYm9vbCwgc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYsIHN0ZDo6X18yOjptb25leV9iYXNlOjpwYXR0ZXJuJiwgY2hhciYsIGNoYXImLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+Jiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4mLCBpbnQmKb4C2QNzdGQ6Ol9fMjo6X19tb25leV9wdXQ8Y2hhcj46Ol9fZm9ybWF0KGNoYXIqLCBjaGFyKiYsIGNoYXIqJiwgdW5zaWduZWQgaW50LCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIHN0ZDo6X18yOjpjdHlwZTxjaGFyPiBjb25zdCYsIGJvb2wsIHN0ZDo6X18yOjptb25leV9iYXNlOjpwYXR0ZXJuIGNvbnN0JiwgY2hhciwgY2hhciwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiBjb25zdCYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gY29uc3QmLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+IGNvbnN0JiwgaW50Kb8CTHN0ZDo6X18yOjpfX2xpYmNwcF9zc2NhbmZfbChjaGFyIGNvbnN0KiwgX19sb2NhbGVfc3RydWN0KiwgY2hhciBjb25zdCosIC4uLinAAmJzdGQ6Ol9fMjo6X19saWJjcHBfbWJydG93Y19sKHdjaGFyX3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgbG9uZywgX19tYnN0YXRlX3QqLCBfX2xvY2FsZV9zdHJ1Y3QqKcECMXN0ZDo6X18yOjpfX2xpYmNwcF9tYl9jdXJfbWF4X2woX19sb2NhbGVfc3RydWN0KinCAgZzc2NhbmbDAghzbnByaW50ZsQCB3NjYW5leHDFAgdzY2FsYm5sxgIHcG9wX2FyZ8cCBm1lbWNocsgCCW1ic3J0b3djc8kCXGxvbmcgc3RkOjpfXzI6Ol9fbnVtX2dldF9zaWduZWRfaW50ZWdyYWw8bG9uZz4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBpbnQmLCBpbnQpygJmbG9uZyBsb25nIHN0ZDo6X18yOjpfX251bV9nZXRfc2lnbmVkX2ludGVncmFsPGxvbmcgbG9uZz4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBpbnQmLCBpbnQpywJbbG9uZyBkb3VibGUgc3RkOjpfXzI6Ol9fbnVtX2dldF9mbG9hdDxsb25nIGRvdWJsZT4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBpbnQmKcwCBmdldGludM0CBWZyZXhwzgIKZnJlZWxvY2FsZc8CBWZtb2Rs0AJPZmxvYXQgc3RkOjpfXzI6Ol9fbnVtX2dldF9mbG9hdDxmbG9hdD4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBpbnQmKdECBmZmbHVzaNICzQJlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjx1bnNpZ25lZCBsb25nIChzdGQ6Ol9fMjo6dmVjdG9yPGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxpbnQ+ID46OiopKCkgY29uc3QsIHVuc2lnbmVkIGxvbmcsIHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPiBjb25zdCo+OjppbnZva2UodW5zaWduZWQgbG9uZyAoc3RkOjpfXzI6OnZlY3RvcjxpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8aW50PiA+OjoqIGNvbnN0JikoKSBjb25zdCwgc3RkOjpfXzI6OnZlY3RvcjxpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8aW50PiA+IGNvbnN0KinTAoMDZW1zY3JpcHRlbjo6aW50ZXJuYWw6OkZ1bmN0aW9uSW52b2tlcjxlbXNjcmlwdGVuOjp2YWwgKCopKHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPiBjb25zdCYsIHVuc2lnbmVkIGxvbmcpLCBlbXNjcmlwdGVuOjp2YWwsIHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPiBjb25zdCYsIHVuc2lnbmVkIGxvbmc+OjppbnZva2UoZW1zY3JpcHRlbjo6dmFsICgqKikoc3RkOjpfXzI6OnZlY3RvcjxpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8aW50PiA+IGNvbnN0JiwgdW5zaWduZWQgbG9uZyksIHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPiosIHVuc2lnbmVkIGxvbmcp1AJRZG91YmxlIHN0ZDo6X18yOjpfX251bV9nZXRfZmxvYXQ8ZG91YmxlPihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGludCYp1QINZGlzcG9zZV9jaHVua9YCCWNvcHlzaWdubNcCE19fdmZwcmludGZfaW50ZXJuYWzYAgxfX3RydW5jdGZzZjLZAglfX3Rvd3JpdGXaAghfX3RvcmVhZNsCC19fc3RyY2hybnVs3AIKX19vdmVyZmxvd90CCV9faW50c2Nhbt4CC19fZmxvYXRzY2Fu3wIqX19lbWJpbmRfcmVnaXN0ZXJfbmF0aXZlX2FuZF9idWlsdGluX3R5cGVz4AIIX19kaXZ0ZjPhAmZfX2N4eGFiaXYxOjpfX3BvaW50ZXJfdG9fbWVtYmVyX3R5cGVfaW5mbzo6Y2FuX2NhdGNoX25lc3RlZChfX2N4eGFiaXYxOjpfX3NoaW1fdHlwZV9pbmZvIGNvbnN0KikgY29uc3TiAnNfX2N4eGFiaXYxOjpfX2Jhc2VfY2xhc3NfdHlwZV9pbmZvOjpoYXNfdW5hbWJpZ3VvdXNfcHVibGljX2Jhc2UoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQqLCBpbnQpIGNvbnN04wITU1N0cnVjdDo6flNTdHJ1Y3QoKeQCV1NTdHJ1Y3Q6OlZhbGlkYXRlTWFwcGluZyhzdGQ6Ol9fMjo6dmVjdG9yPGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxpbnQ+ID4gY29uc3QmKSBjb25zdOUCNEluZmVyZW5jZUVuZ2luZTxmbG9hdD46OkxvYWRTZXF1ZW5jZShTU3RydWN0IGNvbnN0JinmAilJbmZlcmVuY2VFbmdpbmU8ZmxvYXQ+OjpJbml0aWFsaXplQ2FjaGUoKecCJ0luZmVyZW5jZUVuZ2luZTxmbG9hdD46OkNvbXB1dGVJbnNpZGUoKegCdUZ1bGxGb2xkRGVmYXVsdChzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+IGNvbnN0JiwgZG91YmxlKekCB3dtZW1zZXTqAgh3bWVtbW92ZesCB3dtZW1jcHnsAgl3Y3NydG9tYnPtAgp3Y3NucnRvbWJz7gJnd2NoYXJfdCBjb25zdCogc3RkOjpfXzI6Ol9fbnVtX2dldDx3Y2hhcl90Pjo6X19kb193aWRlbl9wPHdjaGFyX3Q+KHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QqKSBjb25zdO8CCnZzbmlwcmludGbwAt4Ddm9pZCBzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIGZsb2F0PiosIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIGZsb2F0Pio+ID4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgZmxvYXQ+Kiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgZmxvYXQ+Kj4gPiA+ID46Ol9fcHVzaF9iYWNrX3Nsb3dfcGF0aDxzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCBmbG9hdD4qLCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCBmbG9hdD4qPiA+ID4oc3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgZmxvYXQ+Kiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgZmxvYXQ+Kj4gPiYmKfECrQN2b2lkIHN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+ID4gPjo6X19wdXNoX2JhY2tfc2xvd19wYXRoPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gY29uc3QmPihzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+IGNvbnN0JinyAoQBdm9pZCBzdGQ6Ol9fMjo6dmVjdG9yPFBhcmFtZXRlckdyb3VwLCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPFBhcmFtZXRlckdyb3VwPiA+OjpfX3B1c2hfYmFja19zbG93X3BhdGg8UGFyYW1ldGVyR3JvdXA+KFBhcmFtZXRlckdyb3VwJiYp8wKMAXZvaWQgc3RkOjpfXzI6OmNhbGxfb25jZTxzdGQ6Ol9fMjo6KGFub255bW91cyBuYW1lc3BhY2UpOjpfX2Zha2VfYmluZD4oc3RkOjpfXzI6Om9uY2VfZmxhZyYsIHN0ZDo6X18yOjooYW5vbnltb3VzIG5hbWVzcGFjZSk6Ol9fZmFrZV9iaW5kJiYp9AJcdm9pZCBzdGQ6Ol9fMjo6X19yZXZlcnNlPHdjaGFyX3QqPih3Y2hhcl90Kiwgd2NoYXJfdCosIHN0ZDo6X18yOjpyYW5kb21fYWNjZXNzX2l0ZXJhdG9yX3RhZyn1AlN2b2lkIHN0ZDo6X18yOjpfX3JldmVyc2U8Y2hhcio+KGNoYXIqLCBjaGFyKiwgc3RkOjpfXzI6OnJhbmRvbV9hY2Nlc3NfaXRlcmF0b3JfdGFnKfYCaXZvaWQgc3RkOjpfXzI6Ol9fY2FsbF9vbmNlX3Byb3h5PHN0ZDo6X18yOjp0dXBsZTxzdGQ6Ol9fMjo6KGFub255bW91cyBuYW1lc3BhY2UpOjpfX2Zha2VfYmluZCYmPiA+KHZvaWQqKfcCSnZvaWQgZW1zY3JpcHRlbjo6aW50ZXJuYWw6OnJhd19kZXN0cnVjdG9yPEZ1bGxGb2xkUmVzdWx0PihGdWxsRm9sZFJlc3VsdCop+AK1A3ZvaWQgZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1lbWJlckFjY2VzczxGdWxsRm9sZFJlc3VsdCwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiA+OjpzZXRXaXJlPEZ1bGxGb2xkUmVzdWx0PihzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+IEZ1bGxGb2xkUmVzdWx0OjoqIGNvbnN0JiwgRnVsbEZvbGRSZXN1bHQmLCBlbXNjcmlwdGVuOjppbnRlcm5hbDo6QmluZGluZ1R5cGU8c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiwgdm9pZD46Oid1bm5hbWVkJyop+QKSAXZvaWQgZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1lbWJlckFjY2VzczxGdWxsRm9sZFJlc3VsdCwgZG91YmxlPjo6c2V0V2lyZTxGdWxsRm9sZFJlc3VsdD4oZG91YmxlIEZ1bGxGb2xkUmVzdWx0OjoqIGNvbnN0JiwgRnVsbEZvbGRSZXN1bHQmLCBkb3VibGUp+gKSAnZvaWQgZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1lbWJlckFjY2VzczxGdWxsRXZhbFJlc3VsdCwgc3RkOjpfXzI6OnZlY3RvcjxpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8aW50PiA+ID46OnNldFdpcmU8RnVsbEV2YWxSZXN1bHQ+KHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPiBGdWxsRXZhbFJlc3VsdDo6KiBjb25zdCYsIEZ1bGxFdmFsUmVzdWx0Jiwgc3RkOjpfXzI6OnZlY3RvcjxpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8aW50PiA+Kin7Ao8Bdm9pZCBlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWVtYmVyQWNjZXNzPEZ1bGxFdmFsUmVzdWx0LCBmbG9hdD46OnNldFdpcmU8RnVsbEV2YWxSZXN1bHQ+KGZsb2F0IEZ1bGxFdmFsUmVzdWx0OjoqIGNvbnN0JiwgRnVsbEV2YWxSZXN1bHQmLCBmbG9hdCn8ApUBdm9pZCBjb25zdCogZW1zY3JpcHRlbjo6aW50ZXJuYWw6OmdldEFjdHVhbFR5cGU8c3RkOjpfXzI6OnZlY3RvcjxpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8aW50PiA+ID4oc3RkOjpfXzI6OnZlY3RvcjxpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8aW50PiA+Kin9AqEBdm9pZCBjb25zdCogZW1zY3JpcHRlbjo6aW50ZXJuYWw6OmdldEFjdHVhbFR5cGU8c3RkOjpfXzI6OnZlY3Rvcjxkb3VibGUsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZG91YmxlPiA+ID4oc3RkOjpfXzI6OnZlY3Rvcjxkb3VibGUsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZG91YmxlPiA+Kin+AlB2b2lkIGNvbnN0KiBlbXNjcmlwdGVuOjppbnRlcm5hbDo6Z2V0QWN0dWFsVHlwZTxGdWxsRm9sZFJlc3VsdD4oRnVsbEZvbGRSZXN1bHQqKf8CUHZvaWQgY29uc3QqIGVtc2NyaXB0ZW46OmludGVybmFsOjpnZXRBY3R1YWxUeXBlPEZ1bGxFdmFsUmVzdWx0PihGdWxsRXZhbFJlc3VsdCopgANMdm9pZCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OnJlZ2lzdGVyX21lbW9yeV92aWV3PHVuc2lnbmVkIGxvbmc+KGNoYXIgY29uc3QqKYEDQ3ZvaWQgKGFub255bW91cyBuYW1lc3BhY2UpOjpyZWdpc3Rlcl9tZW1vcnlfdmlldzxsb25nPihjaGFyIGNvbnN0KimCA0R2b2lkIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6cmVnaXN0ZXJfbWVtb3J5X3ZpZXc8ZmxvYXQ+KGNoYXIgY29uc3QqKYMDRXZvaWQgKGFub255bW91cyBuYW1lc3BhY2UpOjpyZWdpc3Rlcl9tZW1vcnlfdmlldzxkb3VibGU+KGNoYXIgY29uc3QqKYQDQ3ZvaWQgKGFub255bW91cyBuYW1lc3BhY2UpOjpyZWdpc3Rlcl9tZW1vcnlfdmlldzxjaGFyPihjaGFyIGNvbnN0KimFA0l2b2lkIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6cmVnaXN0ZXJfaW50ZWdlcjx1bnNpZ25lZCBzaG9ydD4oY2hhciBjb25zdCophgNIdm9pZCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OnJlZ2lzdGVyX2ludGVnZXI8dW5zaWduZWQgbG9uZz4oY2hhciBjb25zdCophwNHdm9pZCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OnJlZ2lzdGVyX2ludGVnZXI8dW5zaWduZWQgaW50PihjaGFyIGNvbnN0KimIA0h2b2lkIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6cmVnaXN0ZXJfaW50ZWdlcjx1bnNpZ25lZCBjaGFyPihjaGFyIGNvbnN0KimJA0Z2b2lkIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6cmVnaXN0ZXJfaW50ZWdlcjxzaWduZWQgY2hhcj4oY2hhciBjb25zdCopigNAdm9pZCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OnJlZ2lzdGVyX2ludGVnZXI8c2hvcnQ+KGNoYXIgY29uc3QqKYsDP3ZvaWQgKGFub255bW91cyBuYW1lc3BhY2UpOjpyZWdpc3Rlcl9pbnRlZ2VyPGxvbmc+KGNoYXIgY29uc3QqKYwDPnZvaWQgKGFub255bW91cyBuYW1lc3BhY2UpOjpyZWdpc3Rlcl9pbnRlZ2VyPGludD4oY2hhciBjb25zdCopjQM/dm9pZCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OnJlZ2lzdGVyX2ludGVnZXI8Y2hhcj4oY2hhciBjb25zdCopjgM+dm9pZCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OnJlZ2lzdGVyX2Zsb2F0PGZsb2F0PihjaGFyIGNvbnN0KimPAz92b2lkIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6cmVnaXN0ZXJfZmxvYXQ8ZG91YmxlPihjaGFyIGNvbnN0KimQAwd2ZnNjYW5mkQMJdmFzcHJpbnRmkgMRdHJ5X3JlYWxsb2NfY2h1bmuTAwlzdHJ0b2xkX2yUAwdzdHJ0b2xklQMGc3RydG9mlgMGc3RydG9klwMHc3RybmNtcJgDInN0ZDo6bG9naWNfZXJyb3I6On5sb2dpY19lcnJvcigpLjGZAyJzdGQ6Omxlbmd0aF9lcnJvcjo6fmxlbmd0aF9lcnJvcigpmgMcc3RkOjpleGNlcHRpb246OndoYXQoKSBjb25zdJsDG3N0ZDo6YmFkX2Nhc3Q6OndoYXQoKSBjb25zdJwDfHN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIGZsb2F0Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgZmxvYXQ+ID4gPjo6X19hcHBlbmQodW5zaWduZWQgbG9uZymdA31zdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0Kiwgc3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDI4dWw+ID46OnJlc2l6ZSh1bnNpZ25lZCBsb25nKZ4DggFzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0Kiwgc3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDI4dWw+ID46Ol9fdmFsbG9jYXRlKHVuc2lnbmVkIGxvbmcpnwPzAXN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCBzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMjh1bD4gPjo6X19zd2FwX291dF9jaXJjdWxhcl9idWZmZXIoc3RkOjpfXzI6Ol9fc3BsaXRfYnVmZmVyPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0Kiwgc3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDI4dWw+Jj4mKaADiAFzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0Kiwgc3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDI4dWw+ID46Ol9fcmVjb21tZW5kKHVuc2lnbmVkIGxvbmcpIGNvbnN0oQN/c3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAyOHVsPiA+OjpfX2FwcGVuZCh1bnNpZ25lZCBsb25nKaIDPnN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPjo6c2l6ZSgpIGNvbnN0owNTc3RkOjpfXzI6OnZlY3RvcjxpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8aW50PiA+OjpyZXNpemUodW5zaWduZWQgbG9uZywgaW50IGNvbnN0JimkA0dzdGQ6Ol9fMjo6dmVjdG9yPGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxpbnQ+ID46OnB1c2hfYmFjayhpbnQgY29uc3QmKaUDkgJzdGQ6Ol9fMjo6dmVjdG9yPGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxpbnQ+ID4qIGVtc2NyaXB0ZW46OmludGVybmFsOjpNZW1iZXJBY2Nlc3M8RnVsbEV2YWxSZXN1bHQsIHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPiA+OjpnZXRXaXJlPEZ1bGxFdmFsUmVzdWx0PihzdGQ6Ol9fMjo6dmVjdG9yPGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxpbnQ+ID4gRnVsbEV2YWxSZXN1bHQ6OiogY29uc3QmLCBGdWxsRXZhbFJlc3VsdCBjb25zdCYppgNEc3RkOjpfXzI6OnZlY3Rvcjxkb3VibGUsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZG91YmxlPiA+OjpzaXplKCkgY29uc3SnA1xzdGQ6Ol9fMjo6dmVjdG9yPGRvdWJsZSwgc3RkOjpfXzI6OmFsbG9jYXRvcjxkb3VibGU+ID46OnJlc2l6ZSh1bnNpZ25lZCBsb25nLCBkb3VibGUgY29uc3QmKagDUHN0ZDo6X18yOjp2ZWN0b3I8ZG91YmxlLCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGRvdWJsZT4gPjo6cHVzaF9iYWNrKGRvdWJsZSBjb25zdCYpqQNec3RkOjpfXzI6OnZlY3Rvcjxkb3VibGUsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZG91YmxlPiA+OjpfX2FwcGVuZCh1bnNpZ25lZCBsb25nLCBkb3VibGUgY29uc3QmKaoDgAFzdGQ6Ol9fMjo6dXRmOF90b191dGYxNl9sZW5ndGgodW5zaWduZWQgY2hhciBjb25zdCosIHVuc2lnbmVkIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCBzdGQ6Ol9fMjo6Y29kZWN2dF9tb2RlKasDtQFzdGQ6Ol9fMjo6dXRmOF90b191dGYxNih1bnNpZ25lZCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgY2hhciBjb25zdCosIHVuc2lnbmVkIGNoYXIgY29uc3QqJiwgdW5zaWduZWQgc2hvcnQqLCB1bnNpZ25lZCBzaG9ydCosIHVuc2lnbmVkIHNob3J0KiYsIHVuc2lnbmVkIGxvbmcsIHN0ZDo6X18yOjpjb2RlY3Z0X21vZGUprAN/c3RkOjpfXzI6OnV0ZjhfdG9fdWNzNF9sZW5ndGgodW5zaWduZWQgY2hhciBjb25zdCosIHVuc2lnbmVkIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCBzdGQ6Ol9fMjo6Y29kZWN2dF9tb2RlKa0DrgFzdGQ6Ol9fMjo6dXRmOF90b191Y3M0KHVuc2lnbmVkIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgY2hhciBjb25zdComLCB1bnNpZ25lZCBpbnQqLCB1bnNpZ25lZCBpbnQqLCB1bnNpZ25lZCBpbnQqJiwgdW5zaWduZWQgbG9uZywgc3RkOjpfXzI6OmNvZGVjdnRfbW9kZSmuA7UBc3RkOjpfXzI6OnV0ZjE2X3RvX3V0ZjgodW5zaWduZWQgc2hvcnQgY29uc3QqLCB1bnNpZ25lZCBzaG9ydCBjb25zdCosIHVuc2lnbmVkIHNob3J0IGNvbnN0KiYsIHVuc2lnbmVkIGNoYXIqLCB1bnNpZ25lZCBjaGFyKiwgdW5zaWduZWQgY2hhciomLCB1bnNpZ25lZCBsb25nLCBzdGQ6Ol9fMjo6Y29kZWN2dF9tb2RlKa8DrgFzdGQ6Ol9fMjo6dWNzNF90b191dGY4KHVuc2lnbmVkIGludCBjb25zdCosIHVuc2lnbmVkIGludCBjb25zdCosIHVuc2lnbmVkIGludCBjb25zdComLCB1bnNpZ25lZCBjaGFyKiwgdW5zaWduZWQgY2hhciosIHVuc2lnbmVkIGNoYXIqJiwgdW5zaWduZWQgbG9uZywgc3RkOjpfXzI6OmNvZGVjdnRfbW9kZSmwA/EBc3RkOjpfXzI6OnRpbWVfcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+ID46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgdG0gY29uc3QqLCBjaGFyLCBjaGFyKSBjb25zdLED3wFzdGQ6Ol9fMjo6dGltZV9wdXQ8Y2hhciwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyLCB0bSBjb25zdCosIGNoYXIsIGNoYXIpIGNvbnN0sgOzAnN0ZDo6X18yOjp0aW1lX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+Ojpkb19nZXRfeWVhcihzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHRtKikgY29uc3SzA7YCc3RkOjpfXzI6OnRpbWVfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+ID46OmRvX2dldF93ZWVrZGF5KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qKSBjb25zdLQDswJzdGQ6Ol9fMjo6dGltZV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPjo6ZG9fZ2V0X3RpbWUoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB0bSopIGNvbnN0tQO4AnN0ZDo6X18yOjp0aW1lX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+Ojpkb19nZXRfbW9udGhuYW1lKHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qKSBjb25zdLYDswJzdGQ6Ol9fMjo6dGltZV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPjo6ZG9fZ2V0X2RhdGUoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB0bSopIGNvbnN0twO6AnN0ZDo6X18yOjp0aW1lX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB0bSosIGNoYXIsIGNoYXIpIGNvbnN0uAPBAnN0ZDo6X18yOjp0aW1lX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+OjpfX2dldF95ZWFyNChpbnQmLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD4gY29uc3QmKSBjb25zdLkDwQJzdGQ6Ol9fMjo6dGltZV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPjo6X19nZXRfd2hpdGVfc3BhY2Uoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+IGNvbnN0JikgY29uc3S6A8MCc3RkOjpfXzI6OnRpbWVfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+ID46Ol9fZ2V0X3dlZWtkYXkoaW50Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+IGNvbnN0JikgY29uc3S7A8ICc3RkOjpfXzI6OnRpbWVfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+ID46Ol9fZ2V0X3NlY29uZChpbnQmLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD4gY29uc3QmKSBjb25zdLwDvQJzdGQ6Ol9fMjo6dGltZV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPjo6X19nZXRfcGVyY2VudChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD4gY29uc3QmKSBjb25zdL0DwQJzdGQ6Ol9fMjo6dGltZV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPjo6X19nZXRfbW9udGgoaW50Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+IGNvbnN0JikgY29uc3S+A8ICc3RkOjpfXzI6OnRpbWVfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+ID46Ol9fZ2V0X21pbnV0ZShpbnQmLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD4gY29uc3QmKSBjb25zdL8DwAJzdGQ6Ol9fMjo6dGltZV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPjo6X19nZXRfaG91cihpbnQmLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD4gY29uc3QmKSBjb25zdMADyAJzdGQ6Ol9fMjo6dGltZV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPjo6X19nZXRfZGF5X3llYXJfbnVtKGludCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90PiBjb25zdCYpIGNvbnN0wQO/AnN0ZDo6X18yOjp0aW1lX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+OjpfX2dldF9kYXkoaW50Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+IGNvbnN0JikgY29uc3TCA8ECc3RkOjpfXzI6OnRpbWVfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+ID46Ol9fZ2V0X2FtX3BtKGludCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90PiBjb25zdCYpIGNvbnN0wwPDAnN0ZDo6X18yOjp0aW1lX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+OjpfX2dldF8xMl9ob3VyKGludCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90PiBjb25zdCYpIGNvbnN0xAOeAnN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+Ojpkb19nZXRfeWVhcihzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHRtKikgY29uc3TFA6ECc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46OmRvX2dldF93ZWVrZGF5KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qKSBjb25zdMYDngJzdGQ6Ol9fMjo6dGltZV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPjo6ZG9fZ2V0X3RpbWUoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB0bSopIGNvbnN0xwOjAnN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+Ojpkb19nZXRfbW9udGhuYW1lKHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qKSBjb25zdMgDngJzdGQ6Ol9fMjo6dGltZV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPjo6ZG9fZ2V0X2RhdGUoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB0bSopIGNvbnN0yQOlAnN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB0bSosIGNoYXIsIGNoYXIpIGNvbnN0ygOpAnN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+OjpfX2dldF95ZWFyNChpbnQmLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4gY29uc3QmKSBjb25zdMsDqQJzdGQ6Ol9fMjo6dGltZV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPjo6X19nZXRfd2hpdGVfc3BhY2Uoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmN0eXBlPGNoYXI+IGNvbnN0JikgY29uc3TMA6sCc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46Ol9fZ2V0X3dlZWtkYXkoaW50Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmN0eXBlPGNoYXI+IGNvbnN0JikgY29uc3TNA6oCc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46Ol9fZ2V0X3NlY29uZChpbnQmLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4gY29uc3QmKSBjb25zdM4DpQJzdGQ6Ol9fMjo6dGltZV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPjo6X19nZXRfcGVyY2VudChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4gY29uc3QmKSBjb25zdM8DqQJzdGQ6Ol9fMjo6dGltZV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPjo6X19nZXRfbW9udGgoaW50Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmN0eXBlPGNoYXI+IGNvbnN0JikgY29uc3TQA6oCc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46Ol9fZ2V0X21pbnV0ZShpbnQmLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4gY29uc3QmKSBjb25zdNEDqAJzdGQ6Ol9fMjo6dGltZV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPjo6X19nZXRfaG91cihpbnQmLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4gY29uc3QmKSBjb25zdNIDsAJzdGQ6Ol9fMjo6dGltZV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPjo6X19nZXRfZGF5X3llYXJfbnVtKGludCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpjdHlwZTxjaGFyPiBjb25zdCYpIGNvbnN00wOnAnN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+OjpfX2dldF9kYXkoaW50Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmN0eXBlPGNoYXI+IGNvbnN0JikgY29uc3TUA6kCc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46Ol9fZ2V0X2FtX3BtKGludCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpjdHlwZTxjaGFyPiBjb25zdCYpIGNvbnN01QOrAnN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+OjpfX2dldF8xMl9ob3VyKGludCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpjdHlwZTxjaGFyPiBjb25zdCYpIGNvbnN01gPPCnN0ZDo6X18yOjpwYWlyPHN0ZDo6X18yOjpfX3RyZWVfaXRlcmF0b3I8c3RkOjpfXzI6Ol9fdmFsdWVfdHlwZTxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+LCBpbnQ+LCBzdGQ6Ol9fMjo6X190cmVlX25vZGU8c3RkOjpfXzI6Ol9fdmFsdWVfdHlwZTxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+LCBpbnQ+LCB2b2lkKj4qLCBsb25nPiwgYm9vbD4gc3RkOjpfXzI6Ol9fdHJlZTxzdGQ6Ol9fMjo6X192YWx1ZV90eXBlPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4sIGludD4sIHN0ZDo6X18yOjpfX21hcF92YWx1ZV9jb21wYXJlPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4sIHN0ZDo6X18yOjpfX3ZhbHVlX3R5cGU8c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiwgaW50Piwgc3RkOjpfXzI6Omxlc3M8c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiA+LCB0cnVlPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6X192YWx1ZV90eXBlPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4sIGludD4gPiA+OjpfX2VtcGxhY2VfdW5pcXVlX2tleV9hcmdzPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4sIHN0ZDo6X18yOjpwYWlyPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4sIGludD4gPihzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+IGNvbnN0Jiwgc3RkOjpfXzI6OnBhaXI8c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiwgaW50PiYmKdcDkwJzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiBzdGQ6Ol9fMjo6X19jb3B5X2NvbnN0ZXhwcjx3Y2hhcl90Kiwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPih3Y2hhcl90Kiwgd2NoYXJfdCosIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+KdgD+AFzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiBzdGQ6Ol9fMjo6X19jb3B5X2NvbnN0ZXhwcjxjaGFyKiwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPihjaGFyKiwgY2hhciosIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+KdkDKnN0ZDo6X18yOjpudW1wdW5jdDx3Y2hhcl90Pjo6fm51bXB1bmN0KCkuMdoDMHN0ZDo6X18yOjpudW1wdW5jdDx3Y2hhcl90Pjo6ZG9fdHJ1ZW5hbWUoKSBjb25zdNsDMHN0ZDo6X18yOjpudW1wdW5jdDx3Y2hhcl90Pjo6ZG9fZ3JvdXBpbmcoKSBjb25zdNwDMXN0ZDo6X18yOjpudW1wdW5jdDx3Y2hhcl90Pjo6ZG9fZmFsc2VuYW1lKCkgY29uc3TdAydzdGQ6Ol9fMjo6bnVtcHVuY3Q8Y2hhcj46On5udW1wdW5jdCgpLjHeAy1zdGQ6Ol9fMjo6bnVtcHVuY3Q8Y2hhcj46OmRvX3RydWVuYW1lKCkgY29uc3TfAzJzdGQ6Ol9fMjo6bnVtcHVuY3Q8Y2hhcj46OmRvX3Rob3VzYW5kc19zZXAoKSBjb25zdOADLXN0ZDo6X18yOjpudW1wdW5jdDxjaGFyPjo6ZG9fZ3JvdXBpbmcoKSBjb25zdOEDLnN0ZDo6X18yOjpudW1wdW5jdDxjaGFyPjo6ZG9fZmFsc2VuYW1lKCkgY29uc3TiAzJzdGQ6Ol9fMjo6bnVtcHVuY3Q8Y2hhcj46OmRvX2RlY2ltYWxfcG9pbnQoKSBjb25zdOMD5gFzdGQ6Ol9fMjo6bnVtX3B1dDx3Y2hhcl90LCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QsIHZvaWQgY29uc3QqKSBjb25zdOQD6AFzdGQ6Ol9fMjo6bnVtX3B1dDx3Y2hhcl90LCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QsIHVuc2lnbmVkIGxvbmcpIGNvbnN05QPtAXN0ZDo6X18yOjpudW1fcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+ID46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgdW5zaWduZWQgbG9uZyBsb25nKSBjb25zdOYD3wFzdGQ6Ol9fMjo6bnVtX3B1dDx3Y2hhcl90LCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QsIGxvbmcpIGNvbnN05wPkAXN0ZDo6X18yOjpudW1fcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+ID46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgbG9uZyBsb25nKSBjb25zdOgD5gFzdGQ6Ol9fMjo6bnVtX3B1dDx3Y2hhcl90LCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QsIGxvbmcgZG91YmxlKSBjb25zdOkD4QFzdGQ6Ol9fMjo6bnVtX3B1dDx3Y2hhcl90LCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QsIGRvdWJsZSkgY29uc3TqA98Bc3RkOjpfXzI6Om51bV9wdXQ8d2NoYXJfdCwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB3Y2hhcl90LCBib29sKSBjb25zdOsD1AFzdGQ6Ol9fMjo6bnVtX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIsIHZvaWQgY29uc3QqKSBjb25zdOwD1gFzdGQ6Ol9fMjo6bnVtX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIsIHVuc2lnbmVkIGxvbmcpIGNvbnN07QPbAXN0ZDo6X18yOjpudW1fcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciwgdW5zaWduZWQgbG9uZyBsb25nKSBjb25zdO4DzQFzdGQ6Ol9fMjo6bnVtX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIsIGxvbmcpIGNvbnN07wPSAXN0ZDo6X18yOjpudW1fcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciwgbG9uZyBsb25nKSBjb25zdPAD1AFzdGQ6Ol9fMjo6bnVtX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIsIGxvbmcgZG91YmxlKSBjb25zdPEDzwFzdGQ6Ol9fMjo6bnVtX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIsIGRvdWJsZSkgY29uc3TyA80Bc3RkOjpfXzI6Om51bV9wdXQ8Y2hhciwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyLCBib29sKSBjb25zdPMDsAJzdGQ6Ol9fMjo6bnVtX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB2b2lkKiYpIGNvbnN09AO5AnN0ZDo6X18yOjpudW1fZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+ID46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHVuc2lnbmVkIHNob3J0JikgY29uc3T1A70Cc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdW5zaWduZWQgbG9uZyBsb25nJikgY29uc3T2A7QCc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgbG9uZyBsb25nJikgY29uc3T3A7YCc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgbG9uZyBkb3VibGUmKSBjb25zdPgDrwJzdGQ6Ol9fMjo6bnVtX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBsb25nJikgY29uc3T5A7ACc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgZmxvYXQmKSBjb25zdPoDsQJzdGQ6Ol9fMjo6bnVtX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBkb3VibGUmKSBjb25zdPsDrwJzdGQ6Ol9fMjo6bnVtX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBib29sJikgY29uc3T8A5sCc3RkOjpfXzI6Om51bV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50Jiwgdm9pZComKSBjb25zdP0DpAJzdGQ6Ol9fMjo6bnVtX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB1bnNpZ25lZCBzaG9ydCYpIGNvbnN0/gOoAnN0ZDo6X18yOjpudW1fZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHVuc2lnbmVkIGxvbmcgbG9uZyYpIGNvbnN0/wOfAnN0ZDo6X18yOjpudW1fZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIGxvbmcgbG9uZyYpIGNvbnN0gAShAnN0ZDo6X18yOjpudW1fZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIGxvbmcgZG91YmxlJikgY29uc3SBBJoCc3RkOjpfXzI6Om51bV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgbG9uZyYpIGNvbnN0ggSbAnN0ZDo6X18yOjpudW1fZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIGZsb2F0JikgY29uc3SDBJwCc3RkOjpfXzI6Om51bV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgZG91YmxlJikgY29uc3SEBJoCc3RkOjpfXzI6Om51bV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgYm9vbCYpIGNvbnN0hQTIAnN0ZDo6X18yOjptb25leV9wdXQ8d2NoYXJfdCwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBib29sLCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB3Y2hhcl90LCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90PiA+IGNvbnN0JikgY29uc3SGBO4Bc3RkOjpfXzI6Om1vbmV5X3B1dDx3Y2hhcl90LCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIGJvb2wsIHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QsIGxvbmcgZG91YmxlKSBjb25zdIcErQJzdGQ6Ol9fMjo6bW9uZXlfcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgYm9vbCwgc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiBjb25zdCYpIGNvbnN0iATcAXN0ZDo6X18yOjptb25leV9wdXQ8Y2hhciwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBib29sLCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyLCBsb25nIGRvdWJsZSkgY29uc3SJBJEDc3RkOjpfXzI6Om1vbmV5X2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBib29sLCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90PiA+JikgY29uc3SKBL4Cc3RkOjpfXzI6Om1vbmV5X2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBib29sLCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBsb25nIGRvdWJsZSYpIGNvbnN0iwTzAnN0ZDo6X18yOjptb25leV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgYm9vbCwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiYpIGNvbnN0jASpAnN0ZDo6X18yOjptb25leV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgYm9vbCwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgbG9uZyBkb3VibGUmKSBjb25zdI0EoAFzdGQ6Ol9fMjo6bWVzc2FnZXM8d2NoYXJfdD46OmRvX2dldChsb25nLCBpbnQsIGludCwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4gPiBjb25zdCYpIGNvbnN0jgSUAXN0ZDo6X18yOjptZXNzYWdlczxjaGFyPjo6ZG9fZ2V0KGxvbmcsIGludCwgaW50LCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+IGNvbnN0JikgY29uc3SPBB5zdGQ6Ol9fMjo6bG9jYWxlOjppZDo6X19pbml0KCmQBCtzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldDo6X19vbl96ZXJvX3NoYXJlZCgpkQQbc3RkOjpfXzI6OmxvY2FsZTo6Y2xhc3NpYygpkgQjc3RkOjpfXzI6OmxvY2FsZTo6X19pbXA6On5fX2ltcCgpLjGTBC5zdGQ6Ol9fMjo6bG9jYWxlOjpfX2ltcDo6aGFzX2ZhY2V0KGxvbmcpIGNvbnN0lAQtc3RkOjpfXzI6OmxvY2FsZTo6X19pbXA6Ol9faW1wKHVuc2lnbmVkIGxvbmcplQQcc3RkOjpfXzI6OmxvY2FsZTo6X19nbG9iYWwoKZYEnANzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiBzdGQ6Ol9fMjo6bnVtX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+OjpfX2RvX2dldF91bnNpZ25lZDx1bnNpZ25lZCBzaG9ydD4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB1bnNpZ25lZCBzaG9ydCYpIGNvbnN0lwSkA3N0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+IHN0ZDo6X18yOjpudW1fZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+ID46Ol9fZG9fZ2V0X3Vuc2lnbmVkPHVuc2lnbmVkIGxvbmcgbG9uZz4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB1bnNpZ25lZCBsb25nIGxvbmcmKSBjb25zdJgEmANzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiBzdGQ6Ol9fMjo6bnVtX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+OjpfX2RvX2dldF91bnNpZ25lZDx1bnNpZ25lZCBpbnQ+KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdW5zaWduZWQgaW50JikgY29uc3SZBJADc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPjo6X19kb19nZXRfc2lnbmVkPGxvbmcgbG9uZz4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBsb25nIGxvbmcmKSBjb25zdJoEhgNzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiBzdGQ6Ol9fMjo6bnVtX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+OjpfX2RvX2dldF9zaWduZWQ8bG9uZz4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBsb25nJikgY29uc3SbBJwDc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4gPjo6X19kb19nZXRfZmxvYXRpbmdfcG9pbnQ8bG9uZyBkb3VibGU+KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgbG9uZyBkb3VibGUmKSBjb25zdJwEkANzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiBzdGQ6Ol9fMjo6bnVtX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiA+OjpfX2RvX2dldF9mbG9hdGluZ19wb2ludDxmbG9hdD4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBmbG9hdCYpIGNvbnN0nQSSA3N0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+IHN0ZDo6X18yOjpudW1fZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+ID46Ol9fZG9fZ2V0X2Zsb2F0aW5nX3BvaW50PGRvdWJsZT4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBkb3VibGUmKSBjb25zdJ4EgQNzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiBzdGQ6Ol9fMjo6bnVtX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+OjpfX2RvX2dldF91bnNpZ25lZDx1bnNpZ25lZCBzaG9ydD4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB1bnNpZ25lZCBzaG9ydCYpIGNvbnN0nwSJA3N0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+IHN0ZDo6X18yOjpudW1fZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46Ol9fZG9fZ2V0X3Vuc2lnbmVkPHVuc2lnbmVkIGxvbmcgbG9uZz4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB1bnNpZ25lZCBsb25nIGxvbmcmKSBjb25zdKAE/QJzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiBzdGQ6Ol9fMjo6bnVtX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+OjpfX2RvX2dldF91bnNpZ25lZDx1bnNpZ25lZCBpbnQ+KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdW5zaWduZWQgaW50JikgY29uc3ShBPUCc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gc3RkOjpfXzI6Om51bV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPjo6X19kb19nZXRfc2lnbmVkPGxvbmcgbG9uZz4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBsb25nIGxvbmcmKSBjb25zdKIE6wJzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiBzdGQ6Ol9fMjo6bnVtX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+OjpfX2RvX2dldF9zaWduZWQ8bG9uZz4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBsb25nJikgY29uc3SjBIEDc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gc3RkOjpfXzI6Om51bV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4gPjo6X19kb19nZXRfZmxvYXRpbmdfcG9pbnQ8bG9uZyBkb3VibGU+KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgbG9uZyBkb3VibGUmKSBjb25zdKQE9QJzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiBzdGQ6Ol9fMjo6bnVtX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPiA+OjpfX2RvX2dldF9mbG9hdGluZ19wb2ludDxmbG9hdD4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBmbG9hdCYpIGNvbnN0pQT3AnN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+IHN0ZDo6X18yOjpudW1fZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+ID46Ol9fZG9fZ2V0X2Zsb2F0aW5nX3BvaW50PGRvdWJsZT4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBkb3VibGUmKSBjb25zdKYEIXN0ZDo6X18yOjppb3NfYmFzZTo6fmlvc19iYXNlKCkuMacEIXN0ZDo6X18yOjppb3NfYmFzZTo6d2lkdGgoKSBjb25zdKgEJXN0ZDo6X18yOjppb3NfYmFzZTo6cHJlY2lzaW9uKCkgY29uc3SpBB9zdGQ6Ol9fMjo6aW9zX2Jhc2U6OmluaXQodm9pZCopqgQnc3RkOjpfXzI6Omlvc19iYXNlOjpjbGVhcih1bnNpZ25lZCBpbnQpqwQ/c3RkOjpfXzI6Omlvc19iYXNlOjpfX2NhbGxfY2FsbGJhY2tzKHN0ZDo6X18yOjppb3NfYmFzZTo6ZXZlbnQprAQXc3RkOjpfXzI6OmluaXRfd3dlZWtzKCmtBBhzdGQ6Ol9fMjo6aW5pdF93bW9udGhzKCmuBBZzdGQ6Ol9fMjo6aW5pdF93ZWVrcygprwQXc3RkOjpfXzI6OmluaXRfd2FtX3BtKCmwBBdzdGQ6Ol9fMjo6aW5pdF9tb250aHMoKbEEFnN0ZDo6X18yOjppbml0X2FtX3BtKCmyBJ8Cc3RkOjpfXzI6OmVuYWJsZV9pZjwoX19pc19jcHAxN19mb3J3YXJkX2l0ZXJhdG9yPGludCo+Ojp2YWx1ZSkgJiYgKGlzX2NvbnN0cnVjdGlibGU8aW50LCBzdGQ6Ol9fMjo6aXRlcmF0b3JfdHJhaXRzPGludCo+OjpyZWZlcmVuY2U+Ojp2YWx1ZSksIHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxpbnQqPiA+Ojp0eXBlIHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPjo6aW5zZXJ0PGludCo+KHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxpbnQgY29uc3QqPiwgaW50KiwgaW50KimzBOADc3RkOjpfXzI6OmVuYWJsZV9pZjwoKHN0ZDo6X18yOjppbnRlZ3JhbF9jb25zdGFudDxib29sLCBmYWxzZT46OnZhbHVlKSB8fCAoIShfX2hhc19jb25zdHJ1Y3Q8c3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDI4dWw+LCBib29sKiwgYm9vbD46OnZhbHVlKSkpICYmIChpc190cml2aWFsbHlfbW92ZV9jb25zdHJ1Y3RpYmxlPGJvb2w+Ojp2YWx1ZSksIHZvaWQ+Ojp0eXBlIHN0ZDo6X18yOjphbGxvY2F0b3JfdHJhaXRzPHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAyOHVsPiA+OjpfX2NvbnN0cnVjdF9iYWNrd2FyZF93aXRoX2V4Y2VwdGlvbl9ndWFyYW50ZWVzPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0Kj4oc3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDI4dWw+JiwgYm9vbCosIGJvb2wqLCBib29sKiYptARxc3RkOjpfXzI6OmRlcXVlPHN0ZDo6X18yOjpwYWlyPGludCwgaW50Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6cGFpcjxpbnQsIGludD4gPiA+OjpfX2FkZF9iYWNrX2NhcGFjaXR5KCm1BExzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD46OmRvX3dpZGVuKGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0Kiwgd2NoYXJfdCopIGNvbnN0tgQzc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+Ojpkb190b3VwcGVyKHdjaGFyX3QpIGNvbnN0twREc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+Ojpkb190b3VwcGVyKHdjaGFyX3QqLCB3Y2hhcl90IGNvbnN0KikgY29uc3S4BDNzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD46OmRvX3RvbG93ZXIod2NoYXJfdCkgY29uc3S5BERzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD46OmRvX3RvbG93ZXIod2NoYXJfdCosIHdjaGFyX3QgY29uc3QqKSBjb25zdLoEW3N0ZDo6X18yOjpjdHlwZTx3Y2hhcl90Pjo6ZG9fc2Nhbl9ub3QodW5zaWduZWQgc2hvcnQsIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KikgY29uc3S7BFpzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD46OmRvX3NjYW5faXModW5zaWduZWQgc2hvcnQsIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KikgY29uc3S8BDhzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD46OmRvX25hcnJvdyh3Y2hhcl90LCBjaGFyKSBjb25zdL0EVnN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90Pjo6ZG9fbmFycm93KHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KiwgY2hhciwgY2hhciopIGNvbnN0vgRWc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+Ojpkb19pcyh3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCosIHVuc2lnbmVkIHNob3J0KikgY29uc3S/BD5zdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD46OmRvX2lzKHVuc2lnbmVkIHNob3J0LCB3Y2hhcl90KSBjb25zdMAEIXN0ZDo6X18yOjpjdHlwZTxjaGFyPjo6fmN0eXBlKCkuMcEERnN0ZDo6X18yOjpjdHlwZTxjaGFyPjo6ZG9fd2lkZW4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyKikgY29uc3TCBC1zdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj46OmRvX3RvdXBwZXIoY2hhcikgY29uc3TDBDtzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj46OmRvX3RvdXBwZXIoY2hhciosIGNoYXIgY29uc3QqKSBjb25zdMQELXN0ZDo6X18yOjpjdHlwZTxjaGFyPjo6ZG9fdG9sb3dlcihjaGFyKSBjb25zdMUEO3N0ZDo6X18yOjpjdHlwZTxjaGFyPjo6ZG9fdG9sb3dlcihjaGFyKiwgY2hhciBjb25zdCopIGNvbnN0xgQyc3RkOjpfXzI6OmN0eXBlPGNoYXI+Ojpkb19uYXJyb3coY2hhciwgY2hhcikgY29uc3THBE1zdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj46OmRvX25hcnJvdyhjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIGNoYXIsIGNoYXIqKSBjb25zdMgESHN0ZDo6X18yOjpjdHlwZTxjaGFyPjo6Y3R5cGUodW5zaWduZWQgc2hvcnQgY29uc3QqLCBib29sLCB1bnNpZ25lZCBsb25nKckETnN0ZDo6X18yOjpjb2xsYXRlPHdjaGFyX3Q+Ojpkb190cmFuc2Zvcm0od2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqKSBjb25zdMoESXN0ZDo6X18yOjpjb2xsYXRlPHdjaGFyX3Q+Ojpkb19oYXNoKHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KikgY29uc3TLBGxzdGQ6Ol9fMjo6Y29sbGF0ZTx3Y2hhcl90Pjo6ZG9fY29tcGFyZSh3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KikgY29uc3TMBEVzdGQ6Ol9fMjo6Y29sbGF0ZTxjaGFyPjo6ZG9fdHJhbnNmb3JtKGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KikgY29uc3TNBEBzdGQ6Ol9fMjo6Y29sbGF0ZTxjaGFyPjo6ZG9faGFzaChjaGFyIGNvbnN0KiwgY2hhciBjb25zdCopIGNvbnN0zgRdc3RkOjpfXzI6OmNvbGxhdGU8Y2hhcj46OmRvX2NvbXBhcmUoY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdCopIGNvbnN0zwQ7c3RkOjpfXzI6OmNvZGVjdnQ8d2NoYXJfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojp+Y29kZWN2dCgpLjHQBGNzdGQ6Ol9fMjo6Y29kZWN2dDx3Y2hhcl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX3Vuc2hpZnQoX19tYnN0YXRlX3QmLCBjaGFyKiwgY2hhciosIGNoYXIqJikgY29uc3TRBJABc3RkOjpfXzI6OmNvZGVjdnQ8d2NoYXJfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19vdXQoX19tYnN0YXRlX3QmLCB3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqJiwgY2hhciosIGNoYXIqLCBjaGFyKiYpIGNvbnN00gREc3RkOjpfXzI6OmNvZGVjdnQ8d2NoYXJfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19tYXhfbGVuZ3RoKCkgY29uc3TTBHVzdGQ6Ol9fMjo6Y29kZWN2dDx3Y2hhcl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX2xlbmd0aChfX21ic3RhdGVfdCYsIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgbG9uZykgY29uc3TUBI8Bc3RkOjpfXzI6OmNvZGVjdnQ8d2NoYXJfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19pbihfX21ic3RhdGVfdCYsIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdComLCB3Y2hhcl90Kiwgd2NoYXJfdCosIHdjaGFyX3QqJikgY29uc3TVBEJzdGQ6Ol9fMjo6Y29kZWN2dDx3Y2hhcl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX2VuY29kaW5nKCkgY29uc3TWBHJzdGQ6Ol9fMjo6Y29kZWN2dDxjaGFyLCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX2xlbmd0aChfX21ic3RhdGVfdCYsIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgbG9uZykgY29uc3TXBJQBc3RkOjpfXzI6OmNvZGVjdnQ8Y2hhcjMyX3QsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9fb3V0KF9fbWJzdGF0ZV90JiwgY2hhcjMyX3QgY29uc3QqLCBjaGFyMzJfdCBjb25zdCosIGNoYXIzMl90IGNvbnN0KiYsIGNoYXIqLCBjaGFyKiwgY2hhciomKSBjb25zdNgEdnN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIzMl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX2xlbmd0aChfX21ic3RhdGVfdCYsIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgbG9uZykgY29uc3TZBJMBc3RkOjpfXzI6OmNvZGVjdnQ8Y2hhcjMyX3QsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9faW4oX19tYnN0YXRlX3QmLCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqJiwgY2hhcjMyX3QqLCBjaGFyMzJfdCosIGNoYXIzMl90KiYpIGNvbnN02gSUAXN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIxNl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX291dChfX21ic3RhdGVfdCYsIGNoYXIxNl90IGNvbnN0KiwgY2hhcjE2X3QgY29uc3QqLCBjaGFyMTZfdCBjb25zdComLCBjaGFyKiwgY2hhciosIGNoYXIqJikgY29uc3TbBHZzdGQ6Ol9fMjo6Y29kZWN2dDxjaGFyMTZfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19sZW5ndGgoX19tYnN0YXRlX3QmLCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGxvbmcpIGNvbnN03ASTAXN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIxNl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX2luKF9fbWJzdGF0ZV90JiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiYsIGNoYXIxNl90KiwgY2hhcjE2X3QqLCBjaGFyMTZfdComKSBjb25zdN0EZ3N0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+ID46OmNsZWFyKCneBIUBc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4gPjo6YXNzaWduKHdjaGFyX3QgY29uc3QqLCB1bnNpZ25lZCBsb25nKd8EhQFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90PiA+OjphcHBlbmQod2NoYXJfdCBjb25zdCosIHVuc2lnbmVkIGxvbmcp4AT3AXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+ID46Ol9fbW92ZV9hc3NpZ24oc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4gPiYsIHN0ZDo6X18yOjppbnRlZ3JhbF9jb25zdGFudDxib29sLCB0cnVlPinhBIUBc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4gPjo6X19pbml0KHdjaGFyX3QgY29uc3QqLCB1bnNpZ25lZCBsb25nKeIEfnN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+ID46Ol9faW5pdCh1bnNpZ25lZCBsb25nLCB3Y2hhcl90KeME9QFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90PiA+JiBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90PiA+OjpfX2FwcGVuZF9mb3J3YXJkX3Vuc2FmZTx3Y2hhcl90Kj4od2NoYXJfdCosIHdjaGFyX3QqKeQEkwJzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+IHN0ZDo6X18yOjpvcGVyYXRvcis8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4oY2hhciBjb25zdCosIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gY29uc3QmKeUEcnN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID46OnJlc2l6ZSh1bnNpZ25lZCBsb25nLCBjaGFyKeYEXnN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID46OmNsZWFyKCnnBIECc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPjo6YmFzaWNfc3RyaW5nKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gY29uc3QmLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+IGNvbnN0JinoBHlzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+Ojphc3NpZ24oY2hhciBjb25zdCosIHVuc2lnbmVkIGxvbmcp6QRyc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPjo6YXBwZW5kKHVuc2lnbmVkIGxvbmcsIGNoYXIp6gTlAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID46Ol9fbW92ZV9hc3NpZ24oc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiYsIHN0ZDo6X18yOjppbnRlZ3JhbF9jb25zdGFudDxib29sLCB0cnVlPinrBHJzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+OjpfX2luaXQodW5zaWduZWQgbG9uZywgY2hhcinsBIgBc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPjo6X19pbml0KGNoYXIgY29uc3QqLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nKe0EdHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID46Ol9fZXJhc2VfdG9fZW5kKHVuc2lnbmVkIGxvbmcp7gTaAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4mIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID46Ol9fYXBwZW5kX2ZvcndhcmRfdW5zYWZlPGNoYXIqPihjaGFyKiwgY2hhciop7wRZc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1Zjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPjo6fmJhc2ljX3N0cmVhbWJ1ZigpLjHwBGFzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+Ojp4c3B1dG4od2NoYXJfdCBjb25zdCosIGxvbmcp8QRbc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1Zjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPjo6eHNnZXRuKHdjaGFyX3QqLCBsb25nKfIETHN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID46OnVmbG93KCnzBFNzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+OjpzcHV0Yyh3Y2hhcl90KfQEU3N0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID46On5iYXNpY19zdHJlYW1idWYoKS4x9QRYc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPjo6eHNwdXRuKGNoYXIgY29uc3QqLCBsb25nKfYEUnN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID46OnhzZ2V0bihjaGFyKiwgbG9uZyn3BEZzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+Ojp1Zmxvdygp+ARKc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4gPjo6c3B1dGMoY2hhcin5BJUBc3RkOjpfXzI6OmJhc2ljX29zdHJlYW08d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID46OnNlbnRyeTo6c2VudHJ5KHN0ZDo6X18yOjpiYXNpY19vc3RyZWFtPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90PiA+Jin6BIkBc3RkOjpfXzI6OmJhc2ljX29zdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID46OnNlbnRyeTo6c2VudHJ5KHN0ZDo6X18yOjpiYXNpY19vc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+Jin7BJYBc3RkOjpfXzI6OmJhc2ljX2lzdHJlYW08d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+ID46OmJhc2ljX2lzdHJlYW0oc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1Zjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4gPiop/ASKAXN0ZDo6X18yOjpiYXNpY19pc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiA+OjpiYXNpY19pc3RyZWFtKHN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+ID4qKf0E0ANzdGQ6Ol9fMjo6YmFja19pbnNlcnRfaXRlcmF0b3I8c3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4gPiA+IHN0ZDo6X18yOjpfX3dpZGVuX2Zyb21fdXRmODwzMnVsPjo6b3BlcmF0b3IoKTxzdGQ6Ol9fMjo6YmFja19pbnNlcnRfaXRlcmF0b3I8c3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4gPiA+ID4oc3RkOjpfXzI6OmJhY2tfaW5zZXJ0X2l0ZXJhdG9yPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+ID4gPiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqKSBjb25zdP4EwgNzdGQ6Ol9fMjo6YmFja19pbnNlcnRfaXRlcmF0b3I8c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiA+IHN0ZDo6X18yOjpfX25hcnJvd190b191dGY4PDMydWw+OjpvcGVyYXRvcigpPHN0ZDo6X18yOjpiYWNrX2luc2VydF9pdGVyYXRvcjxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+ID4sIHdjaGFyX3Q+KHN0ZDo6X18yOjpiYWNrX2luc2VydF9pdGVyYXRvcjxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+ID4sIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KikgY29uc3T/BH5zdGQ6Ol9fMjo6X192ZWN0b3JfYmFzZTxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAyOHVsPiA+OjpfX3ZlY3Rvcl9iYXNlKCmABcoIc3RkOjpfXzI6Ol9fdHJlZV9pdGVyYXRvcjxzdGQ6Ol9fMjo6X192YWx1ZV90eXBlPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4sIGludD4sIHN0ZDo6X18yOjpfX3RyZWVfbm9kZTxzdGQ6Ol9fMjo6X192YWx1ZV90eXBlPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4sIGludD4sIHZvaWQqPiosIGxvbmc+IHN0ZDo6X18yOjpfX3RyZWU8c3RkOjpfXzI6Ol9fdmFsdWVfdHlwZTxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+LCBpbnQ+LCBzdGQ6Ol9fMjo6X19tYXBfdmFsdWVfY29tcGFyZTxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+LCBzdGQ6Ol9fMjo6X192YWx1ZV90eXBlPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4sIGludD4sIHN0ZDo6X18yOjpsZXNzPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gPiwgdHJ1ZT4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6Ol9fdmFsdWVfdHlwZTxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+LCBpbnQ+ID4gPjo6ZmluZDxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+ID4oc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiBjb25zdCYpgQVQc3RkOjpfXzI6Ol9fdGltZV9wdXQ6Ol9fZG9fcHV0KHdjaGFyX3QqLCB3Y2hhcl90KiYsIHRtIGNvbnN0KiwgY2hhciwgY2hhcikgY29uc3SCBTRzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8d2NoYXJfdD46Ol9feCgpIGNvbnN0gwU4c3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPHdjaGFyX3Q+OjpfX3dlZWtzKCkgY29uc3SEBTRzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8d2NoYXJfdD46Ol9fcigpIGNvbnN0hQU5c3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPHdjaGFyX3Q+OjpfX21vbnRocygpIGNvbnN0hgU0c3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPHdjaGFyX3Q+OjpfX2MoKSBjb25zdIcFOHN0ZDo6X18yOjpfX3RpbWVfZ2V0X2Nfc3RvcmFnZTx3Y2hhcl90Pjo6X19hbV9wbSgpIGNvbnN0iAU0c3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPHdjaGFyX3Q+OjpfX1goKSBjb25zdIkFMXN0ZDo6X18yOjpfX3RpbWVfZ2V0X2Nfc3RvcmFnZTxjaGFyPjo6X194KCkgY29uc3SKBTVzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8Y2hhcj46Ol9fd2Vla3MoKSBjb25zdIsFMXN0ZDo6X18yOjpfX3RpbWVfZ2V0X2Nfc3RvcmFnZTxjaGFyPjo6X19yKCkgY29uc3SMBTZzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8Y2hhcj46Ol9fbW9udGhzKCkgY29uc3SNBTFzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8Y2hhcj46Ol9fYygpIGNvbnN0jgU1c3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPGNoYXI+OjpfX2FtX3BtKCkgY29uc3SPBTFzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8Y2hhcj46Ol9fWCgpIGNvbnN0kAU8c3RkOjpfXzI6Ol9fc3Rkb3V0YnVmPHdjaGFyX3Q+Ojp4c3B1dG4od2NoYXJfdCBjb25zdCosIGxvbmcpkQU2c3RkOjpfXzI6Ol9fc3Rkb3V0YnVmPHdjaGFyX3Q+OjpvdmVyZmxvdyh1bnNpZ25lZCBpbnQpkgU+c3RkOjpfXzI6Ol9fc3Rkb3V0YnVmPHdjaGFyX3Q+OjppbWJ1ZShzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JimTBTZzdGQ6Ol9fMjo6X19zdGRvdXRidWY8Y2hhcj46OnhzcHV0bihjaGFyIGNvbnN0KiwgbG9uZymUBSpzdGQ6Ol9fMjo6X19zdGRvdXRidWY8Y2hhcj46Om92ZXJmbG93KGludCmVBTtzdGQ6Ol9fMjo6X19zdGRvdXRidWY8Y2hhcj46OmltYnVlKHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKZYFKnN0ZDo6X18yOjpfX3N0ZGluYnVmPHdjaGFyX3Q+Ojp1bmRlcmZsb3coKZcFJnN0ZDo6X18yOjpfX3N0ZGluYnVmPHdjaGFyX3Q+Ojp1ZmxvdygpmAU2c3RkOjpfXzI6Ol9fc3RkaW5idWY8d2NoYXJfdD46OnBiYWNrZmFpbCh1bnNpZ25lZCBpbnQpmQU9c3RkOjpfXzI6Ol9fc3RkaW5idWY8d2NoYXJfdD46OmltYnVlKHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKZoFQnN0ZDo6X18yOjpfX3N0ZGluYnVmPHdjaGFyX3Q+OjpfX3N0ZGluYnVmKF9JT19GSUxFKiwgX19tYnN0YXRlX3QqKZsFJ3N0ZDo6X18yOjpfX3N0ZGluYnVmPGNoYXI+Ojp1bmRlcmZsb3coKZwFI3N0ZDo6X18yOjpfX3N0ZGluYnVmPGNoYXI+Ojp1ZmxvdygpnQUqc3RkOjpfXzI6Ol9fc3RkaW5idWY8Y2hhcj46OnBiYWNrZmFpbChpbnQpngU6c3RkOjpfXzI6Ol9fc3RkaW5idWY8Y2hhcj46OmltYnVlKHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKZ8FP3N0ZDo6X18yOjpfX3N0ZGluYnVmPGNoYXI+OjpfX3N0ZGluYnVmKF9JT19GSUxFKiwgX19tYnN0YXRlX3QqKaAFX3N0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAyOHVsPjo6YWxsb2NhdGUodW5zaWduZWQgbG9uZywgdm9pZCBjb25zdCopoQXYAXN0ZDo6X18yOjpfX3NwbGl0X2J1ZmZlcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAyOHVsPiY+OjpfX3NwbGl0X2J1ZmZlcih1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCBzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMjh1bD4mKaIFxgFzdGQ6Ol9fMjo6X19zcGxpdF9idWZmZXI8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCBzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMjh1bD4mPjo6X19kZXN0cnVjdF9hdF9lbmQoc3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqKiwgc3RkOjpfXzI6OmludGVncmFsX2NvbnN0YW50PGJvb2wsIGZhbHNlPimjBZEBc3RkOjpfXzI6Ol9fc3BsaXRfYnVmZmVyPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0Kiwgc3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDI4dWw+Jj46Ol9fY29uc3RydWN0X2F0X2VuZCh1bnNpZ25lZCBsb25nKaQFLXN0ZDo6X18yOjpfX3NoYXJlZF9jb3VudDo6fl9fc2hhcmVkX2NvdW50KCkuMaUFgQRzdGQ6Ol9fMjo6X19tb25leV9nZXQ8d2NoYXJfdD46Ol9fZ2F0aGVyX2luZm8oYm9vbCwgc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYsIHN0ZDo6X18yOjptb25leV9iYXNlOjpwYXR0ZXJuJiwgd2NoYXJfdCYsIHdjaGFyX3QmLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+Jiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4gPiYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+ID4mLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90PiA+JiwgaW50JimmBd0Dc3RkOjpfXzI6Ol9fbW9uZXlfZ2V0PGNoYXI+OjpfX2dhdGhlcl9pbmZvKGJvb2wsIHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmLCBzdGQ6Ol9fMjo6bW9uZXlfYmFzZTo6cGF0dGVybiYsIGNoYXImLCBjaGFyJiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4mLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+Jiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiYsIGludCYppwV1c3RkOjpfXzI6Ol9fbGliY3BwX3djc25ydG9tYnNfbChjaGFyKiwgd2NoYXJfdCBjb25zdCoqLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCBfX21ic3RhdGVfdCosIF9fbG9jYWxlX3N0cnVjdCopqAUzc3RkOjpfXzI6Ol9fbGliY3BwX3JlZnN0cmluZzo6fl9fbGliY3BwX3JlZnN0cmluZygpqQU9c3RkOjpfXzI6Ol9fbGliY3BwX3JlZnN0cmluZzo6X19saWJjcHBfcmVmc3RyaW5nKGNoYXIgY29uc3QqKaoFU3N0ZDo6X18yOjpfX2xpYmNwcF9tYnRvd2NfbCh3Y2hhcl90KiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGxvbmcsIF9fbG9jYWxlX3N0cnVjdCopqwVlc3RkOjpfXzI6Ol9fbGliY3BwX21ic3J0b3djc19sKHdjaGFyX3QqLCBjaGFyIGNvbnN0KiosIHVuc2lnbmVkIGxvbmcsIF9fbWJzdGF0ZV90KiwgX19sb2NhbGVfc3RydWN0KimsBXVzdGQ6Ol9fMjo6X19saWJjcHBfbWJzbnJ0b3djc19sKHdjaGFyX3QqLCBjaGFyIGNvbnN0KiosIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIF9fbWJzdGF0ZV90KiwgX19sb2NhbGVfc3RydWN0KimtBVdzdGQ6Ol9fMjo6X19saWJjcHBfbWJybGVuX2woY2hhciBjb25zdCosIHVuc2lnbmVkIGxvbmcsIF9fbWJzdGF0ZV90KiwgX19sb2NhbGVfc3RydWN0KimuBXxzdGQ6Ol9fMjo6X19jb21wcmVzc2VkX3BhaXI8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqKiwgc3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDI4dWw+Jj46OnNlY29uZCgprwVGc3RkOjpfXzI6Ol9fY2FsbF9vbmNlKHVuc2lnbmVkIGxvbmcgdm9sYXRpbGUmLCB2b2lkKiwgdm9pZCAoKikodm9pZCopKbAFQHN0ZDo6X18yOjooYW5vbnltb3VzIG5hbWVzcGFjZSk6Ol9fZmFrZV9iaW5kOjpvcGVyYXRvcigpKCkgY29uc3SxBSBzdGQ6Ol9fMjo6RG9JT1NJbml0OjpEb0lPU0luaXQoKbIFCHNuX3dyaXRlswUTcG9wX2FyZ19sb25nX2RvdWJsZbQFCm1ic25ydG93Y3O1BQRtYWlutgVDbG9uZyBkb3VibGUgc3RkOjpfXzI6Ol9fZG9fc3RydG9kPGxvbmcgZG91YmxlPihjaGFyIGNvbnN0KiwgY2hhcioqKbcFGGxlZ2Fsc3R1YiRkeW5DYWxsX3ZpaWppabgFFmxlZ2Fsc3R1YiRkeW5DYWxsX2ppamm5BRlsZWdhbHN0dWIkZHluQ2FsbF9paWlpaWpqugUYbGVnYWxzdHViJGR5bkNhbGxfaWlpaWlquwUabGVnYWxzdHViJGR5bkNhbGxfaWlpaWlpamq8BRhpbml0aWFsaXplX2NhY2hlc2luZ2xlKCm9BQhoZXhmbG9hdL4FBWZwdXRjvwUFZm10X3jABQVmbXRfb8EFBmZtdF9mcMIFjwFmbG9hdCBlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWVtYmVyQWNjZXNzPEZ1bGxFdmFsUmVzdWx0LCBmbG9hdD46OmdldFdpcmU8RnVsbEV2YWxSZXN1bHQ+KGZsb2F0IEZ1bGxFdmFsUmVzdWx0OjoqIGNvbnN0JiwgRnVsbEV2YWxSZXN1bHQgY29uc3QmKcMFuAFldmFsKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4sIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4sIGJvb2wpxAWoAWVtc2NyaXB0ZW46OmludGVybmFsOjpWZWN0b3JBY2Nlc3M8c3RkOjpfXzI6OnZlY3RvcjxpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8aW50PiA+ID46OnNldChzdGQ6Ol9fMjo6dmVjdG9yPGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxpbnQ+ID4mLCB1bnNpZ25lZCBsb25nLCBpbnQgY29uc3QmKcUFogFlbXNjcmlwdGVuOjppbnRlcm5hbDo6VmVjdG9yQWNjZXNzPHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPiA+OjpnZXQoc3RkOjpfXzI6OnZlY3RvcjxpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8aW50PiA+IGNvbnN0JiwgdW5zaWduZWQgbG9uZynGBbcBZW1zY3JpcHRlbjo6aW50ZXJuYWw6OlZlY3RvckFjY2VzczxzdGQ6Ol9fMjo6dmVjdG9yPGRvdWJsZSwgc3RkOjpfXzI6OmFsbG9jYXRvcjxkb3VibGU+ID4gPjo6c2V0KHN0ZDo6X18yOjp2ZWN0b3I8ZG91YmxlLCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGRvdWJsZT4gPiYsIHVuc2lnbmVkIGxvbmcsIGRvdWJsZSBjb25zdCYpxwWuAWVtc2NyaXB0ZW46OmludGVybmFsOjpWZWN0b3JBY2Nlc3M8c3RkOjpfXzI6OnZlY3Rvcjxkb3VibGUsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZG91YmxlPiA+ID46OmdldChzdGQ6Ol9fMjo6dmVjdG9yPGRvdWJsZSwgc3RkOjpfXzI6OmFsbG9jYXRvcjxkb3VibGU+ID4gY29uc3QmLCB1bnNpZ25lZCBsb25nKcgF+wJlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjx2b2lkIChzdGQ6Ol9fMjo6dmVjdG9yPGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxpbnQ+ID46OiopKHVuc2lnbmVkIGxvbmcsIGludCBjb25zdCYpLCB2b2lkLCBzdGQ6Ol9fMjo6dmVjdG9yPGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxpbnQ+ID4qLCB1bnNpZ25lZCBsb25nLCBpbnQgY29uc3QmPjo6aW52b2tlKHZvaWQgKHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPjo6KiBjb25zdCYpKHVuc2lnbmVkIGxvbmcsIGludCBjb25zdCYpLCBzdGQ6Ol9fMjo6dmVjdG9yPGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxpbnQ+ID4qLCB1bnNpZ25lZCBsb25nLCBpbnQpyQW/AmVtc2NyaXB0ZW46OmludGVybmFsOjpNZXRob2RJbnZva2VyPHZvaWQgKHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPjo6KikoaW50IGNvbnN0JiksIHZvaWQsIHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPiosIGludCBjb25zdCY+OjppbnZva2Uodm9pZCAoc3RkOjpfXzI6OnZlY3RvcjxpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8aW50PiA+OjoqIGNvbnN0JikoaW50IGNvbnN0JiksIHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPiosIGludCnKBZ8DZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8dm9pZCAoc3RkOjpfXzI6OnZlY3Rvcjxkb3VibGUsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZG91YmxlPiA+OjoqKSh1bnNpZ25lZCBsb25nLCBkb3VibGUgY29uc3QmKSwgdm9pZCwgc3RkOjpfXzI6OnZlY3Rvcjxkb3VibGUsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZG91YmxlPiA+KiwgdW5zaWduZWQgbG9uZywgZG91YmxlIGNvbnN0Jj46Omludm9rZSh2b2lkIChzdGQ6Ol9fMjo6dmVjdG9yPGRvdWJsZSwgc3RkOjpfXzI6OmFsbG9jYXRvcjxkb3VibGU+ID46OiogY29uc3QmKSh1bnNpZ25lZCBsb25nLCBkb3VibGUgY29uc3QmKSwgc3RkOjpfXzI6OnZlY3Rvcjxkb3VibGUsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZG91YmxlPiA+KiwgdW5zaWduZWQgbG9uZywgZG91YmxlKcsF4wJlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjx2b2lkIChzdGQ6Ol9fMjo6dmVjdG9yPGRvdWJsZSwgc3RkOjpfXzI6OmFsbG9jYXRvcjxkb3VibGU+ID46OiopKGRvdWJsZSBjb25zdCYpLCB2b2lkLCBzdGQ6Ol9fMjo6dmVjdG9yPGRvdWJsZSwgc3RkOjpfXzI6OmFsbG9jYXRvcjxkb3VibGU+ID4qLCBkb3VibGUgY29uc3QmPjo6aW52b2tlKHZvaWQgKHN0ZDo6X18yOjp2ZWN0b3I8ZG91YmxlLCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGRvdWJsZT4gPjo6KiBjb25zdCYpKGRvdWJsZSBjb25zdCYpLCBzdGQ6Ol9fMjo6dmVjdG9yPGRvdWJsZSwgc3RkOjpfXzI6OmFsbG9jYXRvcjxkb3VibGU+ID4qLCBkb3VibGUpzAWrA2Vtc2NyaXB0ZW46OmludGVybmFsOjpJbnZva2VyPEZ1bGxGb2xkUmVzdWx0Kiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiBjb25zdCYsIGRvdWJsZT46Omludm9rZShGdWxsRm9sZFJlc3VsdCogKCopKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gY29uc3QmLCBkb3VibGUpLCBlbXNjcmlwdGVuOjppbnRlcm5hbDo6QmluZGluZ1R5cGU8c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiwgdm9pZD46Oid1bm5hbWVkJyosIGRvdWJsZSnNBcMDZW1zY3JpcHRlbjo6aW50ZXJuYWw6Okludm9rZXI8RnVsbEZvbGRSZXN1bHQqLCBkb3VibGUsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gY29uc3QmLCBkb3VibGU+OjppbnZva2UoRnVsbEZvbGRSZXN1bHQqICgqKShkb3VibGUsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gY29uc3QmLCBkb3VibGUpLCBkb3VibGUsIGVtc2NyaXB0ZW46OmludGVybmFsOjpCaW5kaW5nVHlwZTxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+LCB2b2lkPjo6J3VubmFtZWQnKiwgZG91YmxlKc4F6gVlbXNjcmlwdGVuOjppbnRlcm5hbDo6SW52b2tlcjxGdWxsRXZhbFJlc3VsdCosIGludCwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiBjb25zdCYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gY29uc3QmPjo6aW52b2tlKEZ1bGxFdmFsUmVzdWx0KiAoKikoaW50LCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+IGNvbnN0Jiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiBjb25zdCYpLCBpbnQsIGVtc2NyaXB0ZW46OmludGVybmFsOjpCaW5kaW5nVHlwZTxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+LCB2b2lkPjo6J3VubmFtZWQnKiwgZW1zY3JpcHRlbjo6aW50ZXJuYWw6OkJpbmRpbmdUeXBlPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4sIHZvaWQ+OjondW5uYW1lZCcqKc8F+QJlbXNjcmlwdGVuOjppbnRlcm5hbDo6RnVuY3Rpb25JbnZva2VyPGJvb2wgKCopKHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPiYsIHVuc2lnbmVkIGxvbmcsIGludCBjb25zdCYpLCBib29sLCBzdGQ6Ol9fMjo6dmVjdG9yPGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxpbnQ+ID4mLCB1bnNpZ25lZCBsb25nLCBpbnQgY29uc3QmPjo6aW52b2tlKGJvb2wgKCoqKShzdGQ6Ol9fMjo6dmVjdG9yPGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxpbnQ+ID4mLCB1bnNpZ25lZCBsb25nLCBpbnQgY29uc3QmKSwgc3RkOjpfXzI6OnZlY3RvcjxpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8aW50PiA+KiwgdW5zaWduZWQgbG9uZywgaW50KdAFnQNlbXNjcmlwdGVuOjppbnRlcm5hbDo6RnVuY3Rpb25JbnZva2VyPGJvb2wgKCopKHN0ZDo6X18yOjp2ZWN0b3I8ZG91YmxlLCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGRvdWJsZT4gPiYsIHVuc2lnbmVkIGxvbmcsIGRvdWJsZSBjb25zdCYpLCBib29sLCBzdGQ6Ol9fMjo6dmVjdG9yPGRvdWJsZSwgc3RkOjpfXzI6OmFsbG9jYXRvcjxkb3VibGU+ID4mLCB1bnNpZ25lZCBsb25nLCBkb3VibGUgY29uc3QmPjo6aW52b2tlKGJvb2wgKCoqKShzdGQ6Ol9fMjo6dmVjdG9yPGRvdWJsZSwgc3RkOjpfXzI6OmFsbG9jYXRvcjxkb3VibGU+ID4mLCB1bnNpZ25lZCBsb25nLCBkb3VibGUgY29uc3QmKSwgc3RkOjpfXzI6OnZlY3Rvcjxkb3VibGUsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZG91YmxlPiA+KiwgdW5zaWduZWQgbG9uZywgZG91YmxlKdEFtQNlbXNjcmlwdGVuOjppbnRlcm5hbDo6QmluZGluZ1R5cGU8c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiwgdm9pZD46Oid1bm5hbWVkJyogZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1lbWJlckFjY2VzczxGdWxsRm9sZFJlc3VsdCwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiA+OjpnZXRXaXJlPEZ1bGxGb2xkUmVzdWx0PihzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiA+IEZ1bGxGb2xkUmVzdWx0OjoqIGNvbnN0JiwgRnVsbEZvbGRSZXN1bHQgY29uc3QmKdIFlQFlbXNjcmlwdGVuOjpjbGFzc188c3RkOjpfXzI6OnZlY3RvcjxpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8aW50PiA+LCBlbXNjcmlwdGVuOjppbnRlcm5hbDo6Tm9CYXNlQ2xhc3M+IGVtc2NyaXB0ZW46OnJlZ2lzdGVyX3ZlY3RvcjxpbnQ+KGNoYXIgY29uc3QqKdMFngFlbXNjcmlwdGVuOjpjbGFzc188c3RkOjpfXzI6OnZlY3Rvcjxkb3VibGUsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZG91YmxlPiA+LCBlbXNjcmlwdGVuOjppbnRlcm5hbDo6Tm9CYXNlQ2xhc3M+IGVtc2NyaXB0ZW46OnJlZ2lzdGVyX3ZlY3Rvcjxkb3VibGU+KGNoYXIgY29uc3QqKdQFD2R5bkNhbGxfdmlpaWlpadUFDmR5bkNhbGxfdmlpaWlp1gUNZHluQ2FsbF92aWlpadcFDWR5bkNhbGxfdmlpaWTYBQxkeW5DYWxsX3ZpaWnZBQxkeW5DYWxsX3ZpaWbaBQxkeW5DYWxsX3ZpaWTbBQtkeW5DYWxsX3ZpadwFCmR5bkNhbGxfdmndBQlkeW5DYWxsX3beBRFkeW5DYWxsX2lpaWlpaWlpad8FEGR5bkNhbGxfaWlpaWlpaWngBQ9keW5DYWxsX2lpaWlpaWnhBQ5keW5DYWxsX2lpaWlpaeIFDmR5bkNhbGxfaWlpaWlk4wUNZHluQ2FsbF9paWlpaeQFDWR5bkNhbGxfaWlpaWTlBQxkeW5DYWxsX2lpaWnmBQxkeW5DYWxsX2lpaWTnBQtkeW5DYWxsX2lpaegFD2R5bkNhbGxfaWlkaWlpaekFDWR5bkNhbGxfaWlkaWTqBQtkeW5DYWxsX2lpZOsFCmR5bkNhbGxfaWnsBQxkeW5DYWxsX2lkaWTtBQtkeW5DYWxsX2Zpae4FC2R5bkNhbGxfZGlp7wWSAWRvdWJsZSBlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWVtYmVyQWNjZXNzPEZ1bGxGb2xkUmVzdWx0LCBkb3VibGU+OjpnZXRXaXJlPEZ1bGxGb2xkUmVzdWx0Pihkb3VibGUgRnVsbEZvbGRSZXN1bHQ6OiogY29uc3QmLCBGdWxsRm9sZFJlc3VsdCBjb25zdCYp8AUHZG9fcmVhZPEFCGRlY2Zsb2F08gWKAmJvb2wgc3RkOjpfXzI6OmVxdWFsPHN0ZDo6X18yOjpfX3dyYXBfaXRlcjx3Y2hhcl90Kj4sIHN0ZDo6X18yOjpfX3dyYXBfaXRlcjx3Y2hhcl90Kj4sIHN0ZDo6X18yOjpfX2VxdWFsX3RvPHdjaGFyX3QsIHdjaGFyX3Q+ID4oc3RkOjpfXzI6Ol9fd3JhcF9pdGVyPHdjaGFyX3QqPiwgc3RkOjpfXzI6Ol9fd3JhcF9pdGVyPHdjaGFyX3QqPiwgc3RkOjpfXzI6Ol9fd3JhcF9pdGVyPHdjaGFyX3QqPiwgc3RkOjpfXzI6Ol9fZXF1YWxfdG88d2NoYXJfdCwgd2NoYXJfdD4p8wXvAWJvb2wgc3RkOjpfXzI6OmVxdWFsPHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyKj4sIHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyKj4sIHN0ZDo6X18yOjpfX2VxdWFsX3RvPGNoYXIsIGNoYXI+ID4oc3RkOjpfXzI6Ol9fd3JhcF9pdGVyPGNoYXIqPiwgc3RkOjpfXzI6Ol9fd3JhcF9pdGVyPGNoYXIqPiwgc3RkOjpfXzI6Ol9fd3JhcF9pdGVyPGNoYXIqPiwgc3RkOjpfXzI6Ol9fZXF1YWxfdG88Y2hhciwgY2hhcj4p9AUFYXJnX271BRFfZW9zX2NiKGludCwgaW50KfYFEV9fd2FzbV9jYWxsX2N0b3Jz9wUNX19zdHJpbmdfcmVhZPgFCF9fc3RyZHVw+QUNX19zdGRpb193cml0ZfoFDF9fc3RkaW9fc2Vla/sFDF9fc3RkaW9fcmVhZPwFDV9fc3RkaW9fY2xvc2X9BQtfX25ld2xvY2FsZf4FCF9fbXVubWFw/wUHX19nZXRmMoAGDF9fZ2V0X2xvY2FsZYEGDV9fZ2V0VHlwZU5hbWWCBg1fX2ZwY2xhc3NpZnlsgwYNX19leHRlbmRzZnRmMoQGEF9fZXJybm9fbG9jYXRpb26FBhhfX2Vtc2NyaXB0ZW5fc3Rkb3V0X3NlZWuGBiBfX2Vtc2NyaXB0ZW5fZW52aXJvbl9jb25zdHJ1Y3RvcocGc19fY3h4YWJpdjE6Ol9fdm1pX2NsYXNzX3R5cGVfaW5mbzo6c2VhcmNoX2JlbG93X2RzdChfX2N4eGFiaXYxOjpfX2R5bmFtaWNfY2FzdF9pbmZvKiwgdm9pZCBjb25zdCosIGludCwgYm9vbCkgY29uc3SIBoABX19jeHhhYml2MTo6X192bWlfY2xhc3NfdHlwZV9pbmZvOjpzZWFyY2hfYWJvdmVfZHN0KF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkIGNvbnN0Kiwgdm9pZCBjb25zdCosIGludCwgYm9vbCkgY29uc3SJBnJfX2N4eGFiaXYxOjpfX3ZtaV9jbGFzc190eXBlX2luZm86Omhhc191bmFtYmlndW91c19wdWJsaWNfYmFzZShfX2N4eGFiaXYxOjpfX2R5bmFtaWNfY2FzdF9pbmZvKiwgdm9pZCosIGludCkgY29uc3SKBnJfX2N4eGFiaXYxOjpfX3NpX2NsYXNzX3R5cGVfaW5mbzo6c2VhcmNoX2JlbG93X2RzdChfX2N4eGFiaXYxOjpfX2R5bmFtaWNfY2FzdF9pbmZvKiwgdm9pZCBjb25zdCosIGludCwgYm9vbCkgY29uc3SLBn9fX2N4eGFiaXYxOjpfX3NpX2NsYXNzX3R5cGVfaW5mbzo6c2VhcmNoX2Fib3ZlX2RzdChfX2N4eGFiaXYxOjpfX2R5bmFtaWNfY2FzdF9pbmZvKiwgdm9pZCBjb25zdCosIHZvaWQgY29uc3QqLCBpbnQsIGJvb2wpIGNvbnN0jAZxX19jeHhhYml2MTo6X19zaV9jbGFzc190eXBlX2luZm86Omhhc191bmFtYmlndW91c19wdWJsaWNfYmFzZShfX2N4eGFiaXYxOjpfX2R5bmFtaWNfY2FzdF9pbmZvKiwgdm9pZCosIGludCkgY29uc3SNBlxfX2N4eGFiaXYxOjpfX3BvaW50ZXJfdHlwZV9pbmZvOjpjYW5fY2F0Y2hfbmVzdGVkKF9fY3h4YWJpdjE6Ol9fc2hpbV90eXBlX2luZm8gY29uc3QqKSBjb25zdI4GXV9fY3h4YWJpdjE6Ol9fcG9pbnRlcl90eXBlX2luZm86OmNhbl9jYXRjaChfX2N4eGFiaXYxOjpfX3NoaW1fdHlwZV9pbmZvIGNvbnN0Kiwgdm9pZComKSBjb25zdI8GW19fY3h4YWJpdjE6Ol9fcGJhc2VfdHlwZV9pbmZvOjpjYW5fY2F0Y2goX19jeHhhYml2MTo6X19zaGltX3R5cGVfaW5mbyBjb25zdCosIHZvaWQqJikgY29uc3SQBmFfX2N4eGFiaXYxOjpfX2Z1bmRhbWVudGFsX3R5cGVfaW5mbzo6Y2FuX2NhdGNoKF9fY3h4YWJpdjE6Ol9fc2hpbV90eXBlX2luZm8gY29uc3QqLCB2b2lkKiYpIGNvbnN0kQZvX19jeHhhYml2MTo6X19jbGFzc190eXBlX2luZm86OnNlYXJjaF9iZWxvd19kc3QoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQgY29uc3QqLCBpbnQsIGJvb2wpIGNvbnN0kgZ8X19jeHhhYml2MTo6X19jbGFzc190eXBlX2luZm86OnNlYXJjaF9hYm92ZV9kc3QoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQgY29uc3QqLCB2b2lkIGNvbnN0KiwgaW50LCBib29sKSBjb25zdJMGbl9fY3h4YWJpdjE6Ol9fY2xhc3NfdHlwZV9pbmZvOjpoYXNfdW5hbWJpZ3VvdXNfcHVibGljX2Jhc2UoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQqLCBpbnQpIGNvbnN0lAZbX19jeHhhYml2MTo6X19jbGFzc190eXBlX2luZm86OmNhbl9jYXRjaChfX2N4eGFiaXYxOjpfX3NoaW1fdHlwZV9pbmZvIGNvbnN0Kiwgdm9pZComKSBjb25zdJUGSV9fY3h4YWJpdjE6Oihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6SW5pdEJ5dGVOb1RocmVhZHM6OmFjcXVpcmVfaW5pdF9ieXRlKCmWBnlfX2N4eGFiaXYxOjooYW5vbnltb3VzIG5hbWVzcGFjZSk6Okd1YXJkT2JqZWN0PF9fY3h4YWJpdjE6Oihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6SW5pdEJ5dGVOb1RocmVhZHM+OjpjeGFfZ3VhcmRfcmVsZWFzZSgplwZ5X19jeHhhYml2MTo6KGFub255bW91cyBuYW1lc3BhY2UpOjpHdWFyZE9iamVjdDxfX2N4eGFiaXYxOjooYW5vbnltb3VzIG5hbWVzcGFjZSk6OkluaXRCeXRlTm9UaHJlYWRzPjo6Y3hhX2d1YXJkX2FjcXVpcmUoKZgGGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjg1mQYaX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuNzCaBhpfX2N4eF9nbG9iYWxfYXJyYXlfZHRvci41NZsGGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjQ0nAYaX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuNDKdBhpfX2N4eF9nbG9iYWxfYXJyYXlfZHRvci40MJ4GGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjM4nwYaX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuMzagBhpfX2N4eF9nbG9iYWxfYXJyYXlfZHRvci4zNKEGGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjMyogYZX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuMqMGG19fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjEzNqQGG19fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjEzM6UGG19fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjEwOaYGG19fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjEuMacGGV9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjGoBhdfX2N4eF9nbG9iYWxfYXJyYXlfZHRvcqkGEl9fY3hhX3B1cmVfdmlydHVhbKoGTFNTdHJ1Y3Q6OlNldE1hcHBpbmcoc3RkOjpfXzI6OnZlY3RvcjxpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8aW50PiA+IGNvbnN0JimrBiBTU3RydWN0OjpTU3RydWN0KFNTdHJ1Y3QgY29uc3QmKawGcVNTdHJ1Y3Q6OkxvYWRTdHJpbmcoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiBjb25zdCYprQZ0U1N0cnVjdDo6RmlsdGVyU2VxdWVuY2Uoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPikgY29uc3SuBl5TU3RydWN0OjpDb252ZXJ0TWFwcGluZ1RvUGFyZW5zKHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPiBjb25zdCYpIGNvbnN0rwYkU1N0cnVjdDo6Q29udGFpbnNQc2V1ZG9rbm90cygpIGNvbnN0sAYuUGFyYW1ldGVyTWFuYWdlcjxmbG9hdD46On5QYXJhbWV0ZXJNYW5hZ2VyKCkuMbEGKlBhcmFtZXRlck1hbmFnZXI8ZmxvYXQ+OjpDbGVhclBhcmFtZXRlcnMoKbIGKkluZmVyZW5jZUVuZ2luZTxmbG9hdD46On5JbmZlcmVuY2VFbmdpbmUoKbMGX0luZmVyZW5jZUVuZ2luZTxmbG9hdD46OlVzZUNvbnN0cmFpbnRzKHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4gPiBjb25zdCYptAZESW5mZXJlbmNlRW5naW5lPGZsb2F0Pjo6UmVnaXN0ZXJQYXJhbWV0ZXJzKFBhcmFtZXRlck1hbmFnZXI8ZmxvYXQ+Jim1BjZJbmZlcmVuY2VFbmdpbmU8ZmxvYXQ+OjpQcmVkaWN0UGFpcmluZ3NWaXRlcmJpKCkgY29uc3S2Bl9JbmZlcmVuY2VFbmdpbmU8ZmxvYXQ+OjpMb2FkVmFsdWVzKHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+ID4gY29uc3QmKbcGLUluZmVyZW5jZUVuZ2luZTxmbG9hdD46OkluZmVyZW5jZUVuZ2luZShib29sKbgGKEluZmVyZW5jZUVuZ2luZTxmbG9hdD46OkNvbXB1dGVWaXRlcmJpKCm5BoEBRnVsbEZvbGRUZW1wZXJhdHVyZShkb3VibGUsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gY29uc3QmLCBkb3VibGUpugbJAUZ1bGxFdmFsKGludCwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4gPiBjb25zdCYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+ID4gY29uc3QmKbsGREZ1bGxFdmFsUmVzdWx0KiBlbXNjcmlwdGVuOjppbnRlcm5hbDo6b3BlcmF0b3JfbmV3PEZ1bGxFdmFsUmVzdWx0PigpvAZuRW1zY3JpcHRlbkJpbmRpbmdJbml0aWFsaXplcl9uYXRpdmVfYW5kX2J1aWx0aW5fdHlwZXM6OkVtc2NyaXB0ZW5CaW5kaW5nSW5pdGlhbGl6ZXJfbmF0aXZlX2FuZF9idWlsdGluX3R5cGVzKCm9Bl5FbXNjcmlwdGVuQmluZGluZ0luaXRpYWxpemVyX0Vtc2NyaXB0ZW5CcmlkZ2U6OkVtc2NyaXB0ZW5CaW5kaW5nSW5pdGlhbGl6ZXJfRW1zY3JpcHRlbkJyaWRnZSgp";

if (!isDataURI(wasmBinaryFile)) {
 wasmBinaryFile = locateFile(wasmBinaryFile);
}

function getBinary() {
 try {
  if (wasmBinary) {
   return new Uint8Array(wasmBinary);
  }
  var binary = tryParseAsDataURI(wasmBinaryFile);
  if (binary) {
   return binary;
  }
  if (readBinary) {
   return readBinary(wasmBinaryFile);
  } else {
   throw "both async and sync fetching of the wasm failed";
  }
 } catch (err) {
  abort(err);
 }
}

function getBinaryPromise() {
 if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function" && !isFileURI(wasmBinaryFile)) {
  return fetch(wasmBinaryFile, {
   credentials: "same-origin"
  }).then(function(response) {
   if (!response["ok"]) {
    throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
   }
   return response["arrayBuffer"]();
  }).catch(function() {
   return getBinary();
  });
 }
 return new Promise(function(resolve, reject) {
  resolve(getBinary());
 });
}

function createWasm() {
 var info = {
  "a": asmLibraryArg
 };
 function receiveInstance(instance, module) {
  var exports = instance.exports;
  Module["asm"] = exports;
  removeRunDependency("wasm-instantiate");
 }
 addRunDependency("wasm-instantiate");
 function receiveInstantiatedSource(output) {
  receiveInstance(output["instance"]);
 }
 function instantiateArrayBuffer(receiver) {
  return getBinaryPromise().then(function(binary) {
   return WebAssembly.instantiate(binary, info);
  }).then(receiver, function(reason) {
   err("failed to asynchronously prepare wasm: " + reason);
   abort(reason);
  });
 }
 function instantiateAsync() {
  if (!wasmBinary && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && !isFileURI(wasmBinaryFile) && typeof fetch === "function") {
   fetch(wasmBinaryFile, {
    credentials: "same-origin"
   }).then(function(response) {
    var result = WebAssembly.instantiateStreaming(response, info);
    return result.then(receiveInstantiatedSource, function(reason) {
     err("wasm streaming compile failed: " + reason);
     err("falling back to ArrayBuffer instantiation");
     return instantiateArrayBuffer(receiveInstantiatedSource);
    });
   });
  } else {
   return instantiateArrayBuffer(receiveInstantiatedSource);
  }
 }
 if (Module["instantiateWasm"]) {
  try {
   var exports = Module["instantiateWasm"](info, receiveInstance);
   return exports;
  } catch (e) {
   err("Module.instantiateWasm callback failed with error: " + e);
   return false;
  }
 }
 instantiateAsync();
 return {};
}

var tempDouble;

var tempI64;

__ATINIT__.push({
 func: function() {
  ___wasm_call_ctors();
 }
});

function demangle(func) {
 return func;
}

function demangleAll(text) {
 var regex = /\b_Z[\w\d_]+/g;
 return text.replace(regex, function(x) {
  var y = demangle(x);
  return x === y ? x : y + " [" + x + "]";
 });
}

function jsStackTrace() {
 var err = new Error();
 if (!err.stack) {
  try {
   throw new Error();
  } catch (e) {
   err = e;
  }
  if (!err.stack) {
   return "(no stack trace available)";
  }
 }
 return err.stack.toString();
}

function stackTrace() {
 var js = jsStackTrace();
 if (Module["extraStackTrace"]) js += "\n" + Module["extraStackTrace"]();
 return demangleAll(js);
}

function ___assert_fail(condition, filename, line, func) {
 abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [ filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function" ]);
}

function ___cxa_allocate_exception(size) {
 return _malloc(size);
}

var ___exception_infos = {};

var ___exception_last = 0;

function __ZSt18uncaught_exceptionv() {
 return __ZSt18uncaught_exceptionv.uncaught_exceptions > 0;
}

function ___cxa_throw(ptr, type, destructor) {
 ___exception_infos[ptr] = {
  ptr: ptr,
  adjusted: [ ptr ],
  type: type,
  destructor: destructor,
  refcount: 0,
  caught: false,
  rethrown: false
 };
 ___exception_last = ptr;
 if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
  __ZSt18uncaught_exceptionv.uncaught_exceptions = 1;
 } else {
  __ZSt18uncaught_exceptionv.uncaught_exceptions++;
 }
 throw ptr;
}

function setErrNo(value) {
 HEAP32[___errno_location() >> 2] = value;
 return value;
}

function ___map_file(pathname, size) {
 setErrNo(63);
 return -1;
}

var PATH = {
 splitPath: function(filename) {
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  return splitPathRe.exec(filename).slice(1);
 },
 normalizeArray: function(parts, allowAboveRoot) {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
   var last = parts[i];
   if (last === ".") {
    parts.splice(i, 1);
   } else if (last === "..") {
    parts.splice(i, 1);
    up++;
   } else if (up) {
    parts.splice(i, 1);
    up--;
   }
  }
  if (allowAboveRoot) {
   for (;up; up--) {
    parts.unshift("..");
   }
  }
  return parts;
 },
 normalize: function(path) {
  var isAbsolute = path.charAt(0) === "/", trailingSlash = path.substr(-1) === "/";
  path = PATH.normalizeArray(path.split("/").filter(function(p) {
   return !!p;
  }), !isAbsolute).join("/");
  if (!path && !isAbsolute) {
   path = ".";
  }
  if (path && trailingSlash) {
   path += "/";
  }
  return (isAbsolute ? "/" : "") + path;
 },
 dirname: function(path) {
  var result = PATH.splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
   return ".";
  }
  if (dir) {
   dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
 },
 basename: function(path) {
  if (path === "/") return "/";
  var lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return path;
  return path.substr(lastSlash + 1);
 },
 extname: function(path) {
  return PATH.splitPath(path)[3];
 },
 join: function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return PATH.normalize(paths.join("/"));
 },
 join2: function(l, r) {
  return PATH.normalize(l + "/" + r);
 }
};

var PATH_FS = {
 resolve: function() {
  var resolvedPath = "", resolvedAbsolute = false;
  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
   var path = i >= 0 ? arguments[i] : FS.cwd();
   if (typeof path !== "string") {
    throw new TypeError("Arguments to path.resolve must be strings");
   } else if (!path) {
    return "";
   }
   resolvedPath = path + "/" + resolvedPath;
   resolvedAbsolute = path.charAt(0) === "/";
  }
  resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(function(p) {
   return !!p;
  }), !resolvedAbsolute).join("/");
  return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
 },
 relative: function(from, to) {
  from = PATH_FS.resolve(from).substr(1);
  to = PATH_FS.resolve(to).substr(1);
  function trim(arr) {
   var start = 0;
   for (;start < arr.length; start++) {
    if (arr[start] !== "") break;
   }
   var end = arr.length - 1;
   for (;end >= 0; end--) {
    if (arr[end] !== "") break;
   }
   if (start > end) return [];
   return arr.slice(start, end - start + 1);
  }
  var fromParts = trim(from.split("/"));
  var toParts = trim(to.split("/"));
  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
   if (fromParts[i] !== toParts[i]) {
    samePartsLength = i;
    break;
   }
  }
  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
   outputParts.push("..");
  }
  outputParts = outputParts.concat(toParts.slice(samePartsLength));
  return outputParts.join("/");
 }
};

var TTY = {
 ttys: [],
 init: function() {},
 shutdown: function() {},
 register: function(dev, ops) {
  TTY.ttys[dev] = {
   input: [],
   output: [],
   ops: ops
  };
  FS.registerDevice(dev, TTY.stream_ops);
 },
 stream_ops: {
  open: function(stream) {
   var tty = TTY.ttys[stream.node.rdev];
   if (!tty) {
    throw new FS.ErrnoError(43);
   }
   stream.tty = tty;
   stream.seekable = false;
  },
  close: function(stream) {
   stream.tty.ops.flush(stream.tty);
  },
  flush: function(stream) {
   stream.tty.ops.flush(stream.tty);
  },
  read: function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.get_char) {
    throw new FS.ErrnoError(60);
   }
   var bytesRead = 0;
   for (var i = 0; i < length; i++) {
    var result;
    try {
     result = stream.tty.ops.get_char(stream.tty);
    } catch (e) {
     throw new FS.ErrnoError(29);
    }
    if (result === undefined && bytesRead === 0) {
     throw new FS.ErrnoError(6);
    }
    if (result === null || result === undefined) break;
    bytesRead++;
    buffer[offset + i] = result;
   }
   if (bytesRead) {
    stream.node.timestamp = Date.now();
   }
   return bytesRead;
  },
  write: function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.put_char) {
    throw new FS.ErrnoError(60);
   }
   try {
    for (var i = 0; i < length; i++) {
     stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
    }
   } catch (e) {
    throw new FS.ErrnoError(29);
   }
   if (length) {
    stream.node.timestamp = Date.now();
   }
   return i;
  }
 },
 default_tty_ops: {
  get_char: function(tty) {
   if (!tty.input.length) {
    var result = null;
    if (ENVIRONMENT_IS_NODE) {
     var BUFSIZE = 256;
     var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
     var bytesRead = 0;
     try {
      bytesRead = nodeFS.readSync(process.stdin.fd, buf, 0, BUFSIZE, null);
     } catch (e) {
      if (e.toString().indexOf("EOF") != -1) bytesRead = 0; else throw e;
     }
     if (bytesRead > 0) {
      result = buf.slice(0, bytesRead).toString("utf-8");
     } else {
      result = null;
     }
    } else if (typeof window != "undefined" && typeof window.prompt == "function") {
     result = window.prompt("Input: ");
     if (result !== null) {
      result += "\n";
     }
    } else if (typeof readline == "function") {
     result = readline();
     if (result !== null) {
      result += "\n";
     }
    }
    if (!result) {
     return null;
    }
    tty.input = intArrayFromString(result, true);
   }
   return tty.input.shift();
  },
  put_char: function(tty, val) {
   if (val === null || val === 10) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  flush: function(tty) {
   if (tty.output && tty.output.length > 0) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  }
 },
 default_tty1_ops: {
  put_char: function(tty, val) {
   if (val === null || val === 10) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  flush: function(tty) {
   if (tty.output && tty.output.length > 0) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  }
 }
};

var MEMFS = {
 ops_table: null,
 mount: function(mount) {
  return MEMFS.createNode(null, "/", 16384 | 511, 0);
 },
 createNode: function(parent, name, mode, dev) {
  if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
   throw new FS.ErrnoError(63);
  }
  if (!MEMFS.ops_table) {
   MEMFS.ops_table = {
    dir: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      lookup: MEMFS.node_ops.lookup,
      mknod: MEMFS.node_ops.mknod,
      rename: MEMFS.node_ops.rename,
      unlink: MEMFS.node_ops.unlink,
      rmdir: MEMFS.node_ops.rmdir,
      readdir: MEMFS.node_ops.readdir,
      symlink: MEMFS.node_ops.symlink
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek
     }
    },
    file: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek,
      read: MEMFS.stream_ops.read,
      write: MEMFS.stream_ops.write,
      allocate: MEMFS.stream_ops.allocate,
      mmap: MEMFS.stream_ops.mmap,
      msync: MEMFS.stream_ops.msync
     }
    },
    link: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      readlink: MEMFS.node_ops.readlink
     },
     stream: {}
    },
    chrdev: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: FS.chrdev_stream_ops
    }
   };
  }
  var node = FS.createNode(parent, name, mode, dev);
  if (FS.isDir(node.mode)) {
   node.node_ops = MEMFS.ops_table.dir.node;
   node.stream_ops = MEMFS.ops_table.dir.stream;
   node.contents = {};
  } else if (FS.isFile(node.mode)) {
   node.node_ops = MEMFS.ops_table.file.node;
   node.stream_ops = MEMFS.ops_table.file.stream;
   node.usedBytes = 0;
   node.contents = null;
  } else if (FS.isLink(node.mode)) {
   node.node_ops = MEMFS.ops_table.link.node;
   node.stream_ops = MEMFS.ops_table.link.stream;
  } else if (FS.isChrdev(node.mode)) {
   node.node_ops = MEMFS.ops_table.chrdev.node;
   node.stream_ops = MEMFS.ops_table.chrdev.stream;
  }
  node.timestamp = Date.now();
  if (parent) {
   parent.contents[name] = node;
  }
  return node;
 },
 getFileDataAsRegularArray: function(node) {
  if (node.contents && node.contents.subarray) {
   var arr = [];
   for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
   return arr;
  }
  return node.contents;
 },
 getFileDataAsTypedArray: function(node) {
  if (!node.contents) return new Uint8Array(0);
  if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
  return new Uint8Array(node.contents);
 },
 expandFileStorage: function(node, newCapacity) {
  var prevCapacity = node.contents ? node.contents.length : 0;
  if (prevCapacity >= newCapacity) return;
  var CAPACITY_DOUBLING_MAX = 1024 * 1024;
  newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
  if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
  var oldContents = node.contents;
  node.contents = new Uint8Array(newCapacity);
  if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
  return;
 },
 resizeFileStorage: function(node, newSize) {
  if (node.usedBytes == newSize) return;
  if (newSize == 0) {
   node.contents = null;
   node.usedBytes = 0;
   return;
  }
  if (!node.contents || node.contents.subarray) {
   var oldContents = node.contents;
   node.contents = new Uint8Array(newSize);
   if (oldContents) {
    node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
   }
   node.usedBytes = newSize;
   return;
  }
  if (!node.contents) node.contents = [];
  if (node.contents.length > newSize) node.contents.length = newSize; else while (node.contents.length < newSize) node.contents.push(0);
  node.usedBytes = newSize;
 },
 node_ops: {
  getattr: function(node) {
   var attr = {};
   attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
   attr.ino = node.id;
   attr.mode = node.mode;
   attr.nlink = 1;
   attr.uid = 0;
   attr.gid = 0;
   attr.rdev = node.rdev;
   if (FS.isDir(node.mode)) {
    attr.size = 4096;
   } else if (FS.isFile(node.mode)) {
    attr.size = node.usedBytes;
   } else if (FS.isLink(node.mode)) {
    attr.size = node.link.length;
   } else {
    attr.size = 0;
   }
   attr.atime = new Date(node.timestamp);
   attr.mtime = new Date(node.timestamp);
   attr.ctime = new Date(node.timestamp);
   attr.blksize = 4096;
   attr.blocks = Math.ceil(attr.size / attr.blksize);
   return attr;
  },
  setattr: function(node, attr) {
   if (attr.mode !== undefined) {
    node.mode = attr.mode;
   }
   if (attr.timestamp !== undefined) {
    node.timestamp = attr.timestamp;
   }
   if (attr.size !== undefined) {
    MEMFS.resizeFileStorage(node, attr.size);
   }
  },
  lookup: function(parent, name) {
   throw FS.genericErrors[44];
  },
  mknod: function(parent, name, mode, dev) {
   return MEMFS.createNode(parent, name, mode, dev);
  },
  rename: function(old_node, new_dir, new_name) {
   if (FS.isDir(old_node.mode)) {
    var new_node;
    try {
     new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    if (new_node) {
     for (var i in new_node.contents) {
      throw new FS.ErrnoError(55);
     }
    }
   }
   delete old_node.parent.contents[old_node.name];
   old_node.name = new_name;
   new_dir.contents[new_name] = old_node;
   old_node.parent = new_dir;
  },
  unlink: function(parent, name) {
   delete parent.contents[name];
  },
  rmdir: function(parent, name) {
   var node = FS.lookupNode(parent, name);
   for (var i in node.contents) {
    throw new FS.ErrnoError(55);
   }
   delete parent.contents[name];
  },
  readdir: function(node) {
   var entries = [ ".", ".." ];
   for (var key in node.contents) {
    if (!node.contents.hasOwnProperty(key)) {
     continue;
    }
    entries.push(key);
   }
   return entries;
  },
  symlink: function(parent, newname, oldpath) {
   var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
   node.link = oldpath;
   return node;
  },
  readlink: function(node) {
   if (!FS.isLink(node.mode)) {
    throw new FS.ErrnoError(28);
   }
   return node.link;
  }
 },
 stream_ops: {
  read: function(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= stream.node.usedBytes) return 0;
   var size = Math.min(stream.node.usedBytes - position, length);
   if (size > 8 && contents.subarray) {
    buffer.set(contents.subarray(position, position + size), offset);
   } else {
    for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
   }
   return size;
  },
  write: function(stream, buffer, offset, length, position, canOwn) {
   if (buffer.buffer === HEAP8.buffer) {
    canOwn = false;
   }
   if (!length) return 0;
   var node = stream.node;
   node.timestamp = Date.now();
   if (buffer.subarray && (!node.contents || node.contents.subarray)) {
    if (canOwn) {
     node.contents = buffer.subarray(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (node.usedBytes === 0 && position === 0) {
     node.contents = buffer.slice(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (position + length <= node.usedBytes) {
     node.contents.set(buffer.subarray(offset, offset + length), position);
     return length;
    }
   }
   MEMFS.expandFileStorage(node, position + length);
   if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position); else {
    for (var i = 0; i < length; i++) {
     node.contents[position + i] = buffer[offset + i];
    }
   }
   node.usedBytes = Math.max(node.usedBytes, position + length);
   return length;
  },
  llseek: function(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     position += stream.node.usedBytes;
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(28);
   }
   return position;
  },
  allocate: function(stream, offset, length) {
   MEMFS.expandFileStorage(stream.node, offset + length);
   stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
  },
  mmap: function(stream, address, length, position, prot, flags) {
   assert(address === 0);
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(43);
   }
   var ptr;
   var allocated;
   var contents = stream.node.contents;
   if (!(flags & 2) && contents.buffer === buffer) {
    allocated = false;
    ptr = contents.byteOffset;
   } else {
    if (position > 0 || position + length < contents.length) {
     if (contents.subarray) {
      contents = contents.subarray(position, position + length);
     } else {
      contents = Array.prototype.slice.call(contents, position, position + length);
     }
    }
    allocated = true;
    ptr = _malloc(length);
    if (!ptr) {
     throw new FS.ErrnoError(48);
    }
    HEAP8.set(contents, ptr);
   }
   return {
    ptr: ptr,
    allocated: allocated
   };
  },
  msync: function(stream, buffer, offset, length, mmapFlags) {
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(43);
   }
   if (mmapFlags & 2) {
    return 0;
   }
   var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
   return 0;
  }
 }
};

var FS = {
 root: null,
 mounts: [],
 devices: {},
 streams: [],
 nextInode: 1,
 nameTable: null,
 currentPath: "/",
 initialized: false,
 ignorePermissions: true,
 trackingDelegate: {},
 tracking: {
  openFlags: {
   READ: 1,
   WRITE: 2
  }
 },
 ErrnoError: null,
 genericErrors: {},
 filesystems: null,
 syncFSRequests: 0,
 handleFSError: function(e) {
  if (!(e instanceof FS.ErrnoError)) throw e + " : " + stackTrace();
  return setErrNo(e.errno);
 },
 lookupPath: function(path, opts) {
  path = PATH_FS.resolve(FS.cwd(), path);
  opts = opts || {};
  if (!path) return {
   path: "",
   node: null
  };
  var defaults = {
   follow_mount: true,
   recurse_count: 0
  };
  for (var key in defaults) {
   if (opts[key] === undefined) {
    opts[key] = defaults[key];
   }
  }
  if (opts.recurse_count > 8) {
   throw new FS.ErrnoError(32);
  }
  var parts = PATH.normalizeArray(path.split("/").filter(function(p) {
   return !!p;
  }), false);
  var current = FS.root;
  var current_path = "/";
  for (var i = 0; i < parts.length; i++) {
   var islast = i === parts.length - 1;
   if (islast && opts.parent) {
    break;
   }
   current = FS.lookupNode(current, parts[i]);
   current_path = PATH.join2(current_path, parts[i]);
   if (FS.isMountpoint(current)) {
    if (!islast || islast && opts.follow_mount) {
     current = current.mounted.root;
    }
   }
   if (!islast || opts.follow) {
    var count = 0;
    while (FS.isLink(current.mode)) {
     var link = FS.readlink(current_path);
     current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
     var lookup = FS.lookupPath(current_path, {
      recurse_count: opts.recurse_count
     });
     current = lookup.node;
     if (count++ > 40) {
      throw new FS.ErrnoError(32);
     }
    }
   }
  }
  return {
   path: current_path,
   node: current
  };
 },
 getPath: function(node) {
  var path;
  while (true) {
   if (FS.isRoot(node)) {
    var mount = node.mount.mountpoint;
    if (!path) return mount;
    return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path;
   }
   path = path ? node.name + "/" + path : node.name;
   node = node.parent;
  }
 },
 hashName: function(parentid, name) {
  var hash = 0;
  for (var i = 0; i < name.length; i++) {
   hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
  }
  return (parentid + hash >>> 0) % FS.nameTable.length;
 },
 hashAddNode: function(node) {
  var hash = FS.hashName(node.parent.id, node.name);
  node.name_next = FS.nameTable[hash];
  FS.nameTable[hash] = node;
 },
 hashRemoveNode: function(node) {
  var hash = FS.hashName(node.parent.id, node.name);
  if (FS.nameTable[hash] === node) {
   FS.nameTable[hash] = node.name_next;
  } else {
   var current = FS.nameTable[hash];
   while (current) {
    if (current.name_next === node) {
     current.name_next = node.name_next;
     break;
    }
    current = current.name_next;
   }
  }
 },
 lookupNode: function(parent, name) {
  var errCode = FS.mayLookup(parent);
  if (errCode) {
   throw new FS.ErrnoError(errCode, parent);
  }
  var hash = FS.hashName(parent.id, name);
  for (var node = FS.nameTable[hash]; node; node = node.name_next) {
   var nodeName = node.name;
   if (node.parent.id === parent.id && nodeName === name) {
    return node;
   }
  }
  return FS.lookup(parent, name);
 },
 createNode: function(parent, name, mode, rdev) {
  var node = new FS.FSNode(parent, name, mode, rdev);
  FS.hashAddNode(node);
  return node;
 },
 destroyNode: function(node) {
  FS.hashRemoveNode(node);
 },
 isRoot: function(node) {
  return node === node.parent;
 },
 isMountpoint: function(node) {
  return !!node.mounted;
 },
 isFile: function(mode) {
  return (mode & 61440) === 32768;
 },
 isDir: function(mode) {
  return (mode & 61440) === 16384;
 },
 isLink: function(mode) {
  return (mode & 61440) === 40960;
 },
 isChrdev: function(mode) {
  return (mode & 61440) === 8192;
 },
 isBlkdev: function(mode) {
  return (mode & 61440) === 24576;
 },
 isFIFO: function(mode) {
  return (mode & 61440) === 4096;
 },
 isSocket: function(mode) {
  return (mode & 49152) === 49152;
 },
 flagModes: {
  "r": 0,
  "rs": 1052672,
  "r+": 2,
  "w": 577,
  "wx": 705,
  "xw": 705,
  "w+": 578,
  "wx+": 706,
  "xw+": 706,
  "a": 1089,
  "ax": 1217,
  "xa": 1217,
  "a+": 1090,
  "ax+": 1218,
  "xa+": 1218
 },
 modeStringToFlags: function(str) {
  var flags = FS.flagModes[str];
  if (typeof flags === "undefined") {
   throw new Error("Unknown file open mode: " + str);
  }
  return flags;
 },
 flagsToPermissionString: function(flag) {
  var perms = [ "r", "w", "rw" ][flag & 3];
  if (flag & 512) {
   perms += "w";
  }
  return perms;
 },
 nodePermissions: function(node, perms) {
  if (FS.ignorePermissions) {
   return 0;
  }
  if (perms.indexOf("r") !== -1 && !(node.mode & 292)) {
   return 2;
  } else if (perms.indexOf("w") !== -1 && !(node.mode & 146)) {
   return 2;
  } else if (perms.indexOf("x") !== -1 && !(node.mode & 73)) {
   return 2;
  }
  return 0;
 },
 mayLookup: function(dir) {
  var errCode = FS.nodePermissions(dir, "x");
  if (errCode) return errCode;
  if (!dir.node_ops.lookup) return 2;
  return 0;
 },
 mayCreate: function(dir, name) {
  try {
   var node = FS.lookupNode(dir, name);
   return 20;
  } catch (e) {}
  return FS.nodePermissions(dir, "wx");
 },
 mayDelete: function(dir, name, isdir) {
  var node;
  try {
   node = FS.lookupNode(dir, name);
  } catch (e) {
   return e.errno;
  }
  var errCode = FS.nodePermissions(dir, "wx");
  if (errCode) {
   return errCode;
  }
  if (isdir) {
   if (!FS.isDir(node.mode)) {
    return 54;
   }
   if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
    return 10;
   }
  } else {
   if (FS.isDir(node.mode)) {
    return 31;
   }
  }
  return 0;
 },
 mayOpen: function(node, flags) {
  if (!node) {
   return 44;
  }
  if (FS.isLink(node.mode)) {
   return 32;
  } else if (FS.isDir(node.mode)) {
   if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
    return 31;
   }
  }
  return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
 },
 MAX_OPEN_FDS: 4096,
 nextfd: function(fd_start, fd_end) {
  fd_start = fd_start || 0;
  fd_end = fd_end || FS.MAX_OPEN_FDS;
  for (var fd = fd_start; fd <= fd_end; fd++) {
   if (!FS.streams[fd]) {
    return fd;
   }
  }
  throw new FS.ErrnoError(33);
 },
 getStream: function(fd) {
  return FS.streams[fd];
 },
 createStream: function(stream, fd_start, fd_end) {
  if (!FS.FSStream) {
   FS.FSStream = function() {};
   FS.FSStream.prototype = {
    object: {
     get: function() {
      return this.node;
     },
     set: function(val) {
      this.node = val;
     }
    },
    isRead: {
     get: function() {
      return (this.flags & 2097155) !== 1;
     }
    },
    isWrite: {
     get: function() {
      return (this.flags & 2097155) !== 0;
     }
    },
    isAppend: {
     get: function() {
      return this.flags & 1024;
     }
    }
   };
  }
  var newStream = new FS.FSStream();
  for (var p in stream) {
   newStream[p] = stream[p];
  }
  stream = newStream;
  var fd = FS.nextfd(fd_start, fd_end);
  stream.fd = fd;
  FS.streams[fd] = stream;
  return stream;
 },
 closeStream: function(fd) {
  FS.streams[fd] = null;
 },
 chrdev_stream_ops: {
  open: function(stream) {
   var device = FS.getDevice(stream.node.rdev);
   stream.stream_ops = device.stream_ops;
   if (stream.stream_ops.open) {
    stream.stream_ops.open(stream);
   }
  },
  llseek: function() {
   throw new FS.ErrnoError(70);
  }
 },
 major: function(dev) {
  return dev >> 8;
 },
 minor: function(dev) {
  return dev & 255;
 },
 makedev: function(ma, mi) {
  return ma << 8 | mi;
 },
 registerDevice: function(dev, ops) {
  FS.devices[dev] = {
   stream_ops: ops
  };
 },
 getDevice: function(dev) {
  return FS.devices[dev];
 },
 getMounts: function(mount) {
  var mounts = [];
  var check = [ mount ];
  while (check.length) {
   var m = check.pop();
   mounts.push(m);
   check.push.apply(check, m.mounts);
  }
  return mounts;
 },
 syncfs: function(populate, callback) {
  if (typeof populate === "function") {
   callback = populate;
   populate = false;
  }
  FS.syncFSRequests++;
  if (FS.syncFSRequests > 1) {
   err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
  }
  var mounts = FS.getMounts(FS.root.mount);
  var completed = 0;
  function doCallback(errCode) {
   FS.syncFSRequests--;
   return callback(errCode);
  }
  function done(errCode) {
   if (errCode) {
    if (!done.errored) {
     done.errored = true;
     return doCallback(errCode);
    }
    return;
   }
   if (++completed >= mounts.length) {
    doCallback(null);
   }
  }
  mounts.forEach(function(mount) {
   if (!mount.type.syncfs) {
    return done(null);
   }
   mount.type.syncfs(mount, populate, done);
  });
 },
 mount: function(type, opts, mountpoint) {
  var root = mountpoint === "/";
  var pseudo = !mountpoint;
  var node;
  if (root && FS.root) {
   throw new FS.ErrnoError(10);
  } else if (!root && !pseudo) {
   var lookup = FS.lookupPath(mountpoint, {
    follow_mount: false
   });
   mountpoint = lookup.path;
   node = lookup.node;
   if (FS.isMountpoint(node)) {
    throw new FS.ErrnoError(10);
   }
   if (!FS.isDir(node.mode)) {
    throw new FS.ErrnoError(54);
   }
  }
  var mount = {
   type: type,
   opts: opts,
   mountpoint: mountpoint,
   mounts: []
  };
  var mountRoot = type.mount(mount);
  mountRoot.mount = mount;
  mount.root = mountRoot;
  if (root) {
   FS.root = mountRoot;
  } else if (node) {
   node.mounted = mount;
   if (node.mount) {
    node.mount.mounts.push(mount);
   }
  }
  return mountRoot;
 },
 unmount: function(mountpoint) {
  var lookup = FS.lookupPath(mountpoint, {
   follow_mount: false
  });
  if (!FS.isMountpoint(lookup.node)) {
   throw new FS.ErrnoError(28);
  }
  var node = lookup.node;
  var mount = node.mounted;
  var mounts = FS.getMounts(mount);
  Object.keys(FS.nameTable).forEach(function(hash) {
   var current = FS.nameTable[hash];
   while (current) {
    var next = current.name_next;
    if (mounts.indexOf(current.mount) !== -1) {
     FS.destroyNode(current);
    }
    current = next;
   }
  });
  node.mounted = null;
  var idx = node.mount.mounts.indexOf(mount);
  node.mount.mounts.splice(idx, 1);
 },
 lookup: function(parent, name) {
  return parent.node_ops.lookup(parent, name);
 },
 mknod: function(path, mode, dev) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  if (!name || name === "." || name === "..") {
   throw new FS.ErrnoError(28);
  }
  var errCode = FS.mayCreate(parent, name);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.mknod) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.mknod(parent, name, mode, dev);
 },
 create: function(path, mode) {
  mode = mode !== undefined ? mode : 438;
  mode &= 4095;
  mode |= 32768;
  return FS.mknod(path, mode, 0);
 },
 mkdir: function(path, mode) {
  mode = mode !== undefined ? mode : 511;
  mode &= 511 | 512;
  mode |= 16384;
  return FS.mknod(path, mode, 0);
 },
 mkdirTree: function(path, mode) {
  var dirs = path.split("/");
  var d = "";
  for (var i = 0; i < dirs.length; ++i) {
   if (!dirs[i]) continue;
   d += "/" + dirs[i];
   try {
    FS.mkdir(d, mode);
   } catch (e) {
    if (e.errno != 20) throw e;
   }
  }
 },
 mkdev: function(path, mode, dev) {
  if (typeof dev === "undefined") {
   dev = mode;
   mode = 438;
  }
  mode |= 8192;
  return FS.mknod(path, mode, dev);
 },
 symlink: function(oldpath, newpath) {
  if (!PATH_FS.resolve(oldpath)) {
   throw new FS.ErrnoError(44);
  }
  var lookup = FS.lookupPath(newpath, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(44);
  }
  var newname = PATH.basename(newpath);
  var errCode = FS.mayCreate(parent, newname);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.symlink) {
   throw new FS.ErrnoError(63);
  }
  return parent.node_ops.symlink(parent, newname, oldpath);
 },
 rename: function(old_path, new_path) {
  var old_dirname = PATH.dirname(old_path);
  var new_dirname = PATH.dirname(new_path);
  var old_name = PATH.basename(old_path);
  var new_name = PATH.basename(new_path);
  var lookup, old_dir, new_dir;
  try {
   lookup = FS.lookupPath(old_path, {
    parent: true
   });
   old_dir = lookup.node;
   lookup = FS.lookupPath(new_path, {
    parent: true
   });
   new_dir = lookup.node;
  } catch (e) {
   throw new FS.ErrnoError(10);
  }
  if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
  if (old_dir.mount !== new_dir.mount) {
   throw new FS.ErrnoError(75);
  }
  var old_node = FS.lookupNode(old_dir, old_name);
  var relative = PATH_FS.relative(old_path, new_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(28);
  }
  relative = PATH_FS.relative(new_path, old_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(55);
  }
  var new_node;
  try {
   new_node = FS.lookupNode(new_dir, new_name);
  } catch (e) {}
  if (old_node === new_node) {
   return;
  }
  var isdir = FS.isDir(old_node.mode);
  var errCode = FS.mayDelete(old_dir, old_name, isdir);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!old_dir.node_ops.rename) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
   throw new FS.ErrnoError(10);
  }
  if (new_dir !== old_dir) {
   errCode = FS.nodePermissions(old_dir, "w");
   if (errCode) {
    throw new FS.ErrnoError(errCode);
   }
  }
  try {
   if (FS.trackingDelegate["willMovePath"]) {
    FS.trackingDelegate["willMovePath"](old_path, new_path);
   }
  } catch (e) {
   err("FS.trackingDelegate['willMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
  }
  FS.hashRemoveNode(old_node);
  try {
   old_dir.node_ops.rename(old_node, new_dir, new_name);
  } catch (e) {
   throw e;
  } finally {
   FS.hashAddNode(old_node);
  }
  try {
   if (FS.trackingDelegate["onMovePath"]) FS.trackingDelegate["onMovePath"](old_path, new_path);
  } catch (e) {
   err("FS.trackingDelegate['onMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
  }
 },
 rmdir: function(path) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var errCode = FS.mayDelete(parent, name, true);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.rmdir) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  try {
   if (FS.trackingDelegate["willDeletePath"]) {
    FS.trackingDelegate["willDeletePath"](path);
   }
  } catch (e) {
   err("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
  }
  parent.node_ops.rmdir(parent, name);
  FS.destroyNode(node);
  try {
   if (FS.trackingDelegate["onDeletePath"]) FS.trackingDelegate["onDeletePath"](path);
  } catch (e) {
   err("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
  }
 },
 readdir: function(path) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  if (!node.node_ops.readdir) {
   throw new FS.ErrnoError(54);
  }
  return node.node_ops.readdir(node);
 },
 unlink: function(path) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var errCode = FS.mayDelete(parent, name, false);
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  if (!parent.node_ops.unlink) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(10);
  }
  try {
   if (FS.trackingDelegate["willDeletePath"]) {
    FS.trackingDelegate["willDeletePath"](path);
   }
  } catch (e) {
   err("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
  }
  parent.node_ops.unlink(parent, name);
  FS.destroyNode(node);
  try {
   if (FS.trackingDelegate["onDeletePath"]) FS.trackingDelegate["onDeletePath"](path);
  } catch (e) {
   err("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
  }
 },
 readlink: function(path) {
  var lookup = FS.lookupPath(path);
  var link = lookup.node;
  if (!link) {
   throw new FS.ErrnoError(44);
  }
  if (!link.node_ops.readlink) {
   throw new FS.ErrnoError(28);
  }
  return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
 },
 stat: function(path, dontFollow) {
  var lookup = FS.lookupPath(path, {
   follow: !dontFollow
  });
  var node = lookup.node;
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (!node.node_ops.getattr) {
   throw new FS.ErrnoError(63);
  }
  return node.node_ops.getattr(node);
 },
 lstat: function(path) {
  return FS.stat(path, true);
 },
 chmod: function(path, mode, dontFollow) {
  var node;
  if (typeof path === "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   mode: mode & 4095 | node.mode & ~4095,
   timestamp: Date.now()
  });
 },
 lchmod: function(path, mode) {
  FS.chmod(path, mode, true);
 },
 fchmod: function(fd, mode) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  FS.chmod(stream.node, mode);
 },
 chown: function(path, uid, gid, dontFollow) {
  var node;
  if (typeof path === "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  node.node_ops.setattr(node, {
   timestamp: Date.now()
  });
 },
 lchown: function(path, uid, gid) {
  FS.chown(path, uid, gid, true);
 },
 fchown: function(fd, uid, gid) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  FS.chown(stream.node, uid, gid);
 },
 truncate: function(path, len) {
  if (len < 0) {
   throw new FS.ErrnoError(28);
  }
  var node;
  if (typeof path === "string") {
   var lookup = FS.lookupPath(path, {
    follow: true
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(63);
  }
  if (FS.isDir(node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!FS.isFile(node.mode)) {
   throw new FS.ErrnoError(28);
  }
  var errCode = FS.nodePermissions(node, "w");
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  node.node_ops.setattr(node, {
   size: len,
   timestamp: Date.now()
  });
 },
 ftruncate: function(fd, len) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(28);
  }
  FS.truncate(stream.node, len);
 },
 utime: function(path, atime, mtime) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  node.node_ops.setattr(node, {
   timestamp: Math.max(atime, mtime)
  });
 },
 open: function(path, flags, mode, fd_start, fd_end) {
  if (path === "") {
   throw new FS.ErrnoError(44);
  }
  flags = typeof flags === "string" ? FS.modeStringToFlags(flags) : flags;
  mode = typeof mode === "undefined" ? 438 : mode;
  if (flags & 64) {
   mode = mode & 4095 | 32768;
  } else {
   mode = 0;
  }
  var node;
  if (typeof path === "object") {
   node = path;
  } else {
   path = PATH.normalize(path);
   try {
    var lookup = FS.lookupPath(path, {
     follow: !(flags & 131072)
    });
    node = lookup.node;
   } catch (e) {}
  }
  var created = false;
  if (flags & 64) {
   if (node) {
    if (flags & 128) {
     throw new FS.ErrnoError(20);
    }
   } else {
    node = FS.mknod(path, mode, 0);
    created = true;
   }
  }
  if (!node) {
   throw new FS.ErrnoError(44);
  }
  if (FS.isChrdev(node.mode)) {
   flags &= ~512;
  }
  if (flags & 65536 && !FS.isDir(node.mode)) {
   throw new FS.ErrnoError(54);
  }
  if (!created) {
   var errCode = FS.mayOpen(node, flags);
   if (errCode) {
    throw new FS.ErrnoError(errCode);
   }
  }
  if (flags & 512) {
   FS.truncate(node, 0);
  }
  flags &= ~(128 | 512 | 131072);
  var stream = FS.createStream({
   node: node,
   path: FS.getPath(node),
   flags: flags,
   seekable: true,
   position: 0,
   stream_ops: node.stream_ops,
   ungotten: [],
   error: false
  }, fd_start, fd_end);
  if (stream.stream_ops.open) {
   stream.stream_ops.open(stream);
  }
  if (Module["logReadFiles"] && !(flags & 1)) {
   if (!FS.readFiles) FS.readFiles = {};
   if (!(path in FS.readFiles)) {
    FS.readFiles[path] = 1;
    err("FS.trackingDelegate error on read file: " + path);
   }
  }
  try {
   if (FS.trackingDelegate["onOpenFile"]) {
    var trackingFlags = 0;
    if ((flags & 2097155) !== 1) {
     trackingFlags |= FS.tracking.openFlags.READ;
    }
    if ((flags & 2097155) !== 0) {
     trackingFlags |= FS.tracking.openFlags.WRITE;
    }
    FS.trackingDelegate["onOpenFile"](path, trackingFlags);
   }
  } catch (e) {
   err("FS.trackingDelegate['onOpenFile']('" + path + "', flags) threw an exception: " + e.message);
  }
  return stream;
 },
 close: function(stream) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (stream.getdents) stream.getdents = null;
  try {
   if (stream.stream_ops.close) {
    stream.stream_ops.close(stream);
   }
  } catch (e) {
   throw e;
  } finally {
   FS.closeStream(stream.fd);
  }
  stream.fd = null;
 },
 isClosed: function(stream) {
  return stream.fd === null;
 },
 llseek: function(stream, offset, whence) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (!stream.seekable || !stream.stream_ops.llseek) {
   throw new FS.ErrnoError(70);
  }
  if (whence != 0 && whence != 1 && whence != 2) {
   throw new FS.ErrnoError(28);
  }
  stream.position = stream.stream_ops.llseek(stream, offset, whence);
  stream.ungotten = [];
  return stream.position;
 },
 read: function(stream, buffer, offset, length, position) {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.read) {
   throw new FS.ErrnoError(28);
  }
  var seeking = typeof position !== "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
  if (!seeking) stream.position += bytesRead;
  return bytesRead;
 },
 write: function(stream, buffer, offset, length, position, canOwn) {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(28);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(31);
  }
  if (!stream.stream_ops.write) {
   throw new FS.ErrnoError(28);
  }
  if (stream.seekable && stream.flags & 1024) {
   FS.llseek(stream, 0, 2);
  }
  var seeking = typeof position !== "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(70);
  }
  var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
  if (!seeking) stream.position += bytesWritten;
  try {
   if (stream.path && FS.trackingDelegate["onWriteToFile"]) FS.trackingDelegate["onWriteToFile"](stream.path);
  } catch (e) {
   err("FS.trackingDelegate['onWriteToFile']('" + stream.path + "') threw an exception: " + e.message);
  }
  return bytesWritten;
 },
 allocate: function(stream, offset, length) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(8);
  }
  if (offset < 0 || length <= 0) {
   throw new FS.ErrnoError(28);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(8);
  }
  if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(43);
  }
  if (!stream.stream_ops.allocate) {
   throw new FS.ErrnoError(138);
  }
  stream.stream_ops.allocate(stream, offset, length);
 },
 mmap: function(stream, address, length, position, prot, flags) {
  if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
   throw new FS.ErrnoError(2);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(2);
  }
  if (!stream.stream_ops.mmap) {
   throw new FS.ErrnoError(43);
  }
  return stream.stream_ops.mmap(stream, address, length, position, prot, flags);
 },
 msync: function(stream, buffer, offset, length, mmapFlags) {
  if (!stream || !stream.stream_ops.msync) {
   return 0;
  }
  return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
 },
 munmap: function(stream) {
  return 0;
 },
 ioctl: function(stream, cmd, arg) {
  if (!stream.stream_ops.ioctl) {
   throw new FS.ErrnoError(59);
  }
  return stream.stream_ops.ioctl(stream, cmd, arg);
 },
 readFile: function(path, opts) {
  opts = opts || {};
  opts.flags = opts.flags || "r";
  opts.encoding = opts.encoding || "binary";
  if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
   throw new Error('Invalid encoding type "' + opts.encoding + '"');
  }
  var ret;
  var stream = FS.open(path, opts.flags);
  var stat = FS.stat(path);
  var length = stat.size;
  var buf = new Uint8Array(length);
  FS.read(stream, buf, 0, length, 0);
  if (opts.encoding === "utf8") {
   ret = UTF8ArrayToString(buf, 0);
  } else if (opts.encoding === "binary") {
   ret = buf;
  }
  FS.close(stream);
  return ret;
 },
 writeFile: function(path, data, opts) {
  opts = opts || {};
  opts.flags = opts.flags || "w";
  var stream = FS.open(path, opts.flags, opts.mode);
  if (typeof data === "string") {
   var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
   var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
   FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
  } else if (ArrayBuffer.isView(data)) {
   FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
  } else {
   throw new Error("Unsupported data type");
  }
  FS.close(stream);
 },
 cwd: function() {
  return FS.currentPath;
 },
 chdir: function(path) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  if (lookup.node === null) {
   throw new FS.ErrnoError(44);
  }
  if (!FS.isDir(lookup.node.mode)) {
   throw new FS.ErrnoError(54);
  }
  var errCode = FS.nodePermissions(lookup.node, "x");
  if (errCode) {
   throw new FS.ErrnoError(errCode);
  }
  FS.currentPath = lookup.path;
 },
 createDefaultDirectories: function() {
  FS.mkdir("/tmp");
  FS.mkdir("/home");
  FS.mkdir("/home/web_user");
 },
 createDefaultDevices: function() {
  FS.mkdir("/dev");
  FS.registerDevice(FS.makedev(1, 3), {
   read: function() {
    return 0;
   },
   write: function(stream, buffer, offset, length, pos) {
    return length;
   }
  });
  FS.mkdev("/dev/null", FS.makedev(1, 3));
  TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
  TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
  FS.mkdev("/dev/tty", FS.makedev(5, 0));
  FS.mkdev("/dev/tty1", FS.makedev(6, 0));
  var random_device;
  if (typeof crypto === "object" && typeof crypto["getRandomValues"] === "function") {
   var randomBuffer = new Uint8Array(1);
   random_device = function() {
    crypto.getRandomValues(randomBuffer);
    return randomBuffer[0];
   };
  } else if (ENVIRONMENT_IS_NODE) {
   try {
    var crypto_module = require("crypto");
    random_device = function() {
     return crypto_module["randomBytes"](1)[0];
    };
   } catch (e) {}
  } else {}
  if (!random_device) {
   random_device = function() {
    abort("random_device");
   };
  }
  FS.createDevice("/dev", "random", random_device);
  FS.createDevice("/dev", "urandom", random_device);
  FS.mkdir("/dev/shm");
  FS.mkdir("/dev/shm/tmp");
 },
 createSpecialDirectories: function() {
  FS.mkdir("/proc");
  FS.mkdir("/proc/self");
  FS.mkdir("/proc/self/fd");
  FS.mount({
   mount: function() {
    var node = FS.createNode("/proc/self", "fd", 16384 | 511, 73);
    node.node_ops = {
     lookup: function(parent, name) {
      var fd = +name;
      var stream = FS.getStream(fd);
      if (!stream) throw new FS.ErrnoError(8);
      var ret = {
       parent: null,
       mount: {
        mountpoint: "fake"
       },
       node_ops: {
        readlink: function() {
         return stream.path;
        }
       }
      };
      ret.parent = ret;
      return ret;
     }
    };
    return node;
   }
  }, {}, "/proc/self/fd");
 },
 createStandardStreams: function() {
  if (Module["stdin"]) {
   FS.createDevice("/dev", "stdin", Module["stdin"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdin");
  }
  if (Module["stdout"]) {
   FS.createDevice("/dev", "stdout", null, Module["stdout"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdout");
  }
  if (Module["stderr"]) {
   FS.createDevice("/dev", "stderr", null, Module["stderr"]);
  } else {
   FS.symlink("/dev/tty1", "/dev/stderr");
  }
  var stdin = FS.open("/dev/stdin", "r");
  var stdout = FS.open("/dev/stdout", "w");
  var stderr = FS.open("/dev/stderr", "w");
 },
 ensureErrnoError: function() {
  if (FS.ErrnoError) return;
  FS.ErrnoError = function ErrnoError(errno, node) {
   this.node = node;
   this.setErrno = function(errno) {
    this.errno = errno;
   };
   this.setErrno(errno);
   this.message = "FS error";
  };
  FS.ErrnoError.prototype = new Error();
  FS.ErrnoError.prototype.constructor = FS.ErrnoError;
  [ 44 ].forEach(function(code) {
   FS.genericErrors[code] = new FS.ErrnoError(code);
   FS.genericErrors[code].stack = "<generic error, no stack>";
  });
 },
 staticInit: function() {
  FS.ensureErrnoError();
  FS.nameTable = new Array(4096);
  FS.mount(MEMFS, {}, "/");
  FS.createDefaultDirectories();
  FS.createDefaultDevices();
  FS.createSpecialDirectories();
  FS.filesystems = {
   "MEMFS": MEMFS
  };
 },
 init: function(input, output, error) {
  FS.init.initialized = true;
  FS.ensureErrnoError();
  Module["stdin"] = input || Module["stdin"];
  Module["stdout"] = output || Module["stdout"];
  Module["stderr"] = error || Module["stderr"];
  FS.createStandardStreams();
 },
 quit: function() {
  FS.init.initialized = false;
  var fflush = Module["_fflush"];
  if (fflush) fflush(0);
  for (var i = 0; i < FS.streams.length; i++) {
   var stream = FS.streams[i];
   if (!stream) {
    continue;
   }
   FS.close(stream);
  }
 },
 getMode: function(canRead, canWrite) {
  var mode = 0;
  if (canRead) mode |= 292 | 73;
  if (canWrite) mode |= 146;
  return mode;
 },
 joinPath: function(parts, forceRelative) {
  var path = PATH.join.apply(null, parts);
  if (forceRelative && path[0] == "/") path = path.substr(1);
  return path;
 },
 absolutePath: function(relative, base) {
  return PATH_FS.resolve(base, relative);
 },
 standardizePath: function(path) {
  return PATH.normalize(path);
 },
 findObject: function(path, dontResolveLastLink) {
  var ret = FS.analyzePath(path, dontResolveLastLink);
  if (ret.exists) {
   return ret.object;
  } else {
   setErrNo(ret.error);
   return null;
  }
 },
 analyzePath: function(path, dontResolveLastLink) {
  try {
   var lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   path = lookup.path;
  } catch (e) {}
  var ret = {
   isRoot: false,
   exists: false,
   error: 0,
   name: null,
   path: null,
   object: null,
   parentExists: false,
   parentPath: null,
   parentObject: null
  };
  try {
   var lookup = FS.lookupPath(path, {
    parent: true
   });
   ret.parentExists = true;
   ret.parentPath = lookup.path;
   ret.parentObject = lookup.node;
   ret.name = PATH.basename(path);
   lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   ret.exists = true;
   ret.path = lookup.path;
   ret.object = lookup.node;
   ret.name = lookup.node.name;
   ret.isRoot = lookup.path === "/";
  } catch (e) {
   ret.error = e.errno;
  }
  return ret;
 },
 createFolder: function(parent, name, canRead, canWrite) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(canRead, canWrite);
  return FS.mkdir(path, mode);
 },
 createPath: function(parent, path, canRead, canWrite) {
  parent = typeof parent === "string" ? parent : FS.getPath(parent);
  var parts = path.split("/").reverse();
  while (parts.length) {
   var part = parts.pop();
   if (!part) continue;
   var current = PATH.join2(parent, part);
   try {
    FS.mkdir(current);
   } catch (e) {}
   parent = current;
  }
  return current;
 },
 createFile: function(parent, name, properties, canRead, canWrite) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(canRead, canWrite);
  return FS.create(path, mode);
 },
 createDataFile: function(parent, name, data, canRead, canWrite, canOwn) {
  var path = name ? PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name) : parent;
  var mode = FS.getMode(canRead, canWrite);
  var node = FS.create(path, mode);
  if (data) {
   if (typeof data === "string") {
    var arr = new Array(data.length);
    for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
    data = arr;
   }
   FS.chmod(node, mode | 146);
   var stream = FS.open(node, "w");
   FS.write(stream, data, 0, data.length, 0, canOwn);
   FS.close(stream);
   FS.chmod(node, mode);
  }
  return node;
 },
 createDevice: function(parent, name, input, output) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(!!input, !!output);
  if (!FS.createDevice.major) FS.createDevice.major = 64;
  var dev = FS.makedev(FS.createDevice.major++, 0);
  FS.registerDevice(dev, {
   open: function(stream) {
    stream.seekable = false;
   },
   close: function(stream) {
    if (output && output.buffer && output.buffer.length) {
     output(10);
    }
   },
   read: function(stream, buffer, offset, length, pos) {
    var bytesRead = 0;
    for (var i = 0; i < length; i++) {
     var result;
     try {
      result = input();
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
     if (result === undefined && bytesRead === 0) {
      throw new FS.ErrnoError(6);
     }
     if (result === null || result === undefined) break;
     bytesRead++;
     buffer[offset + i] = result;
    }
    if (bytesRead) {
     stream.node.timestamp = Date.now();
    }
    return bytesRead;
   },
   write: function(stream, buffer, offset, length, pos) {
    for (var i = 0; i < length; i++) {
     try {
      output(buffer[offset + i]);
     } catch (e) {
      throw new FS.ErrnoError(29);
     }
    }
    if (length) {
     stream.node.timestamp = Date.now();
    }
    return i;
   }
  });
  return FS.mkdev(path, mode, dev);
 },
 createLink: function(parent, name, target, canRead, canWrite) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  return FS.symlink(target, path);
 },
 forceLoadFile: function(obj) {
  if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
  var success = true;
  if (typeof XMLHttpRequest !== "undefined") {
   throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
  } else if (read_) {
   try {
    obj.contents = intArrayFromString(read_(obj.url), true);
    obj.usedBytes = obj.contents.length;
   } catch (e) {
    success = false;
   }
  } else {
   throw new Error("Cannot load without read() or XMLHttpRequest.");
  }
  if (!success) setErrNo(29);
  return success;
 },
 createLazyFile: function(parent, name, url, canRead, canWrite) {
  function LazyUint8Array() {
   this.lengthKnown = false;
   this.chunks = [];
  }
  LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
   if (idx > this.length - 1 || idx < 0) {
    return undefined;
   }
   var chunkOffset = idx % this.chunkSize;
   var chunkNum = idx / this.chunkSize | 0;
   return this.getter(chunkNum)[chunkOffset];
  };
  LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
   this.getter = getter;
  };
  LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
   var xhr = new XMLHttpRequest();
   xhr.open("HEAD", url, false);
   xhr.send(null);
   if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
   var datalength = Number(xhr.getResponseHeader("Content-length"));
   var header;
   var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
   var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
   var chunkSize = 1024 * 1024;
   if (!hasByteServing) chunkSize = datalength;
   var doXHR = function(from, to) {
    if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
    if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
    if (typeof Uint8Array != "undefined") xhr.responseType = "arraybuffer";
    if (xhr.overrideMimeType) {
     xhr.overrideMimeType("text/plain; charset=x-user-defined");
    }
    xhr.send(null);
    if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
    if (xhr.response !== undefined) {
     return new Uint8Array(xhr.response || []);
    } else {
     return intArrayFromString(xhr.responseText || "", true);
    }
   };
   var lazyArray = this;
   lazyArray.setDataGetter(function(chunkNum) {
    var start = chunkNum * chunkSize;
    var end = (chunkNum + 1) * chunkSize - 1;
    end = Math.min(end, datalength - 1);
    if (typeof lazyArray.chunks[chunkNum] === "undefined") {
     lazyArray.chunks[chunkNum] = doXHR(start, end);
    }
    if (typeof lazyArray.chunks[chunkNum] === "undefined") throw new Error("doXHR failed!");
    return lazyArray.chunks[chunkNum];
   });
   if (usesGzip || !datalength) {
    chunkSize = datalength = 1;
    datalength = this.getter(0).length;
    chunkSize = datalength;
    out("LazyFiles on gzip forces download of the whole file when length is accessed");
   }
   this._length = datalength;
   this._chunkSize = chunkSize;
   this.lengthKnown = true;
  };
  if (typeof XMLHttpRequest !== "undefined") {
   if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
   var lazyArray = new LazyUint8Array();
   Object.defineProperties(lazyArray, {
    length: {
     get: function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._length;
     }
    },
    chunkSize: {
     get: function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._chunkSize;
     }
    }
   });
   var properties = {
    isDevice: false,
    contents: lazyArray
   };
  } else {
   var properties = {
    isDevice: false,
    url: url
   };
  }
  var node = FS.createFile(parent, name, properties, canRead, canWrite);
  if (properties.contents) {
   node.contents = properties.contents;
  } else if (properties.url) {
   node.contents = null;
   node.url = properties.url;
  }
  Object.defineProperties(node, {
   usedBytes: {
    get: function() {
     return this.contents.length;
    }
   }
  });
  var stream_ops = {};
  var keys = Object.keys(node.stream_ops);
  keys.forEach(function(key) {
   var fn = node.stream_ops[key];
   stream_ops[key] = function forceLoadLazyFile() {
    if (!FS.forceLoadFile(node)) {
     throw new FS.ErrnoError(29);
    }
    return fn.apply(null, arguments);
   };
  });
  stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
   if (!FS.forceLoadFile(node)) {
    throw new FS.ErrnoError(29);
   }
   var contents = stream.node.contents;
   if (position >= contents.length) return 0;
   var size = Math.min(contents.length - position, length);
   if (contents.slice) {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents[position + i];
    }
   } else {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents.get(position + i);
    }
   }
   return size;
  };
  node.stream_ops = stream_ops;
  return node;
 },
 createPreloadedFile: function(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
  Browser.init();
  var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
  var dep = getUniqueRunDependency("cp " + fullname);
  function processData(byteArray) {
   function finish(byteArray) {
    if (preFinish) preFinish();
    if (!dontCreateFile) {
     FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
    }
    if (onload) onload();
    removeRunDependency(dep);
   }
   var handled = false;
   Module["preloadPlugins"].forEach(function(plugin) {
    if (handled) return;
    if (plugin["canHandle"](fullname)) {
     plugin["handle"](byteArray, fullname, finish, function() {
      if (onerror) onerror();
      removeRunDependency(dep);
     });
     handled = true;
    }
   });
   if (!handled) finish(byteArray);
  }
  addRunDependency(dep);
  if (typeof url == "string") {
   Browser.asyncLoad(url, function(byteArray) {
    processData(byteArray);
   }, onerror);
  } else {
   processData(url);
  }
 },
 indexedDB: function() {
  return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 },
 DB_NAME: function() {
  return "EM_FS_" + window.location.pathname;
 },
 DB_VERSION: 20,
 DB_STORE_NAME: "FILE_DATA",
 saveFilesToDB: function(paths, onload, onerror) {
  onload = onload || function() {};
  onerror = onerror || function() {};
  var indexedDB = FS.indexedDB();
  try {
   var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
  } catch (e) {
   return onerror(e);
  }
  openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
   out("creating db");
   var db = openRequest.result;
   db.createObjectStore(FS.DB_STORE_NAME);
  };
  openRequest.onsuccess = function openRequest_onsuccess() {
   var db = openRequest.result;
   var transaction = db.transaction([ FS.DB_STORE_NAME ], "readwrite");
   var files = transaction.objectStore(FS.DB_STORE_NAME);
   var ok = 0, fail = 0, total = paths.length;
   function finish() {
    if (fail == 0) onload(); else onerror();
   }
   paths.forEach(function(path) {
    var putRequest = files.put(FS.analyzePath(path).object.contents, path);
    putRequest.onsuccess = function putRequest_onsuccess() {
     ok++;
     if (ok + fail == total) finish();
    };
    putRequest.onerror = function putRequest_onerror() {
     fail++;
     if (ok + fail == total) finish();
    };
   });
   transaction.onerror = onerror;
  };
  openRequest.onerror = onerror;
 },
 loadFilesFromDB: function(paths, onload, onerror) {
  onload = onload || function() {};
  onerror = onerror || function() {};
  var indexedDB = FS.indexedDB();
  try {
   var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
  } catch (e) {
   return onerror(e);
  }
  openRequest.onupgradeneeded = onerror;
  openRequest.onsuccess = function openRequest_onsuccess() {
   var db = openRequest.result;
   try {
    var transaction = db.transaction([ FS.DB_STORE_NAME ], "readonly");
   } catch (e) {
    onerror(e);
    return;
   }
   var files = transaction.objectStore(FS.DB_STORE_NAME);
   var ok = 0, fail = 0, total = paths.length;
   function finish() {
    if (fail == 0) onload(); else onerror();
   }
   paths.forEach(function(path) {
    var getRequest = files.get(path);
    getRequest.onsuccess = function getRequest_onsuccess() {
     if (FS.analyzePath(path).exists) {
      FS.unlink(path);
     }
     FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
     ok++;
     if (ok + fail == total) finish();
    };
    getRequest.onerror = function getRequest_onerror() {
     fail++;
     if (ok + fail == total) finish();
    };
   });
   transaction.onerror = onerror;
  };
  openRequest.onerror = onerror;
 }
};

var SYSCALLS = {
 mappings: {},
 DEFAULT_POLLMASK: 5,
 umask: 511,
 calculateAt: function(dirfd, path) {
  if (path[0] !== "/") {
   var dir;
   if (dirfd === -100) {
    dir = FS.cwd();
   } else {
    var dirstream = FS.getStream(dirfd);
    if (!dirstream) throw new FS.ErrnoError(8);
    dir = dirstream.path;
   }
   path = PATH.join2(dir, path);
  }
  return path;
 },
 doStat: function(func, path, buf) {
  try {
   var stat = func(path);
  } catch (e) {
   if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
    return -54;
   }
   throw e;
  }
  HEAP32[buf >> 2] = stat.dev;
  HEAP32[buf + 4 >> 2] = 0;
  HEAP32[buf + 8 >> 2] = stat.ino;
  HEAP32[buf + 12 >> 2] = stat.mode;
  HEAP32[buf + 16 >> 2] = stat.nlink;
  HEAP32[buf + 20 >> 2] = stat.uid;
  HEAP32[buf + 24 >> 2] = stat.gid;
  HEAP32[buf + 28 >> 2] = stat.rdev;
  HEAP32[buf + 32 >> 2] = 0;
  tempI64 = [ stat.size >>> 0, (tempDouble = stat.size, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1];
  HEAP32[buf + 48 >> 2] = 4096;
  HEAP32[buf + 52 >> 2] = stat.blocks;
  HEAP32[buf + 56 >> 2] = stat.atime.getTime() / 1e3 | 0;
  HEAP32[buf + 60 >> 2] = 0;
  HEAP32[buf + 64 >> 2] = stat.mtime.getTime() / 1e3 | 0;
  HEAP32[buf + 68 >> 2] = 0;
  HEAP32[buf + 72 >> 2] = stat.ctime.getTime() / 1e3 | 0;
  HEAP32[buf + 76 >> 2] = 0;
  tempI64 = [ stat.ino >>> 0, (tempDouble = stat.ino, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[buf + 80 >> 2] = tempI64[0], HEAP32[buf + 84 >> 2] = tempI64[1];
  return 0;
 },
 doMsync: function(addr, stream, len, flags, offset) {
  var buffer = HEAPU8.slice(addr, addr + len);
  FS.msync(stream, buffer, offset, len, flags);
 },
 doMkdir: function(path, mode) {
  path = PATH.normalize(path);
  if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
  FS.mkdir(path, mode, 0);
  return 0;
 },
 doMknod: function(path, mode, dev) {
  switch (mode & 61440) {
  case 32768:
  case 8192:
  case 24576:
  case 4096:
  case 49152:
   break;

  default:
   return -28;
  }
  FS.mknod(path, mode, dev);
  return 0;
 },
 doReadlink: function(path, buf, bufsize) {
  if (bufsize <= 0) return -28;
  var ret = FS.readlink(path);
  var len = Math.min(bufsize, lengthBytesUTF8(ret));
  var endChar = HEAP8[buf + len];
  stringToUTF8(ret, buf, bufsize + 1);
  HEAP8[buf + len] = endChar;
  return len;
 },
 doAccess: function(path, amode) {
  if (amode & ~7) {
   return -28;
  }
  var node;
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  node = lookup.node;
  if (!node) {
   return -44;
  }
  var perms = "";
  if (amode & 4) perms += "r";
  if (amode & 2) perms += "w";
  if (amode & 1) perms += "x";
  if (perms && FS.nodePermissions(node, perms)) {
   return -2;
  }
  return 0;
 },
 doDup: function(path, flags, suggestFD) {
  var suggest = FS.getStream(suggestFD);
  if (suggest) FS.close(suggest);
  return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
 },
 doReadv: function(stream, iov, iovcnt, offset) {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
   var ptr = HEAP32[iov + i * 8 >> 2];
   var len = HEAP32[iov + (i * 8 + 4) >> 2];
   var curr = FS.read(stream, HEAP8, ptr, len, offset);
   if (curr < 0) return -1;
   ret += curr;
   if (curr < len) break;
  }
  return ret;
 },
 doWritev: function(stream, iov, iovcnt, offset) {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
   var ptr = HEAP32[iov + i * 8 >> 2];
   var len = HEAP32[iov + (i * 8 + 4) >> 2];
   var curr = FS.write(stream, HEAP8, ptr, len, offset);
   if (curr < 0) return -1;
   ret += curr;
  }
  return ret;
 },
 varargs: undefined,
 get: function() {
  SYSCALLS.varargs += 4;
  var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
  return ret;
 },
 getStr: function(ptr) {
  var ret = UTF8ToString(ptr);
  return ret;
 },
 getStreamFromFD: function(fd) {
  var stream = FS.getStream(fd);
  if (!stream) throw new FS.ErrnoError(8);
  return stream;
 },
 get64: function(low, high) {
  return low;
 }
};

function syscallMunmap(addr, len) {
 if ((addr | 0) === -1 || len === 0) {
  return -28;
 }
 var info = SYSCALLS.mappings[addr];
 if (!info) return 0;
 if (len === info.len) {
  var stream = FS.getStream(info.fd);
  if (info.prot & 2) {
   SYSCALLS.doMsync(addr, stream, len, info.flags, info.offset);
  }
  FS.munmap(stream);
  SYSCALLS.mappings[addr] = null;
  if (info.allocated) {
   _free(info.malloc);
  }
 }
 return 0;
}

function ___sys_munmap(addr, len) {
 try {
  return syscallMunmap(addr, len);
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function getShiftFromSize(size) {
 switch (size) {
 case 1:
  return 0;

 case 2:
  return 1;

 case 4:
  return 2;

 case 8:
  return 3;

 default:
  throw new TypeError("Unknown type size: " + size);
 }
}

function embind_init_charCodes() {
 var codes = new Array(256);
 for (var i = 0; i < 256; ++i) {
  codes[i] = String.fromCharCode(i);
 }
 embind_charCodes = codes;
}

var embind_charCodes = undefined;

function readLatin1String(ptr) {
 var ret = "";
 var c = ptr;
 while (HEAPU8[c]) {
  ret += embind_charCodes[HEAPU8[c++]];
 }
 return ret;
}

var awaitingDependencies = {};

var registeredTypes = {};

var typeDependencies = {};

var char_0 = 48;

var char_9 = 57;

function makeLegalFunctionName(name) {
 if (undefined === name) {
  return "_unknown";
 }
 name = name.replace(/[^a-zA-Z0-9_]/g, "$");
 var f = name.charCodeAt(0);
 if (f >= char_0 && f <= char_9) {
  return "_" + name;
 } else {
  return name;
 }
}

function createNamedFunction(name, body) {
 name = makeLegalFunctionName(name);
 return new Function("body", "return function " + name + "() {\n" + '    "use strict";' + "    return body.apply(this, arguments);\n" + "};\n")(body);
}

function extendError(baseErrorType, errorName) {
 var errorClass = createNamedFunction(errorName, function(message) {
  this.name = errorName;
  this.message = message;
  var stack = new Error(message).stack;
  if (stack !== undefined) {
   this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "");
  }
 });
 errorClass.prototype = Object.create(baseErrorType.prototype);
 errorClass.prototype.constructor = errorClass;
 errorClass.prototype.toString = function() {
  if (this.message === undefined) {
   return this.name;
  } else {
   return this.name + ": " + this.message;
  }
 };
 return errorClass;
}

var BindingError = undefined;

function throwBindingError(message) {
 throw new BindingError(message);
}

var InternalError = undefined;

function throwInternalError(message) {
 throw new InternalError(message);
}

function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
 myTypes.forEach(function(type) {
  typeDependencies[type] = dependentTypes;
 });
 function onComplete(typeConverters) {
  var myTypeConverters = getTypeConverters(typeConverters);
  if (myTypeConverters.length !== myTypes.length) {
   throwInternalError("Mismatched type converter count");
  }
  for (var i = 0; i < myTypes.length; ++i) {
   registerType(myTypes[i], myTypeConverters[i]);
  }
 }
 var typeConverters = new Array(dependentTypes.length);
 var unregisteredTypes = [];
 var registered = 0;
 dependentTypes.forEach(function(dt, i) {
  if (registeredTypes.hasOwnProperty(dt)) {
   typeConverters[i] = registeredTypes[dt];
  } else {
   unregisteredTypes.push(dt);
   if (!awaitingDependencies.hasOwnProperty(dt)) {
    awaitingDependencies[dt] = [];
   }
   awaitingDependencies[dt].push(function() {
    typeConverters[i] = registeredTypes[dt];
    ++registered;
    if (registered === unregisteredTypes.length) {
     onComplete(typeConverters);
    }
   });
  }
 });
 if (0 === unregisteredTypes.length) {
  onComplete(typeConverters);
 }
}

function registerType(rawType, registeredInstance, options) {
 options = options || {};
 if (!("argPackAdvance" in registeredInstance)) {
  throw new TypeError("registerType registeredInstance requires argPackAdvance");
 }
 var name = registeredInstance.name;
 if (!rawType) {
  throwBindingError('type "' + name + '" must have a positive integer typeid pointer');
 }
 if (registeredTypes.hasOwnProperty(rawType)) {
  if (options.ignoreDuplicateRegistrations) {
   return;
  } else {
   throwBindingError("Cannot register type '" + name + "' twice");
  }
 }
 registeredTypes[rawType] = registeredInstance;
 delete typeDependencies[rawType];
 if (awaitingDependencies.hasOwnProperty(rawType)) {
  var callbacks = awaitingDependencies[rawType];
  delete awaitingDependencies[rawType];
  callbacks.forEach(function(cb) {
   cb();
  });
 }
}

function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
 var shift = getShiftFromSize(size);
 name = readLatin1String(name);
 registerType(rawType, {
  name: name,
  "fromWireType": function(wt) {
   return !!wt;
  },
  "toWireType": function(destructors, o) {
   return o ? trueValue : falseValue;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": function(pointer) {
   var heap;
   if (size === 1) {
    heap = HEAP8;
   } else if (size === 2) {
    heap = HEAP16;
   } else if (size === 4) {
    heap = HEAP32;
   } else {
    throw new TypeError("Unknown boolean type size: " + name);
   }
   return this["fromWireType"](heap[pointer >> shift]);
  },
  destructorFunction: null
 });
}

function ClassHandle_isAliasOf(other) {
 if (!(this instanceof ClassHandle)) {
  return false;
 }
 if (!(other instanceof ClassHandle)) {
  return false;
 }
 var leftClass = this.$$.ptrType.registeredClass;
 var left = this.$$.ptr;
 var rightClass = other.$$.ptrType.registeredClass;
 var right = other.$$.ptr;
 while (leftClass.baseClass) {
  left = leftClass.upcast(left);
  leftClass = leftClass.baseClass;
 }
 while (rightClass.baseClass) {
  right = rightClass.upcast(right);
  rightClass = rightClass.baseClass;
 }
 return leftClass === rightClass && left === right;
}

function shallowCopyInternalPointer(o) {
 return {
  count: o.count,
  deleteScheduled: o.deleteScheduled,
  preservePointerOnDelete: o.preservePointerOnDelete,
  ptr: o.ptr,
  ptrType: o.ptrType,
  smartPtr: o.smartPtr,
  smartPtrType: o.smartPtrType
 };
}

function throwInstanceAlreadyDeleted(obj) {
 function getInstanceTypeName(handle) {
  return handle.$$.ptrType.registeredClass.name;
 }
 throwBindingError(getInstanceTypeName(obj) + " instance already deleted");
}

var finalizationGroup = false;

function detachFinalizer(handle) {}

function runDestructor($$) {
 if ($$.smartPtr) {
  $$.smartPtrType.rawDestructor($$.smartPtr);
 } else {
  $$.ptrType.registeredClass.rawDestructor($$.ptr);
 }
}

function releaseClassHandle($$) {
 $$.count.value -= 1;
 var toDelete = 0 === $$.count.value;
 if (toDelete) {
  runDestructor($$);
 }
}

function attachFinalizer(handle) {
 if ("undefined" === typeof FinalizationGroup) {
  attachFinalizer = function(handle) {
   return handle;
  };
  return handle;
 }
 finalizationGroup = new FinalizationGroup(function(iter) {
  for (var result = iter.next(); !result.done; result = iter.next()) {
   var $$ = result.value;
   if (!$$.ptr) {
    console.warn("object already deleted: " + $$.ptr);
   } else {
    releaseClassHandle($$);
   }
  }
 });
 attachFinalizer = function(handle) {
  finalizationGroup.register(handle, handle.$$, handle.$$);
  return handle;
 };
 detachFinalizer = function(handle) {
  finalizationGroup.unregister(handle.$$);
 };
 return attachFinalizer(handle);
}

function ClassHandle_clone() {
 if (!this.$$.ptr) {
  throwInstanceAlreadyDeleted(this);
 }
 if (this.$$.preservePointerOnDelete) {
  this.$$.count.value += 1;
  return this;
 } else {
  var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), {
   $$: {
    value: shallowCopyInternalPointer(this.$$)
   }
  }));
  clone.$$.count.value += 1;
  clone.$$.deleteScheduled = false;
  return clone;
 }
}

function ClassHandle_delete() {
 if (!this.$$.ptr) {
  throwInstanceAlreadyDeleted(this);
 }
 if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
  throwBindingError("Object already scheduled for deletion");
 }
 detachFinalizer(this);
 releaseClassHandle(this.$$);
 if (!this.$$.preservePointerOnDelete) {
  this.$$.smartPtr = undefined;
  this.$$.ptr = undefined;
 }
}

function ClassHandle_isDeleted() {
 return !this.$$.ptr;
}

var delayFunction = undefined;

var deletionQueue = [];

function flushPendingDeletes() {
 while (deletionQueue.length) {
  var obj = deletionQueue.pop();
  obj.$$.deleteScheduled = false;
  obj["delete"]();
 }
}

function ClassHandle_deleteLater() {
 if (!this.$$.ptr) {
  throwInstanceAlreadyDeleted(this);
 }
 if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
  throwBindingError("Object already scheduled for deletion");
 }
 deletionQueue.push(this);
 if (deletionQueue.length === 1 && delayFunction) {
  delayFunction(flushPendingDeletes);
 }
 this.$$.deleteScheduled = true;
 return this;
}

function init_ClassHandle() {
 ClassHandle.prototype["isAliasOf"] = ClassHandle_isAliasOf;
 ClassHandle.prototype["clone"] = ClassHandle_clone;
 ClassHandle.prototype["delete"] = ClassHandle_delete;
 ClassHandle.prototype["isDeleted"] = ClassHandle_isDeleted;
 ClassHandle.prototype["deleteLater"] = ClassHandle_deleteLater;
}

function ClassHandle() {}

var registeredPointers = {};

function ensureOverloadTable(proto, methodName, humanName) {
 if (undefined === proto[methodName].overloadTable) {
  var prevFunc = proto[methodName];
  proto[methodName] = function() {
   if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
    throwBindingError("Function '" + humanName + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + proto[methodName].overloadTable + ")!");
   }
   return proto[methodName].overloadTable[arguments.length].apply(this, arguments);
  };
  proto[methodName].overloadTable = [];
  proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
 }
}

function exposePublicSymbol(name, value, numArguments) {
 if (Module.hasOwnProperty(name)) {
  if (undefined === numArguments || undefined !== Module[name].overloadTable && undefined !== Module[name].overloadTable[numArguments]) {
   throwBindingError("Cannot register public name '" + name + "' twice");
  }
  ensureOverloadTable(Module, name, name);
  if (Module.hasOwnProperty(numArguments)) {
   throwBindingError("Cannot register multiple overloads of a function with the same number of arguments (" + numArguments + ")!");
  }
  Module[name].overloadTable[numArguments] = value;
 } else {
  Module[name] = value;
  if (undefined !== numArguments) {
   Module[name].numArguments = numArguments;
  }
 }
}

function RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast) {
 this.name = name;
 this.constructor = constructor;
 this.instancePrototype = instancePrototype;
 this.rawDestructor = rawDestructor;
 this.baseClass = baseClass;
 this.getActualType = getActualType;
 this.upcast = upcast;
 this.downcast = downcast;
 this.pureVirtualFunctions = [];
}

function upcastPointer(ptr, ptrClass, desiredClass) {
 while (ptrClass !== desiredClass) {
  if (!ptrClass.upcast) {
   throwBindingError("Expected null or instance of " + desiredClass.name + ", got an instance of " + ptrClass.name);
  }
  ptr = ptrClass.upcast(ptr);
  ptrClass = ptrClass.baseClass;
 }
 return ptr;
}

function constNoSmartPtrRawPointerToWireType(destructors, handle) {
 if (handle === null) {
  if (this.isReference) {
   throwBindingError("null is not a valid " + this.name);
  }
  return 0;
 }
 if (!handle.$$) {
  throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
 }
 if (!handle.$$.ptr) {
  throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
 }
 var handleClass = handle.$$.ptrType.registeredClass;
 var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
 return ptr;
}

function genericPointerToWireType(destructors, handle) {
 var ptr;
 if (handle === null) {
  if (this.isReference) {
   throwBindingError("null is not a valid " + this.name);
  }
  if (this.isSmartPointer) {
   ptr = this.rawConstructor();
   if (destructors !== null) {
    destructors.push(this.rawDestructor, ptr);
   }
   return ptr;
  } else {
   return 0;
  }
 }
 if (!handle.$$) {
  throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
 }
 if (!handle.$$.ptr) {
  throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
 }
 if (!this.isConst && handle.$$.ptrType.isConst) {
  throwBindingError("Cannot convert argument of type " + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + " to parameter type " + this.name);
 }
 var handleClass = handle.$$.ptrType.registeredClass;
 ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
 if (this.isSmartPointer) {
  if (undefined === handle.$$.smartPtr) {
   throwBindingError("Passing raw pointer to smart pointer is illegal");
  }
  switch (this.sharingPolicy) {
  case 0:
   if (handle.$$.smartPtrType === this) {
    ptr = handle.$$.smartPtr;
   } else {
    throwBindingError("Cannot convert argument of type " + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + " to parameter type " + this.name);
   }
   break;

  case 1:
   ptr = handle.$$.smartPtr;
   break;

  case 2:
   if (handle.$$.smartPtrType === this) {
    ptr = handle.$$.smartPtr;
   } else {
    var clonedHandle = handle["clone"]();
    ptr = this.rawShare(ptr, __emval_register(function() {
     clonedHandle["delete"]();
    }));
    if (destructors !== null) {
     destructors.push(this.rawDestructor, ptr);
    }
   }
   break;

  default:
   throwBindingError("Unsupporting sharing policy");
  }
 }
 return ptr;
}

function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
 if (handle === null) {
  if (this.isReference) {
   throwBindingError("null is not a valid " + this.name);
  }
  return 0;
 }
 if (!handle.$$) {
  throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
 }
 if (!handle.$$.ptr) {
  throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
 }
 if (handle.$$.ptrType.isConst) {
  throwBindingError("Cannot convert argument of type " + handle.$$.ptrType.name + " to parameter type " + this.name);
 }
 var handleClass = handle.$$.ptrType.registeredClass;
 var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
 return ptr;
}

function simpleReadValueFromPointer(pointer) {
 return this["fromWireType"](HEAPU32[pointer >> 2]);
}

function RegisteredPointer_getPointee(ptr) {
 if (this.rawGetPointee) {
  ptr = this.rawGetPointee(ptr);
 }
 return ptr;
}

function RegisteredPointer_destructor(ptr) {
 if (this.rawDestructor) {
  this.rawDestructor(ptr);
 }
}

function RegisteredPointer_deleteObject(handle) {
 if (handle !== null) {
  handle["delete"]();
 }
}

function downcastPointer(ptr, ptrClass, desiredClass) {
 if (ptrClass === desiredClass) {
  return ptr;
 }
 if (undefined === desiredClass.baseClass) {
  return null;
 }
 var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
 if (rv === null) {
  return null;
 }
 return desiredClass.downcast(rv);
}

function getInheritedInstanceCount() {
 return Object.keys(registeredInstances).length;
}

function getLiveInheritedInstances() {
 var rv = [];
 for (var k in registeredInstances) {
  if (registeredInstances.hasOwnProperty(k)) {
   rv.push(registeredInstances[k]);
  }
 }
 return rv;
}

function setDelayFunction(fn) {
 delayFunction = fn;
 if (deletionQueue.length && delayFunction) {
  delayFunction(flushPendingDeletes);
 }
}

function init_embind() {
 Module["getInheritedInstanceCount"] = getInheritedInstanceCount;
 Module["getLiveInheritedInstances"] = getLiveInheritedInstances;
 Module["flushPendingDeletes"] = flushPendingDeletes;
 Module["setDelayFunction"] = setDelayFunction;
}

var registeredInstances = {};

function getBasestPointer(class_, ptr) {
 if (ptr === undefined) {
  throwBindingError("ptr should not be undefined");
 }
 while (class_.baseClass) {
  ptr = class_.upcast(ptr);
  class_ = class_.baseClass;
 }
 return ptr;
}

function getInheritedInstance(class_, ptr) {
 ptr = getBasestPointer(class_, ptr);
 return registeredInstances[ptr];
}

function makeClassHandle(prototype, record) {
 if (!record.ptrType || !record.ptr) {
  throwInternalError("makeClassHandle requires ptr and ptrType");
 }
 var hasSmartPtrType = !!record.smartPtrType;
 var hasSmartPtr = !!record.smartPtr;
 if (hasSmartPtrType !== hasSmartPtr) {
  throwInternalError("Both smartPtrType and smartPtr must be specified");
 }
 record.count = {
  value: 1
 };
 return attachFinalizer(Object.create(prototype, {
  $$: {
   value: record
  }
 }));
}

function RegisteredPointer_fromWireType(ptr) {
 var rawPointer = this.getPointee(ptr);
 if (!rawPointer) {
  this.destructor(ptr);
  return null;
 }
 var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);
 if (undefined !== registeredInstance) {
  if (0 === registeredInstance.$$.count.value) {
   registeredInstance.$$.ptr = rawPointer;
   registeredInstance.$$.smartPtr = ptr;
   return registeredInstance["clone"]();
  } else {
   var rv = registeredInstance["clone"]();
   this.destructor(ptr);
   return rv;
  }
 }
 function makeDefaultHandle() {
  if (this.isSmartPointer) {
   return makeClassHandle(this.registeredClass.instancePrototype, {
    ptrType: this.pointeeType,
    ptr: rawPointer,
    smartPtrType: this,
    smartPtr: ptr
   });
  } else {
   return makeClassHandle(this.registeredClass.instancePrototype, {
    ptrType: this,
    ptr: ptr
   });
  }
 }
 var actualType = this.registeredClass.getActualType(rawPointer);
 var registeredPointerRecord = registeredPointers[actualType];
 if (!registeredPointerRecord) {
  return makeDefaultHandle.call(this);
 }
 var toType;
 if (this.isConst) {
  toType = registeredPointerRecord.constPointerType;
 } else {
  toType = registeredPointerRecord.pointerType;
 }
 var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass);
 if (dp === null) {
  return makeDefaultHandle.call(this);
 }
 if (this.isSmartPointer) {
  return makeClassHandle(toType.registeredClass.instancePrototype, {
   ptrType: toType,
   ptr: dp,
   smartPtrType: this,
   smartPtr: ptr
  });
 } else {
  return makeClassHandle(toType.registeredClass.instancePrototype, {
   ptrType: toType,
   ptr: dp
  });
 }
}

function init_RegisteredPointer() {
 RegisteredPointer.prototype.getPointee = RegisteredPointer_getPointee;
 RegisteredPointer.prototype.destructor = RegisteredPointer_destructor;
 RegisteredPointer.prototype["argPackAdvance"] = 8;
 RegisteredPointer.prototype["readValueFromPointer"] = simpleReadValueFromPointer;
 RegisteredPointer.prototype["deleteObject"] = RegisteredPointer_deleteObject;
 RegisteredPointer.prototype["fromWireType"] = RegisteredPointer_fromWireType;
}

function RegisteredPointer(name, registeredClass, isReference, isConst, isSmartPointer, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor) {
 this.name = name;
 this.registeredClass = registeredClass;
 this.isReference = isReference;
 this.isConst = isConst;
 this.isSmartPointer = isSmartPointer;
 this.pointeeType = pointeeType;
 this.sharingPolicy = sharingPolicy;
 this.rawGetPointee = rawGetPointee;
 this.rawConstructor = rawConstructor;
 this.rawShare = rawShare;
 this.rawDestructor = rawDestructor;
 if (!isSmartPointer && registeredClass.baseClass === undefined) {
  if (isConst) {
   this["toWireType"] = constNoSmartPtrRawPointerToWireType;
   this.destructorFunction = null;
  } else {
   this["toWireType"] = nonConstNoSmartPtrRawPointerToWireType;
   this.destructorFunction = null;
  }
 } else {
  this["toWireType"] = genericPointerToWireType;
 }
}

function replacePublicSymbol(name, value, numArguments) {
 if (!Module.hasOwnProperty(name)) {
  throwInternalError("Replacing nonexistant public symbol");
 }
 if (undefined !== Module[name].overloadTable && undefined !== numArguments) {
  Module[name].overloadTable[numArguments] = value;
 } else {
  Module[name] = value;
  Module[name].argCount = numArguments;
 }
}

function embind__requireFunction(signature, rawFunction) {
 signature = readLatin1String(signature);
 function makeDynCaller(dynCall) {
  var args = [];
  for (var i = 1; i < signature.length; ++i) {
   args.push("a" + i);
  }
  var name = "dynCall_" + signature + "_" + rawFunction;
  var body = "return function " + name + "(" + args.join(", ") + ") {\n";
  body += "    return dynCall(rawFunction" + (args.length ? ", " : "") + args.join(", ") + ");\n";
  body += "};\n";
  return new Function("dynCall", "rawFunction", body)(dynCall, rawFunction);
 }
 var dc = Module["dynCall_" + signature];
 var fp = makeDynCaller(dc);
 if (typeof fp !== "function") {
  throwBindingError("unknown function pointer with signature " + signature + ": " + rawFunction);
 }
 return fp;
}

var UnboundTypeError = undefined;

function getTypeName(type) {
 var ptr = ___getTypeName(type);
 var rv = readLatin1String(ptr);
 _free(ptr);
 return rv;
}

function throwUnboundTypeError(message, types) {
 var unboundTypes = [];
 var seen = {};
 function visit(type) {
  if (seen[type]) {
   return;
  }
  if (registeredTypes[type]) {
   return;
  }
  if (typeDependencies[type]) {
   typeDependencies[type].forEach(visit);
   return;
  }
  unboundTypes.push(type);
  seen[type] = true;
 }
 types.forEach(visit);
 throw new UnboundTypeError(message + ": " + unboundTypes.map(getTypeName).join([ ", " ]));
}

function __embind_register_class(rawType, rawPointerType, rawConstPointerType, baseClassRawType, getActualTypeSignature, getActualType, upcastSignature, upcast, downcastSignature, downcast, name, destructorSignature, rawDestructor) {
 name = readLatin1String(name);
 getActualType = embind__requireFunction(getActualTypeSignature, getActualType);
 if (upcast) {
  upcast = embind__requireFunction(upcastSignature, upcast);
 }
 if (downcast) {
  downcast = embind__requireFunction(downcastSignature, downcast);
 }
 rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
 var legalFunctionName = makeLegalFunctionName(name);
 exposePublicSymbol(legalFunctionName, function() {
  throwUnboundTypeError("Cannot construct " + name + " due to unbound types", [ baseClassRawType ]);
 });
 whenDependentTypesAreResolved([ rawType, rawPointerType, rawConstPointerType ], baseClassRawType ? [ baseClassRawType ] : [], function(base) {
  base = base[0];
  var baseClass;
  var basePrototype;
  if (baseClassRawType) {
   baseClass = base.registeredClass;
   basePrototype = baseClass.instancePrototype;
  } else {
   basePrototype = ClassHandle.prototype;
  }
  var constructor = createNamedFunction(legalFunctionName, function() {
   if (Object.getPrototypeOf(this) !== instancePrototype) {
    throw new BindingError("Use 'new' to construct " + name);
   }
   if (undefined === registeredClass.constructor_body) {
    throw new BindingError(name + " has no accessible constructor");
   }
   var body = registeredClass.constructor_body[arguments.length];
   if (undefined === body) {
    throw new BindingError("Tried to invoke ctor of " + name + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(registeredClass.constructor_body).toString() + ") parameters instead!");
   }
   return body.apply(this, arguments);
  });
  var instancePrototype = Object.create(basePrototype, {
   constructor: {
    value: constructor
   }
  });
  constructor.prototype = instancePrototype;
  var registeredClass = new RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast);
  var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false);
  var pointerConverter = new RegisteredPointer(name + "*", registeredClass, false, false, false);
  var constPointerConverter = new RegisteredPointer(name + " const*", registeredClass, false, true, false);
  registeredPointers[rawType] = {
   pointerType: pointerConverter,
   constPointerType: constPointerConverter
  };
  replacePublicSymbol(legalFunctionName, constructor);
  return [ referenceConverter, pointerConverter, constPointerConverter ];
 });
}

function heap32VectorToArray(count, firstElement) {
 var array = [];
 for (var i = 0; i < count; i++) {
  array.push(HEAP32[(firstElement >> 2) + i]);
 }
 return array;
}

function runDestructors(destructors) {
 while (destructors.length) {
  var ptr = destructors.pop();
  var del = destructors.pop();
  del(ptr);
 }
}

function __embind_register_class_constructor(rawClassType, argCount, rawArgTypesAddr, invokerSignature, invoker, rawConstructor) {
 assert(argCount > 0);
 var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
 invoker = embind__requireFunction(invokerSignature, invoker);
 var args = [ rawConstructor ];
 var destructors = [];
 whenDependentTypesAreResolved([], [ rawClassType ], function(classType) {
  classType = classType[0];
  var humanName = "constructor " + classType.name;
  if (undefined === classType.registeredClass.constructor_body) {
   classType.registeredClass.constructor_body = [];
  }
  if (undefined !== classType.registeredClass.constructor_body[argCount - 1]) {
   throw new BindingError("Cannot register multiple constructors with identical number of parameters (" + (argCount - 1) + ") for class '" + classType.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
  }
  classType.registeredClass.constructor_body[argCount - 1] = function unboundTypeHandler() {
   throwUnboundTypeError("Cannot construct " + classType.name + " due to unbound types", rawArgTypes);
  };
  whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
   classType.registeredClass.constructor_body[argCount - 1] = function constructor_body() {
    if (arguments.length !== argCount - 1) {
     throwBindingError(humanName + " called with " + arguments.length + " arguments, expected " + (argCount - 1));
    }
    destructors.length = 0;
    args.length = argCount;
    for (var i = 1; i < argCount; ++i) {
     args[i] = argTypes[i]["toWireType"](destructors, arguments[i - 1]);
    }
    var ptr = invoker.apply(null, args);
    runDestructors(destructors);
    return argTypes[0]["fromWireType"](ptr);
   };
   return [];
  });
  return [];
 });
}

function new_(constructor, argumentList) {
 if (!(constructor instanceof Function)) {
  throw new TypeError("new_ called with constructor type " + typeof constructor + " which is not a function");
 }
 var dummy = createNamedFunction(constructor.name || "unknownFunctionName", function() {});
 dummy.prototype = constructor.prototype;
 var obj = new dummy();
 var r = constructor.apply(obj, argumentList);
 return r instanceof Object ? r : obj;
}

function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc) {
 var argCount = argTypes.length;
 if (argCount < 2) {
  throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
 }
 var isClassMethodFunc = argTypes[1] !== null && classType !== null;
 var needsDestructorStack = false;
 for (var i = 1; i < argTypes.length; ++i) {
  if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) {
   needsDestructorStack = true;
   break;
  }
 }
 var returns = argTypes[0].name !== "void";
 var argsList = "";
 var argsListWired = "";
 for (var i = 0; i < argCount - 2; ++i) {
  argsList += (i !== 0 ? ", " : "") + "arg" + i;
  argsListWired += (i !== 0 ? ", " : "") + "arg" + i + "Wired";
 }
 var invokerFnBody = "return function " + makeLegalFunctionName(humanName) + "(" + argsList + ") {\n" + "if (arguments.length !== " + (argCount - 2) + ") {\n" + "throwBindingError('function " + humanName + " called with ' + arguments.length + ' arguments, expected " + (argCount - 2) + " args!');\n" + "}\n";
 if (needsDestructorStack) {
  invokerFnBody += "var destructors = [];\n";
 }
 var dtorStack = needsDestructorStack ? "destructors" : "null";
 var args1 = [ "throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam" ];
 var args2 = [ throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1] ];
 if (isClassMethodFunc) {
  invokerFnBody += "var thisWired = classParam.toWireType(" + dtorStack + ", this);\n";
 }
 for (var i = 0; i < argCount - 2; ++i) {
  invokerFnBody += "var arg" + i + "Wired = argType" + i + ".toWireType(" + dtorStack + ", arg" + i + "); // " + argTypes[i + 2].name + "\n";
  args1.push("argType" + i);
  args2.push(argTypes[i + 2]);
 }
 if (isClassMethodFunc) {
  argsListWired = "thisWired" + (argsListWired.length > 0 ? ", " : "") + argsListWired;
 }
 invokerFnBody += (returns ? "var rv = " : "") + "invoker(fn" + (argsListWired.length > 0 ? ", " : "") + argsListWired + ");\n";
 if (needsDestructorStack) {
  invokerFnBody += "runDestructors(destructors);\n";
 } else {
  for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
   var paramName = i === 1 ? "thisWired" : "arg" + (i - 2) + "Wired";
   if (argTypes[i].destructorFunction !== null) {
    invokerFnBody += paramName + "_dtor(" + paramName + "); // " + argTypes[i].name + "\n";
    args1.push(paramName + "_dtor");
    args2.push(argTypes[i].destructorFunction);
   }
  }
 }
 if (returns) {
  invokerFnBody += "var ret = retType.fromWireType(rv);\n" + "return ret;\n";
 } else {}
 invokerFnBody += "}\n";
 args1.push(invokerFnBody);
 var invokerFunction = new_(Function, args1).apply(null, args2);
 return invokerFunction;
}

function __embind_register_class_function(rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, context, isPureVirtual) {
 var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
 methodName = readLatin1String(methodName);
 rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
 whenDependentTypesAreResolved([], [ rawClassType ], function(classType) {
  classType = classType[0];
  var humanName = classType.name + "." + methodName;
  if (isPureVirtual) {
   classType.registeredClass.pureVirtualFunctions.push(methodName);
  }
  function unboundTypesHandler() {
   throwUnboundTypeError("Cannot call " + humanName + " due to unbound types", rawArgTypes);
  }
  var proto = classType.registeredClass.instancePrototype;
  var method = proto[methodName];
  if (undefined === method || undefined === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2) {
   unboundTypesHandler.argCount = argCount - 2;
   unboundTypesHandler.className = classType.name;
   proto[methodName] = unboundTypesHandler;
  } else {
   ensureOverloadTable(proto, methodName, humanName);
   proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
  }
  whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
   var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context);
   if (undefined === proto[methodName].overloadTable) {
    memberFunction.argCount = argCount - 2;
    proto[methodName] = memberFunction;
   } else {
    proto[methodName].overloadTable[argCount - 2] = memberFunction;
   }
   return [];
  });
  return [];
 });
}

function validateThis(this_, classType, humanName) {
 if (!(this_ instanceof Object)) {
  throwBindingError(humanName + ' with invalid "this": ' + this_);
 }
 if (!(this_ instanceof classType.registeredClass.constructor)) {
  throwBindingError(humanName + ' incompatible with "this" of type ' + this_.constructor.name);
 }
 if (!this_.$$.ptr) {
  throwBindingError("cannot call emscripten binding method " + humanName + " on deleted object");
 }
 return upcastPointer(this_.$$.ptr, this_.$$.ptrType.registeredClass, classType.registeredClass);
}

function __embind_register_class_property(classType, fieldName, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) {
 fieldName = readLatin1String(fieldName);
 getter = embind__requireFunction(getterSignature, getter);
 whenDependentTypesAreResolved([], [ classType ], function(classType) {
  classType = classType[0];
  var humanName = classType.name + "." + fieldName;
  var desc = {
   get: function() {
    throwUnboundTypeError("Cannot access " + humanName + " due to unbound types", [ getterReturnType, setterArgumentType ]);
   },
   enumerable: true,
   configurable: true
  };
  if (setter) {
   desc.set = function() {
    throwUnboundTypeError("Cannot access " + humanName + " due to unbound types", [ getterReturnType, setterArgumentType ]);
   };
  } else {
   desc.set = function(v) {
    throwBindingError(humanName + " is a read-only property");
   };
  }
  Object.defineProperty(classType.registeredClass.instancePrototype, fieldName, desc);
  whenDependentTypesAreResolved([], setter ? [ getterReturnType, setterArgumentType ] : [ getterReturnType ], function(types) {
   var getterReturnType = types[0];
   var desc = {
    get: function() {
     var ptr = validateThis(this, classType, humanName + " getter");
     return getterReturnType["fromWireType"](getter(getterContext, ptr));
    },
    enumerable: true
   };
   if (setter) {
    setter = embind__requireFunction(setterSignature, setter);
    var setterArgumentType = types[1];
    desc.set = function(v) {
     var ptr = validateThis(this, classType, humanName + " setter");
     var destructors = [];
     setter(setterContext, ptr, setterArgumentType["toWireType"](destructors, v));
     runDestructors(destructors);
    };
   }
   Object.defineProperty(classType.registeredClass.instancePrototype, fieldName, desc);
   return [];
  });
  return [];
 });
}

var emval_free_list = [];

var emval_handle_array = [ {}, {
 value: undefined
}, {
 value: null
}, {
 value: true
}, {
 value: false
} ];

function __emval_decref(handle) {
 if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
  emval_handle_array[handle] = undefined;
  emval_free_list.push(handle);
 }
}

function count_emval_handles() {
 var count = 0;
 for (var i = 5; i < emval_handle_array.length; ++i) {
  if (emval_handle_array[i] !== undefined) {
   ++count;
  }
 }
 return count;
}

function get_first_emval() {
 for (var i = 5; i < emval_handle_array.length; ++i) {
  if (emval_handle_array[i] !== undefined) {
   return emval_handle_array[i];
  }
 }
 return null;
}

function init_emval() {
 Module["count_emval_handles"] = count_emval_handles;
 Module["get_first_emval"] = get_first_emval;
}

function __emval_register(value) {
 switch (value) {
 case undefined:
  {
   return 1;
  }

 case null:
  {
   return 2;
  }

 case true:
  {
   return 3;
  }

 case false:
  {
   return 4;
  }

 default:
  {
   var handle = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length;
   emval_handle_array[handle] = {
    refcount: 1,
    value: value
   };
   return handle;
  }
 }
}

function __embind_register_emval(rawType, name) {
 name = readLatin1String(name);
 registerType(rawType, {
  name: name,
  "fromWireType": function(handle) {
   var rv = emval_handle_array[handle].value;
   __emval_decref(handle);
   return rv;
  },
  "toWireType": function(destructors, value) {
   return __emval_register(value);
  },
  "argPackAdvance": 8,
  "readValueFromPointer": simpleReadValueFromPointer,
  destructorFunction: null
 });
}

function _embind_repr(v) {
 if (v === null) {
  return "null";
 }
 var t = typeof v;
 if (t === "object" || t === "array" || t === "function") {
  return v.toString();
 } else {
  return "" + v;
 }
}

function floatReadValueFromPointer(name, shift) {
 switch (shift) {
 case 2:
  return function(pointer) {
   return this["fromWireType"](HEAPF32[pointer >> 2]);
  };

 case 3:
  return function(pointer) {
   return this["fromWireType"](HEAPF64[pointer >> 3]);
  };

 default:
  throw new TypeError("Unknown float type: " + name);
 }
}

function __embind_register_float(rawType, name, size) {
 var shift = getShiftFromSize(size);
 name = readLatin1String(name);
 registerType(rawType, {
  name: name,
  "fromWireType": function(value) {
   return value;
  },
  "toWireType": function(destructors, value) {
   if (typeof value !== "number" && typeof value !== "boolean") {
    throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name);
   }
   return value;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": floatReadValueFromPointer(name, shift),
  destructorFunction: null
 });
}

function __embind_register_function(name, argCount, rawArgTypesAddr, signature, rawInvoker, fn) {
 var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
 name = readLatin1String(name);
 rawInvoker = embind__requireFunction(signature, rawInvoker);
 exposePublicSymbol(name, function() {
  throwUnboundTypeError("Cannot call " + name + " due to unbound types", argTypes);
 }, argCount - 1);
 whenDependentTypesAreResolved([], argTypes, function(argTypes) {
  var invokerArgsArray = [ argTypes[0], null ].concat(argTypes.slice(1));
  replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn), argCount - 1);
  return [];
 });
}

function integerReadValueFromPointer(name, shift, signed) {
 switch (shift) {
 case 0:
  return signed ? function readS8FromPointer(pointer) {
   return HEAP8[pointer];
  } : function readU8FromPointer(pointer) {
   return HEAPU8[pointer];
  };

 case 1:
  return signed ? function readS16FromPointer(pointer) {
   return HEAP16[pointer >> 1];
  } : function readU16FromPointer(pointer) {
   return HEAPU16[pointer >> 1];
  };

 case 2:
  return signed ? function readS32FromPointer(pointer) {
   return HEAP32[pointer >> 2];
  } : function readU32FromPointer(pointer) {
   return HEAPU32[pointer >> 2];
  };

 default:
  throw new TypeError("Unknown integer type: " + name);
 }
}

function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
 name = readLatin1String(name);
 if (maxRange === -1) {
  maxRange = 4294967295;
 }
 var shift = getShiftFromSize(size);
 var fromWireType = function(value) {
  return value;
 };
 if (minRange === 0) {
  var bitshift = 32 - 8 * size;
  fromWireType = function(value) {
   return value << bitshift >>> bitshift;
  };
 }
 var isUnsignedType = name.indexOf("unsigned") != -1;
 registerType(primitiveType, {
  name: name,
  "fromWireType": fromWireType,
  "toWireType": function(destructors, value) {
   if (typeof value !== "number" && typeof value !== "boolean") {
    throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name);
   }
   if (value < minRange || value > maxRange) {
    throw new TypeError('Passing a number "' + _embind_repr(value) + '" from JS side to C/C++ side to an argument of type "' + name + '", which is outside the valid range [' + minRange + ", " + maxRange + "]!");
   }
   return isUnsignedType ? value >>> 0 : value | 0;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": integerReadValueFromPointer(name, shift, minRange !== 0),
  destructorFunction: null
 });
}

function __embind_register_memory_view(rawType, dataTypeIndex, name) {
 var typeMapping = [ Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array ];
 var TA = typeMapping[dataTypeIndex];
 function decodeMemoryView(handle) {
  handle = handle >> 2;
  var heap = HEAPU32;
  var size = heap[handle];
  var data = heap[handle + 1];
  return new TA(buffer, data, size);
 }
 name = readLatin1String(name);
 registerType(rawType, {
  name: name,
  "fromWireType": decodeMemoryView,
  "argPackAdvance": 8,
  "readValueFromPointer": decodeMemoryView
 }, {
  ignoreDuplicateRegistrations: true
 });
}

function __embind_register_std_string(rawType, name) {
 name = readLatin1String(name);
 var stdStringIsUTF8 = name === "std::string";
 registerType(rawType, {
  name: name,
  "fromWireType": function(value) {
   var length = HEAPU32[value >> 2];
   var str;
   if (stdStringIsUTF8) {
    var decodeStartPtr = value + 4;
    for (var i = 0; i <= length; ++i) {
     var currentBytePtr = value + 4 + i;
     if (HEAPU8[currentBytePtr] == 0 || i == length) {
      var maxRead = currentBytePtr - decodeStartPtr;
      var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
      if (str === undefined) {
       str = stringSegment;
      } else {
       str += String.fromCharCode(0);
       str += stringSegment;
      }
      decodeStartPtr = currentBytePtr + 1;
     }
    }
   } else {
    var a = new Array(length);
    for (var i = 0; i < length; ++i) {
     a[i] = String.fromCharCode(HEAPU8[value + 4 + i]);
    }
    str = a.join("");
   }
   _free(value);
   return str;
  },
  "toWireType": function(destructors, value) {
   if (value instanceof ArrayBuffer) {
    value = new Uint8Array(value);
   }
   var getLength;
   var valueIsOfTypeString = typeof value === "string";
   if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
    throwBindingError("Cannot pass non-string to std::string");
   }
   if (stdStringIsUTF8 && valueIsOfTypeString) {
    getLength = function() {
     return lengthBytesUTF8(value);
    };
   } else {
    getLength = function() {
     return value.length;
    };
   }
   var length = getLength();
   var ptr = _malloc(4 + length + 1);
   HEAPU32[ptr >> 2] = length;
   if (stdStringIsUTF8 && valueIsOfTypeString) {
    stringToUTF8(value, ptr + 4, length + 1);
   } else {
    if (valueIsOfTypeString) {
     for (var i = 0; i < length; ++i) {
      var charCode = value.charCodeAt(i);
      if (charCode > 255) {
       _free(ptr);
       throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
      }
      HEAPU8[ptr + 4 + i] = charCode;
     }
    } else {
     for (var i = 0; i < length; ++i) {
      HEAPU8[ptr + 4 + i] = value[i];
     }
    }
   }
   if (destructors !== null) {
    destructors.push(_free, ptr);
   }
   return ptr;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": simpleReadValueFromPointer,
  destructorFunction: function(ptr) {
   _free(ptr);
  }
 });
}

function __embind_register_std_wstring(rawType, charSize, name) {
 name = readLatin1String(name);
 var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
 if (charSize === 2) {
  decodeString = UTF16ToString;
  encodeString = stringToUTF16;
  lengthBytesUTF = lengthBytesUTF16;
  getHeap = function() {
   return HEAPU16;
  };
  shift = 1;
 } else if (charSize === 4) {
  decodeString = UTF32ToString;
  encodeString = stringToUTF32;
  lengthBytesUTF = lengthBytesUTF32;
  getHeap = function() {
   return HEAPU32;
  };
  shift = 2;
 }
 registerType(rawType, {
  name: name,
  "fromWireType": function(value) {
   var length = HEAPU32[value >> 2];
   var HEAP = getHeap();
   var str;
   var decodeStartPtr = value + 4;
   for (var i = 0; i <= length; ++i) {
    var currentBytePtr = value + 4 + i * charSize;
    if (HEAP[currentBytePtr >> shift] == 0 || i == length) {
     var maxReadBytes = currentBytePtr - decodeStartPtr;
     var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
     if (str === undefined) {
      str = stringSegment;
     } else {
      str += String.fromCharCode(0);
      str += stringSegment;
     }
     decodeStartPtr = currentBytePtr + charSize;
    }
   }
   _free(value);
   return str;
  },
  "toWireType": function(destructors, value) {
   if (!(typeof value === "string")) {
    throwBindingError("Cannot pass non-string to C++ string type " + name);
   }
   var length = lengthBytesUTF(value);
   var ptr = _malloc(4 + length + charSize);
   HEAPU32[ptr >> 2] = length >> shift;
   encodeString(value, ptr + 4, length + charSize);
   if (destructors !== null) {
    destructors.push(_free, ptr);
   }
   return ptr;
  },
  "argPackAdvance": 8,
  "readValueFromPointer": simpleReadValueFromPointer,
  destructorFunction: function(ptr) {
   _free(ptr);
  }
 });
}

function __embind_register_void(rawType, name) {
 name = readLatin1String(name);
 registerType(rawType, {
  isVoid: true,
  name: name,
  "argPackAdvance": 0,
  "fromWireType": function() {
   return undefined;
  },
  "toWireType": function(destructors, o) {
   return undefined;
  }
 });
}

function __emval_incref(handle) {
 if (handle > 4) {
  emval_handle_array[handle].refcount += 1;
 }
}

function requireRegisteredType(rawType, humanName) {
 var impl = registeredTypes[rawType];
 if (undefined === impl) {
  throwBindingError(humanName + " has unknown type " + getTypeName(rawType));
 }
 return impl;
}

function __emval_take_value(type, argv) {
 type = requireRegisteredType(type, "_emval_take_value");
 var v = type["readValueFromPointer"](argv);
 return __emval_register(v);
}

function _abort() {
 abort();
}

function _emscripten_memcpy_big(dest, src, num) {
 HEAPU8.copyWithin(dest, src, src + num);
}

function _emscripten_get_heap_size() {
 return HEAPU8.length;
}

function emscripten_realloc_buffer(size) {
 try {
  wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
  updateGlobalBufferAndViews(wasmMemory.buffer);
  return 1;
 } catch (e) {}
}

function _emscripten_resize_heap(requestedSize) {
 requestedSize = requestedSize >>> 0;
 var oldSize = _emscripten_get_heap_size();
 var PAGE_MULTIPLE = 65536;
 var maxHeapSize = 2147483648;
 if (requestedSize > maxHeapSize) {
  return false;
 }
 var minHeapSize = 16777216;
 for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
  var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
  overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
  var newSize = Math.min(maxHeapSize, alignUp(Math.max(minHeapSize, requestedSize, overGrownHeapSize), PAGE_MULTIPLE));
  var replacement = emscripten_realloc_buffer(newSize);
  if (replacement) {
   return true;
  }
 }
 return false;
}

var ENV = {};

function __getExecutableName() {
 return thisProgram || "./this.program";
}

function getEnvStrings() {
 if (!getEnvStrings.strings) {
  var env = {
   "USER": "web_user",
   "LOGNAME": "web_user",
   "PATH": "/",
   "PWD": "/",
   "HOME": "/home/web_user",
   "LANG": (typeof navigator === "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
   "_": __getExecutableName()
  };
  for (var x in ENV) {
   env[x] = ENV[x];
  }
  var strings = [];
  for (var x in env) {
   strings.push(x + "=" + env[x]);
  }
  getEnvStrings.strings = strings;
 }
 return getEnvStrings.strings;
}

function _environ_get(__environ, environ_buf) {
 var bufSize = 0;
 getEnvStrings().forEach(function(string, i) {
  var ptr = environ_buf + bufSize;
  HEAP32[__environ + i * 4 >> 2] = ptr;
  writeAsciiToMemory(string, ptr);
  bufSize += string.length + 1;
 });
 return 0;
}

function _environ_sizes_get(penviron_count, penviron_buf_size) {
 var strings = getEnvStrings();
 HEAP32[penviron_count >> 2] = strings.length;
 var bufSize = 0;
 strings.forEach(function(string) {
  bufSize += string.length + 1;
 });
 HEAP32[penviron_buf_size >> 2] = bufSize;
 return 0;
}

function _exit(status) {
 exit(status);
}

function _fd_close(fd) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  FS.close(stream);
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return e.errno;
 }
}

function _fd_read(fd, iov, iovcnt, pnum) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = SYSCALLS.doReadv(stream, iov, iovcnt);
  HEAP32[pnum >> 2] = num;
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return e.errno;
 }
}

function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var HIGH_OFFSET = 4294967296;
  var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
  var DOUBLE_LIMIT = 9007199254740992;
  if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
   return -61;
  }
  FS.llseek(stream, offset, whence);
  tempI64 = [ stream.position >>> 0, (tempDouble = stream.position, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
  if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return e.errno;
 }
}

function _fd_write(fd, iov, iovcnt, pnum) {
 try {
  var stream = SYSCALLS.getStreamFromFD(fd);
  var num = SYSCALLS.doWritev(stream, iov, iovcnt);
  HEAP32[pnum >> 2] = num;
  return 0;
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return e.errno;
 }
}

function _setTempRet0($i) {
 setTempRet0($i | 0);
}

function __isLeapYear(year) {
 return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function __arraySum(array, index) {
 var sum = 0;
 for (var i = 0; i <= index; sum += array[i++]) {}
 return sum;
}

var __MONTH_DAYS_LEAP = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var __MONTH_DAYS_REGULAR = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

function __addDays(date, days) {
 var newDate = new Date(date.getTime());
 while (days > 0) {
  var leap = __isLeapYear(newDate.getFullYear());
  var currentMonth = newDate.getMonth();
  var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
  if (days > daysInCurrentMonth - newDate.getDate()) {
   days -= daysInCurrentMonth - newDate.getDate() + 1;
   newDate.setDate(1);
   if (currentMonth < 11) {
    newDate.setMonth(currentMonth + 1);
   } else {
    newDate.setMonth(0);
    newDate.setFullYear(newDate.getFullYear() + 1);
   }
  } else {
   newDate.setDate(newDate.getDate() + days);
   return newDate;
  }
 }
 return newDate;
}

function _strftime(s, maxsize, format, tm) {
 var tm_zone = HEAP32[tm + 40 >> 2];
 var date = {
  tm_sec: HEAP32[tm >> 2],
  tm_min: HEAP32[tm + 4 >> 2],
  tm_hour: HEAP32[tm + 8 >> 2],
  tm_mday: HEAP32[tm + 12 >> 2],
  tm_mon: HEAP32[tm + 16 >> 2],
  tm_year: HEAP32[tm + 20 >> 2],
  tm_wday: HEAP32[tm + 24 >> 2],
  tm_yday: HEAP32[tm + 28 >> 2],
  tm_isdst: HEAP32[tm + 32 >> 2],
  tm_gmtoff: HEAP32[tm + 36 >> 2],
  tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
 };
 var pattern = UTF8ToString(format);
 var EXPANSION_RULES_1 = {
  "%c": "%a %b %d %H:%M:%S %Y",
  "%D": "%m/%d/%y",
  "%F": "%Y-%m-%d",
  "%h": "%b",
  "%r": "%I:%M:%S %p",
  "%R": "%H:%M",
  "%T": "%H:%M:%S",
  "%x": "%m/%d/%y",
  "%X": "%H:%M:%S",
  "%Ec": "%c",
  "%EC": "%C",
  "%Ex": "%m/%d/%y",
  "%EX": "%H:%M:%S",
  "%Ey": "%y",
  "%EY": "%Y",
  "%Od": "%d",
  "%Oe": "%e",
  "%OH": "%H",
  "%OI": "%I",
  "%Om": "%m",
  "%OM": "%M",
  "%OS": "%S",
  "%Ou": "%u",
  "%OU": "%U",
  "%OV": "%V",
  "%Ow": "%w",
  "%OW": "%W",
  "%Oy": "%y"
 };
 for (var rule in EXPANSION_RULES_1) {
  pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
 }
 var WEEKDAYS = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
 var MONTHS = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
 function leadingSomething(value, digits, character) {
  var str = typeof value === "number" ? value.toString() : value || "";
  while (str.length < digits) {
   str = character[0] + str;
  }
  return str;
 }
 function leadingNulls(value, digits) {
  return leadingSomething(value, digits, "0");
 }
 function compareByDay(date1, date2) {
  function sgn(value) {
   return value < 0 ? -1 : value > 0 ? 1 : 0;
  }
  var compare;
  if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
   if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
    compare = sgn(date1.getDate() - date2.getDate());
   }
  }
  return compare;
 }
 function getFirstWeekStartDate(janFourth) {
  switch (janFourth.getDay()) {
  case 0:
   return new Date(janFourth.getFullYear() - 1, 11, 29);

  case 1:
   return janFourth;

  case 2:
   return new Date(janFourth.getFullYear(), 0, 3);

  case 3:
   return new Date(janFourth.getFullYear(), 0, 2);

  case 4:
   return new Date(janFourth.getFullYear(), 0, 1);

  case 5:
   return new Date(janFourth.getFullYear() - 1, 11, 31);

  case 6:
   return new Date(janFourth.getFullYear() - 1, 11, 30);
  }
 }
 function getWeekBasedYear(date) {
  var thisDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
  var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
  var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
  var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
  var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
   if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
    return thisDate.getFullYear() + 1;
   } else {
    return thisDate.getFullYear();
   }
  } else {
   return thisDate.getFullYear() - 1;
  }
 }
 var EXPANSION_RULES_2 = {
  "%a": function(date) {
   return WEEKDAYS[date.tm_wday].substring(0, 3);
  },
  "%A": function(date) {
   return WEEKDAYS[date.tm_wday];
  },
  "%b": function(date) {
   return MONTHS[date.tm_mon].substring(0, 3);
  },
  "%B": function(date) {
   return MONTHS[date.tm_mon];
  },
  "%C": function(date) {
   var year = date.tm_year + 1900;
   return leadingNulls(year / 100 | 0, 2);
  },
  "%d": function(date) {
   return leadingNulls(date.tm_mday, 2);
  },
  "%e": function(date) {
   return leadingSomething(date.tm_mday, 2, " ");
  },
  "%g": function(date) {
   return getWeekBasedYear(date).toString().substring(2);
  },
  "%G": function(date) {
   return getWeekBasedYear(date);
  },
  "%H": function(date) {
   return leadingNulls(date.tm_hour, 2);
  },
  "%I": function(date) {
   var twelveHour = date.tm_hour;
   if (twelveHour == 0) twelveHour = 12; else if (twelveHour > 12) twelveHour -= 12;
   return leadingNulls(twelveHour, 2);
  },
  "%j": function(date) {
   return leadingNulls(date.tm_mday + __arraySum(__isLeapYear(date.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon - 1), 3);
  },
  "%m": function(date) {
   return leadingNulls(date.tm_mon + 1, 2);
  },
  "%M": function(date) {
   return leadingNulls(date.tm_min, 2);
  },
  "%n": function() {
   return "\n";
  },
  "%p": function(date) {
   if (date.tm_hour >= 0 && date.tm_hour < 12) {
    return "AM";
   } else {
    return "PM";
   }
  },
  "%S": function(date) {
   return leadingNulls(date.tm_sec, 2);
  },
  "%t": function() {
   return "\t";
  },
  "%u": function(date) {
   return date.tm_wday || 7;
  },
  "%U": function(date) {
   var janFirst = new Date(date.tm_year + 1900, 0, 1);
   var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7 - janFirst.getDay());
   var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday);
   if (compareByDay(firstSunday, endDate) < 0) {
    var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
    var firstSundayUntilEndJanuary = 31 - firstSunday.getDate();
    var days = firstSundayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
    return leadingNulls(Math.ceil(days / 7), 2);
   }
   return compareByDay(firstSunday, janFirst) === 0 ? "01" : "00";
  },
  "%V": function(date) {
   var janFourthThisYear = new Date(date.tm_year + 1900, 0, 4);
   var janFourthNextYear = new Date(date.tm_year + 1901, 0, 4);
   var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
   var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
   var endDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
   if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
    return "53";
   }
   if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
    return "01";
   }
   var daysDifference;
   if (firstWeekStartThisYear.getFullYear() < date.tm_year + 1900) {
    daysDifference = date.tm_yday + 32 - firstWeekStartThisYear.getDate();
   } else {
    daysDifference = date.tm_yday + 1 - firstWeekStartThisYear.getDate();
   }
   return leadingNulls(Math.ceil(daysDifference / 7), 2);
  },
  "%w": function(date) {
   return date.tm_wday;
  },
  "%W": function(date) {
   var janFirst = new Date(date.tm_year, 0, 1);
   var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7 - janFirst.getDay() + 1);
   var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday);
   if (compareByDay(firstMonday, endDate) < 0) {
    var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
    var firstMondayUntilEndJanuary = 31 - firstMonday.getDate();
    var days = firstMondayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
    return leadingNulls(Math.ceil(days / 7), 2);
   }
   return compareByDay(firstMonday, janFirst) === 0 ? "01" : "00";
  },
  "%y": function(date) {
   return (date.tm_year + 1900).toString().substring(2);
  },
  "%Y": function(date) {
   return date.tm_year + 1900;
  },
  "%z": function(date) {
   var off = date.tm_gmtoff;
   var ahead = off >= 0;
   off = Math.abs(off) / 60;
   off = off / 60 * 100 + off % 60;
   return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
  },
  "%Z": function(date) {
   return date.tm_zone;
  },
  "%%": function() {
   return "%";
  }
 };
 for (var rule in EXPANSION_RULES_2) {
  if (pattern.indexOf(rule) >= 0) {
   pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date));
  }
 }
 var bytes = intArrayFromString(pattern, false);
 if (bytes.length > maxsize) {
  return 0;
 }
 writeArrayToMemory(bytes, s);
 return bytes.length - 1;
}

function _strftime_l(s, maxsize, format, tm) {
 return _strftime(s, maxsize, format, tm);
}

var FSNode = function(parent, name, mode, rdev) {
 if (!parent) {
  parent = this;
 }
 this.parent = parent;
 this.mount = parent.mount;
 this.mounted = null;
 this.id = FS.nextInode++;
 this.name = name;
 this.mode = mode;
 this.node_ops = {};
 this.stream_ops = {};
 this.rdev = rdev;
};

var readMode = 292 | 73;

var writeMode = 146;

Object.defineProperties(FSNode.prototype, {
 read: {
  get: function() {
   return (this.mode & readMode) === readMode;
  },
  set: function(val) {
   val ? this.mode |= readMode : this.mode &= ~readMode;
  }
 },
 write: {
  get: function() {
   return (this.mode & writeMode) === writeMode;
  },
  set: function(val) {
   val ? this.mode |= writeMode : this.mode &= ~writeMode;
  }
 },
 isFolder: {
  get: function() {
   return FS.isDir(this.mode);
  }
 },
 isDevice: {
  get: function() {
   return FS.isChrdev(this.mode);
  }
 }
});

FS.FSNode = FSNode;

FS.staticInit();

embind_init_charCodes();

BindingError = Module["BindingError"] = extendError(Error, "BindingError");

InternalError = Module["InternalError"] = extendError(Error, "InternalError");

init_ClassHandle();

init_RegisteredPointer();

init_embind();

UnboundTypeError = Module["UnboundTypeError"] = extendError(Error, "UnboundTypeError");

init_emval();

var ASSERTIONS = false;

function intArrayFromString(stringy, dontAddNull, length) {
 var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
 var u8array = new Array(len);
 var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
 if (dontAddNull) u8array.length = numBytesWritten;
 return u8array;
}

function intArrayToString(array) {
 var ret = [];
 for (var i = 0; i < array.length; i++) {
  var chr = array[i];
  if (chr > 255) {
   if (ASSERTIONS) {
    assert(false, "Character code " + chr + " (" + String.fromCharCode(chr) + ")  at offset " + i + " not in 0x00-0xFF.");
   }
   chr &= 255;
  }
  ret.push(String.fromCharCode(chr));
 }
 return ret.join("");
}

var decodeBase64 = typeof atob === "function" ? atob : function(input) {
 var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 var output = "";
 var chr1, chr2, chr3;
 var enc1, enc2, enc3, enc4;
 var i = 0;
 input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 do {
  enc1 = keyStr.indexOf(input.charAt(i++));
  enc2 = keyStr.indexOf(input.charAt(i++));
  enc3 = keyStr.indexOf(input.charAt(i++));
  enc4 = keyStr.indexOf(input.charAt(i++));
  chr1 = enc1 << 2 | enc2 >> 4;
  chr2 = (enc2 & 15) << 4 | enc3 >> 2;
  chr3 = (enc3 & 3) << 6 | enc4;
  output = output + String.fromCharCode(chr1);
  if (enc3 !== 64) {
   output = output + String.fromCharCode(chr2);
  }
  if (enc4 !== 64) {
   output = output + String.fromCharCode(chr3);
  }
 } while (i < input.length);
 return output;
};

function intArrayFromBase64(s) {
 if (typeof ENVIRONMENT_IS_NODE === "boolean" && ENVIRONMENT_IS_NODE) {
  var buf;
  try {
   buf = Buffer.from(s, "base64");
  } catch (_) {
   buf = new Buffer(s, "base64");
  }
  return new Uint8Array(buf["buffer"], buf["byteOffset"], buf["byteLength"]);
 }
 try {
  var decoded = decodeBase64(s);
  var bytes = new Uint8Array(decoded.length);
  for (var i = 0; i < decoded.length; ++i) {
   bytes[i] = decoded.charCodeAt(i);
  }
  return bytes;
 } catch (_) {
  throw new Error("Converting base64 string to bytes failed.");
 }
}

function tryParseAsDataURI(filename) {
 if (!isDataURI(filename)) {
  return;
 }
 return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}

var asmLibraryArg = {
 "G": ___assert_fail,
 "o": ___cxa_allocate_exception,
 "n": ___cxa_throw,
 "F": ___map_file,
 "E": ___sys_munmap,
 "z": __embind_register_bool,
 "e": __embind_register_class,
 "i": __embind_register_class_constructor,
 "b": __embind_register_class_function,
 "d": __embind_register_class_property,
 "y": __embind_register_emval,
 "l": __embind_register_float,
 "h": __embind_register_function,
 "c": __embind_register_integer,
 "a": __embind_register_memory_view,
 "k": __embind_register_std_string,
 "g": __embind_register_std_wstring,
 "x": __embind_register_void,
 "w": __emval_decref,
 "v": __emval_incref,
 "j": __emval_take_value,
 "f": _abort,
 "u": _emscripten_memcpy_big,
 "t": _emscripten_resize_heap,
 "D": _environ_get,
 "C": _environ_sizes_get,
 "s": _exit,
 "B": _fd_close,
 "A": _fd_read,
 "r": _fd_seek,
 "m": _fd_write,
 "memory": wasmMemory,
 "q": _setTempRet0,
 "p": _strftime_l,
 "table": wasmTable
};

var asm = createWasm();

var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function() {
 return (___wasm_call_ctors = Module["___wasm_call_ctors"] = Module["asm"]["H"]).apply(null, arguments);
};

var ___errno_location = Module["___errno_location"] = function() {
 return (___errno_location = Module["___errno_location"] = Module["asm"]["I"]).apply(null, arguments);
};

var _malloc = Module["_malloc"] = function() {
 return (_malloc = Module["_malloc"] = Module["asm"]["J"]).apply(null, arguments);
};

var _main = Module["_main"] = function() {
 return (_main = Module["_main"] = Module["asm"]["K"]).apply(null, arguments);
};

var ___getTypeName = Module["___getTypeName"] = function() {
 return (___getTypeName = Module["___getTypeName"] = Module["asm"]["L"]).apply(null, arguments);
};

var ___embind_register_native_and_builtin_types = Module["___embind_register_native_and_builtin_types"] = function() {
 return (___embind_register_native_and_builtin_types = Module["___embind_register_native_and_builtin_types"] = Module["asm"]["M"]).apply(null, arguments);
};

var _free = Module["_free"] = function() {
 return (_free = Module["_free"] = Module["asm"]["N"]).apply(null, arguments);
};

var dynCall_vi = Module["dynCall_vi"] = function() {
 return (dynCall_vi = Module["dynCall_vi"] = Module["asm"]["O"]).apply(null, arguments);
};

var dynCall_ii = Module["dynCall_ii"] = function() {
 return (dynCall_ii = Module["dynCall_ii"] = Module["asm"]["P"]).apply(null, arguments);
};

var dynCall_i = Module["dynCall_i"] = function() {
 return (dynCall_i = Module["dynCall_i"] = Module["asm"]["Q"]).apply(null, arguments);
};

var dynCall_iii = Module["dynCall_iii"] = function() {
 return (dynCall_iii = Module["dynCall_iii"] = Module["asm"]["R"]).apply(null, arguments);
};

var dynCall_viii = Module["dynCall_viii"] = function() {
 return (dynCall_viii = Module["dynCall_viii"] = Module["asm"]["S"]).apply(null, arguments);
};

var dynCall_fii = Module["dynCall_fii"] = function() {
 return (dynCall_fii = Module["dynCall_fii"] = Module["asm"]["T"]).apply(null, arguments);
};

var dynCall_viif = Module["dynCall_viif"] = function() {
 return (dynCall_viif = Module["dynCall_viif"] = Module["asm"]["U"]).apply(null, arguments);
};

var dynCall_iiiii = Module["dynCall_iiiii"] = function() {
 return (dynCall_iiiii = Module["dynCall_iiiii"] = Module["asm"]["V"]).apply(null, arguments);
};

var dynCall_iiii = Module["dynCall_iiii"] = function() {
 return (dynCall_iiii = Module["dynCall_iiii"] = Module["asm"]["W"]).apply(null, arguments);
};

var dynCall_dii = Module["dynCall_dii"] = function() {
 return (dynCall_dii = Module["dynCall_dii"] = Module["asm"]["X"]).apply(null, arguments);
};

var dynCall_viid = Module["dynCall_viid"] = function() {
 return (dynCall_viid = Module["dynCall_viid"] = Module["asm"]["Y"]).apply(null, arguments);
};

var dynCall_iiid = Module["dynCall_iiid"] = function() {
 return (dynCall_iiid = Module["dynCall_iiid"] = Module["asm"]["Z"]).apply(null, arguments);
};

var dynCall_iid = Module["dynCall_iid"] = function() {
 return (dynCall_iid = Module["dynCall_iid"] = Module["asm"]["_"]).apply(null, arguments);
};

var dynCall_iidid = Module["dynCall_iidid"] = function() {
 return (dynCall_iidid = Module["dynCall_iidid"] = Module["asm"]["$"]).apply(null, arguments);
};

var dynCall_idid = Module["dynCall_idid"] = function() {
 return (dynCall_idid = Module["dynCall_idid"] = Module["asm"]["aa"]).apply(null, arguments);
};

var dynCall_vii = Module["dynCall_vii"] = function() {
 return (dynCall_vii = Module["dynCall_vii"] = Module["asm"]["ba"]).apply(null, arguments);
};

var dynCall_viiii = Module["dynCall_viiii"] = function() {
 return (dynCall_viiii = Module["dynCall_viiii"] = Module["asm"]["ca"]).apply(null, arguments);
};

var dynCall_viiid = Module["dynCall_viiid"] = function() {
 return (dynCall_viiid = Module["dynCall_viiid"] = Module["asm"]["da"]).apply(null, arguments);
};

var dynCall_iiiid = Module["dynCall_iiiid"] = function() {
 return (dynCall_iiiid = Module["dynCall_iiiid"] = Module["asm"]["ea"]).apply(null, arguments);
};

var dynCall_jiji = Module["dynCall_jiji"] = function() {
 return (dynCall_jiji = Module["dynCall_jiji"] = Module["asm"]["fa"]).apply(null, arguments);
};

var dynCall_iidiiii = Module["dynCall_iidiiii"] = function() {
 return (dynCall_iidiiii = Module["dynCall_iidiiii"] = Module["asm"]["ga"]).apply(null, arguments);
};

var dynCall_viijii = Module["dynCall_viijii"] = function() {
 return (dynCall_viijii = Module["dynCall_viijii"] = Module["asm"]["ha"]).apply(null, arguments);
};

var dynCall_iiiiii = Module["dynCall_iiiiii"] = function() {
 return (dynCall_iiiiii = Module["dynCall_iiiiii"] = Module["asm"]["ia"]).apply(null, arguments);
};

var dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = function() {
 return (dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = Module["asm"]["ja"]).apply(null, arguments);
};

var dynCall_iiiiiii = Module["dynCall_iiiiiii"] = function() {
 return (dynCall_iiiiiii = Module["dynCall_iiiiiii"] = Module["asm"]["ka"]).apply(null, arguments);
};

var dynCall_iiiiij = Module["dynCall_iiiiij"] = function() {
 return (dynCall_iiiiij = Module["dynCall_iiiiij"] = Module["asm"]["la"]).apply(null, arguments);
};

var dynCall_iiiiid = Module["dynCall_iiiiid"] = function() {
 return (dynCall_iiiiid = Module["dynCall_iiiiid"] = Module["asm"]["ma"]).apply(null, arguments);
};

var dynCall_iiiiijj = Module["dynCall_iiiiijj"] = function() {
 return (dynCall_iiiiijj = Module["dynCall_iiiiijj"] = Module["asm"]["na"]).apply(null, arguments);
};

var dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = function() {
 return (dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = Module["asm"]["oa"]).apply(null, arguments);
};

var dynCall_iiiiiijj = Module["dynCall_iiiiiijj"] = function() {
 return (dynCall_iiiiiijj = Module["dynCall_iiiiiijj"] = Module["asm"]["pa"]).apply(null, arguments);
};

var dynCall_viiiiii = Module["dynCall_viiiiii"] = function() {
 return (dynCall_viiiiii = Module["dynCall_viiiiii"] = Module["asm"]["qa"]).apply(null, arguments);
};

var dynCall_v = Module["dynCall_v"] = function() {
 return (dynCall_v = Module["dynCall_v"] = Module["asm"]["ra"]).apply(null, arguments);
};

var dynCall_viiiii = Module["dynCall_viiiii"] = function() {
 return (dynCall_viiiii = Module["dynCall_viiiii"] = Module["asm"]["sa"]).apply(null, arguments);
};

var calledRun;

function ExitStatus(status) {
 this.name = "ExitStatus";
 this.message = "Program terminated with exit(" + status + ")";
 this.status = status;
}

var calledMain = false;

dependenciesFulfilled = function runCaller() {
 if (!calledRun) run();
 if (!calledRun) dependenciesFulfilled = runCaller;
};

function callMain(args) {
 var entryFunction = Module["_main"];
 var argc = 0;
 var argv = 0;
 try {
  var ret = entryFunction(argc, argv);
  exit(ret, true);
 } catch (e) {
  if (e instanceof ExitStatus) {
   return;
  } else if (e == "unwind") {
   noExitRuntime = true;
   return;
  } else {
   var toLog = e;
   if (e && typeof e === "object" && e.stack) {
    toLog = [ e, e.stack ];
   }
   err("exception thrown: " + toLog);
   quit_(1, e);
  }
 } finally {
  calledMain = true;
 }
}

function run(args) {
 args = args || arguments_;
 if (runDependencies > 0) {
  return;
 }
 preRun();
 if (runDependencies > 0) return;
 function doRun() {
  if (calledRun) return;
  calledRun = true;
  Module["calledRun"] = true;
  if (ABORT) return;
  initRuntime();
  preMain();
  readyPromiseResolve(Module);
  if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
  if (shouldRunNow) callMain(args);
  postRun();
 }
 if (Module["setStatus"]) {
  Module["setStatus"]("Running...");
  setTimeout(function() {
   setTimeout(function() {
    Module["setStatus"]("");
   }, 1);
   doRun();
  }, 1);
 } else {
  doRun();
 }
}

Module["run"] = run;

function exit(status, implicit) {
 if (implicit && noExitRuntime && status === 0) {
  return;
 }
 if (noExitRuntime) {} else {
  ABORT = true;
  EXITSTATUS = status;
  exitRuntime();
  if (Module["onExit"]) Module["onExit"](status);
 }
 quit_(status, new ExitStatus(status));
}

if (Module["preInit"]) {
 if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
 while (Module["preInit"].length > 0) {
  Module["preInit"].pop()();
 }
}

var shouldRunNow = true;

if (Module["noInitialRun"]) shouldRunNow = false;

noExitRuntime = true;

run();


  return contrafold.ready
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
      module.exports = contrafold;
    else if (typeof define === 'function' && define['amd'])
      define([], function() { return contrafold; });
    else if (typeof exports === 'object')
      exports["contrafold"] = contrafold;
    
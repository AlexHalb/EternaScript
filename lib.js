"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.RNAException = exports.RNAElement = exports.RNA = exports.Library = void 0;
var V = require("../src/eterna/folding/engines/vienna.js");
var V2 = require("../src/eterna/folding/engines/vienna2.js");
var N = require("../src/eterna/folding/engines/nupack.js");
var C = require("../src/eterna/folding/engines/contrafold.js");
var LFC = require("../src/eterna/folding/engines/LinearFoldC.js");
var LFV = require("../src/eterna/folding/engines/LinearFoldV.js");
var axios_1 = require("axios");
var Library = /** @class */ (function () {
    function Library(onceLoaded) {
        var _this_1 = this;
        if (onceLoaded === void 0) { onceLoaded = function () { }; }
        var promise = new Promise(function (resolve) { return __awaiter(_this_1, void 0, void 0, function () {
            var Vienna, Vienna2, Nupack, Contrafold, LinearFoldC, LinearFoldV;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, V()];
                    case 1:
                        Vienna = _a.sent();
                        return [4 /*yield*/, V2()];
                    case 2:
                        Vienna2 = _a.sent();
                        return [4 /*yield*/, N()];
                    case 3:
                        Nupack = _a.sent();
                        return [4 /*yield*/, C()];
                    case 4:
                        Contrafold = _a.sent();
                        return [4 /*yield*/, LFC()];
                    case 5:
                        LinearFoldC = _a.sent();
                        return [4 /*yield*/, LFV()];
                    case 6:
                        LinearFoldV = _a.sent();
                        resolve({
                            Vienna: Vienna,
                            Vienna2: Vienna2,
                            Nupack: Nupack,
                            Contrafold: Contrafold,
                            LinearFoldV: LinearFoldV,
                            LinearFoldC: LinearFoldC
                        });
                        return [2 /*return*/];
                }
            });
        }); }).then(function (e) {
            _this_1.engines = e;
        }).then(onceLoaded);
    }
    Library.prototype.DefaultFold = function (sequence, engine) {
        return engine.FullFoldTemperature(37, sequence, '').structure;
    };
    Library.prototype.ContrafoldFold = function (sequence, engine) {
        return engine.FullFoldTemperature(37, sequence, 0).structure;
    };
    Library.prototype.LinearFoldFold = function (sequence, engine) {
        return engine.FullFoldDefault(sequence).structure;
    };
    Library.prototype.fold = function (sequence, name) {
        if (name === void 0) { name = 'Vienna'; }
        var engine = this.getEngineWithName(name);
        switch (name.toLowerCase()) {
            case 'vienna':
            case 'vienna2':
            case 'nupack': return this.DefaultFold(sequence, engine);
            case 'contrafold': return this.ContrafoldFold(sequence, engine);
            case 'linearfoldc':
            case 'linearfoldv': return this.LinearFoldFold(sequence, engine);
            default: return '';
        }
    };
    Library.prototype.DefaultEnergyOfStruct = function (sequence, structure, engine) {
        return engine.FullEval(37, sequence, structure).energy;
    };
    Library.prototype.LinearFoldEnergyOfStruct = function (sequence, structure, engine) {
        return engine.FullEval(sequence, structure).energy;
    };
    Library.prototype.energyOfStruct = function (sequence, structure, name) {
        if (name === void 0) { name = 'Vienna'; }
        var engine = this.getEngineWithName(name);
        switch (name.toLowerCase()) {
            case 'vienna':
            case 'vienna2':
            case 'contrafold':
            case 'nupack': return this.DefaultEnergyOfStruct(sequence, structure, engine);
            case 'linearfoldc':
            case 'linearfoldv': return this.LinearFoldEnergyOfStruct(sequence, structure, engine);
            default: return '';
        }
    };
    Library.prototype.getEngineWithName = function (name) {
        switch (name.toLowerCase()) {
            case 'vienna': return this.engines.Vienna;
            case 'vienna2': return this.engines.Vienna2;
            case 'nupack': return this.engines.Nupack;
            case 'contrafold': return this.engines.Contrafold;
            case 'linearfoldc': return this.engines.LinearFoldC;
            case 'linearfoldv': return this.engines.LinearFoldV;
        }
    };
    Library.prototype.replace = function (seq, idx, to) {
        return (seq.split('')[idx] = to);
    };
    Library.prototype.random = function (from, to) {
        return Math.floor((Math.random() * (to - from + 1)) + from);
    };
    ;
    Library.prototype.randomSequenceWithBases = function (size, bases) {
        var i, sequence, _i, _ref;
        sequence = "";
        for (i = _i = 0, _ref = size - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            sequence += bases[this.random(0, bases.length - 1)];
        }
        return sequence;
    };
    Library.prototype.map = function (fn, sequence) {
        var i, _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = sequence.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            _results.push(fn(sequence[i], i));
        }
        return _results;
    };
    ;
    Library.prototype.filter = function (fn, sequence) {
        var i, result, _i, _ref;
        result = "";
        for (i = _i = 0, _ref = sequence.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            if (fn(sequence[i])) {
                result += sequence[i];
            }
        }
        return result;
    };
    ;
    Library.prototype.splitDefault = function (structure) {
        var i, index, item, result, _i, _ref;
        result = new Array;
        item = structure[0];
        index = 0;
        for (i = _i = 0, _ref = structure.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            if (item !== structure[i] || i === structure.length) {
                item = structure[i];
                result.push(structure.substring(index, i));
                index = i;
            }
        }
        return result;
    };
    ;
    Library.prototype.join = function (array) {
        var item, result, _i, _len;
        result = "";
        for (_i = 0, _len = array.length; _i < _len; _i++) {
            item = array[_i];
            result += item;
        }
        return result;
    };
    ;
    Library.prototype.set = function (fn, structure) {
        var array, _this = this;
        array = structure.split('');
        this.map(function (item, index) {
            return fn(array, item, index);
        }, array);
        return array;
    };
    ;
    Library.prototype.distance = function (source, destination) {
        var _this = this;
        return this.distanceCustom(function (index) {
            if (source[index] === destination[index]) {
                return 0;
            }
            else {
                return 1;
            }
        }, source, destination);
    };
    ;
    Library.prototype.distanceCustom = function (fn, source, destination) {
        var sum, _this = this;
        if (source.length === destination.length) {
            sum = 0;
            this.map(function (_, index) {
                return sum += fn(index);
            }, source);
            return sum;
        }
        return -1;
    };
    ;
    Library.prototype.getStructure = function (nid, callback, error, workbranch) {
        if (workbranch === void 0) { workbranch = 'eternadev.org'; }
        axios_1["default"].get("http://" + workbranch + "/get/?type=puzzle&nid=" + nid).then(function (e) {
            callback(e.data.data.puzzle.secstruct);
        })["catch"](function (e) {
            error(e);
        });
    };
    ;
    Library.prototype.EternaScriptSource = function (nid, callback, error, workbranch) {
        if (workbranch === void 0) { workbranch = 'eternadev.org'; }
        axios_1["default"].get("http://" + workbranch + "/get/?type=script&need=script&id=" + nid).then(function (e) {
            callback(e.data.data.script[0]);
        })["catch"](function (e) {
            error(e);
        });
    };
    ;
    Library.prototype.EternaScript = function (id, inputs) {
        if (inputs === void 0) { inputs = {}; }
        this.EternaScriptSource(id, function (e) {
            var src = e.source;
            var input = e.input ? JSON.parse(e.input) : [];
            input.forEach(function (i) {
                var inputName = i.value;
                var inputValue = inputs[inputName];
                src = "var " + inputName + " = \"" + inputValue + "\";\n      " + src;
            });
            eval(src);
        }, function () { }, 'eternagame.org');
    };
    ;
    return Library;
}());
exports.Library = Library;
var RNAElement = /** @class */ (function () {
    function RNAElement(index, _structure) {
        this.Loop = "loop";
        this.Stack = "stack";
        this.Hairpin = "Hairpin";
        this.Bulge = "Bulge";
        this.Internal = "Internal";
        this.Multiloop = "Multiloop";
        this.Dangling = "Dangling";
        this.parent = null;
        this.childs = new Array;
        this.elements = new Array;
        this.segment_count = 1;
        this.type = null;
        this.base_type = null;
        this.add(index, _structure);
    }
    RNAElement.Loop = function (Loop) {
        throw new Error("Method not implemented.");
    };
    RNAElement.Stack = function (Stack) {
        throw new Error("Method not implemented.");
    };
    RNAElement.Dangling = function (Dangling) {
        throw new Error("Method not implemented.");
    };
    RNAElement.Bulge = function (Bulge) {
        throw new Error("Method not implemented.");
    };
    RNAElement.Internal = function (Internal) {
        throw new Error("Method not implemented.");
    };
    RNAElement.Multiloop = function (Multiloop) {
        throw new Error("Method not implemented.");
    };
    RNAElement.Hairpin = function (Hairpin) {
        throw new Error("Method not implemented.");
    };
    RNAElement.prototype.add = function (_index, _structure) {
        var elements, i, _i, _pair, _ref;
        _pair = void 0;
        elements = this.getElements();
        if (elements.length > 0) {
            if (_structure === "." && Math.abs(elements[elements.length - 1]['index'] - _index) > 1) {
                this.setSegmentCount(this.getSegmentCount() + 1);
            }
            if (_structure === ")") {
                for (i = _i = _ref = elements.length - 1; _i >= 0; i = _i += -1) {
                    if (elements[i]['pair'] === void 0) {
                        elements[i]['pair'] = _index;
                        _pair = elements[i]['index'];
                        break;
                    }
                }
            }
        }
        return this.getElements().push({
            index: _index,
            structure: _structure,
            pair: _pair
        });
    };
    ;
    RNAElement.prototype.addChild = function (node) {
        node.parent = this;
        return this.childs.push(node);
    };
    ;
    RNAElement.prototype.getChilds = function () {
        return this.childs;
    };
    ;
    RNAElement.prototype.getParent = function () {
        return this.parent;
    };
    ;
    RNAElement.prototype.getElements = function () {
        return this.elements;
    };
    ;
    RNAElement.prototype.isPaired = function () {
        var elements, i, temp, _i, _ref;
        temp = new Array;
        elements = this.getElements();
        for (i = _i = 0, _ref = elements.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            if (elements[i]['structure'] === "(") {
                temp.push(i);
            }
            else if (elements[i]['structure'] === ")") {
                temp.pop();
            }
        }
        return temp.length === 0;
    };
    ;
    RNAElement.prototype.setType = function (type) {
        return this.type = type;
    };
    ;
    RNAElement.prototype.getType = function () {
        return this.type;
    };
    ;
    RNAElement.prototype.setBaseType = function (type) {
        return this.base_type = type;
    };
    ;
    RNAElement.prototype.getBaseType = function () {
        return this.base_type;
    };
    ;
    RNAElement.prototype.getIndices = function () {
        var array;
        array = new Array;
        this.map(function (element, i) {
            return array.push(element['index']);
        }, this.getElements());
        return array;
    };
    ;
    RNAElement.prototype.getStructures = function () {
        var array;
        array = new Array;
        this.map(function (element, i) {
            return array.push(element['structure']);
        }, this.getElements());
        return array;
    };
    ;
    RNAElement.prototype.isStack = function () {
        return this.getBaseType() === this.Stack;
    };
    ;
    RNAElement.prototype.isLoop = function () {
        return this.getBaseType() === this.Loop;
    };
    ;
    RNAElement.prototype.isHairpin = function () {
        return this.getType() === this.Hairpin;
    };
    ;
    RNAElement.prototype.isBulge = function () {
        return this.getType() === this.Bulge;
    };
    ;
    RNAElement.prototype.isMultiloop = function () {
        return this.getType() === this.Multiloop;
    };
    ;
    RNAElement.prototype.isDangling = function () {
        return this.getType() === this.Dangling;
    };
    ;
    RNAElement.prototype.isInternal = function () {
        return this.getType() === this.Internal;
    };
    ;
    RNAElement.prototype.getSegmentCount = function () {
        return this.segment_count;
    };
    ;
    RNAElement.prototype.setSegmentCount = function (count) {
        return this.segment_count = count;
    };
    ;
    RNAElement.prototype.map = function (func, array) {
        return new Library().map(func, array);
    };
    ;
    return RNAElement;
}());
exports.RNAElement = RNAElement;
var RNA = /** @class */ (function () {
    function RNA(structure) {
        this.getPairmap = function (structure) {
            var i, index, map, temp, _i, _ref;
            temp = new Array;
            map = new Array;
            for (i = _i = 0, _ref = structure.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                if (structure[i] === "(") {
                    temp.push(i);
                }
                else if (structure[i] === ")") {
                    if (temp.length === 0) {
                        throw new RNAException("pair doesn't matched");
                    }
                    index = temp.pop();
                    map[index] = i;
                    map[i] = index;
                }
            }
            if (temp.length > 0) {
                throw new RNAException("pair doesn't matched");
            }
            return map;
        };
        this.parse = function (start, end, structure) {
            var parsedElement, root;
            parsedElement = this._parse(start, end, structure);
            root = parsedElement['element'];
            if (parsedElement['index'] >= structure.length - 1) {
                return root;
            }
            else {
                root.addChild(this.parse(parsedElement['index'] + 1, end, structure));
                return root;
            }
        };
        this._parse = function (start, end, structure) {
            var c, child, dangling, dtest, dtest_i, e, i, temp, temp2, _i, _ref, _ref1;
            c = structure[start];
            e = new RNAElement(start, c);
            e.setBaseType(RNAElement.Loop);
            i = start;
            while (i < end) {
                i++;
                if (c === "(" && (structure[i] === "(" || structure[i] === ")")) {
                    if (structure[i] === "(" && this.pair_map[i] !== this.pair_map[i - 1] - 1) {
                        temp = this._parse(this.pair_map[i] + 1, this.pair_map[i] - 1, structure);
                        temp = temp['element'];
                        e.addChild(temp);
                        temp2 = this._parse(i, this.pair_map[i], structure);
                        temp2 = temp2['element'];
                        temp.addChild(temp2);
                        i = this.pair_map[i - 1] - 1;
                    }
                    else {
                        e.add(i, structure[i]);
                        if (e.isPaired()) {
                            e.setBaseType(RNAElement.Stack);
                            return {
                                element: e,
                                index: i
                            };
                        }
                    }
                }
                else if (c === "." && structure[i] === ".") {
                    if (structure[i] === "." && structure[i - 1] === ".") {
                        e.add(i, structure[i]);
                    }
                    else {
                        dtest = true;
                        dangling = new RNAElement(i, c);
                        dangling.setBaseType(RNAElement.Loop);
                        for (dtest_i = _i = _ref = i + 1, _ref1 = structure.length - 1; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; dtest_i = _ref <= _ref1 ? ++_i : --_i) {
                            if (structure[dtest_i] !== ".") {
                                dtest = false;
                                break;
                            }
                            dangling.add(dtest_i, structure[dtest_i]);
                        }
                        if (dtest) {
                            e.addChild(dangling);
                            return {
                                element: e,
                                index: dtest_i
                            };
                        }
                        else {
                            e.add(i, structure[i]);
                        }
                    }
                }
                else if (structure[i] === ")") {
                    return {
                        element: e,
                        index: i - 1
                    };
                }
                else {
                    child = this._parse(i, end, structure);
                    e.addChild(child['element']);
                    i = child['index'];
                }
            }
            return {
                element: e,
                index: i
            };
        };
        this.parse_type = function (element) {
            var _this = this;
            return this.map(function (element) {
                var childs, indices, parent;
                parent = element.getParent();
                childs = element.getChilds();
                indices = element.getIndices();
                if ((parent === null || childs.length === 0) && element.isLoop() && (indices[0] === 0 || indices.pop() === _this.getStructure().length - 1)) {
                    return element.setType(RNAElement.Dangling);
                }
                else if (parent && parent.isStack() && childs.length === 1 && childs[0].isStack()) {
                    if (element.getSegmentCount() === 1) {
                        return element.setType(RNAElement.Bulge);
                    }
                    else if (element.getSegmentCount() === 2) {
                        return element.setType(RNAElement.Internal);
                    }
                }
                else if (element.getSegmentCount() >= 2 && childs.length >= 2) {
                    return element.setType(RNAElement.Multiloop);
                }
                else if (parent && parent.isStack() && childs.length === 0 && element.isLoop()) {
                    if (element.getStructures().length < 3) {
                        throw new RNAException("Hairpin length is under 3");
                    }
                    return element.setType(RNAElement.Hairpin);
                }
            });
        };
        this.getStructure = function () {
            return this.structure;
        };
        this.getRootElement = function () {
            return this.root;
        };
        this.map = function (func) {
            var _map;
            _map = function (element) {
                var childs, i, _i, _ref, _results;
                func(element);
                childs = element.getChilds();
                if (childs.length > 0) {
                    _results = [];
                    for (i = _i = 0, _ref = childs.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                        _results.push(_map(childs[i]));
                    }
                    return _results;
                }
            };
            return _map(this.root);
        };
        this.structure = structure;
        this.pair_map = this.getPairmap(structure);
        this.root = this.parse(0, structure.length - 1, structure);
        this.parse_type(this.root);
    }
    return RNA;
}());
exports.RNA = RNA;
var RNAException = /** @class */ (function () {
    function RNAException(message) {
        this.toString = function () {
            return "RNAException: " + this.message;
        };
        this.message = message;
        RNAException.__super__.constructor.call(this, message);
    }
    return RNAException;
}());
exports.RNAException = RNAException;

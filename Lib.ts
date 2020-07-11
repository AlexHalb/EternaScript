import * as V from './vienna.js';
import * as V2 from './vienna2.js';
import * as N from './nupack.js';
import * as C from './contrafold.js';
import * as LFC from './LinearFoldC.js';
import * as LFV from './LinearFoldV.js';
import { Vienna, Vienna2, Nupack, Contrafold, LinearFoldC, LinearFoldV, LinearFold, FullFoldResultDefault, FullFoldResultLinearFold, FullEvalResult } from './Types';
import Axios from 'axios';
import { Promise } from 'es6-promise';

class Library {
  constructor(onceLoaded: () => void = () => {}) {
    this.loadEngines(onceLoaded);
  }

  loadEngines(then: () => void) {
    V().then(a => {
    V2().then(b => {
    N().then(c => {
    C().then(d => {
    LFC().then(e => {
    LFV().then(f => {
      this.engines = {
        Vienna: a as Vienna,
        Vienna2: b as Vienna2,
        Nupack: c as Nupack,
        Contrafold: d as Contrafold,
        LinearFoldV: e as LinearFoldV,
        LinearFoldC: f as LinearFoldC,
      };
      then();
    });
    });
    });
    });
    });
    });
  }

engines !: any;

DefaultFold(sequence: string, engine: Vienna | Vienna2 | Nupack) {
  return engine.FullFoldTemperature(37, sequence, '').structure;
}

ContrafoldFold(sequence: string, engine: Contrafold) {
  return engine.FullFoldTemperature(37, sequence, 0).structure;
}

LinearFoldFold(sequence: string, engine: LinearFold) {
  return engine.FullFoldDefault(sequence).structure;
}

fold(sequence: string, name: string = 'Vienna') {
  let engine = this.getEngineWithName(name);
  switch (name.toLowerCase()) {
    case 'vienna':
    case 'vienna2':
    case 'nupack': return this.DefaultFold(sequence, engine as Vienna | Vienna2 | Nupack);
    case 'contrafold': return this.ContrafoldFold(sequence, engine as Contrafold);
    case 'linearfoldc':
    case 'linearfoldv': return this.LinearFoldFold(sequence, engine as LinearFold);
    default: return '';
  }
}

DefaultEnergyOfStruct(sequence: string, structure: string, engine: Vienna | Vienna2 | Nupack | Contrafold) {
  return engine.FullEval(37, sequence, structure).energy;
}

LinearFoldEnergyOfStruct(sequence: string, structure: string, engine: LinearFold) {
  return engine.FullEval(sequence, structure).energy;
}

energy_of_structure(sequence: string, structure: string, name: string = 'Vienna') {
  let engine = this.getEngineWithName(name);
  switch (name.toLowerCase()) {
    case 'vienna':
    case 'vienna2':
    case 'contrafold':
    case 'nupack': return this.DefaultEnergyOfStruct(sequence, structure, engine as Vienna | Vienna2 | Nupack | Contrafold);
    case 'linearfoldc':
    case 'linearfoldv': return this.LinearFoldEnergyOfStruct(sequence, structure, engine as LinearFold);
    default: return '';
  }
}

getEngineWithName(name: string) {
  switch(name.toLowerCase()) {
    case 'vienna': return this.engines.Vienna as Vienna;
    case 'vienna2': return this.engines.Vienna2 as Vienna2;
    case 'nupack': return this.engines.Nupack as Nupack;
    case 'contrafold': return this.engines.Contrafold as Contrafold;
    case 'linearfoldc': return this.engines.LinearFoldC as LinearFoldC;
    case 'linearfoldv': return this.engines.LinearFoldV as LinearFoldV;
  }
}

replace(seq: string, idx: number, to: string) {
  return (seq.split('')[idx] = to);
}

random(from, to) {
  return Math.floor((Math.random() * (to - from + 1)) + from);
};

randomSequenceWithBases(size: number, bases: string) {
  var i, sequence, _i, _ref;
  sequence = "";
  for (i = _i = 0, _ref = size - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
    sequence += bases[this.random(0, bases.length - 1)];
  }
  return sequence;
}

map(fn, sequence) {
  var i, _i, _ref, _results;
  _results = [];
  for (i = _i = 0, _ref = sequence.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
    _results.push(fn(sequence[i], i));
  }
  return _results;
};

filter(fn, sequence) {
  var i, result, _i, _ref;
  result = "";
  for (i = _i = 0, _ref = sequence.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
    if (fn(sequence[i])) {
      result += sequence[i];
    }
  }
  return result;
};

splitDefault(structure) {
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

join(array) {
  var item, result, _i, _len;
  result = "";
  for (_i = 0, _len = array.length; _i < _len; _i++) {
    item = array[_i];
    result += item;
  }
  return result;
};

set(fn, structure) {
  var array,
    _this = this;
  array = structure.split('');
  this.map(function(item, index) {
    return fn(array, item, index);
  }, array);
  return array;
};

distance(source, destination) {
  var _this = this;
  return this.distanceCustom(function(index) {
    if (source[index] === destination[index]) {
      return 0;
    } else {
      return 1;
    }
  }, source, destination);
};

distanceCustom(fn, source, destination) {
  var sum,
    _this = this;
  if (source.length === destination.length) {
    sum = 0;
    this.map(function(_, index) {
      return sum += fn(index);
    }, source);
    return sum;
  }
  return -1;
};

getStructure(nid, callback, error, workbranch = 'eternadev.org') {
  Axios.get(`http://${workbranch}/get/?type=puzzle&nid=${nid}`).then(e => {
    callback(e.data.data.puzzle.secstruct);
  }).catch(e => {
    error(e);
  });
};

EternaScriptSource(nid, callback, error, workbranch = 'eternadev.org') {
  Axios.get(`http://${workbranch}/get/?type=script&need=script&id=${nid}`).then(e => {
    callback(e.data.data.script[0]);
  }).catch(e => {
    error(e);
  });
};

EternaScript(id, inputs: {[key: string]: string} = {}) {
  this.EternaScriptSource(id, (e) => {
    let src = e.source;
    let input = e.input ? JSON.parse(e.input) : [];
    input.forEach((i) => {
      const inputName = i.value;
      const inputValue = inputs[inputName];
      src = `var ${inputName} = "${inputValue}";
      ${src}`
    });
    eval(src);
  }, () => {}, 'eternagame.org');
};
}

class RNAElement {
  static Loop(Loop: any) {
    throw new Error("Method not implemented.");
  }
  static Stack(Stack: any) {
    throw new Error("Method not implemented.");
  }
  static Dangling(Dangling: any) {
    throw new Error("Method not implemented.");
  }
  static Bulge(Bulge: any) {
    throw new Error("Method not implemented.");
  }
  static Internal(Internal: any) {
    throw new Error("Method not implemented.");
  }
  static Multiloop(Multiloop: any) {
    throw new Error("Method not implemented.");
  }
  static Hairpin(Hairpin: any) {
    throw new Error("Method not implemented.");
  }
  Loop = "loop";

  Stack = "stack";

  Hairpin = "Hairpin";

  Bulge = "Bulge";

  Internal = "Internal";

  Multiloop = "Multiloop";

  Dangling = "Dangling";

  parent: any;
  childs: any[];
  elements: any[];
  segment_count: number;
  type: any;
  base_type: any;

  constructor(index, _structure) {
    this.parent = null;
    this.childs = new Array;
    this.elements = new Array;
    this.segment_count = 1;
    this.type = null;
    this.base_type = null;
    this.add(index, _structure);
  }

  add(_index, _structure) {
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

  addChild(node) {
    node.parent = this;
    return this.childs.push(node);
  };

  getChilds() {
    return this.childs;
  };

  getParent() {
    return this.parent;
  };

  getElements() {
    return this.elements;
  };

  isPaired() {
    var elements, i, temp, _i, _ref;
    temp = new Array;
    elements = this.getElements();
    for (i = _i = 0, _ref = elements.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (elements[i]['structure'] === "(") {
        temp.push(i);
      } else if (elements[i]['structure'] === ")") {
        temp.pop();
      }
    }
    return temp.length === 0;
  };

  setType(type) {
    return this.type = type;
  };

  getType() {
    return this.type;
  };

  setBaseType(type) {
    return this.base_type = type;
  };

  getBaseType() {
    return this.base_type;
  };

  getIndices() {
    var array;
    array = new Array;
    this.map(function(element, i) {
      return array.push(element['index']);
    }, this.getElements());
    return array;
  };

  getStructures() {
    var array;
    array = new Array;
    this.map(function(element, i) {
      return array.push(element['structure']);
    }, this.getElements());
    return array;
  };

  isStack() {
    return this.getBaseType() === this.Stack;
  };

  isLoop() {
    return this.getBaseType() === this.Loop;
  };

  isHairpin() {
    return this.getType() === this.Hairpin;
  };

  isBulge() {
    return this.getType() === this.Bulge;
  };

  isMultiloop() {
    return this.getType() === this.Multiloop;
  };

  isDangling() {
    return this.getType() === this.Dangling;
  };

  isInternal() {
    return this.getType() === this.Internal;
  };

  getSegmentCount() {
    return this.segment_count;
  };

  setSegmentCount(count) {
    return this.segment_count = count;
  };

  map(func, array) {
    return new Library().map(func, array);
  };
}

class RNA {
  structure: any;
  pair_map: any;
  root: any;
  constructor(structure) {
    this.structure = structure;
    this.pair_map = this.getPairmap(structure);
    this.root = this.parse(0, structure.length - 1, structure);
    this.parse_type(this.root);
  }

  getPairmap = function(structure) {
    var i, index, map, temp, _i, _ref;
    temp = new Array;
    map = new Array;
    for (i = _i = 0, _ref = structure.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (structure[i] === "(") {
        temp.push(i);
      } else if (structure[i] === ")") {
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

  parse = function(start, end, structure) {
    var parsedElement, root;
    parsedElement = this._parse(start, end, structure);
    root = parsedElement['element'];
    if (parsedElement['index'] >= structure.length - 1) {
      return root;
    } else {
      root.addChild(this.parse(parsedElement['index'] + 1, end, structure));
      return root;
    }
  };

  _parse = function(start, end, structure) {
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
        } else {
          e.add(i, structure[i]);
          if (e.isPaired()) {
            e.setBaseType(RNAElement.Stack);
            return {
              element: e,
              index: i
            };
          }
        }
      } else if (c === "." && structure[i] === ".") {
        if (structure[i] === "." && structure[i - 1] === ".") {
          e.add(i, structure[i]);
        } else {
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
          } else {
            e.add(i, structure[i]);
          }
        }
      } else if (structure[i] === ")") {
        return {
          element: e,
          index: i - 1
        };
      } else {
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

  parse_type = function(element) {
    var _this = this;
    return this.map(function(element) {
      var childs, indices, parent;
      parent = element.getParent();
      childs = element.getChilds();
      indices = element.getIndices();
      if ((parent === null || childs.length === 0) && element.isLoop() && (indices[0] === 0 || indices.pop() === _this.getStructure().length - 1)) {
        return element.setType(RNAElement.Dangling);
      } else if (parent && parent.isStack() && childs.length === 1 && childs[0].isStack()) {
        if (element.getSegmentCount() === 1) {
          return element.setType(RNAElement.Bulge);
        } else if (element.getSegmentCount() === 2) {
          return element.setType(RNAElement.Internal);
        }
      } else if (element.getSegmentCount() >= 2 && childs.length >= 2) {
        return element.setType(RNAElement.Multiloop);
      } else if (parent && parent.isStack() && childs.length === 0 && element.isLoop()) {
        if (element.getStructures().length < 3) {
          throw new RNAException("Hairpin length is under 3");
        }
        return element.setType(RNAElement.Hairpin);
      }
    });
  };

  getStructure = function() {
    return this.structure;
  };

  getRootElement = function() {
    return this.root;
  };

  map = function(func) {
    var _map;
    _map = function(element) {
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
}

class RNAException {
  message: any;
  static __super__: any;
  constructor(message) {
    this.message = message;
    RNAException.__super__.constructor.call(this, message);
  }

  toString = function() {
    return "RNAException: " + this.message;
  };
}

export { Library, RNA, RNAElement, RNAException }
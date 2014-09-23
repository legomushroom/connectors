(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Connectors, Point, TWEEN, h, points;

require('./polyfills');

h = require('./helpers');

TWEEN = require('./vendor/tween');

points = require('./points');

Point = (function() {
  function Point(o) {
    this.o = o != null ? o : {};
    this.vars();
  }

  Point.prototype.vars = function() {
    this.x = this.o.position.x;
    this.y = this.o.position.y;
    this.name = this.o.name;
    this.connected = this.o.connected;
    this.isFilled = this.o.isFilled;
    return this.isPathEnd = this.o.isPathEnd;
  };

  return Point;

})();

Connectors = (function() {
  function Connectors(o) {
    this.o = o != null ? o : {};
    this.vars();
    this.draw();
    setTimeout((function(_this) {
      return function() {
        return _this.run();
      };
    })(this), 1400);
  }

  Connectors.prototype.vars = function() {
    this.canvas = document.querySelector('#js-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = parseInt(this.canvas.getAttribute('width'), 10);
    this.height = parseInt(this.canvas.getAttribute('height'), 10);
    this.blue = '#0387A2';
    return this.points = points;
  };

  Connectors.prototype.draw = function() {
    var i, p, point, pointName, to, toX, _i, _len, _ref, _ref1, _ref2, _results;
    this.ctx.clear();
    this.ctx.beginPath();
    this.ctx.arc(this.width / 2, this.height / 2 + 10, 75, 0, 2 * Math.PI, false);
    this.ctx.lineWidth = 6;
    this.ctx.strokeStyle = '#75bbc9';
    this.ctx.stroke();
    this.ctx.lineWidth = 1;
    _ref = this.points;
    _results = [];
    for (pointName in _ref) {
      point = _ref[pointName];
      if (point.connected) {
        points = point.connected.split(':');
        for (i = _i = 0, _len = points.length; _i < _len; i = ++_i) {
          p = points[i];
          this.ctx.beginPath();
          to = this.points["point" + p];
          this.ctx.moveTo(point.x, point.y);
          this.ctx.lineTo(to.x, to.y);
          toX = to.isPathEnd ? to.x : (_ref1 = to.to) != null ? _ref1.x : void 0;
          if (Math.abs(((_ref2 = point.to) != null ? _ref2.x : void 0) - toX) < 50) {
            this.ctx.lineWidth = 1;
          } else {
            this.ctx.lineWidth = 1 - ((1 - .3) * point.p);
          }
          if (pointName === 'point19') {
            this.ctx.lineWidth = point.p || .01;
          }
          this.ctx.strokeStyle = this.blue;
          this.ctx.stroke();
        }
      }
      if (!point.isPathEnd) {
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI, false);
        this.ctx.strokeStyle = this.blue;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.fillStyle = point.isFilled ? this.blue : '#fff';
        _results.push(this.ctx.fill());
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Connectors.prototype.run = function() {
    var it, tween;
    it = this;
    tween = new TWEEN.Tween({
      p: 0
    }).to({
      p: 1
    }, 5000).onUpdate(function() {
      var point, pointName, _ref;
      _ref = it.points;
      for (pointName in _ref) {
        point = _ref[pointName];
        if (!point.to) {
          continue;
        }
        if (point.xBuff == null) {
          point.xBuff = point.x;
        }
        if (point.yBuff == null) {
          point.yBuff = point.y;
        }
        point.x = point.xBuff + (point.to.x - point.xBuff) * this.p;
        point.y = point.yBuff + (point.to.y - point.yBuff) * this.p;
        point.p = this.p;
      }
      return it.draw();
    }).start();
    return h.startAnimationLoop();
  };

  return Connectors;

})();

new Connectors;



},{"./helpers":2,"./points":3,"./polyfills":4,"./vendor/tween":5}],2:[function(require,module,exports){
var Helpers, TWEEN;

TWEEN = require('./vendor/tween');

Helpers = (function() {
  Helpers.prototype.pixel = 2;

  Helpers.prototype.doc = document;

  Helpers.prototype.body = document.body;

  Helpers.prototype.deg = Math.PI / 180;

  Helpers.prototype.DEG = Math.PI / 180;

  Helpers.prototype.s = 1;

  Helpers.prototype.time = function(time) {
    return time * this.s;
  };

  Helpers.prototype.isFF = function() {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  };

  Helpers.prototype.isIE = function() {
    return this.isIE9l() || this.isIE10g();
  };

  Helpers.prototype.isIE9l = function() {
    return navigator.userAgent.toLowerCase().indexOf('msie') > -1;
  };

  Helpers.prototype.isIE10g = function() {
    return navigator.userAgent.toLowerCase().indexOf('rv') > -1;
  };

  function Helpers(o) {
    this.o = o != null ? o : {};
    this.animationLoop = this.animationLoop.bind(this);
    this.div = document.createElement('div');
    this.computedStyle = function(elem) {
      if (window.getComputedStyle) {
        return getComputedStyle(elem, '');
      } else {
        return elem.currentStyle;
      }
    };
    this.shortColors = {
      aqua: 'rgb(0,255,255)',
      black: 'rgb(0,0,0)',
      blue: 'rgb(0,0,255)',
      fuchsia: 'rgb(255,0,255)',
      gray: 'rgb(128,128,128)',
      green: 'rgb(0,128,0)',
      lime: 'rgb(0,255,0)',
      maroon: 'rgb(128,0,0)',
      navy: 'rgb(0,0,128)',
      olive: 'rgb(128,128,0)',
      purple: 'rgb(128,0,128)',
      red: 'rgb(255,0,0)',
      silver: 'rgb(192,192,192)',
      teal: 'rgb(0,128,128)',
      white: 'rgb(255,255,255)',
      yellow: 'rgb(255,255,0)',
      orange: 'rgb(255,128,0)'
    };
  }

  Helpers.prototype.slice = function(value, max) {
    if (value > max) {
      return max;
    } else {
      return value;
    }
  };

  Helpers.prototype.sliceMod = function(value, max) {
    if (value > 0) {
      if (value > max) {
        return max;
      } else {
        return value;
      }
    } else if (value < -max) {
      return -max;
    } else {
      return value;
    }
  };

  Helpers.prototype.clone = function(obj) {
    var key, target, value;
    target = {};
    for (key in obj) {
      value = obj[key];
      target[key] = value;
    }
    return target;
  };

  Helpers.prototype.getStyle = function(el) {
    var computedStyle;
    if (window.getComputedStyle) {
      return computedStyle = getComputedStyle(el, null);
    } else {
      return computedStyle = el.currentStyle;
    }
  };

  Helpers.prototype.rand = function(min, max) {
    return Math.floor((Math.random() * ((max + 1) - min)) + min);
  };

  Helpers.prototype.bind = function(func, context) {
    var bindArgs, wrapper;
    wrapper = function() {
      var args, unshiftArgs;
      args = Array.prototype.slice.call(arguments);
      unshiftArgs = bindArgs.concat(args);
      return func.apply(context, unshiftArgs);
    };
    bindArgs = Array.prototype.slice.call(arguments, 2);
    return wrapper;
  };

  Helpers.prototype.isObj = function(obj) {
    return !!obj && (obj.constructor === Object);
  };

  Helpers.prototype.makeColorObj = function(color) {
    var alpha, b, colorObj, g, isRgb, r, regexString1, regexString2, result, rgbColor;
    if (color[0] === '#') {
      result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(color);
      colorObj = {};
      if (result) {
        r = result[1].length === 2 ? result[1] : result[1] + result[1];
        g = result[2].length === 2 ? result[2] : result[2] + result[2];
        b = result[3].length === 2 ? result[3] : result[3] + result[3];
        colorObj = {
          r: parseInt(r, 16),
          g: parseInt(g, 16),
          b: parseInt(b, 16),
          a: 1
        };
      }
    }
    if (color[0] !== '#') {
      isRgb = color[0] === 'r' && color[1] === 'g' && color[2] === 'b';
      if (isRgb) {
        rgbColor = color;
      }
      if (!isRgb) {
        rgbColor = !this.shortColors[color] ? (this.div.style.color = color, this.isFF() || this.isIE() ? this.computedStyle(this.div).color : this.div.style.color) : this.shortColors[color];
      }
      regexString1 = '^rgba?\\((\\d{1,3}),\\s?(\\d{1,3}),';
      regexString2 = '\\s?(\\d{1,3}),?\\s?(\\d{1}|0?\\.\\d{1,})?\\)$';
      result = new RegExp(regexString1 + regexString2, 'gi').exec(rgbColor);
      colorObj = {};
      alpha = parseFloat(result[4] || 1);
      if (result) {
        colorObj = {
          r: parseInt(result[1], 10),
          g: parseInt(result[2], 10),
          b: parseInt(result[3], 10),
          a: (alpha != null) && !isNaN(alpha) ? alpha : 1
        };
      }
    }
    return colorObj;
  };

  Helpers.prototype.size = function(obj) {
    var i, key, value;
    i = 0;
    for (key in obj) {
      value = obj[key];
      i++;
    }
    return i;
  };

  Helpers.prototype.isSizeChange = function(o) {
    var isLineWidth, isRadius, isRadiusAxes1, isRadiusAxes2;
    isRadius = o.radiusStart || o.radiusEnd;
    isRadiusAxes1 = o.radiusStartX || o.radiusStartY;
    isRadiusAxes2 = o.radiusEndX || o.radiusEndX;
    isLineWidth = o.lineWidth || o.lineWidthMiddle || o.lineWidthEnd;
    return isRadius || isRadiusAxes1 || isRadiusAxes2 || isLineWidth;
  };

  Helpers.prototype.lock = function(o) {
    !this[o.lock] && o.fun();
    return this[o.lock] = true;
  };

  Helpers.prototype.unlock = function(o) {
    return this[o.lock] = false;
  };

  Helpers.prototype.animationLoop = function() {
    if (!TWEEN.getAll().length) {
      this.isAnimateLoop = false;
    }
    if (!this.isAnimateLoop) {
      return;
    }
    TWEEN.update();
    return requestAnimationFrame(this.animationLoop);
  };

  Helpers.prototype.startAnimationLoop = function() {
    if (this.isAnimateLoop) {
      return;
    }
    this.isAnimateLoop = true;
    return requestAnimationFrame(this.animationLoop);
  };

  Helpers.prototype.stopAnimationLoop = function() {
    return this.isAnimateLoop = false;
  };

  return Helpers;

})();

module.exports = (function() {
  return new Helpers;
})();



},{"./vendor/tween":5}],3:[function(require,module,exports){
module.exports = {
  "point0": {
    "x": 5,
    "y": 100.00390625,
    "isFilled": false,
    "isPathEnd": true
  },
  "point1": {
    "x": 435,
    "y": 107.33984375,
    "isFilled": false,
    "isPathEnd": true,
    "connected": "42"
  },
  "point2": {
    "x": 474,
    "y": 107.3703125,
    "isFilled": false,
    "isPathEnd": true,
    "connected": "43"
  },
  "point3": {
    "x": 309,
    "y": 108.24140625,
    "isFilled": false,
    "isPathEnd": true
  },
  "point4": {
    "x": 391,
    "y": 108.30546875,
    "isFilled": false,
    "isPathEnd": true
  },
  "point5": {
    "x": 490,
    "y": 108.3828125,
    "isFilled": false,
    "isPathEnd": true
  },
  "point6": {
    "x": 927,
    "y": 109.72421875,
    "isFilled": false,
    "isPathEnd": true
  },
  "point7": {
    "x": 1137,
    "y": 110.88828125,
    "isFilled": false,
    "isPathEnd": true
  },
  "point8": {
    "x": 945,
    "y": 111.73828125,
    "isFilled": false,
    "isPathEnd": true
  },
  "point9": {
    "x": 797,
    "y": 113.62265625,
    "isFilled": false,
    "isPathEnd": true
  },
  "point10": {
    "x": 753,
    "y": 116.58828125,
    "isFilled": false,
    "isPathEnd": true
  },
  "point11": {
    "x": 4,
    "y": 119.003125,
    "isFilled": false,
    "isPathEnd": true
  },
  "point12": {
    "x": 1013,
    "y": 121.79140625,
    "isFilled": false,
    "isPathEnd": true
  },
  "point13": {
    "x": 1278,
    "y": 121.9984375,
    "isFilled": false,
    "isPathEnd": true
  },
  "point14": {
    "x": 1277,
    "y": 127.99765625,
    "isFilled": false,
    "isPathEnd": true
  },
  "point15": {
    "x": 918,
    "y": 129.7171875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "6:8:24:25",
    "to": {
      "x": 720,
      "y": 124
    }
  },
  "point16": {
    "x": 1264,
    "y": 129.9875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "13:14",
    "to": {
      "x": 720,
      "y": 124
    }
  },
  "point17": {
    "x": 570,
    "y": 142.4453125,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "5:21",
    "to": {
      "x": 560,
      "y": 148
    }
  },
  "point18": {
    "x": 1100,
    "y": 145.859375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "7:20:16",
    "to": {
      "x": 720,
      "y": 148
    }
  },
  "point19": {
    "x": 673,
    "y": 153.52578125,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "10:159",
    "to": {
      "x": 640,
      "y": 148
    }
  },
  "point20": {
    "x": 973,
    "y": 158.76015625,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "12:24:67",
    "to": {
      "x": 720,
      "y": 148
    }
  },
  "point21": {
    "x": 611,
    "y": 160.47734375,
    "isFilled": true,
    "isPathEnd": false,
    "to": {
      "x": 560,
      "y": 172
    }
  },
  "point22": {
    "x": 1278,
    "y": 162.9984375,
    "isFilled": false,
    "isPathEnd": true
  },
  "point23": {
    "x": 702,
    "y": 165.5484375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "19:34",
    "to": {
      "x": 720,
      "y": 172
    }
  },
  "point24": {
    "x": 904,
    "y": 165.70625,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "25:65",
    "to": {
      "x": 720,
      "y": 172
    }
  },
  "point25": {
    "x": 862,
    "y": 169.6734375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "29:46",
    "to": {
      "x": 720,
      "y": 172
    }
  },
  "point26": {
    "x": 342,
    "y": 170.2671875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "0:3:39",
    "to": {
      "x": 560,
      "y": 124
    }
  },
  "point27": {
    "x": 637,
    "y": 171.49765625,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "19:21:33",
    "to": {
      "x": 640,
      "y": 172
    }
  },
  "point28": {
    "x": 607,
    "y": 172.47421875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "21:33:36:37",
    "to": {
      "x": 560,
      "y": 172
    }
  },
  "point29": {
    "x": 787,
    "y": 176.61484375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "9:38",
    "to": {
      "x": 720,
      "y": 172
    }
  },
  "point30": {
    "x": 2,
    "y": 180.0015625,
    "isFilled": false,
    "isPathEnd": true
  },
  "point31": {
    "x": 743,
    "y": 182.58046875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "23:29:38:44",
    "to": {
      "x": 720,
      "y": 172
    }
  },
  "point32": {
    "x": 649,
    "y": 184.50703125,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "19:27:33",
    "to": {
      "x": 640,
      "y": 196
    }
  },
  "point33": {
    "x": 633,
    "y": 186.49453125,
    "isFilled": true,
    "isPathEnd": false,
    "to": {
      "x": 720,
      "y": 196
    }
  },
  "point34": {
    "x": 661,
    "y": 187.51640625,
    "isFilled": true,
    "isPathEnd": false,
    "to": {
      "x": 640,
      "y": 196
    }
  },
  "point35": {
    "x": 685,
    "y": 187.53515625,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "23:31:34:44",
    "to": {
      "x": 560,
      "y": 196
    }
  },
  "point36": {
    "x": 587,
    "y": 192.45859375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "17:33:43:41",
    "to": {
      "x": 560,
      "y": 196
    }
  },
  "point37": {
    "x": 602,
    "y": 195.4703125,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "36:41",
    "to": {
      "x": 560,
      "y": 196
    }
  },
  "point38": {
    "x": 784,
    "y": 197.6125,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "52",
    "to": {
      "x": 720,
      "y": 196
    }
  },
  "point39": {
    "x": 483,
    "y": 199.37734375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "4:47",
    "to": {
      "x": 560,
      "y": 196
    }
  },
  "point40": {
    "x": 1,
    "y": 200.00078125,
    "isFilled": false,
    "isPathEnd": true
  },
  "point41": {
    "x": 591,
    "y": 201.46171875,
    "isFilled": true,
    "isPathEnd": false,
    "to": {
      "x": 560,
      "y": 196
    }
  },
  "point42": {
    "x": 499,
    "y": 202.38984375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "43:71",
    "to": {
      "x": 560,
      "y": 196
    }
  },
  "point43": {
    "x": 502,
    "y": 203.3921875,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 560,
      "y": 196
    }
  },
  "point44": {
    "x": 733,
    "y": 203.57265625,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 720,
      "y": 196
    }
  },
  "point45": {
    "x": 494,
    "y": 204.3859375,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 560,
      "y": 196
    }
  },
  "point46": {
    "x": 807,
    "y": 207.63046875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "38:54",
    "to": {
      "x": 720,
      "y": 196
    }
  },
  "point47": {
    "x": 505,
    "y": 208.39453125,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "36:56:57:77",
    "to": {
      "x": 640,
      "y": 220
    }
  },
  "point48": {
    "x": 696,
    "y": 211.54375,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "35",
    "to": {
      "x": 640,
      "y": 220
    }
  },
  "point49": {
    "x": 1102,
    "y": 212.8609375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "16:22",
    "to": {
      "x": 720,
      "y": 220
    }
  },
  "point50": {
    "x": 563,
    "y": 215.43984375,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "36:61",
    "to": {
      "x": 720,
      "y": 220
    }
  },
  "point51": {
    "x": 500,
    "y": 216.390625,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "45:47",
    "to": {
      "x": 560,
      "y": 220
    }
  },
  "point52": {
    "x": 781,
    "y": 216.61015625,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "44:59",
    "to": {
      "x": 560,
      "y": 220
    }
  },
  "point53": {
    "x": 368,
    "y": 219.2875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "26:42:73",
    "to": {
      "x": 560,
      "y": 220
    }
  },
  "point54": {
    "x": 792,
    "y": 219.61875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "52:59:65",
    "to": {
      "x": 720,
      "y": 220
    }
  },
  "point55": {
    "x": 103,
    "y": 221.08046875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "30:40",
    "to": {
      "x": 560,
      "y": 220
    }
  },
  "point56": {
    "x": 532,
    "y": 221.415625,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "50:61:69",
    "to": {
      "x": 560,
      "y": 220
    }
  },
  "point57": {
    "x": 510,
    "y": 226.3984375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "51:62:66",
    "to": {
      "x": 560,
      "y": 220
    }
  },
  "point58": {
    "x": 308,
    "y": 227.240625,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "11:53:73",
    "to": {
      "x": 560,
      "y": 220
    }
  },
  "point59": {
    "x": 779,
    "y": 228.60859375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "75:96",
    "to": {
      "x": 720,
      "y": 220
    }
  },
  "point60": {
    "x": 719,
    "y": 231.56171875,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "44:48",
    "to": {
      "x": 720,
      "y": 220
    }
  },
  "point61": {
    "x": 570,
    "y": 233.4453125,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "74",
    "to": {
      "x": 560,
      "y": 244
    }
  },
  "point62": {
    "x": 519,
    "y": 235.40546875,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "77",
    "to": {
      "x": 560,
      "y": 244
    }
  },
  "point63": {
    "x": 204,
    "y": 239.159375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "55:58:82",
    "to": {
      "x": 640,
      "y": 244
    }
  },
  "point64": {
    "x": 1000,
    "y": 240.78125,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "18:49:76",
    "to": {
      "x": 720,
      "y": 244
    }
  },
  "point65": {
    "x": 872,
    "y": 241.68125,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 720,
      "y": 244
    }
  },
  "point66": {
    "x": 514,
    "y": 242.4015625,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "97",
    "to": {
      "x": 560,
      "y": 244
    }
  },
  "point67": {
    "x": 880,
    "y": 242.6875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "76",
    "to": {
      "x": 720,
      "y": 244
    }
  },
  "point68": {
    "x": 165,
    "y": 245.12890625,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "55:63:78",
    "to": {
      "x": 560,
      "y": 244
    }
  },
  "point69": {
    "x": 550,
    "y": 248.4296875,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "61:77:74",
    "to": {
      "x": 560,
      "y": 244
    }
  },
  "point70": {
    "x": 713,
    "y": 251.55703125,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "48:60:75:94",
    "to": {
      "x": 720,
      "y": 244
    }
  },
  "point71": {
    "x": 547,
    "y": 253.42734375,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 560,
      "y": 244
    }
  },
  "point72": {
    "x": 867,
    "y": 253.67734375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "65:67:84:86",
    "to": {
      "x": 720,
      "y": 244
    }
  },
  "point73": {
    "x": 387,
    "y": 255.30234375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "82:85",
    "to": {
      "x": 560,
      "y": 244
    }
  },
  "point74": {
    "x": 563,
    "y": 257.43984375,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "83",
    "to": {
      "x": 560,
      "y": 268
    }
  },
  "point75": {
    "x": 733,
    "y": 259.57265625,
    "isFilled": true,
    "isPathEnd": false,
    "to": {
      "x": 720,
      "y": 268
    }
  },
  "point76": {
    "x": 934,
    "y": 259.7296875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "84",
    "to": {
      "x": 720,
      "y": 268
    }
  },
  "point77": {
    "x": 548,
    "y": 264.428125,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "74",
    "to": {
      "x": 560,
      "y": 268
    }
  },
  "point78": {
    "x": 8,
    "y": 265.00625,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 560,
      "y": 268
    }
  },
  "point79": {
    "x": 719,
    "y": 266.56171875,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "60:70:75",
    "to": {
      "x": 720,
      "y": 268
    }
  },
  "point80": {
    "x": 970,
    "y": 267.7578125,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "64:76:81",
    "to": {
      "x": 560,
      "y": 268
    }
  },
  "point81": {
    "x": 984,
    "y": 272.76875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "49:122",
    "to": {
      "x": 720,
      "y": 268
    }
  },
  "point82": {
    "x": 399,
    "y": 278.31171875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "89",
    "to": {
      "x": 560,
      "y": 268
    }
  },
  "point83": {
    "x": 556,
    "y": 278.434375,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "77:105",
    "to": {
      "x": 560,
      "y": 268
    }
  },
  "point84": {
    "x": 856,
    "y": 280.66875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "86",
    "to": {
      "x": 720,
      "y": 292
    }
  },
  "point85": {
    "x": 474,
    "y": 286.3703125,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "66:91",
    "to": {
      "x": 560,
      "y": 292
    }
  },
  "point86": {
    "x": 831,
    "y": 287.64921875,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 720,
      "y": 292
    }
  },
  "point87": {
    "x": 945,
    "y": 291.73828125,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "80",
    "to": {
      "x": 720,
      "y": 292
    }
  },
  "point88": {
    "x": 555,
    "y": 292.43359375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "77:83:97",
    "to": {
      "x": 560,
      "y": 292
    }
  },
  "point89": {
    "x": 469,
    "y": 293.36640625,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "85:91",
    "to": {
      "x": 560,
      "y": 292
    }
  },
  "point90": {
    "x": 545,
    "y": 293.42578125,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "88",
    "to": {
      "x": 640,
      "y": 292
    }
  },
  "point91": {
    "x": 502,
    "y": 299.3921875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "90:95",
    "to": {
      "x": 560,
      "y": 292
    }
  },
  "point92": {
    "x": 930,
    "y": 299.7265625,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "87:108",
    "to": {
      "x": 720,
      "y": 292
    }
  },
  "point93": {
    "x": 936,
    "y": 299.73125,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "80:81:121",
    "to": {
      "x": 720,
      "y": 292
    }
  },
  "point94": {
    "x": 706,
    "y": 302.5515625,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "79",
    "to": {
      "x": 720,
      "y": 292
    }
  },
  "point95": {
    "x": 525,
    "y": 304.41015625,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "85",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point96": {
    "x": 766,
    "y": 304.5984375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "86:98",
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point97": {
    "x": 556,
    "y": 309.434375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "95:105",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point98": {
    "x": 751,
    "y": 309.58671875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "94",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point99": {
    "x": 764,
    "y": 311.596875,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point100": {
    "x": 417,
    "y": 312.32578125,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "82:91:109",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point101": {
    "x": 702,
    "y": 312.5484375,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "94:102:115:125",
    "to": {
      "x": 640,
      "y": 316
    }
  },
  "point102": {
    "x": 737,
    "y": 314.57578125,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "79:96:103",
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point103": {
    "x": 763,
    "y": 315.59609375,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 640,
      "y": 316
    }
  },
  "point104": {
    "x": 560,
    "y": 316.4375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "95",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point105": {
    "x": 590,
    "y": 316.4609375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "113",
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point106": {
    "x": 799,
    "y": 316.62421875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "86:103:107:111",
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point107": {
    "x": 840,
    "y": 318.65625,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "84:108:111",
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point108": {
    "x": 889,
    "y": 319.69453125,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "110:118:93",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point109": {
    "x": 355,
    "y": 320.27734375,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "112:116:68",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point110": {
    "x": 914,
    "y": 321.7140625,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "87:114:120",
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point111": {
    "x": 838,
    "y": 322.6546875,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point112": {
    "x": 342,
    "y": 323.2671875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "78:123",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point113": {
    "x": 598,
    "y": 325.4671875,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "119:131",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point114": {
    "x": 983,
    "y": 325.76796875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "93:121:128",
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point115": {
    "x": 671,
    "y": 326.52421875,
    "isFilled": true,
    "isPathEnd": false,
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point116": {
    "x": 370,
    "y": 327.2890625,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "112",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point117": {
    "x": 691,
    "y": 327.53984375,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "101:102:115",
    "to": {
      "x": 640,
      "y": 316
    }
  },
  "point118": {
    "x": 876,
    "y": 327.684375,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point119": {
    "x": 613,
    "y": 330.47890625,
    "isFilled": true,
    "isPathEnd": false,
    "to": {
      "x": 640,
      "y": 340
    }
  },
  "point120": {
    "x": 905,
    "y": 331.70703125,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "111:128",
    "to": {
      "x": 560,
      "y": 340
    }
  },
  "point121": {
    "x": 1175,
    "y": 334.91796875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "127",
    "to": {
      "x": 720,
      "y": 340
    }
  },
  "point122": {
    "x": 1218,
    "y": 335.9515625,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "121:126:127",
    "to": {
      "x": 560,
      "y": 340
    }
  },
  "point123": {
    "x": 247,
    "y": 338.19296875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "136:137",
    "to": {
      "x": 560,
      "y": 340
    }
  },
  "point124": {
    "x": 430,
    "y": 338.3359375,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "89:100:116",
    "to": {
      "x": 560,
      "y": 340
    }
  },
  "point125": {
    "x": 664,
    "y": 338.51875,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "119:117",
    "to": {
      "x": 640,
      "y": 340
    }
  },
  "point126": {
    "x": 1278,
    "y": 338.9984375,
    "isFilled": false,
    "isPathEnd": true
  },
  "point127": {
    "x": 1248,
    "y": 345.975,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "130:134",
    "to": {
      "x": 720,
      "y": 340
    }
  },
  "point128": {
    "x": 1028,
    "y": 348.803125,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "143:155",
    "to": {
      "x": 720,
      "y": 340
    }
  },
  "point129": {
    "x": 629,
    "y": 349.49140625,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "115:117:119",
    "to": {
      "x": 640,
      "y": 340
    }
  },
  "point130": {
    "x": 1278,
    "y": 349.9984375,
    "isFilled": false,
    "isPathEnd": true
  },
  "point131": {
    "x": 581,
    "y": 351.45390625,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "104:129:138:139",
    "to": {
      "x": 560,
      "y": 340
    }
  },
  "point132": {
    "x": 757,
    "y": 352.59140625,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "103:106:144",
    "to": {
      "x": 720,
      "y": 364
    }
  },
  "point133": {
    "x": 826,
    "y": 353.6453125,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "111:118",
    "to": {
      "x": 720,
      "y": 364
    }
  },
  "point134": {
    "x": 1278,
    "y": 353.9984375,
    "isFilled": false,
    "isPathEnd": true
  },
  "point135": {
    "x": 438,
    "y": 354.3421875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "116:124:142",
    "to": {
      "x": 560,
      "y": 364
    }
  },
  "point136": {
    "x": 85,
    "y": 360.06640625,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 560,
      "y": 364
    }
  },
  "point137": {
    "x": 2,
    "y": 369.0015625,
    "isFilled": false,
    "isPathEnd": true
  },
  "point138": {
    "x": 592,
    "y": 370.4625,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "132:147",
    "to": {
      "x": 560,
      "y": 364
    }
  },
  "point139": {
    "x": 568,
    "y": 372.44375,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "138:145",
    "to": {
      "x": 560,
      "y": 364
    }
  },
  "point140": {
    "x": 500,
    "y": 380.390625,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "135:139:142:145",
    "to": {
      "x": 560,
      "y": 388
    }
  },
  "point141": {
    "x": 1278,
    "y": 384.9984375,
    "isFilled": false,
    "isPathEnd": true
  },
  "point142": {
    "x": 454,
    "y": 385.3546875,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "148",
    "to": {
      "x": 560,
      "y": 484
    }
  },
  "point143": {
    "x": 1278,
    "y": 385.9984375,
    "isFilled": false,
    "isPathEnd": true
  },
  "point144": {
    "x": 751,
    "y": 390.58671875,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "133:150",
    "to": {
      "x": 720,
      "y": 388
    }
  },
  "point145": {
    "x": 551,
    "y": 400.43046875,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "147",
    "to": {
      "x": 560,
      "y": 412
    }
  },
  "point146": {
    "x": 685,
    "y": 427.53515625,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "132:144",
    "to": {
      "x": 640,
      "y": 436
    }
  },
  "point147": {
    "x": 629,
    "y": 431.49140625,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "160:162",
    "to": {
      "x": 640,
      "y": 436
    }
  },
  "point148": {
    "x": 2,
    "y": 435.0015625,
    "isFilled": false,
    "isPathEnd": true
  },
  "point149": {
    "x": 792,
    "y": 436.61875,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "120:133:162",
    "to": {
      "x": 720,
      "y": 436
    }
  },
  "point150": {
    "x": 742,
    "y": 456.5796875,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "161",
    "to": {
      "x": 720,
      "y": 460
    }
  },
  "point151": {
    "x": 622,
    "y": 458.4859375,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "146:158",
    "to": {
      "x": 640,
      "y": 460
    }
  },
  "point152": {
    "x": 649,
    "y": 463.50703125,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "146:159",
    "to": {
      "x": 720,
      "y": 460
    }
  },
  "point153": {
    "x": 504,
    "y": 477.39375,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "142:145:156:157",
    "to": {
      "x": 560,
      "y": 484
    }
  },
  "point154": {
    "x": 747,
    "y": 478.58359375,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "149:161",
    "to": {
      "x": 720,
      "y": 484
    }
  },
  "point155": {
    "x": 1278,
    "y": 487.9984375,
    "isFilled": false,
    "isPathEnd": true
  },
  "point156": {
    "x": 510,
    "y": 488.3984375,
    "isFilled": false,
    "isPathEnd": true
  },
  "point157": {
    "x": 498,
    "y": 489.3890625,
    "isFilled": false,
    "isPathEnd": true
  },
  "point158": {
    "x": 559,
    "y": 489.43671875,
    "isFilled": false,
    "isPathEnd": true
  },
  "point159": {
    "x": 639,
    "y": 490.4859375,
    "isFilled": false,
    "isPathEnd": true
  },
  "point160": {
    "x": 666,
    "y": 490.5203125,
    "isFilled": false,
    "isPathEnd": true
  },
  "point161": {
    "x": 736,
    "y": 490.575,
    "isFilled": false,
    "isPathEnd": true
  },
  "point162": {
    "x": 774,
    "y": 491.6046875,
    "isFilled": false,
    "isPathEnd": true
  }
};



},{}],4:[function(require,module,exports){
module.exports = (function() {
  if (!CanvasRenderingContext2D.prototype.clear) {
    return CanvasRenderingContext2D.prototype.clear = function(preserveTransform) {
      if (preserveTransform) {
        this.save();
        this.setTransform(1, 0, 0, 1, 0, 0);
      }
      this.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (preserveTransform) {
        this.restore();
      }
    };
  }
})();



},{}],5:[function(require,module,exports){
;(function(undefined){


	
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
	

	/**
	 * Tween.js - Licensed under the MIT license
	 * https://github.com/sole/tween.js
	 * ----------------------------------------------
	 *
	 * See https://github.com/sole/tween.js/graphs/contributors for the full list of contributors.
	 * Thank you all, you're awesome!
	 */

	// Date.now shim for (ahem) Internet Explo(d|r)er
	if ( Date.now === undefined ) {

		Date.now = function () {

			return new Date().valueOf();

		};

	}

	var TWEEN = TWEEN || ( function () {

		var _tweens = [];

		return {

			REVISION: '14',

			getAll: function () {

				return _tweens;

			},

			removeAll: function () {

				_tweens = [];

			},

			add: function ( tween ) {

				_tweens.push( tween );

			},

			remove: function ( tween ) {

				var i = _tweens.indexOf( tween );

				if ( i !== -1 ) {

					_tweens.splice( i, 1 );

				}

			},

			update: function ( time ) {

				if ( _tweens.length === 0 ) return false;

				var i = 0;

				time = time !== undefined ? time : ( typeof window !== 'undefined' && window.performance !== undefined && window.performance.now !== undefined ? window.performance.now() : Date.now() );

				while ( i < _tweens.length ) {

					if ( _tweens[ i ].update( time ) ) {

						i++;

					} else {

						_tweens.splice( i, 1 );

					}

				}

				return true;

			}
		};

	} )();

	TWEEN.Tween = function ( object ) {

		var _object = object;
		var _valuesStart = {};
		var _valuesEnd = {};
		var _valuesStartRepeat = {};
		var _duration = 1000;
		var _repeat = 0;
		var _yoyo = false;
		var _isPlaying = false;
		var _reversed = false;
		var _delayTime = 0;
		var _startTime = null;
		var _easingFunction = TWEEN.Easing.Linear.None;
		var _interpolationFunction = TWEEN.Interpolation.Linear;
		var _chainedTweens = [];
		var _onStartCallback = null;
		var _onStartCallbackFired = false;
		var _onUpdateCallback = null;
		var _onCompleteCallback = null;
		var _onStopCallback = null;

		// Set all starting values present on the target object
		for ( var field in object ) {

			_valuesStart[ field ] = parseFloat(object[field], 10);

		}

		this.to = function ( properties, duration ) {

			if ( duration !== undefined ) {

				_duration = duration;

			}

			_valuesEnd = properties;

			return this;

		};

		this.start = function ( time ) {

			TWEEN.add( this );

			_isPlaying = true;

			_onStartCallbackFired = false;

			_startTime = time !== undefined ? time : ( typeof window !== 'undefined' && window.performance !== undefined && window.performance.now !== undefined ? window.performance.now() : Date.now() );
			_startTime += _delayTime;

			for ( var property in _valuesEnd ) {

				// check if an Array was provided as property value
				if ( _valuesEnd[ property ] instanceof Array ) {

					if ( _valuesEnd[ property ].length === 0 ) {

						continue;

					}

					// create a local copy of the Array with the start value at the front
					_valuesEnd[ property ] = [ _object[ property ] ].concat( _valuesEnd[ property ] );

				}

				_valuesStart[ property ] = _object[ property ];

				if( ( _valuesStart[ property ] instanceof Array ) === false ) {
					_valuesStart[ property ] *= 1.0; // Ensures we're using numbers, not strings
				}

				_valuesStartRepeat[ property ] = _valuesStart[ property ] || 0;

			}

			return this;

		};

		this.stop = function () {

			if ( !_isPlaying ) {
				return this;
			}

			TWEEN.remove( this );
			_isPlaying = false;

			if ( _onStopCallback !== null ) {

				_onStopCallback.call( _object );

			}

			this.stopChainedTweens();
			return this;

		};

		this.stopChainedTweens = function () {

			for ( var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++ ) {

				_chainedTweens[ i ].stop();

			}

		};

		this.delay = function ( amount ) {

			_delayTime = amount;
			return this;

		};

		this.repeat = function ( times ) {
			_repeat = times;
			return this;

		};

		this.yoyo = function( yoyo ) {

			_yoyo = yoyo;
			return this;

		};


		this.easing = function ( easing ) {

			_easingFunction = easing;
			return this;

		};

		this.interpolation = function ( interpolation ) {

			_interpolationFunction = interpolation;
			return this;

		};

		this.chain = function () {

			_chainedTweens = arguments;
			return this;

		};

		this.onStart = function ( callback ) {

			_onStartCallback = callback;
			return this;

		};

		this.onUpdate = function ( callback ) {

			_onUpdateCallback = callback;
			return this;

		};

		this.onComplete = function ( callback ) {

			_onCompleteCallback = callback;
			return this;

		};

		this.onStop = function ( callback ) {

			_onStopCallback = callback;
			return this;

		};

		this.update = function ( time ) {

			var property;

			if ( time < _startTime ) {

				return true;

			}

			if ( _onStartCallbackFired === false ) {

				if ( _onStartCallback !== null ) {

					_onStartCallback.call( _object );

				}

				_onStartCallbackFired = true;

			}

			var elapsed = ( time - _startTime ) / _duration;
			elapsed = elapsed > 1 ? 1 : elapsed;

			var value = _easingFunction( elapsed );

			for ( property in _valuesEnd ) {

				var start = _valuesStart[ property ] || 0;
				var end = _valuesEnd[ property ];

				if ( end instanceof Array ) {

					_object[ property ] = _interpolationFunction( end, value );

				} else {

					// Parses relative end values with start as base (e.g.: +10, -3)
					if ( typeof(end) === "string" ) {
						end = start + parseFloat(end, 10);
					}

					// protect against non numeric properties.
					if ( typeof(end) === "number" ) {
						_object[ property ] = start + ( end - start ) * value;
					}

				}

			}

			if ( _onUpdateCallback !== null ) {

				_onUpdateCallback.call( _object, value );

			}

			if ( elapsed == 1 ) {

				if ( _repeat > 0 ) {

					if( isFinite( _repeat ) ) {
						_repeat--;
					}

					// reassign starting values, restart by making startTime = now
					for( property in _valuesStartRepeat ) {

						if ( typeof( _valuesEnd[ property ] ) === "string" ) {
							_valuesStartRepeat[ property ] = _valuesStartRepeat[ property ] + parseFloat(_valuesEnd[ property ], 10);
						}

						if (_yoyo) {
							var tmp = _valuesStartRepeat[ property ];
							_valuesStartRepeat[ property ] = _valuesEnd[ property ];
							_valuesEnd[ property ] = tmp;
						}

						_valuesStart[ property ] = _valuesStartRepeat[ property ];

					}

					if (_yoyo) {
						_reversed = !_reversed;
					}

					_startTime = time + _delayTime;

					return true;

				} else {

					if ( _onCompleteCallback !== null ) {

						_onCompleteCallback.call( _object );

					}

					for ( var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++ ) {

						_chainedTweens[ i ].start( time );

					}

					return false;

				}

			}

			return true;

		};

	};


	TWEEN.Easing = {

		Linear: {

			None: function ( k ) {

				return k;

			}

		},

		Quadratic: {

			In: function ( k ) {

				return k * k;

			},

			Out: function ( k ) {

				return k * ( 2 - k );

			},

			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1 ) return 0.5 * k * k;
				return - 0.5 * ( --k * ( k - 2 ) - 1 );

			}

		},

		Cubic: {

			In: function ( k ) {

				return k * k * k;

			},

			Out: function ( k ) {

				return --k * k * k + 1;

			},

			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k;
				return 0.5 * ( ( k -= 2 ) * k * k + 2 );

			}

		},

		Quartic: {

			In: function ( k ) {

				return k * k * k * k;

			},

			Out: function ( k ) {

				return 1 - ( --k * k * k * k );

			},

			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1) return 0.5 * k * k * k * k;
				return - 0.5 * ( ( k -= 2 ) * k * k * k - 2 );

			}

		},

		Quintic: {

			In: function ( k ) {

				return k * k * k * k * k;

			},

			Out: function ( k ) {

				return --k * k * k * k * k + 1;

			},

			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k * k * k;
				return 0.5 * ( ( k -= 2 ) * k * k * k * k + 2 );

			}

		},

		Sinusoidal: {

			In: function ( k ) {

				return 1 - Math.cos( k * Math.PI / 2 );

			},

			Out: function ( k ) {

				return Math.sin( k * Math.PI / 2 );

			},

			InOut: function ( k ) {

				return 0.5 * ( 1 - Math.cos( Math.PI * k ) );

			}

		},

		Exponential: {

			In: function ( k ) {

				return k === 0 ? 0 : Math.pow( 1024, k - 1 );

			},

			Out: function ( k ) {

				return k === 1 ? 1 : 1 - Math.pow( 2, - 10 * k );

			},

			InOut: function ( k ) {

				if ( k === 0 ) return 0;
				if ( k === 1 ) return 1;
				if ( ( k *= 2 ) < 1 ) return 0.5 * Math.pow( 1024, k - 1 );
				return 0.5 * ( - Math.pow( 2, - 10 * ( k - 1 ) ) + 2 );

			}

		},

		Circular: {

			In: function ( k ) {

				return 1 - Math.sqrt( 1 - k * k );

			},

			Out: function ( k ) {

				return Math.sqrt( 1 - ( --k * k ) );

			},

			InOut: function ( k ) {

				if ( ( k *= 2 ) < 1) return - 0.5 * ( Math.sqrt( 1 - k * k) - 1);
				return 0.5 * ( Math.sqrt( 1 - ( k -= 2) * k) + 1);

			}

		},

		Elastic: {

			In: function ( k ) {

				var s, a = 0.1, p = 0.4;
				if ( k === 0 ) return 0;
				if ( k === 1 ) return 1;
				if ( !a || a < 1 ) { a = 1; s = p / 4; }
				else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
				return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );

			},

			Out: function ( k ) {

				var s, a = 0.1, p = 0.4;
				if ( k === 0 ) return 0;
				if ( k === 1 ) return 1;
				if ( !a || a < 1 ) { a = 1; s = p / 4; }
				else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
				return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

			},

			InOut: function ( k ) {

				var s, a = 0.1, p = 0.4;
				if ( k === 0 ) return 0;
				if ( k === 1 ) return 1;
				if ( !a || a < 1 ) { a = 1; s = p / 4; }
				else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
				if ( ( k *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
				return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;

			}

		},

		Back: {

			In: function ( k ) {

				var s = 1.70158;
				return k * k * ( ( s + 1 ) * k - s );

			},

			Out: function ( k ) {

				var s = 1.70158;
				return --k * k * ( ( s + 1 ) * k + s ) + 1;

			},

			InOut: function ( k ) {

				var s = 1.70158 * 1.525;
				if ( ( k *= 2 ) < 1 ) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
				return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );

			}

		},

		Bounce: {

			In: function ( k ) {

				return 1 - TWEEN.Easing.Bounce.Out( 1 - k );

			},

			Out: function ( k ) {

				if ( k < ( 1 / 2.75 ) ) {

					return 7.5625 * k * k;

				} else if ( k < ( 2 / 2.75 ) ) {

					return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;

				} else if ( k < ( 2.5 / 2.75 ) ) {

					return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;

				} else {

					return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;

				}

			},

			InOut: function ( k ) {

				if ( k < 0.5 ) return TWEEN.Easing.Bounce.In( k * 2 ) * 0.5;
				return TWEEN.Easing.Bounce.Out( k * 2 - 1 ) * 0.5 + 0.5;

			}

		}

	};

	TWEEN.Interpolation = {

		Linear: function ( v, k ) {

			var m = v.length - 1, f = m * k, i = Math.floor( f ), fn = TWEEN.Interpolation.Utils.Linear;

			if ( k < 0 ) return fn( v[ 0 ], v[ 1 ], f );
			if ( k > 1 ) return fn( v[ m ], v[ m - 1 ], m - f );

			return fn( v[ i ], v[ i + 1 > m ? m : i + 1 ], f - i );

		},

		Bezier: function ( v, k ) {

			var b = 0, n = v.length - 1, pw = Math.pow, bn = TWEEN.Interpolation.Utils.Bernstein, i;

			for ( i = 0; i <= n; i++ ) {
				b += pw( 1 - k, n - i ) * pw( k, i ) * v[ i ] * bn( n, i );
			}

			return b;

		},

		CatmullRom: function ( v, k ) {

			var m = v.length - 1, f = m * k, i = Math.floor( f ), fn = TWEEN.Interpolation.Utils.CatmullRom;

			if ( v[ 0 ] === v[ m ] ) {

				if ( k < 0 ) i = Math.floor( f = m * ( 1 + k ) );

				return fn( v[ ( i - 1 + m ) % m ], v[ i ], v[ ( i + 1 ) % m ], v[ ( i + 2 ) % m ], f - i );

			} else {

				if ( k < 0 ) return v[ 0 ] - ( fn( v[ 0 ], v[ 0 ], v[ 1 ], v[ 1 ], -f ) - v[ 0 ] );
				if ( k > 1 ) return v[ m ] - ( fn( v[ m ], v[ m ], v[ m - 1 ], v[ m - 1 ], f - m ) - v[ m ] );

				return fn( v[ i ? i - 1 : 0 ], v[ i ], v[ m < i + 1 ? m : i + 1 ], v[ m < i + 2 ? m : i + 2 ], f - i );

			}

		},

		Utils: {

			Linear: function ( p0, p1, t ) {

				return ( p1 - p0 ) * t + p0;

			},

			Bernstein: function ( n , i ) {

				var fc = TWEEN.Interpolation.Utils.Factorial;
				return fc( n ) / fc( i ) / fc( n - i );

			},

			Factorial: ( function () {

				var a = [ 1 ];

				return function ( n ) {

					var s = 1, i;
					if ( a[ n ] ) return a[ n ];
					for ( i = n; i > 1; i-- ) s *= i;
					return a[ n ] = s;

				};

			} )(),

			CatmullRom: function ( p0, p1, p2, p3, t ) {

				var v0 = ( p2 - p0 ) * 0.5, v1 = ( p3 - p1 ) * 0.5, t2 = t * t, t3 = t * t2;
				return ( 2 * p1 - 2 * p2 + v0 + v1 ) * t3 + ( - 3 * p1 + 3 * p2 - 2 * v0 - v1 ) * t2 + v0 * t + p1;

			}

		}

	};

	module.exports = TWEEN;


})()


},{}]},{},[1])
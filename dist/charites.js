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
  }

  Connectors.prototype.vars = function() {
    this.canvas = document.querySelector('#js-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = parseInt(this.canvas.getAttribute('width'), 10);
    this.height = parseInt(this.canvas.getAttribute('height'), 10);
    this.pw = this.width / 100;
    this.ph = this.height / 100;
    this.blue = '#0387A2';
    return this.points = points;
  };

  Connectors.prototype.restructPoints = function() {
    var point, pointName, _ref;
    _ref = this.points;
    for (pointName in _ref) {
      point = _ref[pointName];
      point.x = point.x / this.pw;
      point.y = point.y / this.ph;
    }
    return console.log(JSON.stringify(points));
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
          this.ctx.moveTo(point.x * this.pw, point.y * this.ph);
          this.ctx.lineTo(to.x * this.pw, to.y * this.ph);
          toX = to.isPathEnd ? to.x * this.pw : ((_ref1 = to.to) != null ? _ref1.x : void 0) * this.pw;
          if (Math.abs(((_ref2 = point.to) != null ? _ref2.x : void 0) * this.pw - toX * this.pw) < 50) {
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
        this.ctx.arc(point.x * this.pw, point.y * this.ph, 3, 0, 2 * Math.PI, false);
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
    "x": 0.390625,
    "y": 20.40896045918367,
    "isFilled": false,
    "isPathEnd": true
  },
  "point1": {
    "x": 33.984375,
    "y": 21.906090561224488,
    "isFilled": false,
    "isPathEnd": true,
    "connected": "42"
  },
  "point2": {
    "x": 37.03125,
    "y": 21.912308673469386,
    "isFilled": false,
    "isPathEnd": true,
    "connected": "43"
  },
  "point3": {
    "x": 24.140625,
    "y": 22.090082908163264,
    "isFilled": false,
    "isPathEnd": true
  },
  "point4": {
    "x": 30.546875,
    "y": 22.1031568877551,
    "isFilled": false,
    "isPathEnd": true
  },
  "point5": {
    "x": 38.28125,
    "y": 22.11894132653061,
    "isFilled": false,
    "isPathEnd": true
  },
  "point6": {
    "x": 72.421875,
    "y": 22.392697704081634,
    "isFilled": false,
    "isPathEnd": true
  },
  "point7": {
    "x": 88.828125,
    "y": 22.630261479591837,
    "isFilled": false,
    "isPathEnd": true
  },
  "point8": {
    "x": 73.828125,
    "y": 22.803730867346935,
    "isFilled": false,
    "isPathEnd": true
  },
  "point9": {
    "x": 62.265625,
    "y": 23.18829719387755,
    "isFilled": false,
    "isPathEnd": true
  },
  "point10": {
    "x": 58.828125,
    "y": 23.79352678571428,
    "isFilled": false,
    "isPathEnd": true
  },
  "point11": {
    "x": 0.3125,
    "y": 24.286352040816325,
    "isFilled": false,
    "isPathEnd": true
  },
  "point12": {
    "x": 79.140625,
    "y": 24.85538903061224,
    "isFilled": false,
    "isPathEnd": true
  },
  "point13": {
    "x": 99.84375,
    "y": 24.897640306122447,
    "isFilled": false,
    "isPathEnd": true
  },
  "point14": {
    "x": 99.765625,
    "y": 26.121970663265305,
    "isFilled": false,
    "isPathEnd": true
  },
  "point15": {
    "x": 71.71875,
    "y": 26.47289540816326,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "6:8:24:25",
    "to": {
      "x": 720,
      "y": 124
    }
  },
  "point16": {
    "x": 98.75,
    "y": 26.528061224489797,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "13:14",
    "to": {
      "x": 720,
      "y": 124
    }
  },
  "point17": {
    "x": 44.53125,
    "y": 29.07047193877551,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "5:21",
    "to": {
      "x": 560,
      "y": 148
    }
  },
  "point18": {
    "x": 85.9375,
    "y": 29.767219387755098,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "7:20:16",
    "to": {
      "x": 720,
      "y": 148
    }
  },
  "point19": {
    "x": 52.578125,
    "y": 31.331792091836732,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "10:159",
    "to": {
      "x": 640,
      "y": 148
    }
  },
  "point20": {
    "x": 76.015625,
    "y": 32.4000318877551,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "12:24:67",
    "to": {
      "x": 720,
      "y": 148
    }
  },
  "point21": {
    "x": 47.734375,
    "y": 32.75047831632653,
    "isFilled": true,
    "isPathEnd": false,
    "to": {
      "x": 560,
      "y": 172
    }
  },
  "point22": {
    "x": 99.84375,
    "y": 33.26498724489795,
    "isFilled": false,
    "isPathEnd": true
  },
  "point23": {
    "x": 54.84375,
    "y": 33.78539540816326,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "19:34",
    "to": {
      "x": 720,
      "y": 172
    }
  },
  "point24": {
    "x": 70.625,
    "y": 33.817602040816325,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "25:65",
    "to": {
      "x": 720,
      "y": 172
    }
  },
  "point25": {
    "x": 67.34375,
    "y": 34.62723214285714,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "29:46",
    "to": {
      "x": 720,
      "y": 172
    }
  },
  "point26": {
    "x": 26.71875,
    "y": 34.748405612244895,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "0:3:39",
    "to": {
      "x": 560,
      "y": 124
    }
  },
  "point27": {
    "x": 49.765625,
    "y": 34.99952168367347,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "19:21:33",
    "to": {
      "x": 640,
      "y": 172
    }
  },
  "point28": {
    "x": 47.421875,
    "y": 35.19882015306122,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "21:33:36:37",
    "to": {
      "x": 560,
      "y": 172
    }
  },
  "point29": {
    "x": 61.484375,
    "y": 36.0438456632653,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "9:38",
    "to": {
      "x": 720,
      "y": 172
    }
  },
  "point30": {
    "x": 0.15625,
    "y": 36.73501275510204,
    "isFilled": false,
    "isPathEnd": true
  },
  "point31": {
    "x": 58.046875,
    "y": 37.26132015306122,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "23:29:38:44",
    "to": {
      "x": 720,
      "y": 172
    }
  },
  "point32": {
    "x": 50.703125,
    "y": 37.65449617346939,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "19:27:33",
    "to": {
      "x": 640,
      "y": 196
    }
  },
  "point33": {
    "x": 49.453125,
    "y": 38.06010841836734,
    "isFilled": true,
    "isPathEnd": false,
    "to": {
      "x": 720,
      "y": 196
    }
  },
  "point34": {
    "x": 51.640625,
    "y": 38.26865433673469,
    "isFilled": true,
    "isPathEnd": false,
    "to": {
      "x": 640,
      "y": 196
    }
  },
  "point35": {
    "x": 53.515625,
    "y": 38.272480867346935,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "23:31:34:44",
    "to": {
      "x": 560,
      "y": 196
    }
  },
  "point36": {
    "x": 45.859375,
    "y": 39.277264030612244,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "17:33:43:41",
    "to": {
      "x": 560,
      "y": 196
    }
  },
  "point37": {
    "x": 47.03125,
    "y": 39.89190051020408,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "36:41",
    "to": {
      "x": 560,
      "y": 196
    }
  },
  "point38": {
    "x": 61.25,
    "y": 40.32908163265306,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "52",
    "to": {
      "x": 720,
      "y": 196
    }
  },
  "point39": {
    "x": 37.734375,
    "y": 40.68925382653061,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "4:47",
    "to": {
      "x": 560,
      "y": 196
    }
  },
  "point40": {
    "x": 0.078125,
    "y": 40.81648596938775,
    "isFilled": false,
    "isPathEnd": true
  },
  "point41": {
    "x": 46.171875,
    "y": 41.11463647959183,
    "isFilled": true,
    "isPathEnd": false,
    "to": {
      "x": 560,
      "y": 196
    }
  },
  "point42": {
    "x": 38.984375,
    "y": 41.30404974489796,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "43:71",
    "to": {
      "x": 560,
      "y": 196
    }
  },
  "point43": {
    "x": 39.21875,
    "y": 41.50860969387755,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 560,
      "y": 196
    }
  },
  "point44": {
    "x": 57.265625,
    "y": 41.54544005102041,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 720,
      "y": 196
    }
  },
  "point45": {
    "x": 38.59375,
    "y": 41.71141581632653,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 560,
      "y": 196
    }
  },
  "point46": {
    "x": 63.046875,
    "y": 42.37356505102041,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "38:54",
    "to": {
      "x": 720,
      "y": 196
    }
  },
  "point47": {
    "x": 39.453125,
    "y": 42.52949617346938,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "36:56:57:77",
    "to": {
      "x": 640,
      "y": 220
    }
  },
  "point48": {
    "x": 54.375,
    "y": 43.17219387755102,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "35",
    "to": {
      "x": 640,
      "y": 220
    }
  },
  "point49": {
    "x": 86.09375,
    "y": 43.44100765306122,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "16:22",
    "to": {
      "x": 720,
      "y": 220
    }
  },
  "point50": {
    "x": 43.984375,
    "y": 43.96731505102041,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "36:61",
    "to": {
      "x": 720,
      "y": 220
    }
  },
  "point51": {
    "x": 39.0625,
    "y": 44.161352040816325,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "45:47",
    "to": {
      "x": 560,
      "y": 220
    }
  },
  "point52": {
    "x": 61.015625,
    "y": 44.20615433673469,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "44:59",
    "to": {
      "x": 560,
      "y": 220
    }
  },
  "point53": {
    "x": 28.75,
    "y": 44.752551020408156,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "26:42:73",
    "to": {
      "x": 560,
      "y": 220
    }
  },
  "point54": {
    "x": 61.875,
    "y": 44.82015306122449,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "52:59:65",
    "to": {
      "x": 720,
      "y": 220
    }
  },
  "point55": {
    "x": 8.046875,
    "y": 45.118463010204074,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "30:40",
    "to": {
      "x": 560,
      "y": 220
    }
  },
  "point56": {
    "x": 41.5625,
    "y": 45.18686224489796,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "50:61:69",
    "to": {
      "x": 560,
      "y": 220
    }
  },
  "point57": {
    "x": 39.84375,
    "y": 46.20376275510204,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "51:62:66",
    "to": {
      "x": 560,
      "y": 220
    }
  },
  "point58": {
    "x": 24.0625,
    "y": 46.375637755102034,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "11:53:73",
    "to": {
      "x": 560,
      "y": 220
    }
  },
  "point59": {
    "x": 60.859375,
    "y": 46.65481505102041,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "75:96",
    "to": {
      "x": 720,
      "y": 220
    }
  },
  "point60": {
    "x": 56.171875,
    "y": 47.257493622448976,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "44:48",
    "to": {
      "x": 720,
      "y": 220
    }
  },
  "point61": {
    "x": 44.53125,
    "y": 47.64190051020408,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "74",
    "to": {
      "x": 560,
      "y": 244
    }
  },
  "point62": {
    "x": 40.546875,
    "y": 48.04193239795918,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "77",
    "to": {
      "x": 560,
      "y": 244
    }
  },
  "point63": {
    "x": 15.9375,
    "y": 48.808035714285715,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "55:58:82",
    "to": {
      "x": 640,
      "y": 244
    }
  },
  "point64": {
    "x": 78.125,
    "y": 49.139030612244895,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "18:49:76",
    "to": {
      "x": 720,
      "y": 244
    }
  },
  "point65": {
    "x": 68.125,
    "y": 49.32270408163265,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 720,
      "y": 244
    }
  },
  "point66": {
    "x": 40.15625,
    "y": 49.46970663265306,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "97",
    "to": {
      "x": 560,
      "y": 244
    }
  },
  "point67": {
    "x": 68.75,
    "y": 49.52806122448979,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "76",
    "to": {
      "x": 720,
      "y": 244
    }
  },
  "point68": {
    "x": 12.890625,
    "y": 50.02630739795918,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "55:63:78",
    "to": {
      "x": 560,
      "y": 244
    }
  },
  "point69": {
    "x": 42.96875,
    "y": 50.69993622448979,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "61:77:74",
    "to": {
      "x": 560,
      "y": 244
    }
  },
  "point70": {
    "x": 55.703125,
    "y": 51.33816964285714,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "48:60:75:94",
    "to": {
      "x": 720,
      "y": 244
    }
  },
  "point71": {
    "x": 42.734375,
    "y": 51.71986607142857,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 560,
      "y": 244
    }
  },
  "point72": {
    "x": 67.734375,
    "y": 51.77088647959184,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "65:67:84:86",
    "to": {
      "x": 720,
      "y": 244
    }
  },
  "point73": {
    "x": 30.234375,
    "y": 52.10251913265306,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "82:85",
    "to": {
      "x": 560,
      "y": 244
    }
  },
  "point74": {
    "x": 43.984375,
    "y": 52.53874362244898,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "83",
    "to": {
      "x": 560,
      "y": 268
    }
  },
  "point75": {
    "x": 57.265625,
    "y": 52.97401147959184,
    "isFilled": true,
    "isPathEnd": false,
    "to": {
      "x": 720,
      "y": 268
    }
  },
  "point76": {
    "x": 72.96875,
    "y": 53.00605867346938,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "84",
    "to": {
      "x": 720,
      "y": 268
    }
  },
  "point77": {
    "x": 42.8125,
    "y": 53.964923469387756,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "74",
    "to": {
      "x": 560,
      "y": 268
    }
  },
  "point78": {
    "x": 0.625,
    "y": 54.08290816326531,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 560,
      "y": 268
    }
  },
  "point79": {
    "x": 56.171875,
    "y": 54.40035076530612,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "60:70:75",
    "to": {
      "x": 720,
      "y": 268
    }
  },
  "point80": {
    "x": 75.78125,
    "y": 54.644451530612244,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "64:76:81",
    "to": {
      "x": 560,
      "y": 268
    }
  },
  "point81": {
    "x": 76.875,
    "y": 55.66709183673469,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "49:122",
    "to": {
      "x": 720,
      "y": 268
    }
  },
  "point82": {
    "x": 31.171875,
    "y": 56.79830994897959,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "89",
    "to": {
      "x": 560,
      "y": 268
    }
  },
  "point83": {
    "x": 43.4375,
    "y": 56.823341836734684,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "77:105",
    "to": {
      "x": 560,
      "y": 268
    }
  },
  "point84": {
    "x": 66.875,
    "y": 57.27933673469387,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "86",
    "to": {
      "x": 720,
      "y": 292
    }
  },
  "point85": {
    "x": 37.03125,
    "y": 58.44292091836734,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "66:91",
    "to": {
      "x": 560,
      "y": 292
    }
  },
  "point86": {
    "x": 64.921875,
    "y": 58.703922193877546,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 720,
      "y": 292
    }
  },
  "point87": {
    "x": 73.828125,
    "y": 59.53842474489795,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "80",
    "to": {
      "x": 720,
      "y": 292
    }
  },
  "point88": {
    "x": 43.359375,
    "y": 59.680325255102034,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "77:83:97",
    "to": {
      "x": 560,
      "y": 292
    }
  },
  "point89": {
    "x": 36.640625,
    "y": 59.87069515306122,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "85:91",
    "to": {
      "x": 560,
      "y": 292
    }
  },
  "point90": {
    "x": 42.578125,
    "y": 59.88281249999999,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "88",
    "to": {
      "x": 640,
      "y": 292
    }
  },
  "point91": {
    "x": 39.21875,
    "y": 61.100446428571416,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "90:95",
    "to": {
      "x": 560,
      "y": 292
    }
  },
  "point92": {
    "x": 72.65625,
    "y": 61.16868622448979,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "87:108",
    "to": {
      "x": 720,
      "y": 292
    }
  },
  "point93": {
    "x": 73.125,
    "y": 61.16964285714285,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "80:81:121",
    "to": {
      "x": 720,
      "y": 292
    }
  },
  "point94": {
    "x": 55.15625,
    "y": 61.745216836734684,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "79",
    "to": {
      "x": 720,
      "y": 292
    }
  },
  "point95": {
    "x": 41.015625,
    "y": 62.124521683673464,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "85",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point96": {
    "x": 59.84375,
    "y": 62.16294642857142,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "86:98",
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point97": {
    "x": 43.4375,
    "y": 63.149872448979586,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "95:105",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point98": {
    "x": 58.671875,
    "y": 63.180963010204074,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "94",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point99": {
    "x": 59.6875,
    "y": 63.59119897959184,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point100": {
    "x": 32.578125,
    "y": 63.73995535714285,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "82:91:109",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point101": {
    "x": 54.84375,
    "y": 63.785395408163254,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "94:102:115:125",
    "to": {
      "x": 640,
      "y": 316
    }
  },
  "point102": {
    "x": 57.578125,
    "y": 64.19913903061223,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "79:96:103",
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point103": {
    "x": 59.609375,
    "y": 64.40736607142857,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 640,
      "y": 316
    }
  },
  "point104": {
    "x": 43.75,
    "y": 64.57908163265306,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "95",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point105": {
    "x": 46.09375,
    "y": 64.58386479591836,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "113",
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point106": {
    "x": 62.421875,
    "y": 64.6171875,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "86:103:107:111",
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point107": {
    "x": 65.625,
    "y": 65.03188775510203,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "84:108:111",
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point108": {
    "x": 69.453125,
    "y": 65.2437818877551,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "110:118:93",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point109": {
    "x": 27.734375,
    "y": 65.36272321428571,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "112:116:68",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point110": {
    "x": 71.40625,
    "y": 65.65593112244898,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "87:114:120",
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point111": {
    "x": 65.46875,
    "y": 65.84789540816327,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point112": {
    "x": 26.71875,
    "y": 65.97289540816325,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "78:123",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point113": {
    "x": 46.71875,
    "y": 66.421875,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "119:131",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point114": {
    "x": 76.796875,
    "y": 66.48325892857143,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "93:121:128",
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point115": {
    "x": 52.421875,
    "y": 66.6375956632653,
    "isFilled": true,
    "isPathEnd": false,
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point116": {
    "x": 28.90625,
    "y": 66.79368622448979,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "112",
    "to": {
      "x": 560,
      "y": 316
    }
  },
  "point117": {
    "x": 53.984375,
    "y": 66.84486607142857,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "101:102:115",
    "to": {
      "x": 640,
      "y": 316
    }
  },
  "point118": {
    "x": 68.4375,
    "y": 66.87436224489795,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 720,
      "y": 316
    }
  },
  "point119": {
    "x": 47.890625,
    "y": 67.44467474489795,
    "isFilled": true,
    "isPathEnd": false,
    "to": {
      "x": 640,
      "y": 340
    }
  },
  "point120": {
    "x": 70.703125,
    "y": 67.6953125,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "111:128",
    "to": {
      "x": 560,
      "y": 340
    }
  },
  "point121": {
    "x": 91.796875,
    "y": 68.35060586734693,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "127",
    "to": {
      "x": 720,
      "y": 340
    }
  },
  "point122": {
    "x": 95.15625,
    "y": 68.56154336734694,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "121:126:127",
    "to": {
      "x": 560,
      "y": 340
    }
  },
  "point123": {
    "x": 19.296875,
    "y": 69.01897321428571,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "136:137",
    "to": {
      "x": 560,
      "y": 340
    }
  },
  "point124": {
    "x": 33.59375,
    "y": 69.04815051020408,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "89:100:116",
    "to": {
      "x": 560,
      "y": 340
    }
  },
  "point125": {
    "x": 51.875,
    "y": 69.08545918367346,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "119:117",
    "to": {
      "x": 640,
      "y": 340
    }
  },
  "point126": {
    "x": 99.84375,
    "y": 69.18335459183673,
    "isFilled": false,
    "isPathEnd": true
  },
  "point127": {
    "x": 97.5,
    "y": 70.60714285714286,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "130:134",
    "to": {
      "x": 720,
      "y": 340
    }
  },
  "point128": {
    "x": 80.3125,
    "y": 71.18431122448979,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "143:155",
    "to": {
      "x": 720,
      "y": 340
    }
  },
  "point129": {
    "x": 49.140625,
    "y": 71.32477678571428,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "115:117:119",
    "to": {
      "x": 640,
      "y": 340
    }
  },
  "point130": {
    "x": 99.84375,
    "y": 71.4282525510204,
    "isFilled": false,
    "isPathEnd": true
  },
  "point131": {
    "x": 45.390625,
    "y": 71.7252869897959,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "104:129:138:139",
    "to": {
      "x": 560,
      "y": 340
    }
  },
  "point132": {
    "x": 59.140625,
    "y": 71.95742984693877,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "103:106:144",
    "to": {
      "x": 720,
      "y": 364
    }
  },
  "point133": {
    "x": 64.53125,
    "y": 72.17251275510203,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "111:118",
    "to": {
      "x": 720,
      "y": 364
    }
  },
  "point134": {
    "x": 99.84375,
    "y": 72.24457908163265,
    "isFilled": false,
    "isPathEnd": true
  },
  "point135": {
    "x": 34.21875,
    "y": 72.31473214285714,
    "isFilled": false,
    "isPathEnd": false,
    "connected": "116:124:142",
    "to": {
      "x": 560,
      "y": 364
    }
  },
  "point136": {
    "x": 6.640625,
    "y": 73.4829400510204,
    "isFilled": false,
    "isPathEnd": false,
    "to": {
      "x": 560,
      "y": 364
    }
  },
  "point137": {
    "x": 0.15625,
    "y": 75.3064413265306,
    "isFilled": false,
    "isPathEnd": true
  },
  "point138": {
    "x": 46.25,
    "y": 75.60459183673468,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "132:147",
    "to": {
      "x": 560,
      "y": 364
    }
  },
  "point139": {
    "x": 44.375,
    "y": 76.00892857142857,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "138:145",
    "to": {
      "x": 560,
      "y": 364
    }
  },
  "point140": {
    "x": 39.0625,
    "y": 77.63073979591836,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "135:139:142:145",
    "to": {
      "x": 560,
      "y": 388
    }
  },
  "point141": {
    "x": 99.84375,
    "y": 78.57110969387755,
    "isFilled": false,
    "isPathEnd": true
  },
  "point142": {
    "x": 35.46875,
    "y": 78.6438137755102,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "148",
    "to": {
      "x": 560,
      "y": 484
    }
  },
  "point143": {
    "x": 99.84375,
    "y": 78.77519132653062,
    "isFilled": false,
    "isPathEnd": true
  },
  "point144": {
    "x": 58.671875,
    "y": 79.71157525510203,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "133:150",
    "to": {
      "x": 720,
      "y": 388
    }
  },
  "point145": {
    "x": 43.046875,
    "y": 81.7205038265306,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "147",
    "to": {
      "x": 560,
      "y": 412
    }
  },
  "point146": {
    "x": 53.515625,
    "y": 87.25207270408163,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "132:144",
    "to": {
      "x": 640,
      "y": 436
    }
  },
  "point147": {
    "x": 49.140625,
    "y": 88.0594706632653,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "160:162",
    "to": {
      "x": 640,
      "y": 436
    }
  },
  "point148": {
    "x": 0.15625,
    "y": 88.77582908163264,
    "isFilled": false,
    "isPathEnd": true
  },
  "point149": {
    "x": 61.875,
    "y": 89.10586734693877,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "120:133:162",
    "to": {
      "x": 720,
      "y": 436
    }
  },
  "point150": {
    "x": 57.96875,
    "y": 93.17952806122447,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "161",
    "to": {
      "x": 720,
      "y": 460
    }
  },
  "point151": {
    "x": 48.59375,
    "y": 93.56855867346938,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "146:158",
    "to": {
      "x": 640,
      "y": 460
    }
  },
  "point152": {
    "x": 50.703125,
    "y": 94.59327168367346,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "146:159",
    "to": {
      "x": 720,
      "y": 460
    }
  },
  "point153": {
    "x": 39.375,
    "y": 97.42729591836735,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "142:145:156:157",
    "to": {
      "x": 560,
      "y": 484
    }
  },
  "point154": {
    "x": 58.359375,
    "y": 97.67012117346938,
    "isFilled": true,
    "isPathEnd": false,
    "connected": "149:161",
    "to": {
      "x": 720,
      "y": 484
    }
  },
  "point155": {
    "x": 99.84375,
    "y": 99.59151785714286,
    "isFilled": false,
    "isPathEnd": true
  },
  "point156": {
    "x": 39.84375,
    "y": 99.67315051020408,
    "isFilled": false,
    "isPathEnd": true
  },
  "point157": {
    "x": 38.90625,
    "y": 99.87531887755102,
    "isFilled": false,
    "isPathEnd": true
  },
  "point158": {
    "x": 43.671875,
    "y": 99.88504464285714,
    "isFilled": false,
    "isPathEnd": true
  },
  "point159": {
    "x": 49.921875,
    "y": 100.09917091836734,
    "isFilled": false,
    "isPathEnd": true
  },
  "point160": {
    "x": 52.03125,
    "y": 100.10618622448979,
    "isFilled": false,
    "isPathEnd": true
  },
  "point161": {
    "x": 57.5,
    "y": 100.1173469387755,
    "isFilled": false,
    "isPathEnd": true
  },
  "point162": {
    "x": 60.46875,
    "y": 100.32748724489795,
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
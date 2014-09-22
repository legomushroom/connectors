(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Connectors, Point;

require('./polyfills');

Point = (function() {
  function Point(o) {
    this.o = o != null ? o : {};
    this.vars();
  }

  Point.prototype.vars = function() {
    this.x = this.o.position.x;
    this.y = this.o.position.y;
    this.name = this.o.name;
    return this.connected = this.o.connected;
  };

  return Point;

})();

Connectors = (function() {
  function Connectors(o) {
    this.o = o != null ? o : {};
    this.vars();
    this.setPoints();
    this.draw();
  }

  Connectors.prototype.vars = function() {
    this.canvas = document.querySelector('#js-canvas');
    return this.ctx = this.canvas.getContext('2d');
  };

  Connectors.prototype.setPoints = function() {
    var point1, point2, point3;
    this.points = {};
    point1 = new Point({
      position: {
        x: 200,
        y: 200
      },
      name: 'point1',
      connected: 'point3'
    });
    point2 = new Point({
      position: {
        x: 300,
        y: 300
      },
      name: 'point2',
      connected: 'point3'
    });
    point3 = new Point({
      position: {
        x: 100,
        y: 260
      },
      name: 'point3'
    });
    this.points[point1.name] = point1;
    this.points[point2.name] = point2;
    return this.points[point3.name] = point3;
  };

  Connectors.prototype.draw = function() {
    var point, pointName, to, _ref;
    this.ctx.clear();
    _ref = this.points;
    for (pointName in _ref) {
      point = _ref[pointName];
      this.ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI, false);
      if (point.connected) {
        this.ctx.moveTo(point.x, point.y);
        to = this.points[point.connected];
        this.ctx.lineTo(to.x, to.y);
      }
    }
    return this.ctx.stroke();
  };

  return Connectors;

})();

new Connectors;



},{"./polyfills":2}],2:[function(require,module,exports){
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



},{}]},{},[1])
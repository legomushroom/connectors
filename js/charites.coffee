require './polyfills'
# h      = require './helpers'
# Bubble = require './bits/Bubble'
# Burst  = require './bits/Burst'
# Pather = require './pather/pather'


class Point
  constructor:(@o={})->
    @vars()
  vars:->
    @x = @o.position.x
    @y = @o.position.y
    @name = @o.name
    @connected = @o.connected

class Connectors
  constructor:(@o={})->
    @vars()
    @setPoints()
    @draw()

  vars:->
    @canvas = document.querySelector '#js-canvas'
    @ctx = @canvas.getContext('2d')

  setPoints:->
    @points = {}
  
    point1 = new Point
      position: x: 200, y: 200
      name: 'point1'
      connected: 'point3'
    point2 = new Point
      position: x: 300, y: 300
      name: 'point2'
      connected: 'point3'
    point3 = new Point
      position: x: 100, y: 260
      name: 'point3'

    @points[point1.name] = point1
    @points[point2.name] = point2
    @points[point3.name] = point3

  draw:->
    @ctx.clear()

    for pointName, point of @points
      @ctx.arc(point.x, point.y, 2, 0, 2*Math.PI, false)
      if point.connected
        @ctx.moveTo point.x, point.y
        to = @points[point.connected]
        @ctx.lineTo to.x, to.y

    @ctx.stroke()




new Connectors
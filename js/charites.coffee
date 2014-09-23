require './polyfills'
h      = require './helpers'
TWEEN  = require './vendor/tween'
points = require './points'
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
    @isFilled = @o.isFilled
    @isPathEnd = @o.isPathEnd
    # delete @o

class Connectors
  constructor:(@o={})->
    @vars()
    # @addTo()
    @draw()
    setTimeout =>
      @run()
    , 1400

  vars:->
    @canvas = document.querySelector '#js-canvas'
    @ctx = @canvas.getContext('2d')
    @width  = parseInt(@canvas.getAttribute('width'), 10)
    @height = parseInt(@canvas.getAttribute('height'), 10)
    @blue   = '#0387A2'
    @points = points
  
  draw:->
    @ctx.clear()

    # circle
    @ctx.beginPath()
    @ctx.arc(@width/2, @height/2 + 10, 75, 0, 2*Math.PI, false)
    @ctx.lineWidth = 6
    @ctx.strokeStyle = '#75bbc9'
    @ctx.stroke()
    @ctx.lineWidth = 1

    # footer
    # @ctx.beginPath()
    # height = 125
    # @ctx.rect(0, @height-height, @width, 125)
    # @ctx.fillStyle = 'black'
    # @ctx.fill()
    # @ctx.globalCompositeOperation = 'or'

    for pointName, point of @points
      if point.connected
        points = point.connected.split ':'
        for p, i in points
          @ctx.beginPath()
          to = @points["point#{p}"]
          @ctx.moveTo point.x, point.y
          @ctx.lineTo to.x, to.y
          toX = if to.isPathEnd then to.x else to.to?.x
          if Math.abs(point.to?.x-toX) < 50 then @ctx.lineWidth = 1
          else @ctx.lineWidth = 1 - ((1-.3)*point.p)
          if pointName is 'point19'
            @ctx.lineWidth = point.p or .01

          @ctx.strokeStyle = @blue
          @ctx.stroke()

      if !point.isPathEnd
        @ctx.beginPath()
        @ctx.arc(point.x, point.y, 3, 0, 2*Math.PI, false)
        @ctx.strokeStyle = @blue
        @ctx.lineWidth = 1
        @ctx.stroke()
        @ctx.fillStyle = if point.isFilled then @blue else '#fff'
        @ctx.fill()

      # @ctx.fillStyle = 'rgba(0,0,0,1)'
      # @ctx.font = '10px Arial'
      # @ctx.fillText pointName.replace('point', ''), point.x, point.y


  # addTo:->
  #   xs = {}; ys = {}
  #   start = 580; end = 820; delta = end - start; cnt = 3; step = delta/cnt
  #   for i in [0...cnt]
  #     xs[i] = start+ step*i

  #   start = 100; end = 580; delta = end - start; cnt = 20; step = delta/cnt
  #   for i in [0...cnt]
  #     ys[i] = start+ step*i

  #   for pointName, point of @points
  #     if !point.isPathEnd
  #       min = 9999
  #       for i, x of xs
  #         if Math.abs(point.x-x) < min
  #           min = Math.abs(point.x-x)
  #           minPoint = x
  #       min = 9999
  #       for i, y of ys
  #         if Math.abs(point.y-y) < min
  #           min = Math.abs(point.y-y)
  #           minPointY = y

  #       if pointName is 'point19'
  #         x = minPoint
  #         y = minPointY
  #       else
  #         x = if h.rand(0,4) is 0 then xs[h.rand(0,3)] else  minPoint
  #         y = if h.rand(0,30) is 0 then ys[h.rand(0,18)] else minPointY

  #       if !x? then x = minPoint
  #       point.to =
  #         x: x - 20
  #         y: y

  #   console.log JSON.stringify @points

  run:->
    it = @
    tween = new TWEEN.Tween({p:0}).to({p:1}, 5000)
      .onUpdate ->
        for pointName, point of it.points
          if !point.to then continue
          point.xBuff ?= point.x
          point.yBuff ?= point.y
          point.x = point.xBuff + (point.to.x - point.xBuff)*@p
          point.y = point.yBuff + (point.to.y - point.yBuff)*@p
          point.p = @p
        it.draw()
      .start()
    h.startAnimationLoop()

    
new Connectors
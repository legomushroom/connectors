require './polyfills'
h      = require './helpers'
TWEEN  = require './vendor/tween'
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
    @to = @o.to
    @isFilled = @o.isFilled

class Connectors
  constructor:(@o={})->
    @vars()
    # @setPoints()
    # @draw()
    # @run()

  vars:->
    @canvas = document.querySelector '#js-canvas'
    @ctx = @canvas.getContext('2d')
    @width  = 1280
    @height = 900
    @blue   = '#0387A2'
    @img = document.querySelector '#js-img'
    # console.log @img.height
    @img.onload = =>
      @ctx.drawImage @img, 0, 0
      data = @ctx.getImageData(0,0,@width,@height)
      @analyzeData(data)

  analyzeData:(data)->
    @points = {}
    data = data.data
    cnt = 0
    for px, i in data by 4
      isRed   = (data[i] is 255) and (data[i+1] is 0) and (data[i+2] is 0)
      isGreen = (data[i] is 0) and (data[i+1] is 255) and (data[i+2] is 0)
      # console.log isRed
      if isRed
        name = "point#{cnt++}"
        @points[name] = new Point
          position: x: (i/4)%1280, y: i/(1280*4)
          isFilled: true
          # console.log i % (@img.width)
        #   name: name
    @draw()

    # console.log data

  setPoints:->
    @points = {}

    @xs = {}; @ys = {}
    @sizesCnt = 10; wStep = @width/@sizesCnt; hStep = @height/@sizesCnt
    for i in [0..@sizesCnt]
      @xs["#{i}"] = i*wStep
      @ys["#{i}"] = i*hStep

    cnt = 90
    for i in [0..cnt]
      name = "point#{i}"
      connected = ''
      # if h.rand(0, 10) is 0
      # connected = ''
      for i in [0..h.rand(0,1)]
        pre = if i is 0 then '' else ':'
        connected += "#{pre}point#{h.rand(0, cnt)}"
        # connected = ":point#{h.rand(0, cnt)}"
      # connected = null
      @points[name] = new Point
        position: x:h.rand(0, @width), y: h.rand(0, @height)
        name: name
        connected: connected
        to: x: @xs[h.rand(0,@sizesCnt)], y: @ys[h.rand(0,@sizesCnt)]
  
  draw:->
    @ctx.clear()


    for pointName, point of @points
      @ctx.beginPath()

      # if point.connected
      #   points = point.connected.split ':'
      #   for p, i in points
      #     @ctx.moveTo point.x, point.y
      #     to = @points[p]
      #     @ctx.lineTo to.x, to.y

      #   @ctx.strokeStyle = @blue
      #   @ctx.stroke()

      @ctx.beginPath()
      @ctx.arc(point.x, point.y, 3, 0, 2*Math.PI, false)
      console.log point.x, point.y

      if point.isFilled
        @ctx.fillStyle = @blue
      else @ctx.fillStyle = '#fff'
      @ctx.fill()
      @ctx.strokeStyle = @blue
      @ctx.stroke()
      


  run:->
    it = @
    tween = new TWEEN.Tween({p:0}).to({p:1}, 5000)
      .onUpdate ->
        for pointName, point of it.points
          point.xBuff ?= point.x
          point.yBuff ?= point.y
          point.x = point.xBuff + (point.to.x - point.xBuff)*@p
          point.y = point.yBuff + (point.to.y - point.yBuff)*@p
        it.draw()
      .start()
    h.startAnimationLoop()

    




new Connectors
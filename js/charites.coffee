require './polyfills'
h      = require './helpers'
TWEEN  = require './vendor/tween'
points = require './points'
console.log points
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
    delete @o

class Connectors
  constructor:(@o={})->
    @vars()
    # @draw()
    @addTo()
    @run()

  vars:->
    @canvas = document.querySelector '#js-canvas'
    @ctx = @canvas.getContext('2d')
    @width  = 1280
    @height = 900
    @blue   = '#0387A2'
    @points = points
  
  draw:->
    @ctx.clear()

    for pointName, point of @points
      @ctx.beginPath()

      if point.connected
        points = point.connected.split ':'
        for p, i in points
          @ctx.beginPath()
          @ctx.moveTo point.x, point.y
          to = @points["point#{p}"]
          @ctx.lineTo to.x, to.y

          toX = if to.isPathEnd then to.x else to.to?.x
          if Math.abs(point.to?.x-toX) < 50
            @ctx.lineWidth = 1
          else @ctx.lineWidth = 1 - ((1-.25)*point.p)
          @ctx.strokeStyle = @blue
          @ctx.stroke()

      @ctx.beginPath()

      if !point.isPathEnd
        @ctx.arc(point.x, point.y, 3, 0, 2*Math.PI, false)
        @ctx.fillStyle = if point.isFilled then @blue
        else @ctx.fillStyle = '#fff'
        @ctx.fill()
        @ctx.strokeStyle = @blue
        @ctx.lineWidth = 1
        @ctx.stroke()

  addTo:->
    xs = {}; ys = {}
    start = 500; end = 800; delta = end - start; cnt = 5; step = delta/cnt
    for i in [0..cnt]
      xs[i] = start+ step*i

    start = 100; end = 700; delta = end - start; cnt = 20; step = delta/cnt
    for i in [0..cnt]
      ys[i] = start+ step*i

    for pointName, point of @points
      if !point.isPathEnd
        min = 9999
        for i, x of xs
          if Math.abs(point.x-x) < min
            min = Math.abs(point.x-x)
            minPoint = x
        min = 9999
        for i, y of ys
          if Math.abs(point.y-y) < min
            min = Math.abs(point.y-y)
            minPointY = y
        point.to =
          x: minPoint
          y: minPointY

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



# require './polyfills'
# h      = require './helpers'
# TWEEN  = require './vendor/tween'
# points = require './points'
# console.log points
# # Bubble = require './bits/Bubble'
# # Burst  = require './bits/Burst'
# # Pather = require './pather/pather'


# class Point
#   constructor:(@o={})->
#     @vars()
#   vars:->
#     @x = @o.position.x
#     @y = @o.position.y
#     @name = @o.name
#     @connected = @o.connected
#     @to = {x: 200, y: 100}
#     @isFilled = @o.isFilled
#     @isPathEnd = @o.isPathEnd
#     delete @o

# class Connectors
#   constructor:(@o={})->
#     @vars()
#     # @setPoints()
#     @draw()
#     @run()

#   vars:->
#     @canvas = document.querySelector '#js-canvas'
#     @ctx = @canvas.getContext('2d')
#     @width  = 1280
#     @height = 900
#     @blue   = '#0387A2'
#     @points = points
#     # @points = {}
#     # @img = document.querySelector '#js-img'
#     # @img.onload = =>
#     #   @ctx.drawImage @img, 0, 0
#     #   data = @ctx.getImageData(0,0,@width,@height)
#     #   @analyzeData(data)

#   # analyzeData:(data)->
#   #   @points = points
#   #   data = data.data
#   #   cnt = 0
#   #   for px, i in data by 4
#   #     isRed   = (data[i] is 255) and (data[i+1] is 0) and (data[i+2] is 0)
#   #     isGreen = (data[i] is 0) and (data[i+1] is 255) and (data[i+2] is 0)
#   #     isBlue = (data[i] is 0) and (data[i+1] is 0) and (data[i+2] is 255)
#   #     # console.log isRed
#   #     if isRed or isGreen or isBlue
#   #       name = "point#{cnt++}"
#   #       # connected = ''
#   #       # for j in [0..h.rand(0,1)]
#   #       #   pre = if j is 0 then '' else ':'
#   #       #   connected += "#{pre}point#{h.rand(0, 2)}"
#   #       @points[name] = new Point
#   #         position: x: (i/4)%1280, y: i/(1280*4)
#   #         isFilled: isRed
#   #         isPathEnd: isBlue
#   #         # connected: connected
#   #         # console.log i % (@img.width)
#   #       #   name: name
#   #   @draw()
#   #   console.log JSON.stringify @points
  
#   draw:->
#     @ctx.clear()

#     for pointName, point of @points
#       @ctx.beginPath()

#       if point.connected
#         points = point.connected.split ':'
#         for p, i in points
#           @ctx.moveTo point.x, point.y
#           to = @points["point#{p}"]
#           @ctx.lineTo to.x, to.y

#         # @ctx.lineWidth = .5
#         @ctx.strokeStyle = @blue
#         @ctx.stroke()

#       @ctx.beginPath()
#       # if !point.connected

#       if !point.isPathEnd
#         @ctx.arc(point.x, point.y, 3, 0, 2*Math.PI, false)
#         @ctx.fillStyle = if point.isFilled then @blue
#         else @ctx.fillStyle = '#fff'
#         @ctx.fill()
#         @ctx.strokeStyle = @blue
#         @ctx.stroke()

#       # @ctx.fillStyle = 'rgba(0,0,0,1)'
#       # @ctx.font = '10px Arial'
#       # @ctx.fillText pointName.replace('point', ''), point.x-15, point.y-2


#   run:->
#     it = @
#     tween = new TWEEN.Tween({p:0}).to({p:1}, 5000)
#       .onUpdate ->
#         for pointName, point of it.points
#           point.xBuff ?= point.x
#           point.yBuff ?= point.y
#           point.x = point.xBuff + (point.to.x - point.xBuff)*@p
#           point.y = point.yBuff + (point.to.y - point.yBuff)*@p
#         it.draw()
#       .start()
#     h.startAnimationLoop()

    




# new Connectors
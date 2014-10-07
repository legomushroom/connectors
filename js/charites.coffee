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
    # @restructPoints()
    # @addTo()
    @draw()
    # setTimeout =>
    #   @run()
    # , 1400

  vars:->
    @canvas = document.querySelector '#js-canvas'
    @ctx = @canvas.getContext('2d')
    @width  = parseInt(@canvas.getAttribute('width'), 10)
    @height = parseInt(@canvas.getAttribute('height'), 10)
    @pw = @width/100
    @ph = @height/100
    @blue   = '#0387A2'
    @points = points
    # @img = document.querySelector '#js-img'
    # @img.onload = =>
    #   @ctx.drawImage @img, 0, 0
    #   data = @ctx.getImageData(0,0,@width,@height)
    #   console.log @analyzeData(data)
  
  restructPoints:()->
    for pointName, point of @points
      point.x = point.x/@pw
      point.y = point.y/@ph

    console.log JSON.stringify points

  draw:->
    @ctx.clear()

    # circle
    @ctx.beginPath()
    @ctx.arc(@width/2, @height/2 + 10, 75, 0, 2*Math.PI, false)
    @ctx.lineWidth = 6
    @ctx.strokeStyle = '#75bbc9'
    @ctx.stroke()
    @ctx.lineWidth = 1

  
    for pointName, point of @points
      if point.connected
        points = point.connected.split ':'
        for p, i in points
          @ctx.beginPath()
          to = @points["point#{p}"]
          @ctx.moveTo point.x*@pw, point.y*@ph
          @ctx.lineTo to.x*@pw, to.y*@ph
          toX = if to.isPathEnd then to.x*@pw else to.to?.x*@pw
          if Math.abs(point.to?.x*@pw-toX*@pw) < 50 then @ctx.lineWidth = 1
          else @ctx.lineWidth = 1 - ((1-.3)*point.p)
          if pointName is 'point19'
            @ctx.lineWidth = point.p or .01

          @ctx.strokeStyle = @blue
          @ctx.stroke()

      if !point.isPathEnd
        @ctx.beginPath()
        @ctx.arc(point.x*@pw, point.y*@ph, 3, 0, 2*Math.PI, false)
        @ctx.strokeStyle = @blue
        @ctx.lineWidth = 1
        @ctx.stroke()
        @ctx.fillStyle = if point.isFilled then @blue else '#fff'
        @ctx.fill()

  # analyzeData:(data)->
  #   @points = points
  #   data = data.data
  #   cnt = 0
  #   for px, i in data by 4
  #     isRed   = (data[i] is 255) and (data[i+1] is 0) and (data[i+2] is 0)
  #     isGreen = (data[i] is 0) and (data[i+1] is 255) and (data[i+2] is 0)
  #     isBlue = (data[i] is 0) and (data[i+1] is 0) and (data[i+2] is 255)
  #     # console.log isRed
  #     if isRed or isGreen or isBlue
  #       name = "point#{cnt++}"
  #       # connected = ''
  #       # for j in [0..h.rand(0,1)]
  #       #   pre = if j is 0 then '' else ':'
  #       #   connected += "#{pre}point#{h.rand(0, 2)}"
  #       @points[name] = new Point
  #         position: x: (i/4)%1280, y: i/(1280*4)
  #         isFilled: isRed
  #         isPathEnd: isBlue
  #         # connected: connected
  #         # console.log i % (@img.width)
  #       #   name: name
  #   @draw()
  #   console.log JSON.stringify @points

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

  # run:->
  #   it = @
  #   tween = new TWEEN.Tween({p:0}).to({p:1}, 5000)
  #     .onUpdate ->
  #       for pointName, point of it.points
  #         if !point.to then continue
  #         point.xBuff ?= point.x
  #         point.yBuff ?= point.y
  #         point.x = point.xBuff + (point.to.x - point.xBuff)*@p
  #         point.y = point.yBuff + (point.to.y - point.yBuff)*@p
  #         point.p = @p
  #       it.draw()
  #     .start()
  #   h.startAnimationLoop()

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




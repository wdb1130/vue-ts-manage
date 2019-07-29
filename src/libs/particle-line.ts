const minWidth = 1200
const minHeight = 700

class Color {
  min: number
  r: number
  g: number
  b: number
  style: string

  constructor (min:number) {
    this.min = min || 0
    this.r = this.colorValue(min)
    this.g = this.colorValue(min)
    this.b = this.colorValue(min)
    this.style = this.createColorStyle(this.r, this.g, this.b)
  }

  colorValue (min:number):number {
    return Math.floor(Math.random() * 255 + min)
  }

  createColorStyle (r:number, g:number, b:number):string {
    return `rgba(${r}, ${g}, ${b}, .8)`
  }
}

class Dot {
  ctx:any
  x:number
  y:number
  vx:number = -0.5 + Math.random()
  vy:number = -0.5 + Math.random()
  radius:number = Math.random() * 3
  color:any = Math.random() * 3

  constructor (ctx:any, canvasWidth:number, canvasHeight:number, x?:number, y?:number) {
    this.ctx = ctx
    this.x = x || Math.random() * canvasWidth
    this.y = y || Math.random() * canvasHeight
  }

  draw ():void {
    this.ctx.beginPath()
    this.ctx.fillStyle = this.color.style
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    this.ctx.fill()
  }
}

export default class ParticleLine {
  tagId:any
  options:any
  dots:any
  canvas:any
  ctx:any
  color:any

  constructor (tagId:any, options:any) {
    this.tagId = tagId
    this.options = options
    this.init()
  }

  init () {
    const canvas = document.querySelector(this.tagId)
    const ctx = canvas.getContext('2d')
    canvas.width = document.body.clientWidth > minWidth ? document.body.clientWidth : minWidth
    canvas.height = document.body.clientHeight > minHeight ? document.body.clientHeight : minHeight
    ctx.lineWidth = (this.options && this.options.lineWidth) || 0.3
    ctx.strokeStyle = (new Color(150)).style
    this.dots = {
      nb: (this.options && this.options.dotsNumber) || 100,
      distance: (this.options && this.options.dotsDistance) || 100,
      array: []
    }
    this.canvas = canvas
    this.ctx = ctx
    this.color = new Color(0)
    this.createDots(this.ctx, this.canvas.width, this.canvas.height)
    this.animateDots()
    this.hoverEffect()
  }

  hoverEffect () {
    if (this.options && this.options.hoverEffect) {
      this.canvas.addEventListener('mousemove', (e:any) => {
        if (this.dots.array.length > this.dots.nb) {
          this.dots.array.pop()
        }
        this.dots.array.push(new Dot(this.ctx, this.canvas.width, this.canvas.height, e.pageX, e.pageY))
      })
    }
  }

  resize () {
    const width = document.body.clientWidth > minWidth ? document.body.clientWidth : minWidth
    const height = document.body.clientHeight > minHeight ? document.body.clientHeight : minHeight
    this.canvas.width = width
    this.canvas.height = height
    this.createDots(this.ctx, width, height)
  }

  mixComponents (comp1:number, weight1:number, comp2:number, weight2:number) {
    return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2)
  }

  averageColorStyles (dot1:any, dot2:any) {
    const color1 = dot1.color
    const color2 = dot2.color
    const r = this.mixComponents(color1.r, dot1.radius, color2.r, dot2.radius)
    const g = this.mixComponents(color1.g, dot1.radius, color2.g, dot2.radius)
    const b = this.mixComponents(color1.b, dot1.radius, color2.b, dot2.radius)
    return this.color.createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b))
  }

  createDots (ctx:any, canvasWidth:number, canvasHeight:number) {
    this.dots.array = []
    for (let i = 0; i < this.dots.nb; i++) {
      this.dots.array.push(new Dot(ctx, canvasWidth, canvasHeight))
    }
  }

  moveDots () {
    for (let i = 0; i < this.dots.nb; i++) {
      const dot = this.dots.array[i]
      if (dot.y < 0 || dot.y > this.canvas.height) {
        dot.vx = dot.vx // eslint-disable-line
        dot.vy = -dot.vy
      } else if (dot.x < 0 || dot.x > this.canvas.width) {
        dot.vx = -dot.vx
        dot.vy = dot.vy // eslint-disable-line
      }
      dot.x += dot.vx
      dot.y += dot.vy
    }
  }

  connectDots () {
    for (let i = 0; i < this.dots.array.length; i++) {
      for (let j = 0; j < this.dots.array.length; j++) {
        const iDot = this.dots.array[i]
        const jDot = this.dots.array[j]
        if ((iDot.x - jDot.x) < this.dots.distance && (iDot.y - jDot.y) < this.dots.distance && (iDot.x - jDot.x) > -this.dots.distance && (iDot.y - jDot.y) > -this.dots.distance) {
          this.ctx.beginPath()
          this.ctx.strokeStyle = this.averageColorStyles(iDot, jDot)
          this.ctx.moveTo(iDot.x, iDot.y)
          this.ctx.lineTo(jDot.x, jDot.y)
          this.ctx.stroke()
          this.ctx.closePath()
        }
      }
    }
  }

  drawDots () {
    for (let i = 0; i < this.dots.array.length; i++) {
      const dot = this.dots.array[i]
      dot.draw()
    }
  }

  animateDots () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawDots()
    this.connectDots()
    this.moveDots()
    requestAnimationFrame(this.animateDots.bind(this))
  }
}

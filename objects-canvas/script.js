const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')

function randInt (max) {
  return Math.floor(Math.random() * max)
}

function randColor () {
  return `rgb(${randInt(255)}, ${randInt(255)}, ${randInt(255)})`
}

class Drawing {
  constructor (canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.context = this.canvas.getContext('2d')
    this.points = []
  }

  setup () {
    context.fillStyle = 'black'
    context.fillRect(0, 0, 500, 500)

    for (let i = 0; i < 100; i++) {
      this.points.push(new Point(randInt(500), randInt(500), randInt(5) + 1, randColor()))
    }
  }

  draw () {
    for (const point of this.points) {
      point.draw(this.context)
    }
  }

  update () {
    for (const point of this.points) {
      point.move()
    }
  }
}

class Point {
  constructor (x, y, size, color) {
    this.x = x
    this.y = y
    this.size = size
    this.color = color
  }

  draw (context) {
    const oldFillStyle = context.fillStyle
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, this.size, this.size)
    context.fillStyle = oldFillStyle
  }

  move () {
    this.x = this.x + randInt(7) - 3
    this.y = this.y + randInt(7) - 3
  }
}

const drawing = new Drawing('canvas')
drawing.setup()
drawing.draw()

function updateAndDraw () {
  drawing.update()
  drawing.draw()
  requestAnimationFrame(updateAndDraw)
}

updateAndDraw()

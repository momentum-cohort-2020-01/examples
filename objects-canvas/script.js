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
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.branch = null
  }

  setup () {
    this.clear()

    for (let i = 0; i < 100; i++) {
      this.points.push(new Point(randInt(500), randInt(500), randInt(5) + 1, randColor()))
    }

    this.branch = new Branch(this.width / 2, this.height, 0, -2)
  }

  clear () {
    this.context.fillStyle = 'black'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  draw () {
    // for (const point of this.points) {
    //   point.draw(this.context)
    // }

    this.context.strokeStyle = 'white'
    this.branch.draw(this.context)
  }

  update () {
    // for (const point of this.points) {
    //   point.move()
    // }

    this.branch.update()
  }
}

class Branch {
  constructor (x, y, deltaX, deltaY) {
    this.x = x
    this.y = y
    this.deltaX = deltaX
    this.deltaY = deltaY
    this.branches = []
    this.done = false
    this.lastX = x
    this.lastY = y
    this.color = randColor()
  }

  draw (context) {
    if (this.done) {
      return
    }

    if (this.branches.length) {
      for (const branch of this.branches) {
        branch.draw(context)
      }
    } else {
      context.beginPath()
      context.strokeStyle = this.color
      context.moveTo(this.lastX, this.lastY)
      context.lineTo(this.x, this.y)
      context.closePath()
      context.stroke()
    }
  }

  update () {
    if (this.done) {
      return
    }

    if (this.x < 0 || this.y < 0 || this.x > 500 || this.y > 500) {
      this.done = true
    }

    if (this.branches.length) {
      for (const branch of this.branches) {
        branch.update()
      }
    } else {
      this.lastX = this.x
      this.lastY = this.y
      this.x += this.deltaX
      this.y += this.deltaY
      this.updateDeltas()

      if (Math.random() < 0.03) {
        this.branchOut()
      }
    }
  }

  branchOut () {
    this.branches.push(new Branch(this.lastX, this.lastY, this.deltaX, this.deltaY))
    this.branches.push(new Branch(this.lastX, this.lastY, this.deltaX, this.deltaY))

    for (const branch of this.branches) {
      branch.updateDeltas()
    }
  }

  updateDeltas () {
    this.deltaX += Math.random() * 2 - 1
    if (this.deltaY > 0) {
      this.deltaY = Math.max(0.1, this.deltaY + Math.random() * 2 - 1)
    } else {
      this.deltaY = Math.min(-0.1, this.deltaY - Math.random() * 2 + 1)
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

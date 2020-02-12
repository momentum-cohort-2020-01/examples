class Game {
  constructor () {
    // these are local variables that I intend to use only inside this class itself
    const canvas = document.querySelector('#game-board')
    const screen = canvas.getContext('2d')
    const gameSize = { x: canvas.width, y: canvas.height }

    // The following are properties of a game object
    // `this` in this context refers to the game instance itself
    // This is so any game instance created from this class will have these properties
    this.score = 0 // this lets me say `game.score` (where game is an instance of Game) and get back this value
    this.player = new Player(this, gameSize) // this lets me say game.player and get back this value

    // Now I'm calling the method (that is defined below on line 21) that will draw the rectangle.
    // I'm calling it here in the constructor method
    // because I want it to happen immediately as soon as the game is created
    this.drawPlayer(screen, gameSize)
  }

  // This is a modified version of the `draw()` method from the example space-invaders code
  // It will only draw a player on the screen instead of looping over an array of bodies
  // The only thing it does is to put it on the screen to start
  // (small functions that do one thing are good!)
  drawPlayer (screen, gameSize) {
    // it's often helpful to have a console.log at the top of a method just to confirm when it's getting called
    console.log('draw method called')

    // let's draw one single player!
    // We need to refer to the Canvas API docs
    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

    // First I'm going to tell the rendering context (that's the object held in the screen variable)
    // what color I want it to be. It needs to know this before it draws the rectangle.
    screen.fillStyle = "#07BEB8"
    // `fillRect` takes 4 values (I know this from the MDN docs)
    // These values tell the shape we're going to draw where it should show up and how big it is
    let startingXPosition = this.player.center.x - this.player.size.x / 2
    let startingYPosition = this.player.center.y - this.player.size.y / 2
    let gamePlayerWidth = this.player.size.x
    let gamePlayerHeight = this.player.size.y

    screen.fillRect(startingXPosition, startingYPosition, gamePlayerWidth, gamePlayerHeight)
  }
}

// this Player doesn't do much yet except know about its size and its center position
class Player {
  // the constructor can accept arguments that can be passed in when we make a new Player
  // like so: `new Player(game, gameSize)`
  constructor (game, gameSize) {
    this.size = { x: 30, y: 30 } // make it whatever size you want!
    // the values of x and y for the center position of the player are derived from the gameSize
    this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y * 2 }
  }
}

// when this line runs, it calls the constructor method in the Game class
// and it makes a new Game instance
new Game()

/* Todo basic fighting mechanics

1. Project Setup.
2. Create PLayer and Enemy.
2. Move character with Event Listeners.
4. Attacks.
5. Health Bar Interface.
5. Game timers and Game over.

*/

// Select the canvas
const canvas = document.querySelector('canvas');
// Select canvas context '2d' bc it's a 2d game. 'c' stands for context.
const c = canvas.getContext('2d');

// Resize canvas with JS 16:9 ratio.
canvas.width = 1024
canvas.height = 576

//draw shapes onto screen. big rectangle.
c.fillRect(0, 0, canvas.width, canvas.height)

// Using OOP we create each "pl;ayer"
class Sprite {
// Need a constructor method ( a function within a class)

// Can't pass through velocity first and can't pass position second. if we turn
// Into an object like so, it doesn't matter what order or if it was called.
constructor({position, velocity}) {
    // Whenever you do game dev. you always want to put a position property on almost eveyr object
    this.position = position
    this.velocity = velocity
    this.height = 150
}

//can be called whatever, but for easy reference we call draw
draw() {
c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, 50, this.height)
}

// Method inside class when stuff is moving around.
update() {
    this.draw()
    // Select y and add 10 over time for each frame we loop over.
    // for position on the y axis we add our velocity.
    this.position.y += this.velocity.y

    // = to the bottom of a rectanlgle. If the bottom of a rectangle plus our sprites velocity is > or = to the bottom of canvas set velocity to 0. (stops it from falling past canvas)
    if (this.position.y + this.height +this.velocity.y >= canvas.height) {
        this.velocity.y = 0
    }
}
}

const player = new Sprite({
    position: {
    // Place sprite at top left hand screen to start
    x: 0,
    y: 0,
},
// 2d velocity to move left right up and down. player not moving by default.
velocity: {
    x: 0,
    y:10
}
})

//calback to the draw function
// player.draw()

//Same code as player more or less and draw it with the draw function.
const enemy = new Sprite({
    position: {
    // Place sprite at top left hand screen to start
    x: 400,
    y: 100,
},
// 2d velocity to move left right up and down. player not moving by default.
velocity: {
    x: 0,
    y:0
}
})

enemy.draw()


console.log(player)

// Infinite loop that goes on and on forever until we tell it to stop.
function animate() {
    window.requestAnimationFrame(animate)
    // We call fillstyle here to differentiate player form background.
    c.fillStyle= 'black'
    // Code below= Always clear canvas for each frame we're looping over.
    c.fillRect(0, 0, canvas.width, canvas.height)
    // update() is calling draw() so we don't need to anymore.
    player.update()
    enemy.update()
    // console.log('go')
}
animate()

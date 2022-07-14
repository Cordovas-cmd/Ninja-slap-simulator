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


// CREATE GRAVITY
const gravity = 0.2
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
    this.lastKey
}

//can be called whatever, but for easy reference we call draw
draw() {
c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, 50, this.height)
}

// Method inside class when stuff is moving around.
update() {
    this.draw()


    //UPDATE HOW WE MOVE ON THE X-------------------------------------------------------------------------------
this.position.x += this.velocity.x




    // UPDATE HOW WE MOVE ON THE Y AXIS----------------------------------------------------------------------------
    // Select y and add 10 over time for each frame we loop over.
    // for position on the y axis we add our velocity.
    this.position.y += this.velocity.y
    
    // = to the bottom of a rectanlgle. If the bottom of a rectangle plus our sprites velocity is > or = to the bottom of canvas set velocity to 0. (stops it from falling past canvas)
    if (this.position.y + this.height +this.velocity.y >= canvas.height) {
        this.velocity.y = 0
        // Adds the value of gravity over time as long as it's in the air. and as long is it isn't at the bottom of the canvas.
    } else this.velocity.y += gravity
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
    y:0
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


const keys = {
    a: {
        pressed : false
    },
    d: {
        pressed : false
    },
    w: {
        pressed : false
    },
}

let lastKey
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

/* Set velocity here so that there is no lag time or discrepincies when we 
lift one key while pressing the other*/
player.velocity.x = 0;
if(keys.a.pressed && lastKey === 'a') {
    player.velocity.x = -1
} else if (keys.d.pressed && lastKey === 'd') {
    player.velocity.x = 1
} 

 }
animate()



// Add an event listener to the object to log any keypress.
window.addEventListener('keydown', (event) => {
    console.log(event.key);
    //Add a switch case statement depending on the key that's pressed.---------
    switch(event.key) {
        case 'd':
            //moving one pixel for every frame we loop over when D is pressed.
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'a':
            //moving one pixel for every frame we loop over when A is pressed.
            keys.a.pressed = true
            lastKey = 'a'
            break
            case 'w':
                player.velocity.y =-10
                
                break

            // Enemy Moves
        case 'ArrowRight':
            event.preventDefault();
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            //moving one pixel for every frame we loop over when A is pressed.
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            //moving one pixel for every frame we loop over when A is pressed.
            enemy.velocity.y =-10
            break

    }
console.log(event.key);
})

// Add an event listener to the object to log any key up.
window.addEventListener('keyup', (event) => {
    //Add a switch case statement depending on the key that's pressed.
    switch(event.key) {
        case 'd':
            //STop moving whenever we stop holding down D.
            keys.d.pressed = false
            break
        case 'a':
            //STop moving whenever we stop holding down A.
            keys.a.pressed = false
            break
        case 'w':
            player.velocity.y =-10
            
            break

    }
console.log(event.key);
})
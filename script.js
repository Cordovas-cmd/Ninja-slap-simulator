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
// set color as an arguement.
constructor({position, velocity, color, offset}) {
    // Whenever you do game dev. you always want to put a position property on almost eveyr object
    this.position = position
    this.velocity = velocity
    this.width = 50
    this.height = 150
    this.lastKey
    // adding an attack box property.
    this.attackBox = {
        // position is an object with x and y properties but they don't update automatically.
    position: {
        x: this.position.x,
        y: this.position.y
        },
        offset,
        width: 100,
        height: 50
    }
    this.color = color
    this.isAttacking
    this.health = 100
}

//can be called whatever, but for easy reference we call draw
draw() {
c.fillStyle = this.color
    c.fillRect(this.position.x, this.position.y, this.width, this.height)

    //this is where attack box is drawn
    if(this.isAttacking) {

    
    c.fillStyle = 'purple'
    c.fillRect(
        this.attackBox.position.x, 
        this.attackBox.position.y, 
        this.attackBox.width, 
        this.attackBox.height
        )
    }
}

// Method inside class when stuff is moving around.
update() {
    this.draw()
    // update positions for attackbox whenever we change frames.
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y

    //MOVE ON THE X-------------------------------------------------------------------------------
this.position.x += this.velocity.x

    //  MOVE ON THE Y AXIS----------------------------------------------------------------------------
    // Select y and add 10 over time for each frame we loop over.
    this.position.y += this.velocity.y
    
    // = to the bottom of a rectanlgle. If the bottom of a rectangle plus our sprites velocity is > or = to the bottom of canvas set velocity to 0. (stops it from falling past canvas)
    if (this.position.y + this.height +this.velocity.y >= canvas.height) {
        this.velocity.y = 0
        // Adds the value of gravity over time as long as it's in the air. and as long is it isn't at the bottom of the canvas.
    } else this.velocity.y += gravity
}

// Attack function
attack() {
    this.isAttacking = true
    setTimeout(() => {
        this.isAttacking = false
    }, 100)
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
    },
    color: 'orange',
    offset: {
        x: 0,
        y: 0
    }
})

//calback to the draw function
// player.draw()

//Same code as player more or less and draw it with the draw function.
const enemy = new Sprite({
    position: {
    // Place sprite at top left hand screen to start
        x: 400,
        y: 100
    },
    // 2d velocity to move left right up and down. player not moving by default.
    velocity: {
        x: 0,
        y:0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
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
    ArrowRight: {
        pressed : false
    },
    ArrowLeft: {
        pressed : false
    }
}

function checkRectCollision({ rectangle1, rectangle2}) {
    return(
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
    // find the enemies right side 
    rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
    //  bottom of our attack box touching topside of .
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height 
    )
}

function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId);
    document.querySelector('#displayText').style.display='flex'
    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie!!!'
    }
    else if  (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins!!!'
    }
    else if  (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins!!!'
    }
}

let timer = 60
let timerId

function decreaseTimer() {
    timerId = setTimeout(decreaseTimer, 1000)
    if(timer > 0) {
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    if(timer === 0) {
        document.querySelector('#displayText').style.display='flex'
        determineWinner({player, enemy})
}
}
decreaseTimer();
// let lastKey
// Infinite loop that goes on and on forever until we tell it to stop.
function animate() {
    window.requestAnimationFrame(animate)
    // We call fillstyle set background color
    c.fillStyle= 'black'
    // Code below= Always clear canvas for each frame we're looping over.
    c.fillRect(0, 0, canvas.width, canvas.height)
    // update() is calling draw() so we don't need to anymore.
    player.update()
    enemy.update()

/* Set velocity here so that there is no lag time or discrepincies when we 
lift one key while pressing the other*/
player.velocity.x = 0;
enemy.velocity.x = 0;

// Player Movement-------------------------------
if(keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
} else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
} 

// Enemy Movement.------------------------------
if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
} else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5
} 


// collision detection ---------------------------
 if (
    checkRectCollision({
        rectangle1: player,
        rectangle2: enemy
    }) &&
    player.isAttacking
 ) {
    player.isAttacking = false
    enemy.health -= 20
    document.querySelector('#player2Hp').style.width = enemy.health + '%'
    console.log("hit")
 }
 // immediately after detecting hit set it back to false so it only hits once.
  if (
    checkRectCollision({
        rectangle1: enemy,
        rectangle2: player
    }) &&
    enemy.isAttacking
    ) {
    // immediately after detecting hit set it back to false so it only hits once.                   
    enemy.isAttacking = false
    player.health -= 20
    document.querySelector('#player1Hp').style.width = player.health + '%'
    console.log("enemy attack successful")
}

// end game based on health
if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId})
}
}
animate()



// Add an event listener to the object to log any keypress.
window.addEventListener('keydown', (event) => {
    //Add a switch case statement depending on the key that's pressed.---------
    switch(event.key) {
        case 'd':
            //moving one pixel for every frame we loop over when D is pressed.
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            //moving one pixel for every frame we loop over when A is pressed.
            keys.a.pressed = true
            player.lastKey = 'a'
            break
            case 'w':
                player.velocity.y =-12
                break
                // the case for spacebar.
            case ' ':
                player.attack()
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
                            enemy.velocity.y =-12
                            break
                            case 'ArrowDown':
                                enemy.attack()
                                enemy.isAttacking = true
                                break
                                
                            }
                            console.log(player.isAttacking)
                            console.log(enemy.isAttacking)
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
    }

    // enemy keys.
    switch(event.key) {
        case 'ArrowRight':
            //STop moving whenever we stop holding down D.
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            //STop moving whenever we stop holding down A.
            keys.ArrowLeft.pressed = false
            break
    }
})
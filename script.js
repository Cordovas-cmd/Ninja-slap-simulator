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

// Background Sprite
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/image/background.png'
})

// Shop sprite
const shop = new Sprite({
    position: {
        x: 610,
        y: 128
    },
    imageSrc: './assets/image/shop.png',
    scale: 2.75,
    framesMax: 6
})



// using OOP we create each player.
const player = new Fighter({
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
    },
    imageSrc: './assets/image/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
    x: 215,
    y: 156
    },
    sprites: {
        idle: {
            imageSrc: './assets/image/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './assets/image/samuraiMack/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './assets/image/samuraiMack/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './assets/image/samuraiMack/Fall.png',
            framesMax: 2
        }
    }
})

//calback to the draw function
// player.draw()

//Same code as player more or less and draw it with the draw function.
const enemy = new Fighter({
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
    },
    imageSrc: './assets/image/kenji/Idle.png',
    framesMax: 4

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


decreaseTimer();
// let lastKey
// Infinite loop that goes on and on forever until we tell it to stop.
function animate() {
    window.requestAnimationFrame(animate)
    // We call fillstyle set background color
    c.fillStyle= 'black'
    // Code below= Always clear canvas for each frame we're looping over.
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
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
   player.switchSprite('run')
} else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
    player.switchSprite('run')
} else {
    player.switchSprite('idle')
}
// jumping
if (player.velocity.y < 0) {
   player.switchSprite('jump')
} else if (player.velocity.y > 0) {
    player.switchSprite('fall')
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
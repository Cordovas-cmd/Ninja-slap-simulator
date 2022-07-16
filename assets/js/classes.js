class Sprite {
    // Need a constructor method ( a function within a class)
    
    /* Can't pass through velocity first and can't pass position second. if we turn
    Into an object like so, it doesn't matter what order or if it was called. */
    constructor({position, imageSrc }) {
        // Whenever you do game dev. you always want to put a position property on almost every object
        this.position = position
        this.width = 50
        this.height = 150
        // creates an html img in JS
        this.image = new Image()
        this.image.src = imageSrc
        
    }
    
    //can be called whatever, but for easy reference we call draw
    draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
    }
    
    // Method inside class when stuff is moving around.
    update() {
        this.draw()
      
    }
    }

    
    
    class Fighter {
        // Need a constructor method ( a function within a class)
        
        /* Can't pass through velocity first and can't pass position second. if we turn
        Into an object like so, it doesn't matter what order or if it was called. */
        constructor({position, velocity, color, offset}) {
            // Whenever you do game dev. you always want to put a position property on almost every object
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
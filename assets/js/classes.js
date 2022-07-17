class Sprite {
    // Need a constructor method ( a function within a class)
    
    /* Can't pass through velocity first and can't pass position second. if we turn
    Into an object like so, it doesn't matter what order or if it was called. */
    constructor({
        position, 
        imageSrc, 
        scale = 1, 
        framesMax = 1, 
        offset ={x:0, y:0} 
    }) 
    {
        // Whenever you do game dev. you always want to put a position property on almost every object
        this.position = position
        this.width = 50
        this.height = 150
        // creates an html img in JS
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 20
        this.offset = offset
        
    }
    
    //can be called whatever, but for easy reference we call draw
    draw() {
    c.drawImage(
        // cropping
        this.image, 
        this.framesCurrent * this.image.width / this.framesMax,
        0,
        this.image.width / this.framesMax,
        this.image.height,

        this.position.x - this.offset.x,
        this.position.y - this.offset.y, 
        (this.image.width /this.framesMax) * this.scale, 
        this.image.height * this.scale
        )
    }
    
    animateFrames() {
        this.framesElapsed++
        // if it can be divided and remainder is 0
        if(this.framesElapsed % this.framesHold === 0) {
        if(this.framesCurrent < this.framesMax -1) {
            this.framesCurrent++
        } else {
            this.framesCurrent = 0
        }
    }
    }
    // Method inside class when stuff is moving around.
    update() {
        this.draw()
        this.animateFrames()
    }
    }

    
    
    class Fighter extends Sprite{
        // Need a constructor method ( a function within a class)
        
        /* Can't pass through velocity first and can't pass position second. if we turn
        Into an object like so, it doesn't matter what order or if it was called. */
        constructor({
            position, 
            velocity, 
            color,
            imageSrc, 
            scale = 1, 
            framesMax = 1, 
            offset ={x:0, y:0},
            sprites 
        })
             {
            // calls constructor of parent.
            super({
                position,
                imageSrc, 
                scale, 
                framesMax, 
                offset
            })
            // Whenever you do game dev. you always want to put a position property on almost every object
            
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
            this.framesCurrent = 0
            this.framesElapsed = 0
            this.framesHold = 20
            this.sprites = sprites

            for (const sprite in this.sprites ) {
                sprites[sprite].image = new Image()
                sprites[sprite].image.src = sprites[sprite].imageSrc 
            }
            console.log(this.sprites);
        }
        
        //can be called whatever, but for easy reference we call draw
        // draw() {
        // c.fillStyle = this.color
        //     c.fillRect(this.position.x, this.position.y, this.width, this.height)
        
        //     //this is where attack box is drawn
        //     if(this.isAttacking) {
        
            
        //     c.fillStyle = 'purple'
        //     c.fillRect(
        //         this.attackBox.position.x, 
        //         this.attackBox.position.y, 
        //         this.attackBox.width, 
        //         this.attackBox.height
        //         )
        //     }
        // }
        
        // Method inside class when stuff is moving around.
        update() {
            this.draw()
            this.animateFrames()
            // update positions for attackbox whenever we change frames.
            this.attackBox.position.x = this.position.x + this.attackBox.offset.x
            this.attackBox.position.y = this.position.y
        
            //MOVE ON THE X-------------------------------------------------------------------------------
        this.position.x += this.velocity.x
        
            //  MOVE ON THE Y AXIS----------------------------------------------------------------------------
            // Select y and add 10 over time for each frame we loop over.
            this.position.y += this.velocity.y
            
            // = to the bottom of a rectanlgle. If the bottom of a rectangle plus our sprites velocity is > or = to the bottom of canvas set velocity to 0. (stops it from falling past canvas)
            if (this.position.y + this.height +this.velocity.y >= canvas.height -96) {
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
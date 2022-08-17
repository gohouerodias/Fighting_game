class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1 }) {

        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.currentFrame = 0
        this.frameElapsed = 0
        this.frameHold = 5
    }

    draw() {
        c.drawImage(
            this.image,
            this.currentFrame * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale)
    }

    update() {
        this.draw()
        this.frameElapsed++
        if (this.frameElapsed % this.frameHold === 0) {
            if (this.currentFrame < this.framesMax - 1) {
                this.currentFrame++
            } else {
                this.currentFrame = 0
            }

        }

    }



}

class Fighter extends Sprite {
    constructor({ position, velocity, color = 'red', offset, imageSrc, scale = 1, framesMax = 1 }) {
        super({ position, imageSrc, scale, framesMax })
        this.color = color
        this.health = 100
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            }, offset,
            width: 100,
            height: 50,
        }
        this.isAttacking = false
        this.currentFrame = 0
        this.frameElapsed = 0
        this.frameHold = 5
    }



    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 95) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }

}
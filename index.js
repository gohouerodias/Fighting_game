const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//resize the canvas
canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.2

class Sprite {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update() {
        this.draw()
        this.velocity.y += gravity
        this.position.y += this.velocity;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        }
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: { x: 0, y: 0 }
})




const ennemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0, y: 0
    }
})




console.log(player)

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    ennemy.update()
    console.log('oki')
}

animate()


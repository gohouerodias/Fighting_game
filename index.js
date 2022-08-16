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

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
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
const keys = {
    q: {
        pressed: false
    },
    d: {
        pressed: false
    },
    z: {
        pressed: false
    }
}

let lastKey

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    ennemy.update()

    player.velocity.x = 0
    if (keys.q.pressed && lastKey === 'q') {
        player.velocity.x = -1

    } else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 1

    }
    else if (keys.z.pressed && lastKey === 'z') {
        player.velocity.y = 5

    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break;
        case 'q':
            keys.q.pressed = true
            lastKey = 'q'
            break;

        case 'z':
            /*  keys.z.pressed = true
              lastKey = 'z'*/
            player.velocity.y = -10
            break;

        default:
            break;
    }

    console.log(event.key)
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break;
        case 'q':
            keys.q.pressed = false
            break;

        case 'z':
            keys.z.pressed = false
            break;

        default:
            break;
    }

    console.log(event.key)
})
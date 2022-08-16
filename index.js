const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//resize the canvas
canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.7

class Sprite {
    constructor({ position, velocity, color = 'red', offset }) {
        this.color = color
        this.health = 100
        this.position = position
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
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //attack box
        if (this.isAttacking) {
            c.fillStyle = 'blue'
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
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

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: { x: 0, y: 0 },
    offset: {
        x: 0, y: 0
    }
})




const ennemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0, y: 0
    }, color: 'green'
    , offset: {
        x: -50,
        y: 0
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
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    ennemy.update()

    player.velocity.x = 0
    ennemy.velocity.x = 0
    //player movement
    if (keys.q.pressed && player.lastKey === 'q') {
        player.velocity.x = -5

    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5

    }

    //ennemy movement
    if (keys.ArrowLeft.pressed && ennemy.lastKey === 'ArrowLeft') {
        ennemy.velocity.x = -5

    } else if (keys.ArrowRight.pressed && ennemy.lastKey === 'ArrowRight') {
        ennemy.velocity.x = 5

    }

    //detect collision
    if (rectangularCollision({ rectangle1: player, rectangle2: ennemy }) && player.isAttacking) {
        player.isAttacking = false
        document.querySelector('#ennemyHealth').style.width = ennemy.health
    }
    else if (rectangularCollision({ rectangle1: ennemy, rectangle2: player }) && ennemy.isAttacking) {
        ennemy.isAttacking = false
        console.log('ennemy Attack successful')
    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break;
        case 'q':
            keys.q.pressed = true
            player.lastKey = 'q'
            break;

        case 'z':
            player.velocity.y = -20
            break;

        case ' ':
            player.attack()
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            ennemy.lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            ennemy.lastKey = 'ArrowLeft'
            break;

        case 'ArrowUp':
            ennemy.velocity.y = -20
            break;

        case 'ArrowDown':
            ennemy.attack()
            break;
        default:
            break;
    }

})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break;
        case 'q':
            keys.q.pressed = false
            break;

        default:
            break;
    }

    //ennemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;

        default:
            break;
    }

    console.log(event.key)
})
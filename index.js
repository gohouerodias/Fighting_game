const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//resize the canvas
canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.7
<<<<<<< HEAD
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    }, imageSrc: './img/background.png'
})
const shop = new Sprite({
    position: {
        x: 600,
        y: 130
    }, imageSrc: './img/shop.png'
    , scale: 2.75
    , framesMax: 6
})
=======
>>>>>>> parent of 7e9cfc1 (rodias)

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
    },
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 160
    },
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 2
        }
        , attack1: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6
        },
        takeHit: {
            imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4
        }
    },
    attackBox: {
        offset: {
            x: 80,
            y: 50
        },
        width: 170,
        height: 50
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
    },
    imageSrc: './img/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 170
    },
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2
        }
        , attack1: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4
        }
        , takeHit: {
            imageSrc: './img/kenji/Take hit.png',
            framesMax: 3
        }
    },
    attackBox: {
        offset: {
            x: -180,
            y: 50
        },
        width: 170,
        height: 50
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

function determineWinner({ player, ennemy, timerId }) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === ennemy.health) {
        document.querySelector('#displayText').innerHTML = 'Equal'
    } else if (player.health > ennemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 wins'
    } else if (player.health < ennemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 wins'
    }
}

let timer = 5
let timerId
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    if (timer === 0) {
        determineWinner({ player, ennemy })
    }

}

decreaseTimer()

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
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.switchSprite('run')
    } else {
        player.switchSprite('idle')
    }

    //when jumping
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }

    //ennemy movement
    if (keys.ArrowLeft.pressed && ennemy.lastKey === 'ArrowLeft') {
        ennemy.velocity.x = -5
        ennemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && ennemy.lastKey === 'ArrowRight') {
        ennemy.velocity.x = 5
        ennemy.switchSprite('run')
    } else {
        ennemy.switchSprite('idle')
    }
    //when jumping
    if (ennemy.velocity.y < 0) {
        ennemy.switchSprite('jump')
    } else if (ennemy.velocity.y > 0) {
        ennemy.switchSprite('fall')
    }


    //detect collision && ennemy gets hit
    if (rectangularCollision({ rectangle1: player, rectangle2: ennemy }) && player.isAttacking && player.currentFrame === 4) {
        ennemy.takeHit()
        player.isAttacking = false
        ennemy.health -= 20
        document.querySelector('#ennemyHealth').style.width = ennemy.health + '%'
    }
    //if player misses
    if (player.isAttacking && player.currentFrame === 4) {
        player.isAttacking = false
    }

    if (rectangularCollision({ rectangle1: ennemy, rectangle2: player }) && ennemy.isAttacking && ennemy.currentFrame === 2) {
        player.takeHit()
        ennemy.isAttacking = false
        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }
    //if ennemy misses
    if (ennemy.isAttacking && ennemy.currentFrame === 2) {
        ennemy.isAttacking = false
    }

    //end game based on health
    if (ennemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, ennemy, timerId })
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
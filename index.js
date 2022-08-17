const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//resize the canvas
canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.7
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

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: { x: 0, y: 0 },
    offset: {
        x: 0, y: 0
    }, imageSrc: './img/samuraiMack/Idle.png'
    , framesMax: 8,
    scale: 2
})




const ennemy = new Fighter({
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


decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
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
        ennemy.health -= 20
        document.querySelector('#ennemyHealth').style.width = ennemy.health + '%'
    }
    else if (rectangularCollision({ rectangle1: ennemy, rectangle2: player }) && ennemy.isAttacking) {
        ennemy.isAttacking = false
        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + '%'
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
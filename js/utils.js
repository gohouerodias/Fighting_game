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

let timer = 90
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

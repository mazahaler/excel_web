export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export function isTabOrEnter(keyCode) {
    return (keyCode === 9 || keyCode === 13)
}

export function getNextId({row, col}, keyCode) {
    switch (keyCode) {
        case 39: // right
        case 9: // tab
            return `${row}:${col + 1}`
        case 40: // down
        case 13: // enter
            return `${row + 1}:${col}`
        case 37: // left
            return `${row}:${col - 1}`
        case 38: // up
            return `${row - 1}:${col}`
    }
}
const CODES = {
    A: 65,
    Z: 90
}

function toCell(row) {
    return function(_, col) {
        return `<div 
                class="cell" 
                data-id="${row}:${col}" 
                data-col="${col}" 
                data-type="cell"
                contenteditable
                ></div>`
    }
}

function toColumn(col, index) {
    return `<div class="column" data-type="resizable" data-col="${index}">
                ${col}
                <div class="col-resize" data-resize="col"></div>
            </div>`
}

function createRow(info, data) {
    const resize = info ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
            <div class="row" data-type="resizable">
                <div class="row-info">${info ? info : ''}
                ${resize}
                </div>
                <div class="row-data">${data}</div>
            </div>
            `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowCount = 20) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')
    rows.push(createRow(null, cols))
    for (let row = 0; row < rowCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(row))
            .join('')
        rows.push(createRow(row + 1, cells))
    }
    return rows.join('')
}
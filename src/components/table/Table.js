import {$} from '@core/dom'
import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {getNextId, isCell, shouldResize} from '@/components/table/table.helpers'
import {TableSelection} from '@/components/table/TableSelection'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    toHTML() {
        return createTable(30)
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        this.selectCell(this.$root.find('[data-id="0:0"]'))
        this.$on('formula:input', text => this.selection.current.text(text))
        this.$on('formula:enter', () => {
            console.log('check')
            this.selection.select(this.selection.current)
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(event, this.$root)
        } else if (isCell(event)) {
            if (event.shiftKey) {
                this.selection.groupSelectionHandler()
            } else {
                this.selection.select($(event.target))
            }
        }
    }

    onKeydown(event) {
        const keys = [9, 13, 37, 38, 39, 40]
        const {keyCode} = event
        if (!event.shiftKey && keys.includes(keyCode)) {
            event.preventDefault()
            const id = getNextId(this.selection.current.id(true), keyCode)
            const $next = this.$root.find(`[data-id="${id}"]`)
            this.selectCell($next)
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }
}
import {$} from '@core/dom'
import {range} from '@core/utils'

export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        if (!$el.$el) {
            return 0
        }
        this.clear()
        this.group.push($el)
        this.current = $el
        $el.addClass(TableSelection.className)
        $el.focus()
    }

    clear() {
        this.group.forEach($el => $el.removeClass(TableSelection.className))
        this.group = []
    }

    selectGroup($group = []) {
        this.clear()
        this.group = $group
        $group.forEach($el => $el.addClass(TableSelection.className))
    }

    groupSelectionHandler() {
        document.onmouseup = (e) => {
            document.onmouseup = null
            const startId = this.current.id(true)
            const endId = $(e.target).id(true)
            const rows = range(startId.row, endId.row)
            const cols = range(startId.col, endId.col)
            const group = cols.reduce((acc, col) => {
                rows.forEach(row => acc.push($(`[data-id="${row}:${col}"]`)))
                return acc
            }, [])
            this.selectGroup(group)
        }
    }
}
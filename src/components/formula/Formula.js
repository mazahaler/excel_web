import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {isTabOrEnter} from '@/components/table/table.helpers'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
    }

    toHTML() {
        return `
                <div class="info">fx</div>
                <div id="formula" class="input" contenteditable spellcheck="false"></div>
            `
    }

    init() {
        super.init()
        this.$formula = this.$root.find('#formula')
        this.$on('table:select', $el => {
            this.$formula.text($el.text())
        })
        this.$on('table:input', $el => {
            this.$formula.text($el.text())
        })
    }

    onInput(event) {
        const text = $(event.target).text()
        this.$emit('formula:input', text)
    }

    onKeydown(event) {
        if (isTabOrEnter(event.keyCode)) {
            event.preventDefault()
            this.$emit('formula:enter')
        }
    }
}
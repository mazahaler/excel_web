import {$} from '@core/dom'

export function resizeHandler(event, $root) {
    const $resizer = $(event.target)
    const resize = $resizer.data.resize
    const sideProp = resize === 'col' ? 'bottom' : 'right'
    const target = $resizer.closest('[data-type="resizable"]')
    const rect = target.getCoords()
    $resizer.css({opacity: 1, [sideProp]: '-5000px'})
    let width
    let height
    document.onmousemove = e => {
        if (resize === 'col') {
            width = rect.width + e.screenX - rect.right + 'px'
            $resizer.css({right: -(e.screenX - rect.right) + 'px'})
        } else {
            height = (e.clientY - rect.top) + 'px'
            $resizer.css({bottom: -(e.clientY - rect.bottom) + 'px'})
        }
    }
    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        if (resize === 'col') {
            $root.findAll(`[data-col="${target.data.col}"]`)
                .forEach(target => $(target).css({width: width}))
        } else {
            target.css({height: height})
        }
        $resizer.css({opacity: 0, bottom: 0, right: 0})
    }
}
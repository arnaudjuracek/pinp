import Draggabilly from 'draggabilly'
import noop from '../utils/noop'
import autobind from '../utils/class-autobind'

export default class Box {
  constructor (element, {
    container = document.documentElement,
    grid = [1, 1],
    onMove = noop
  } = {}) {
    if (!element) {
      throw new TypeError(`Box constructor expects HTMLElement, ${typeof element} given`)
    }

    this.grid = grid
    this.onMove = onMove

    this.element = element
    this.element.style.position = 'absolute'
    this.container = container

    this.lastMove = Date.now()

    this.dragInstance = new Draggabilly(element, { grid, containment: container })
    this.dragInstance.on('dragMove', () => { this.lastMove = Date.now() })
    this.dragInstance.on('dragEnd', this.onMove)

    autobind(this)
  }

  destroy () {
    this.dragInstance.destroy()
  }

  collide (box) {
    return this.collideOnXAxis(box) && this.collideOnYAxis(box)
  }

  delta (box) {
    return [
      this.center.x - box.center.x,
      this.center.y - box.center.y
    ]
  }

  collideOnYAxis (box) {
    if (!box) return
    if (box === this) return false

    return this.xmax > box.xmin && this.xmin < box.xmax
  }

  collideOnXAxis (box) {
    if (!box) return
    if (box === this) return false

    return this.ymax > box.ymin && this.ymin < box.ymax
  }

  move (x, y) {
    if (this.isDragged) return
    this.dragInstance.setPosition(x, y)
    this.lastMove = Date.now()
    this.update()
  }

  update () {
    this.boundingBox = this._computeBoundingBox()
    // NOTE: in addition to Box.boundingBox,
    // all boundingBox keys are accessible directly via Box[key]
    Object.entries(this.boundingBox).forEach(([key, value]) => { this[key] = value })
  }

  // WARNING: due to Element.getBoundingClientRect causing layout repaint,
  // Box.boundingBox is memoized and only recomputed on Box.update call
  _computeBoundingBox () {
    const { width, height } = this.element.getBoundingClientRect()
    const x = this.dragInstance.position.x
    const y = this.dragInstance.position.y
    return {
      x,
      y,
      width,
      height,
      xmin: x,
      ymin: y,
      xmax: x + width,
      ymax: y + height,
      center: {
        x: x + width / 2,
        y: y + height / 2
      }
    }
  }

  // DEBUG
  write (text, append = false) {
    this._text = append
      ? this._text + ' ' + text
      : text
    this.element.innerHTML = this._text
  }
}
